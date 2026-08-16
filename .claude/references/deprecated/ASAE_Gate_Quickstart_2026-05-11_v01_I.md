# ASAE Gate Quickstart
**File:** `ASAE_Gate_Quickstart_2026-05-11_v01_I.md`
**Classification:** INTERNAL ONLY
**Version:** v01
**Authored by:** Clauda the Spec Genius v01 (Claude Sonnet 4.6)

---

## 1. What Is an ASAE Gate?

An ASAE (AI Self Audit Edit) gate is the mandatory audit artifact that backs every commit in Martinez Methods repos. The gate document is a Markdown file at `deprecated/asae-logs/gate-NN-<descriptor>-YYYY-MM-DD.md` containing YAML frontmatter and N consecutive identical-scope pass blocks. The commit-msg hook validates the gate at commit time — a commit without a valid gate is refused.

---

## 2. YAML Frontmatter — Required Fields

All fields below are required for gates dated **2026-04-26 or later** (the v05 forward-only gate). Fields marked *(v07+)* apply only to gates dated 2026-04-27 or later.

| Field | Type | Valid values / format | What the hook checks |
|-------|------|-----------------------|----------------------|
| `gate_id` | string | `gate-NN-<descriptor>-YYYY-MM-DD` | Non-empty; YYYY-MM-DD extracted for version-tier gating; uniqueness within `deprecated/asae-logs/` |
| `target` | string | Human-readable description of what was reviewed | Non-empty |
| `asae_certainty_threshold` | string | `strict-3`, `strict-5`, `standard-2` | Non-empty |
| `sources` | list | One item per input artifact read | Count is used for `inputs_processed` parity check |
| `domain` | string | `document`, `code`, `mixed` | Informational; drives IS_CODE_COMMIT |
| `invoking_model` | string | Model name + persona, e.g. `opus-4-7 (Clauda the Value Genius v02)` | Not hook-checked; required by methodology |
| `session_chain` | block | List of `{kind, path, relation}` entries | At least one `path:` must resolve to an existing file |
| `persona_role_manifest` | block | `{path, loaded_at_gate_authoring, scope_bounds_satisfied}` | `path:` must resolve under a known root; file must exist |
| `inputs_processed` | block | One `{source, processed, extracted, influenced}` entry per `sources:` item | Count parity with `sources:` |
| `disclosures` | block | See schema below | Must contain `none: true` OR at least one non-empty sub-block |
| `Applied from` | string / section | Incident, prior SHA, or session-dated event | Non-empty; also accepted as `Sources:` or `Origin:` |
| `step_re_execution` | block | `[]` or list of re-execution events | If non-empty, commit body must include `Step-Re-Execution:` trailer |
| `drr_sub_shape` *(v07+)* | string | `disclosure_inline_remediation` or omitted | If `disclosure_inline_remediation`, commit must stage ONLY audit-log files |

### `disclosures:` schema

```yaml
disclosures:
  known_issues:
    - issue: <description>
      severity: CRITICAL | HIGH | MEDIUM | LOW
      mitigation: <or "deferred to gate-NN">
  deviations_from_canonical: []
  omissions_with_reason:
    - omitted: <what was left out>
      reason: <why>
      defer_to: <gate or batch>
  partial_completions: []
  none: false   # set to true when all sub-blocks are empty
```

**Nothing to disclose:** set all lists to `[]` and `none: true`.

### `session_chain:` schema

```yaml
session_chain:
  - kind: gate | session_handoff | external
    path: <relative or absolute path to existing file>
    relation: <how this gate continues from that file>
```

### `persona_role_manifest:` schema

```yaml
persona_role_manifest:
  path: _grand_repo/role-manifests/<persona-slug>.yaml
  loaded_at_gate_authoring: yes
  scope_bounds_satisfied: yes
```

### `inputs_processed:` schema

```yaml
inputs_processed:
  - source: <must match a sources: entry>
    processed: yes
    extracted: <what was extracted>
    influenced: <how it influenced the output>
  # OR if not processed:
  - source: <path>
    processed: no
    reason: <why not>
```

---

## 3. Filling Each Field — Practical Guidance

**`gate_id`** — Pick the next unused integer from `deprecated/asae-logs/`. Gate numbers must be unique within the directory. Date must be the authoring date in `YYYY-MM-DD` format (used by the hook for v05/v07 tier gating).

**`asae_certainty_threshold`** — Read the repo's `.asae-policy`. If `going-public: true` or `visibility: public`, use `strict-3` minimum (or `strict-5` for canonical SSOT repos). If `going-public: false`, use `standard-2`. Match the trailer exactly.

**`sources`** — List every artifact you read before authoring. Each item must have a corresponding entry in `inputs_processed`. Over-listing is safe; under-listing causes parity failure.

**`session_chain`** — Reference the handoff doc, prior gate, or session export that this gate continues from. The `path:` value is resolved across four roots: REPO_ROOT, parent dir, `~/_grand_repo`, `~/repos`. Use repo-relative paths starting with `_grand_repo/` or absolute.

**`persona_role_manifest`** — Use the exact path of the persona's YAML file under `_grand_repo/role-manifests/` or the canonical equivalent. The file must exist on disk at commit time.

**`disclosures`** — This is not optional. If you have nothing to disclose, write `none: true` and empty lists. Rater will verify honesty.

**`Applied from`** — One or more bullet points naming the incident, prior gate, handoff doc, or directive that authorized this gate. It can appear as a YAML field in frontmatter or as a section heading `## Applied from` in the body.

---

## 4. Hook Validation — The 15 Rules

The hook runs rules in order. First failure exits 1 and prints the rule that failed. All rules are REFUSE-grade unless marked ADVISORY.

| # | Rule | Tier | What it checks |
|---|------|------|----------------|
| R1 | Persona attribution | Always | `Co-Authored-By:` must use `Clauda` or `Claudette`, never `Claude` in the persona position |
| R2 | Trailer presence | Always | Must have `ASAE-Gate: <sev>-<N>-PASS` or `D2R-Stage: <stage>-PASS`; sev and N must meet policy |
| R3 T1 | Backing file exists | Tier 1 | File at `deprecated/asae-logs/gate-NN-*.md` must be staged or already in repo |
| R3 T1 | Frontmatter fields | Tier 1 | `gate_id`, `target`, `asae_certainty_threshold` must be non-empty |
| R3 T1 | Pass count | Tier 1 | Number of `## Pass N` blocks >= threshold from trailer |
| R3 T1b | Pass block content | Tier 1b | Each Pass block must contain "Issues found at" + full-audit marker phrase |
| R3 T1c | Rater section | Tier 1c | `## Independent Rater Verification` section with non-placeholder `Rater verdict: CONFIRMED\|PARTIAL\|FLAG` |
| R3 T1c-ext | Disclosures block | Tier 1c-ext | `disclosures:` with `none: true` or at least one non-empty sub-block |
| R3 T1c-ext | Step re-execution | Tier 1c-ext | If `step_re_execution:` is non-empty, commit body needs `Step-Re-Execution:` trailer |
| R4 T2 | Exit codes (code commits) | Tier 2 | `EXIT_TEST=0` and `EXIT_BUILD/TYPECHECK/LINT=0` literals in gate doc |
| R5 T3 | Cross-shell (platform paths) | Tier 3 | Git Bash + PowerShell observations both present if staged content touches platform-conditional code |
| R6 T4 | Gate ID uniqueness | Tier 4 | No other file in `deprecated/asae-logs/` matches same `gate-NN-` prefix |
| R6 T4 | Applied from | Tier 4 | `Applied from:`, `Sources:`, or `Origin:` lineage present |
| R6 T4-ext | Session chain | Tier 4-ext | `session_chain:` block with at least one resolvable `path:` |
| R7 T5 | Role manifest | Tier 5 | `persona_role_manifest:` with `path:` resolving to an existing file |
| R8 T6 | Inputs processed | Tier 6 | `inputs_processed:` entry count >= `sources:` entry count |
| R9 T14 | Recovery events (if present) | Tier 14 | Schema: 6 required fields, enum values for `violation_type` and `detected_by`, valid `revert_target`, boolean `recovery_pass` |
| R10 T15 *(v07+)* | Compliance claims | Tier 15 | `disclosures.compliance_claims:` present when staged diff touches README/SECURITY/marketing/landing |
| R11 T16 *(v07+)* | Shipping attestation | Tier 16 | `disclosures.shipping_attestation:` present when staged diff touches LAUNCH/READINESS/RELEASE/v-tag docs |
| R12 T17 *(v07+)* | Coverage scope | Tier 17 | `disclosures.coverage_mutation_scope:` present when user-facing copy mentions coverage% or mutation score |
| R13 T18 *(v07+)* | Stub detection | Tier 18 ADVISORY | Named-pattern functions without loud-crash markers flagged (not refused) |
| R14 T19 *(v07+)* | Stack rule pack | Tier 19 ADVISORY | Rule pack doc at `_grand_repo/docs/sandbox-rules-{stack}.md` expected when stack detected |
| R15 T20 *(v07+)* | Monorepo typecheck CI | Tier 20 ADVISORY | `tsc --noEmit` or `svelte-check` in CI config when monorepo workspace detected |
| R16 T29 *(v07+)* | DRR inline remediation | Tier 29 | If `drr_sub_shape: disclosure_inline_remediation`, commit must stage ONLY audit-log files |

### Common failure modes and fixes

| Hook error | Likely cause | Fix |
|------------|--------------|-----|
| Rule 1: persona | `Co-Authored-By: Claude ...` | Change persona to `Clauda` or `Claudette` |
| Rule 2: trailer missing | No `ASAE-Gate:` line in commit body | Add `ASAE-Gate: strict-3-PASS` trailer |
| Rule 2: threshold too low | `standard-2-PASS` on a going-public repo | Use `strict-3-PASS` |
| Rule 3: file not found | Gate doc not staged or wrong path | Stage the file at `deprecated/asae-logs/gate-NN-*.md` |
| Rule 3: Pass count | 2 blocks but trailer claims 3 | Add the missing Pass block |
| Rule 3 T1b: severity missing | Pass block has no "Issues found at" line | Add `**Issues found at CRITICAL: 0 / HIGH: 0 ...**` |
| Rule 3 T1b: full-audit missing | Pass block lacks "Full audit", "Full checklist evaluation", etc. | Add the required marker phrase |
| Rule 3 T1c: rater missing | No `## Independent Rater Verification` section | Spawn a subagent, record real output |
| Rule 3 T1c: placeholder | Section contains `[TO BE FILLED IN]` | Complete the actual rater spawn |
| Rule 3 T1c-ext: disclosures | No `disclosures:` block | Add block with `none: true` or enumerated items |
| Rule 6: ID collision | Two files with same `gate-NN-` prefix | Rename the new file to next unused number |
| Rule 6: session_chain unresolved | Path doesn't exist | Use repo-relative path; verify file is on disk |
| Rule 7: manifest not found | Wrong path to role-manifest YAML | Check exact filename under `_grand_repo/role-manifests/` |
| Rule 8: inputs parity | Fewer `inputs_processed` entries than `sources` | Add missing entries |

---

## 5. Threshold Tiers

Derived from `.asae-policy` at commit time.

| Tier | When it applies | Minimum passes | Rater required |
|------|----------------|----------------|----------------|
| `strict-5` | Canonical SSOT repos; audit_threshold: strict-5 | 5 | Yes, CONFIRMED by both raters |
| `strict-3` | Repos with `going-public: true` or `visibility: public` | 3 | Yes, CONFIRMED or PARTIAL-corrected |
| `standard-2` | Repos with `going-public: false`, stable-private | 2 | Yes (Step 6 is unconditional) |

**This repo (\_grand\_repo):** `.asae-policy` has `going-public: true`, so **strict-3 is the floor**.

The trailer must match or exceed the policy threshold: `ASAE-Gate: strict-3-PASS` passes a strict-3 policy; `standard-2-PASS` does not.

---

## 6. Independent Rater — How It Works

The Independent Rater Verification section is required on every gate, regardless of severity policy (per `/asae` Step 6).

**Procedure:**
1. Complete all Pass blocks (primary audit).
2. Write a self-contained brief: what artifacts were reviewed, what checklist was applied, what the primary verdict was.
3. Spawn a real subagent (Agent tool, general-purpose type) with the brief and NO shared context.
4. Wait for the actual response.
5. Record the response in the gate doc under `## Independent Rater Verification`.
6. Verdict must be `CONFIRMED`, `PARTIAL`, or `FLAG` — no placeholder text.

**Anti-fabrication rule:** faking the rater verdict is fabrication (F1 failure mode) and reproduces the exact failure the rater step closes. The hook detects placeholder text and refuses. It does not detect self-authored rater content — the methodology layer prohibition is the primary defense.

**PARTIAL verdict:** acceptable when findings are LOW severity and corrected inline. Document the correction and record "PARTIAL → corrected inline → effectively CONFIRMED". The hook accepts any non-placeholder verdict.

**Required section structure:**

```markdown
## Independent Rater Verification

**Subagent type used:** general-purpose

**Brief delivered to rater (verbatim summary):**
- <the brief>

**Rater verdict:** CONFIRMED

**Rater per-item findings:**
<actual findings from the subagent>

**Rater honest gaps:**
<gaps the subagent identified>

**Rater agentId:** <agentId returned by Agent tool>
```

---

## 7. Complete Example Gate Document

This is a minimal passing gate for a documentation commit in a going-public repo (strict-3 required).

```markdown
---
gate_id: gate-99-example-doc-update-2026-05-11
target: Example documentation file at docs/example.md
sources:
  - docs/example.md (the file being updated)
  - deprecated/asae-logs/gate-98-prior-gate-2026-05-10.md (predecessor)
domain: document
asae_certainty_threshold: strict-3
severity_policy: strict
invoking_model: sonnet-4-6 (Clauda the Value Genius v02)
round: 2026-05-11 example update
session_chain:
  - kind: gate
    path: _grand_repo/deprecated/asae-logs/gate-98-prior-gate-2026-05-10.md
    relation: Predecessor gate; this gate continues from gate-98.
disclosures:
  known_issues: []
  deviations_from_canonical: []
  omissions_with_reason: []
  partial_completions: []
  none: true
inputs_processed:
  - source: docs/example.md (the file being updated)
    processed: yes
    extracted: Current content; structural issues; version field
    influenced: Determined scope of 3-item audit checklist
  - source: deprecated/asae-logs/gate-98-prior-gate-2026-05-10.md
    processed: yes
    extracted: Prior gate checklist precedent; rater agentId pattern
    influenced: Checklist item 3 (lineage consistency with gate-98)
step_re_execution: []
persona_role_manifest:
  path: _grand_repo/role-manifests/clauda-the-value-genius.yaml
  loaded_at_gate_authoring: yes
  scope_bounds_satisfied: yes
Applied from:
  - 2026-05-11 Krystal directive to update docs/example.md
  - gate-98 predecessor authorization
---

# ASAE Gate 99 — Example Doc Update

## Audit Scope (Defined ONCE, evaluated identically across all passes)

3 items evaluated in the same order every pass:

1. Content accuracy — claims in docs/example.md are verifiable
2. IP language discipline — no stahl/self-audit-edit/PUMS pattern
3. Lineage consistency — references to gate-98 are accurate

Severity policy: strict. Threshold: 3 consecutive clean passes.

## Pass 1 — Full checklist evaluation, identical scope

| # | Item | Result |
|---|------|--------|
| 1 | Content accuracy | PASS — all claims verified |
| 2 | IP discipline | PASS — grep returns 0 hits |
| 3 | Lineage consistency | PASS — gate-98 path resolves |

Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0

Counter state: 1 / 3

## Pass 2 — Full checklist re-evaluation (identical to Pass 1)

| # | Item | Result |
|---|------|--------|
| 1 | Content accuracy | PASS — second independent verification |
| 2 | IP discipline | PASS — second independent grep |
| 3 | Lineage consistency | PASS — second independent verification |

Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0

Counter state: 2 / 3

## Pass 3 — Full checklist re-evaluation (identical to Pass 1 and Pass 2)

| # | Item | Result |
|---|------|--------|
| 1 | Content accuracy | PASS — third independent verification |
| 2 | IP discipline | PASS — third independent grep |
| 3 | Lineage consistency | PASS — third independent verification |

Issues found at CRITICAL: 0 / HIGH: 0 / MEDIUM (strict): 0 / LOW: 0

Counter state: 3 / 3

## Convergence verdict (primary auditor)

3 consecutive identical-scope clean passes at strict severity.

**Primary auditor verdict: PASS-PENDING-RATER**

## Independent Rater Verification

**Subagent type used:** general-purpose

**Brief delivered to rater (verbatim summary):**
- Verify gate-99 covering docs/example.md update; 3-item checklist
  (content accuracy, IP discipline, lineage to gate-98); all 3 passes
  returned clean; confirm or flag findings independently.

**Rater verdict:** CONFIRMED

**Rater per-item findings:**
- Item 1: Content accuracy confirmed; no unverifiable claims.
- Item 2: IP discipline confirmed; grep clean.
- Item 3: Lineage confirmed; gate-98 path exists and matches.

**Rater honest gaps:**
- Did not independently execute grep; relied on auditor's reported results.

**Rater agentId:** <agentId from Agent tool response>

## Final convergence verdict

**Gate-99 status: PASS** at strict-3, rater CONFIRMED.
```

**Commit message format:**

```
gate-99: Example doc update

ASAE-Gate: strict-3-PASS
Co-Authored-By: Clauda the Value Genius v02 (Sonnet 4.6) <noreply@anthropic.com>
```

---

*ASAE_Gate_Quickstart_2026-05-11_v01_I.md — authored 2026-05-11 by Clauda the Spec Genius v01 (Claude Sonnet 4.6). Internal only. Do not publish outside Martinez Methods without Pre-Publication IP Scrub.*
