import {
  parsePlan,
  parsePlans,
  parseLog,
  estimatePlan,
  comparePlans,
  analyzeVariance,
  loadPricing,
  pricingAgeDays,
  isStale,
  toJSON,
  toCSV,
  toMarkdown,
} from "@martinez-methods/claude-cost";
import type {
  EstimateResult,
  ComparisonReport,
  VarianceReport,
} from "@martinez-methods/claude-cost";

import pricingJson from "@martinez-methods/claude-cost/data/pricing.json";
import { PricingDatabaseSchema, setDefaultPricing } from "@martinez-methods/claude-cost";

const SAMPLE_PLAN = `plan_id: d2r-mixed-001
plan_name: D2R mixed-model sample
description: Opus plans; Sonnet scaffolds; Haiku implements.
stages:
  - id: stage-00
    name: Research
    model: claude-opus-4-7
    input_tokens: 20000
    output_tokens: 8000
    thinking_tokens: 2000
    asae_gate: true
    retry_probability: 0.2
    max_retries: 2
  - id: stage-02
    name: Scaffold
    model: claude-sonnet-4-6
    input_tokens: 18000
    output_tokens: 10000
    cache_read_tokens: 15000
    asae_gate: true
    retry_probability: 0.3
    max_retries: 3
  - id: stage-03
    name: Implement
    model: claude-haiku-4-5
    input_tokens: 25000
    output_tokens: 15000
    asae_gate: true
    retry_probability: 0.3
    max_retries: 3
`;

const pricing = PricingDatabaseSchema.parse(pricingJson);
setDefaultPricing(pricing);

let lastEstimate: EstimateResult | null = null;
let lastComparison: ComparisonReport | null = null;

function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element: ${id}`);
  return el as T;
}

function el(tag: string, opts: { text?: string; cls?: string; attrs?: Record<string, string> } = {}, ...children: (Node | string)[]): HTMLElement {
  const node = document.createElement(tag);
  if (opts.text !== undefined) node.textContent = opts.text;
  if (opts.cls) node.className = opts.cls;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  for (const c of children) {
    if (typeof c === "string") node.appendChild(document.createTextNode(c));
    else node.appendChild(c);
  }
  return node;
}

function clear(el: HTMLElement) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function mount(id: string, ...nodes: Node[]) {
  const host = byId<HTMLElement>(id);
  clear(host);
  for (const n of nodes) host.appendChild(n);
}

function renderPricingStatus() {
  const age = pricingAgeDays(pricing).toFixed(0);
  const stale = isStale(pricing);
  const host = byId<HTMLElement>("pricing-status");
  host.className = stale ? "warn" : "help";
  host.textContent = stale
    ? `⚠ Pricing data from ${pricing.updated} is ${age} days old (>30d). Results may not reflect current provider pricing.`
    : `Pricing data as of ${pricing.updated} (${age} days old).`;
}

function kvTable(rows: Array<[string, string]>, caption?: string): HTMLElement {
  const table = el("table");
  if (caption) table.appendChild(el("caption", { text: caption }));
  const tbody = el("tbody");
  for (const [k, v] of rows) {
    const tr = el("tr");
    tr.appendChild(el("th", { text: k, attrs: { scope: "row" } }));
    tr.appendChild(el("td", { text: v }));
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

function buildTable(headers: string[], rows: string[][]): HTMLElement {
  const table = el("table");
  const thead = el("thead");
  const trH = el("tr");
  for (const h of headers) trH.appendChild(el("th", { text: h, attrs: { scope: "col" } }));
  thead.appendChild(trH);
  table.appendChild(thead);
  const tbody = el("tbody");
  for (const row of rows) {
    const tr = el("tr");
    for (let i = 0; i < row.length; i++) {
      if (i === 0) tr.appendChild(el("th", { text: row[i], attrs: { scope: "row" } }));
      else tr.appendChild(el("td", { text: row[i] }));
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}

function renderEstimate(e: EstimateResult) {
  const nodes: Node[] = [];
  nodes.push(el("h3", { text: `Totals — ${e.plan_name} (${e.plan_id})` }));
  nodes.push(
    kvTable(
      [
        ["Best case", `$${e.total_best_case_usd.toFixed(4)}`],
        ["Expected", `$${e.total_expected_usd.toFixed(4)}`],
        ["Worst case", `$${e.total_worst_case_usd.toFixed(4)}`],
      ],
      "Cost envelope",
    ),
  );
  if (e.mixed_opus_generations) {
    const c = el("div", { cls: "callout", attrs: { role: "note" } });
    c.appendChild(el("strong", { text: "Mixed Opus generations detected. " }));
    c.appendChild(document.createTextNode("Opus 4.7 tokenizer correction applied. See assumptions below."));
    nodes.push(c);
  }
  nodes.push(el("h4", { text: "Per-stage breakdown" }));
  nodes.push(
    buildTable(
      ["Stage", "Model", "Subtotal USD", "Expected USD", "Best USD", "Worst USD"],
      e.per_stage.map((s) => [
        `${s.stage_id} — ${s.stage_name}`,
        s.model,
        `$${s.subtotal_usd.toFixed(4)}`,
        `$${s.expected_cost_usd.toFixed(4)}`,
        `$${s.best_case_usd.toFixed(4)}`,
        `$${s.worst_case_usd.toFixed(4)}`,
      ]),
    ),
  );
  if (e.assumptions.length) {
    nodes.push(el("h4", { text: "Assumptions" }));
    const ul = el("ul");
    for (const a of e.assumptions) ul.appendChild(el("li", { text: a }));
    nodes.push(ul);
  }
  mount("estimate-results", ...nodes);
}

function renderComparison(c: ComparisonReport) {
  const nodes: Node[] = [];
  nodes.push(el("h3", { text: `Comparison of ${c.plan_ids.length} plans` }));
  const p = el("p");
  p.appendChild(document.createTextNode("Cheapest: "));
  p.appendChild(el("strong", { text: c.min_plan_id }));
  p.appendChild(document.createTextNode(". Most expensive: "));
  p.appendChild(el("strong", { text: c.max_plan_id }));
  p.appendChild(document.createTextNode(`. Range: $${c.range_usd.toFixed(4)}.`));
  nodes.push(p);

  nodes.push(
    buildTable(
      ["Plan", "Total expected USD"],
      c.plan_ids.map((pid, i) => [pid, `$${c.per_plan_total_usd[i].toFixed(4)}`]),
    ),
  );

  nodes.push(el("h4", { text: "Stage × plan heatmap (USD)" }));
  const heat = el("table");
  const thead = el("thead");
  const trH = el("tr");
  trH.appendChild(el("th", { text: "Stage", attrs: { scope: "col" } }));
  for (const pid of c.heatmap.plan_ids) trH.appendChild(el("th", { text: pid, attrs: { scope: "col" } }));
  thead.appendChild(trH);
  heat.appendChild(thead);
  const tbody = el("tbody");
  // matrix_usd cells are `number | null`; null means "stage absent from this
  // plan" (comparePlans encodes that deliberately). A null cell must render as
  // "—", not crash on null.toFixed — which is exactly what happens when comparing
  // plans with different stage sets, the heatmap's core use case.
  const nums = c.heatmap.matrix_usd.flat().filter((x): x is number => x !== null);
  const maxVal = Math.max(0, ...nums);
  for (let i = 0; i < c.heatmap.stage_ids.length; i++) {
    const tr = el("tr");
    tr.appendChild(el("th", { text: c.heatmap.stage_ids[i], attrs: { scope: "row" } }));
    for (const v of c.heatmap.matrix_usd[i]) {
      const intensity = v !== null && maxVal > 0 ? v / maxVal : 0;
      const td = el("td", { text: v === null ? "—" : `$${v.toFixed(4)}` });
      td.style.background = `rgba(29,78,216,${intensity.toFixed(2)})`;
      if (intensity > 0.5) td.style.color = "#fff";
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  heat.appendChild(tbody);
  nodes.push(heat);

  mount("compare-results", ...nodes);
}

function renderVariance(v: VarianceReport) {
  const nodes: Node[] = [];
  nodes.push(el("h3", { text: `Variance — ${v.plan_id} / run ${v.run_id}` }));
  const ul = el("ul");
  ul.appendChild(el("li", { text: `Estimated: $${v.total_estimated_usd.toFixed(4)}` }));
  ul.appendChild(el("li", { text: `Actual: $${v.total_actual_usd.toFixed(4)}` }));
  ul.appendChild(el("li", { text: `Variance: $${v.total_variance_usd.toFixed(4)} (${v.total_variance_pct.toFixed(2)}%)` }));
  ul.appendChild(el("li", { text: `Absolute percentage error: ${v.absolute_percentage_error.toFixed(2)}%` }));
  nodes.push(ul);
  nodes.push(
    buildTable(
      ["Stage", "Estimated", "Actual", "Δ USD", "Δ %", "Attribution"],
      v.per_stage.map((s) => [
        s.stage_id,
        `$${s.estimated_usd.toFixed(4)}`,
        `$${s.actual_usd.toFixed(4)}`,
        `$${s.variance_usd.toFixed(4)}`,
        `${s.variance_pct.toFixed(2)}%`,
        s.attribution.join("; ") || "—",
      ]),
    ),
  );
  mount("variance-results", ...nodes);
}

function showError(id: string, message: string) {
  byId<HTMLElement>(id).textContent = message;
}
function clearError(id: string) {
  byId<HTMLElement>(id).textContent = "";
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function attachHandlers() {
  byId<HTMLButtonElement>("btn-load-sample").addEventListener("click", () => {
    byId<HTMLTextAreaElement>("plan-input").value = SAMPLE_PLAN;
  });

  byId<HTMLButtonElement>("btn-estimate").addEventListener("click", () => {
    clearError("estimate-errors");
    const raw = byId<HTMLTextAreaElement>("plan-input").value;
    const parsed = parsePlan(raw);
    if (!parsed.ok) {
      showError("estimate-errors", `Parse error: ${parsed.error.message}`);
      return;
    }
    try {
      const e = estimatePlan(parsed.value, { pricingDb: pricing });
      lastEstimate = e;
      renderEstimate(e);
    } catch (err) {
      showError("estimate-errors", (err as Error).message);
    }
  });

  byId<HTMLButtonElement>("btn-export-json").addEventListener("click", () => {
    if (!lastEstimate) return showError("estimate-errors", "Run Estimate first.");
    download(`${lastEstimate.plan_id}-estimate.json`, toJSON(lastEstimate), "application/json");
  });
  byId<HTMLButtonElement>("btn-export-csv").addEventListener("click", () => {
    if (!lastEstimate) return showError("estimate-errors", "Run Estimate first.");
    download(`${lastEstimate.plan_id}-estimate.csv`, toCSV(lastEstimate), "text/csv");
  });
  byId<HTMLButtonElement>("btn-export-md").addEventListener("click", () => {
    if (!lastEstimate) return showError("estimate-errors", "Run Estimate first.");
    download(`${lastEstimate.plan_id}-estimate.md`, toMarkdown(lastEstimate), "text/markdown");
  });

  byId<HTMLButtonElement>("btn-compare").addEventListener("click", () => {
    clearError("compare-errors");
    const raw = byId<HTMLTextAreaElement>("plans-input").value;
    const parsed = parsePlans(raw);
    // parsePlans returns { successes: Plan[]; failures: [...] } — NOT a Result.
    // The old code read parsed.ok/.value/.error (all undefined), so `!parsed.ok`
    // was always true and Compare short-circuited to "Parse error: undefined" for
    // every input. It shipped because the web package had no typecheck step.
    if (parsed.successes.length < 2) {
      const firstFailure = parsed.failures[0]?.error?.message;
      showError(
        "compare-errors",
        firstFailure
          ? `Parse error: ${firstFailure}`
          : "Need at least 2 valid plans to compare.",
      );
      return;
    }
    try {
      const c = comparePlans(parsed.successes, { pricingDb: pricing });
      lastComparison = c;
      renderComparison(c);
    } catch (err) {
      showError("compare-errors", (err as Error).message);
    }
  });

  byId<HTMLButtonElement>("btn-compare-export-md").addEventListener("click", () => {
    if (!lastComparison) return showError("compare-errors", "Run Compare first.");
    download("comparison.md", toMarkdown(lastComparison), "text/markdown");
  });

  byId<HTMLButtonElement>("btn-variance").addEventListener("click", () => {
    clearError("variance-errors");
    const p = parsePlan(byId<HTMLTextAreaElement>("variance-plan-input").value);
    if (!p.ok) return showError("variance-errors", `Plan parse error: ${p.error.message}`);
    const l = parseLog(byId<HTMLTextAreaElement>("variance-log-input").value);
    if (!l.ok) return showError("variance-errors", `Log parse error: ${l.error.message}`);
    try {
      const v = analyzeVariance(p.value, l.value, { pricingDb: pricing });
      renderVariance(v);
    } catch (err) {
      showError("variance-errors", (err as Error).message);
    }
  });
}

function init() {
  void loadPricing;
  renderPricingStatus();
  attachHandlers();
}

init();
