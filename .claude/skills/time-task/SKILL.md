---
name: time-task
description: "Use this skill to record start and end timestamps for a discrete task with both a gut estimate and a calibrated estimate (when historical data permits), so future sessions can calibrate estimates against actuals AND track whether the calibration formula is working. Triggers on '/time-task', 'time this task', 'track this task', 'estimate and track', or when the user asks for task-timing data collection. DEPRECATED 2026-07-16 (clock-running regime); its companion /calibrate-estimates was retired 2026-07-30 under gate-112 and no longer exists."
version: v02_I
supersedes: v01 (2026-04-26 — single-estimate version)
---

# time-task

## Purpose

Record discrete-task start and end timestamps with **both a gut estimate and a calibrated estimate** so the gap between estimate and actual is captured as data AND the gap between gut estimation and calibrated estimation is tracked over time. Calibration of LLM estimates is the long-term goal: data accumulates per task class so future sessions multiply their gut estimate by an empirically-derived calibration factor, and the calibrated_ratio diagnostic surfaces whether the calibration formula itself is working.

> **Its companion `/calibrate-estimates` no longer exists.** That skill was retired 2026-07-30 under
> `mm-claude-canonical` gate-112 and archived at
> `gozonerd/pre-time-task-initiative-workbench/deprecated/calibrate-estimates_SKILL_2026-05-10_v02_I_DEPRECATED.md`.
> Do not attempt to invoke it. This skill's own regime — clock-running `/time-task` — was itself
> deprecated 2026-07-16; the live regime is self-estimate-only-no-timing (v04.5.2), whose authority is
> `~/.claude/skills/self-estimation/SKILL.md`. This pointer is corrected here for removal
> completeness; retiring this skill is a separate decision and has not been made.

## What Changed in v02

v01 logged a single estimate. v02 logs both:
- **gut_estimate_minutes** — what the user/Claude initially estimates
- **calibrated_estimate_minutes** — gut × class-specific calibration factor (null if insufficient class data)

At end-mode, both **gut_ratio** and **calibrated_ratio** are computed. This makes the methodology self-evaluating: gut_ratio tracks whether your gut is improving over time; calibrated_ratio tracks whether the calibration formula is working.

**Key design decision (Option D from the design discussion):** the calibration factor is always derived from gut_ratio history, never from calibrated_ratio history. Calibrated_ratio is a diagnostic, not an input to the calibration formula. This prevents self-correcting systems from making their own diagnostics worse — a known failure mode in adaptive control systems.

## When to Use

- The user invokes `/time-task` or asks to "track this task" or "time this task"
- A task is bounded enough to have a meaningful estimate (a few minutes to a few hours; not "manage this entire session")
- Before starting non-trivial work where the estimate is genuinely uncertain (use this as a forcing function for honest pre-task estimation)

## Two Modes

### Start Mode

```
/time-task start "<task description>" est=<minutes> class=<task-class>
```

The `est=<minutes>` is the **gut estimate**. The skill computes the calibrated estimate automatically if class history permits.

Where `<task-class>` is one of:

- `skill-authoring` — writing a new SKILL.md or extending an existing one
- `substitution-edit` — find/replace style edits on files you already understand
- `new-authorship` — writing a new document, prose, or report from scratch
- `propagation` — running a script that copies / installs canonical artifacts to target repos
- `research` — searching, reading, synthesizing across many files
- `debug` — diagnosing a failing test, broken build, or unexpected behavior
- `migration` — moving content between paths / repos / branches
- `gate-attestation` — writing a gate file + spawning rater (overhead per audited commit)
- `other` — anything else (record what it actually was for taxonomy expansion later)

What the skill does:

1. Reads the current task-timing log at `_grand_repo/data/task_timing_log_<YEAR>.jsonl`. If the file doesn't exist, creates it.
2. Generates a UUID `task_id`.
3. Captures the current UTC timestamp.
4. **Computes the calibration factor for the task class:**
   - Filters the log to completed entries with matching `task_class` and non-null `gut_ratio` (entries from v01 will have `ratio` not `gut_ratio` — read `ratio` for those entries; treat as gut_ratio for backward compatibility).
   - If `n < 5`, calibration factor is null. Calibrated estimate is null. Skill reports "Insufficient calibration data for class X (n=K). Logging gut estimate only."
   - If `n >= 5`, calibration factor = median(gut_ratio) for the class. Calibrated estimate = gut_estimate × calibration_factor (rounded to nearest minute, minimum 1).
5. Appends a JSONL line:
```json
{
  "task_id": "...",
  "ts_start": "...",
  "task_class": "...",
  "description": "...",
  "gut_estimate_minutes": N,
  "calibrated_estimate_minutes": M_or_null,
  "calibration_factor_used": F_or_null,
  "calibration_factor_n": K_or_null,
  "model": "<current model>",
  "session_id": "<current session>",
  "status": "started"
}
```
6. Returns to user:
   - If calibrated: "Gut: 30 min. Calibrated (class research, n=21, factor 0.44): 13 min. Logging both. task_id: <uuid>"
   - If not calibrated: "Gut: 30 min. No calibration data for class X yet (n=2 < 5 threshold). Logging gut only. task_id: <uuid>"

### End Mode

```
/time-task end <task_id> "<outcome summary>" [scope_creep=true|false] [actual_class=<override-class>]
```

What the skill does:

1. Finds the matching `task_id` in the log.
2. Captures the current UTC timestamp.
3. Computes `actual_minutes` = (ts_end - ts_start) in minutes, rounded to 1 decimal.
4. Computes `gut_ratio` = actual_minutes / gut_estimate_minutes.
5. Computes `calibrated_ratio` = actual_minutes / calibrated_estimate_minutes (null if calibrated_estimate was null).
6. Appends a JSONL line:
```json
{
  "task_id": "...",
  "ts_end": "...",
  "actual_minutes": N.N,
  "gut_ratio": F,
  "calibrated_ratio": F_or_null,
  "task_class": "...",
  "outcome": "...",
  "scope_creep": true_or_false,
  "status": "completed"
}
```
7. Returns a calibration note:
   - If calibrated estimate existed: "Gut 30 / calibrated 13 / actual 18.2. Gut-ratio 0.61 (over-estimated by 39%); calibrated-ratio 1.40 (calibrated under-estimated by 40%). Class research running median: previously read via /calibrate-estimates, retired 2026-07-30."
   - If no calibrated estimate: "Gut 30 / actual 18.2. Gut-ratio 0.61. Class X now has n=K completed entries; needs ≥5 for calibration to activate."

## Schema

See `_grand_repo/data/task_timing_log_schema_2026-04-26_v02_I.md` for the canonical schema (will be updated to v02 to reflect new fields).

Required fields per row:

| Field | Type | Notes |
|---|---|---|
| `task_id` | UUID string | Generated at start |
| `ts_start` | ISO 8601 UTC | Start timestamp |
| `ts_end` | ISO 8601 UTC | End timestamp (only on completion) |
| `task_class` | enum string | See list above |
| `description` | string | Free-form, ≤200 chars |
| `gut_estimate_minutes` | integer | Pre-task gut estimate |
| `calibrated_estimate_minutes` | integer or null | Computed at start; null if insufficient class history |
| `calibration_factor_used` | float or null | The class median gut_ratio used; null if no calibration |
| `calibration_factor_n` | integer or null | n of completed class entries used for the factor |
| `actual_minutes` | float | Post-task actual (only on completion) |
| `gut_ratio` | float | actual_minutes / gut_estimate_minutes |
| `calibrated_ratio` | float or null | actual_minutes / calibrated_estimate_minutes |
| `model` | string | e.g., "opus-4.7" |
| `session_id` | string | If known, the Claude Code session id |
| `status` | enum | "started" or "completed" |
| `outcome` | string | Free-form, ≤200 chars (only on completion) |
| `scope_creep` | boolean | Optional, on completion |

## Backward Compatibility

v01 entries have `estimate_minutes` and `ratio` (no gut/calibrated split). The retired /calibrate-estimates skill read these as gut_estimate_minutes and gut_ratio for backward compatibility (past tense: that skill no longer exists — see the note above). New entries written by v02 use the new field names. Mixed-version data is supported.

## Anti-patterns

- **Don't manually override the calibrated estimate.** The point is to discover whether the calibration formula works. Manually correcting the calibrated estimate at start-mode contaminates the calibrated_ratio data.
- **Don't apply calibration to "other" class.** Tasks logged as `other` are tasks the taxonomy doesn't capture; their calibration factors aren't trustworthy. The skill should refuse to compute calibrated estimates for `other` regardless of n.
- **Don't suppress calibration on the basis of "this task feels different."** If the task feels structurally different from the class median, that's data — let it log, see what the calibrated_ratio is, and let the diagnostic surface whether the class needs splitting.
- **Don't game the gut estimate.** If you adjust your gut estimate based on what you think the calibration will produce, the gut_ratio data becomes meaningless. The gut estimate is your honest pre-task gut. The calibration is automatic on top of it.

## Implementation

This skill is procedural — invoking Claude reads the JSONL file with Bash/Read tools, computes the class median with jq or python, formats output, appends new line. No separate executable.

Recommended bash for class median (gut_ratio for v02; ratio for v01 entries):

```bash
LOG="C:/Users/NerdyKrystal/_grand_repo/data/task_timing_log_$(date -u +%Y).jsonl"
CLASS="research"
jq -s --arg cls "$CLASS" '
  map(select(.status == "completed" and .task_class == $cls and (.gut_ratio // .ratio) != null))
  | (.gut_ratio // .ratio) as $ratios
  | (sort_by(.gut_ratio // .ratio) | .[length/2 | floor].gut_ratio // .ratio)
' "$LOG"
```

(jq syntax may need adjustment; the canonical implementation should use python for clarity if jq logic gets complex.)

## Provenance

- Authored 2026-05-10 by Claude Opus 4.7 (critical-eye configuration) per Krystal Martinez's direction.
- Supersedes v01 (Claudette the PEK Remediator, 2026-04-26).
- v02 closes the calibration loop that v01 measurement infrastructure made possible.
- Reads from `data/task_timing_log_<YEAR>.jsonl`.
