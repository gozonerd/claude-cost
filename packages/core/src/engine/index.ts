import type { Plan, Stage } from "../schemas/plan.js";
import type { ModelPricing, PricingDatabase } from "../schemas/pricing.js";
import type { ExecutionLog, StageActual } from "../schemas/log.js";
import type {
  ComparisonReport,
  EstimateResult,
  ErrorEntry,
  StageCost,
  VariancePerStage,
  VarianceReport,
} from "../schemas/result.js";
import type { H6CostActualRecord } from "../h6/schema.js";
import { getPricing, tryGetPricing, isStale, loadPricing } from "../pricing/index.js";
import { planId } from "../util/plan-id.js";
import { computeEnvelope } from "./envelope.js";
import { effectiveInputTokens, validatePlanSchema } from "./carry-context.js";

const PER_MTOK = 1_000_000;

export interface EstimateOptions {
  pricingDb?: PricingDatabase;
  asOf?: Date;
  stalenessDays?: number;
  tokenOverrunThreshold?: number;
}

/**
 * Compute cost for a single stage given a model's pricing.
 *
 * Applies:
 * - tokenizer correction factor to input/output/thinking token counts
 * - batch discount when stage.batch === true
 * - separate cache_read and cache_write rates
 * - carry_context tokens when effectiveInputTokensOverride is provided
 *
 * Returns per-stage breakdown plus a best-case / expected / worst-case envelope
 * based on retry_probability and max_retries (FR-05).
 *
 * @param stage - The stage to estimate
 * @param pricing - The model pricing
 * @param effectiveInputTokensOverride - Optional: effective input tokens (stage.input_tokens + carried tokens). If not provided, uses stage.input_tokens.
 */
export function estimateStage(
  stage: Stage,
  pricing: ModelPricing,
  effectiveInputTokensOverride?: number,
): StageCost {
  const correction = pricing.tokenizer_correction;
  const batchFactor = stage.batch ? 1 - pricing.batch_discount : 1;
  const assumptions: string[] = [];

  const inputTokens = effectiveInputTokensOverride ?? stage.input_tokens;
  const adjInput = inputTokens * correction;
  const adjOutput = stage.output_tokens * correction;
  const adjThinking = stage.thinking_tokens * correction;

  if (correction !== 1.0) {
    assumptions.push(
      `Tokenizer correction ${correction.toFixed(2)}x applied for model ${pricing.model_id}.`,
    );
    assumptions.push(
      `Cache tokens use tokenizer_correction symmetric with input/output/thinking (per Anthropic pricing spec; verified 2026-04-26).`,
    );
  }
  if (stage.batch) {
    assumptions.push(`Batch discount ${(pricing.batch_discount * 100).toFixed(0)}% applied.`);
  }

  const input_cost_usd = (adjInput / PER_MTOK) * pricing.input_per_mtok_usd * batchFactor;
  const output_cost_usd = (adjOutput / PER_MTOK) * pricing.output_per_mtok_usd * batchFactor;
  const thinking_cost_usd = (adjThinking / PER_MTOK) * pricing.thinking_per_mtok_usd * batchFactor;
  const adjCacheRead = (stage.cache_read_tokens ?? 0) * correction;
  const adjCacheWrite = (stage.cache_write_tokens ?? 0) * correction;
  const cache_read_cost_usd = (adjCacheRead / PER_MTOK) * pricing.cache_read_per_mtok_usd;
  const cache_write_cost_usd = (adjCacheWrite / PER_MTOK) * pricing.cache_write_per_mtok_usd;

  const subtotal_usd =
    input_cost_usd + output_cost_usd + thinking_cost_usd + cache_read_cost_usd + cache_write_cost_usd;

  // Envelope: best-case = no retries; expected = Bernoulli IID closed form; worst = all retries
  // Probability model: Geometric / Independent Bernoulli; closed form (p − p^(N+1)) / (1 − p)
  const p = stage.retry_probability;
  const maxRetries = stage.max_retries;
  const envelope = computeEnvelope(subtotal_usd, p, maxRetries, { model: "bernoulli-iid" });
  const best_case_usd = envelope.best_case_usd;
  const expected_cost_usd = envelope.expected_cost_usd;
  const worst_case_usd = envelope.worst_case_usd;

  if (stage.asae_gate && maxRetries > 0) {
    assumptions.push(
      `ASAE gate; retry envelope 0..${maxRetries} extra iterations at p=${p.toFixed(2)}.`,
    );
  }

  return {
    stage_id: stage.id,
    stage_name: stage.name,
    model: stage.model,
    input_cost_usd,
    output_cost_usd,
    thinking_cost_usd,
    cache_read_cost_usd,
    cache_write_cost_usd,
    subtotal_usd,
    expected_cost_usd,
    best_case_usd,
    worst_case_usd,
    tokenizer_correction_applied: correction,
    batch_discount_applied: stage.batch ? pricing.batch_discount : 0,
    assumptions,
  };
}

/**
 * Estimate a full plan.
 *
 * Implements FR-02, FR-03, FR-04, FR-05, FR-09, FR-16 (partial results).
 *
 * When an unknown model is encountered, continues to process remaining stages
 * and sets partial_results: true with error entries in the result object.
 */
export function estimatePlan(plan: Plan, opts: EstimateOptions = {}): EstimateResult {
  // Validate plan graph for cycles (FR-02)
  validatePlanSchema(plan);

  const plan_id = planId(plan);
  const db = loadPricing(opts.pricingDb);
  const asOf = opts.asOf ?? new Date();
  const stalenessDays = opts.stalenessDays ?? 30;
  const stale = isStale(db, asOf, stalenessDays);

  const per_stage: StageCost[] = [];
  const assumptionsSet = new Set<string>();
  const errors: ErrorEntry[] = [];
  let total_expected = 0;
  let total_best = 0;
  let total_worst = 0;
  let hasErrors = false;

  const opusGenerations = new Set<string>();

  for (const stage of plan.stages) {
    const pricingResult = tryGetPricing(stage.model, db);
    if (!pricingResult.found) {
      // Record error and continue processing other stages
      errors.push({
        stage_id: stage.id,
        model: stage.model,
        code: pricingResult.error.code,
        message: pricingResult.error.message ?? `Unknown model: ${stage.model}`,
      });
      hasErrors = true;
      continue;
    }

    const pricing = pricingResult.pricing;
    if (pricing.generation?.startsWith("opus-")) {
      opusGenerations.add(pricing.generation);
    }
    // Compute effective input tokens including carry_context_from
    const effInputTokens = effectiveInputTokens(stage, plan);
    const cost = estimateStage(stage, pricing, effInputTokens);
    per_stage.push(cost);
    total_expected += cost.expected_cost_usd;
    total_best += cost.best_case_usd;
    total_worst += cost.worst_case_usd;
    for (const a of cost.assumptions) {
      assumptionsSet.add(a);
    }
  }

  const mixed = opusGenerations.size > 1;
  if (mixed) {
    // Build per-generation list with corrections
    const generationDetails: string[] = [];
    for (const generation of Array.from(opusGenerations).sort()) {
      // Find a model with this generation to get its correction
      const model = db.models.find((m) => m.generation === generation);
      if (model) {
        const correction = model.tokenizer_correction;
        generationDetails.push(`${generation} (correction ${correction.toFixed(2)}x)`);
      }
    }
    const detailsStr = generationDetails.join(", ");
    assumptionsSet.add(
      `MIXED OPUS GENERATIONS detected: ${detailsStr}. Cost comparisons across generations must account for tokenizer differences.`,
    );
  }

  if (stale) {
    assumptionsSet.add(
      `Pricing data from ${db.updated} is older than ${stalenessDays} days; results may not reflect current provider pricing.`,
    );
  }

  const assumptionsArray = Array.from(assumptionsSet);
  const result: EstimateResult = {
    plan_id,
    plan_name: plan.plan_name,
    pricing_version: db.version,
    pricing_updated: db.updated,
    pricing_stale: stale,
    per_stage,
    total_expected_usd: total_expected,
    total_best_case_usd: total_best,
    total_worst_case_usd: total_worst,
    mixed_opus_generations: mixed,
    assumptions: assumptionsArray,
    generated_at: asOf.toISOString(),
  };

  if (hasErrors) {
    result.partial_results = true;
    result.errors = errors;
  }

  return result;
}

/**
 * Compare N plans. Implements FR-06.
 */
export function comparePlans(plans: Plan[], opts: EstimateOptions = {}): ComparisonReport {
  if (plans.length < 2) {
    throw new Error("comparePlans requires at least 2 plans.");
  }
  if (plans.length > 20) {
    throw new Error("comparePlans supports at most 20 plans.");
  }
  const estimates = plans.map((p) => estimatePlan(p, opts));
  const per_plan_total_usd = estimates.map((e) => e.total_expected_usd);

  // Heatmap: union of stage IDs across plans, rows = stages, cols = plans
  // Use null to distinguish "stage absent from this plan" from "stage present with $0 cost"
  const stageIds = uniqueStageIds(plans);
  const matrix: (number | null)[][] = stageIds.map((sid) =>
    estimates.map((e) => {
      const hit = e.per_stage.find((s) => s.stage_id === sid);
      return hit ? hit.expected_cost_usd : null;
    }),
  );

  const deltas: ComparisonReport["deltas"] = [];
  for (let i = 0; i < estimates.length; i++) {
    for (let j = i + 1; j < estimates.length; j++) {
      const from = estimates[i];
      const to = estimates[j];
      const delta = to.total_expected_usd - from.total_expected_usd;
      const pct = from.total_expected_usd === 0 ? 0 : (delta / from.total_expected_usd) * 100;
      deltas.push({
        from_plan: from.plan_id,
        to_plan: to.plan_id,
        delta_usd: delta,
        delta_pct: pct,
      });
    }
  }

  let minIdx = 0;
  let maxIdx = 0;
  for (let i = 1; i < per_plan_total_usd.length; i++) {
    if (per_plan_total_usd[i] < per_plan_total_usd[minIdx]) minIdx = i;
    if (per_plan_total_usd[i] > per_plan_total_usd[maxIdx]) maxIdx = i;
  }

  return {
    plan_ids: plans.map((p) => p.plan_id),
    per_plan_total_usd,
    min_plan_id: plans[minIdx].plan_id,
    max_plan_id: plans[maxIdx].plan_id,
    range_usd: per_plan_total_usd[maxIdx] - per_plan_total_usd[minIdx],
    heatmap: {
      stage_ids: stageIds,
      plan_ids: plans.map((p) => p.plan_id),
      matrix_usd: matrix,
    },
    deltas,
    generated_at: (opts.asOf ?? new Date()).toISOString(),
  };
}

function uniqueStageIds(plans: Plan[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of plans) {
    for (const s of p.stages) {
      if (!seen.has(s.id)) {
        seen.add(s.id);
        out.push(s.id);
      }
    }
  }
  return out;
}

/**
 * Post-run variance analysis. Implements FR-07.
 */
/**
 * Normalize an optional array of H6 cost-actual records to a concrete array.
 *
 * The core engine is browser-safe ("pure client-side; no backend") and therefore
 * accepts already-parsed records only. Reading an H6 log file *by path* is a
 * Node-only concern that belongs in the CLI (which may read the file and pass the
 * parsed records here); keeping it out of the engine avoids a static `node:fs`
 * import that breaks the browser bundle.
 */
function parseH6Log(h6Log: H6CostActualRecord[] | undefined): H6CostActualRecord[] {
  return h6Log ?? [];
}

export function analyzeVariance(
  plan: Plan,
  log: ExecutionLog,
  opts: EstimateOptions = {},
  h6Log?: H6CostActualRecord[],
): VarianceReport {
  const db = loadPricing(opts.pricingDb);
  const estimate = estimatePlan(plan, opts);
  const actualByStage = new Map<string, StageActual>();
  for (const s of log.stages) actualByStage.set(s.stage_id, s);

  // Build map of stage_id → cost_actual records from H6 log
  const h6Records = parseH6Log(h6Log);
  const h6ByStageId = new Map<string, H6CostActualRecord[]>();
  for (const rec of h6Records) {
    if (rec.stage_id && rec.kind === "cost_actual") {
      if (!h6ByStageId.has(rec.stage_id)) {
        h6ByStageId.set(rec.stage_id, []);
      }
      h6ByStageId.get(rec.stage_id)!.push(rec);
    }
  }

  // Sort each stage's records by attempt_index
  for (const records of h6ByStageId.values()) {
    records.sort((a, b) => a.attempt_index - b.attempt_index);
  }

  const per_stage: VariancePerStage[] = [];
  let totalEst = 0;
  let totalAct = 0;
  const assumptionsSet = new Set<string>();
  const tokenOverrunThreshold = opts.tokenOverrunThreshold ?? 1.2;

  for (const est of estimate.per_stage) {
    const actual = actualByStage.get(est.stage_id);
    const estimated_usd = est.expected_cost_usd;
    totalEst += estimated_usd;
    let actual_usd = 0;
    let confidence: "high" | "low" = "low";
    const attribution: string[] = [];

    if (actual) {
      const h6Records = h6ByStageId.get(est.stage_id);

      if (h6Records && h6Records.length > 0) {
        // Replay per-attempt costs from H6 log
        confidence = "high";
        for (const rec of h6Records) {
          actual_usd += rec.cost_usd ?? 0;
        }
        if (h6Records.length > 1) {
          attribution.push(`${h6Records.length} per-attempt actuals replayed from H6 log.`);
        }
      } else {
        // Fallback to uniform-cost approximation
        confidence = "low";
        const pricing = getPricing(actual.model, db);
        const pseudoStage: Stage = {
          id: actual.stage_id,
          name: est.stage_name,
          model: actual.model,
          input_tokens: actual.input_tokens,
          output_tokens: actual.output_tokens,
          thinking_tokens: actual.thinking_tokens,
          cache_read_tokens: actual.cache_read_tokens,
          cache_write_tokens: actual.cache_write_tokens,
          batch: actual.batch,
          retry_probability: 0,
          max_retries: actual.retries,
          asae_gate: false,
          depends_on: [],
          carry_context_from: [],
        };
        const actualCost = estimateStage(pseudoStage, pricing);
        actual_usd = actualCost.subtotal_usd * (1 + actual.retries);
        if (actual.retries > 0) attribution.push(`${actual.retries} retry(ies) observed.`);
        assumptionsSet.add("Per-attempt actuals unavailable; using uniform-cost approximation with confidence:low");
      }

      if (actual.model !== est.model) attribution.push(`Model changed: ${est.model} → ${actual.model}.`);
      const estTokens = plan.stages.find((s) => s.id === est.stage_id);
      if (estTokens) {
        if (actual.input_tokens > estTokens.input_tokens * tokenOverrunThreshold) attribution.push(`Input tokens exceeded estimate by >${((tokenOverrunThreshold - 1) * 100).toFixed(0)}%.`);
        if (actual.output_tokens > estTokens.output_tokens * tokenOverrunThreshold) attribution.push(`Output tokens exceeded estimate by >${((tokenOverrunThreshold - 1) * 100).toFixed(0)}%.`);
      }

      // Check for pricing_version mismatch (FR-17)
      if (log.pricing_version && log.pricing_version !== estimate.pricing_version) {
        assumptionsSet.add(
          `pricing_version mismatch: estimate ${estimate.pricing_version} vs log ${log.pricing_version}; cost comparisons may be skewed`
        );
      }
    } else {
      attribution.push("No actual data for stage (missing from execution log).");
      confidence = "low";
    }
    totalAct += actual_usd;

    const variance_usd = actual_usd - estimated_usd;
    const variance_pct = estimated_usd === 0 ? 0 : (variance_usd / estimated_usd) * 100;
    per_stage.push({
      stage_id: est.stage_id,
      estimated_usd,
      actual_usd,
      variance_usd,
      variance_pct,
      attribution,
      confidence,
    });
  }

  const ape = totalEst === 0 ? 0 : Math.abs((totalAct - totalEst) / totalEst) * 100;
  const assumptionsArray = Array.from(assumptionsSet);

  return {
    plan_id: planId(plan),
    run_id: log.run_id,
    per_stage,
    total_estimated_usd: totalEst,
    total_actual_usd: totalAct,
    total_variance_usd: totalAct - totalEst,
    total_variance_pct: totalEst === 0 ? 0 : ((totalAct - totalEst) / totalEst) * 100,
    absolute_percentage_error: ape,
    generated_at: (opts.asOf ?? new Date()).toISOString(),
    assumptions: assumptionsArray.length > 0 ? assumptionsArray : undefined,
  };
}
