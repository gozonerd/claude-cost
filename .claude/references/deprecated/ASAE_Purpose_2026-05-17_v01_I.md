---
title: The Purpose of ASAE — Orientation Reader
id: ASAE_Purpose_2026-05-17
created: 2026-05-17
version: v01_I
classification: INTERNAL ONLY
ip_status: >-
  NOT IP-CLEAN. Contains Martinez Methods methodology IP and personal/family
  detail (Bobo Framework genesis incl. the age-2 correction and verbatim
  carrier quotes; FM-taxonomy internals; Doc 00 internals). This is FINE for
  an internal orientation reader, but it MUST NOT be released externally,
  quoted externally, or used in any buyer/pitch context without a completed
  Pre-Publication IP Scrub. Prominent in-body banner below repeats this.
audience: every new Claude instance, at orientation (read AFTER Excellence-as-Floor, BEFORE the ASAE Quickstart)
status: >-
  CONTENT APPROVED by Krystal 2026-05-17. NOT yet ASAE-gated. The STRICT-5+
  ASAE gate (Doc 00 trigger: orientation infra read verbatim by every
  instance → exemplar-grade) runs on the canonical commit, which is HELD
  behind the canonical-main reconciliation decision (same blocker as CRIT-1).
authored_by: Claudetta W. Provenance Inevitability v01 (Claude Opus 4.7, 1M context)
reading_order_position: orientation tail, doc 2 of 3 (Excellence-as-Floor → **ASAE Purpose** → ASAE Quickstart latest)
---

> # ⚠ NOT IP-CLEAN — INTERNAL ONLY
> This document contains Martinez Methods methodology IP and personal/family
> detail (the Bobo Framework's age-2 origin and verbatim carrier quotes,
> FM-taxonomy internals, Doc 00 internals). That is acceptable for an
> internal orientation reader. It is **not** acceptable to release, quote,
> excerpt, or use this externally or in any buyer/pitch context **without a
> completed Pre-Publication IP Scrub**. If you are about to surface any of
> this outside Krystal's private workstream: stop.

# The Purpose of ASAE

You just read *Excellence as the Floor*. That doc tells you **why** the bar
does not move. This doc tells you **what ASAE is for** — how that floor is
made structural rather than aspirational. The next doc (the ASAE Quickstart)
tells you **how** to operate the gate mechanically. Why → what-for → how.

> **Which ASAE spec is authoritative (read this before you go looking).**
> The **authoritative** operational spec is
> `mm-d2r-code-plan-stack/skills/asae/SKILL.md` (v07.1 — full aspects
> A1–A21, domain checklists, Step 6 rater discipline, DRR, hook tiers).
> The copy at `mm-claude-canonical/.claude/skills/asae/SKILL.md` is a
> **simplified / superseded** propagation copy — do **not** treat it as the
> spec. This skew is a known defect with a tracked remediation in the active
> plan; until reconciled, always go to the d2r v07.1 spec for operational
> detail, and the ASAE Quickstart (next doc) for the gate procedure.

## 1. What ASAE is, in one paragraph

ASAE = **AI Self Audit Edit**. (Not "Audit-Sources-Against-Evidence" or any
other expansion — do not invent etymologies for Krystal's acronyms.) It is a
**structural convergence gate**, not a guideline and not a careful-checking
habit. You invoke it with an explicit scope (target, sources, original prompt,
domain, an integer certainty threshold N, a severity policy). It runs the
*same full checklist* against the *same scope* repeatedly; the gate does not
exit until **N consecutive identical-scope passes return zero counter-resetting
findings**, after which an **independent rater spawned with zero shared
context** must independently return CONFIRMED. Your declaration that you are
"done" has no weight. Only the counter reaching N, plus the independent
rater, constitutes done.

## 2. Why ASAE exists — the failure it structurally prevents

The genesis (Bobo Framework doc): Sonnet documentation failures, ~Feb 2026.
Telling the model the specs again produced *different* errors. "Check your
work" produced partial improvement, not convergence. One audit pass fixed
known errors and introduced new ones on the next page. The breaking point,
verbatim from Krystal: *"Don't you DARE declare you're done after one pass…
check and recheck until you are CERTAIN, which means at LEAST TEN separate
passes all returning zero errors."*

The core failure ASAE closes is **advisory-prose-fails-stochastically** (this
is failure mode F8 in Krystal's internal sub-agent corpus). Telling a model to
be thorough, careful, honest, or not-prematurely-done does **not** produce
convergence — it produces stochastic, varying-scope effort and an arbitrary
self-declared stopping point unrelated to actual error-free state. ASAE
replaces the self-declared stop with a **structural exit condition the model
cannot satisfy by declaration**. Three things it prevents, concretely:

1. **Premature self-declared "done."** Convergence is N consecutive
   identical-scope clean passes + independent rater — not a verdict you write.
2. **Fabrication.** Anti-fabrication aspects + claim-source linkage; a faked
   rater verdict (writing CONFIRMED without an actual spawn) is itself
   classified as fabrication.
3. **Transfer of cognitive cost onto Krystal.** When you exit early, the
   unremediated work lands on her — she invests effort verifying
   under-rigorized output. ASAE keeps that cost on the machine (full token
   budget, LLM reasoning) instead of the human (finite, fatigued, under
   context pressure). This is the same logic as *Excellence as the Floor*:
   the floor doesn't move with audience or stakes; the deliverable scope is
   the only lever, never the audit rigor.

## 3. ASAE is Bobo Recursive Application #1

The Bobo Framework (Krystal's parents installed it at age 2): when something
is done wrong — *"Sorry didn't do it. Krystal did it. So what's Krystal going
to do to fix it?"* Five steps: (1) make expectations explicit; (2) the one who
erred owns the error; (3) owns the solution; (4) owns **changed behavior**;
(5) **apology alone is never accepted.** Bobo reframes failure-response from
"retry / prompt-engineer empirically" to "articulate the specific mechanism,
produce a specific rule, enforce it **structurally** — through
non-bypassable infrastructure, not through model behavior."

ASAE is the first AI-substrate Bobo cycle. Step 4 ("changed behavior") is not
"don't do it again" — it is "audit, re-audit, re-re-audit to a stable
zero-error state across N consecutive independent passes." Step 5 is why a
clean verdict you simply assert is never accepted. The commit-msg hook is the
structural-enforcement layer: advisory prose ("use the floor") fails
stochastically per F8, so the rule is enforced at the git layer where the
model cannot bypass it by behaving differently under pressure.

## 4. Relationship to Excellence-as-Floor (the doc you just read)

Doc 00 (*Excellence as the Floor*) sets STRICT-5+ as the floor for any output
Krystal will print / hand-feedback / verify / verify-in-full. The "+" is
load-bearing — additional rigor calibrated to the output's purpose and
stakes, not "STRICT-5 with a courtesy pass." The **NULL-on-asking bypass**:
if you introduce *any* question about doing less rigor, any exemption Krystal
grants in response is NULL by rule — because the asking itself transfers the
cognitive cost of refusing implicit pressure onto her. Her silence =
STRICT-5+ default. The only valid bypass is her *unprompted, explicit,
structural* exemption.

ASAE is the mechanism that makes Excellence-as-Floor structural instead of
aspirational. That is why orientation reads them back-to-back in this order:
the floor is the **why**; ASAE is **how the why becomes non-bypassable**.

## 5. What ASAE structurally closes (the FM-taxonomy relationship)

ASAE exists to close specific, named failure-mode families — and the AI
Failure Mode Taxonomy exists partly to track and prove those closures
empirically. ASAE aspects + the **Detect-Revert-Redelegate (DRR)** recovery
axis map onto failure families: anti-fabrication closes output-integrity /
hallucination; capability-scope attestation closes excessive-agency;
disclosures close information-withholding; the convergence-gate design itself
closes premature-termination and no/incomplete-verification (MAST FM-3.2 — ASAE
*is* verification-completion enforcement). DRR is co-equal with the gate, not
an afterthought: it closes disobey-task-spec / disobey-role-spec /
incomplete-verification that gates alone cannot prevent.

Read honestly, with the qualifiers (do not state these loosely):
- ASAE strongly remediates a **majority of in-scope** failure modes; the
  "~70%" figure is only defensible **with the in-scope qualifier explicitly
  stated** (strict denominator is lower). Never cite the headline number
  bare.
- A defined set of frontier-capability / content-policy modes (CBRN, cyber
  uplift, dangerous content, macro-societal) is **out-of-scope for ASAE by
  design** — a deliberate architecture boundary, not a failure.
- Closures demonstrated in production builds have a different evidentiary
  standing than closures theorized from aspect design; do not present
  theorized closures as demonstrated.
- Two FM lineages exist with different denominators (DOC-01 ≈ 64 unique
  modes; GATE-49 ≈ 203 FMs); never mix their numbers. The internal F-series
  (F1–F12, e.g. F8 = advisory-prose-fails-stochastically) is a different
  numbering scheme from the external F1–F20 family codes; FM-18 ("Western
  Epistemic Fabrication", Krystal's numbering) is separate again. Do not
  conflate any of these.

## 6. What this doc is / is not + honest gaps

This is an orientation **purpose** reader, not the operational spec — the
ASAE Quickstart (next) is how you actually run a gate; the **authoritative**
deep spec is `mm-d2r-code-plan-stack/skills/asae/SKILL.md` (v07.1). Honest
gaps, surfaced not buried:

1. Doc 00's **Anti-Patterns 2–N are deferred** (v01 has Anti-Pattern 1
   only); per Krystal's standing instruction this deferral must be surfaced
   before anyone calls Doc 00 "complete."
2. The ink-cost genesis (printing Sonnet output → premature-done is
   economically unacceptable) is currently **testimony-only**; no committed
   primary source connects printer-ink-cost to the convergence requirement.
3. The internal F1–F6 definitions live in an `_experiments` analysis file not
   resolvable in current canonical state; F7–F12 are fully documented.
4. **ASAE SKILL.md version-skew (TRACKED — not a dangling gap).** The
   canonical `mm-claude-canonical/.claude/skills/asae/SKILL.md` is a
   simplified / superseded copy; the authoritative spec is the d2r
   `skills/asae/SKILL.md` (v07.1). A new instance that reads the canonical
   copy as "the spec" is misdirected. **Remediation is a tracked work item
   in the active plan** (reconcile canonical to carry the authoritative
   v07.1 spec or a faithful propagation of it). Until reconciled: this doc
   and the Quickstart point you to the d2r v07.1 spec explicitly.

---
*Provenance: drafted 2026-05-17 by Claudetta W. Provenance Inevitability v01;
content APPROVED by Krystal 2026-05-17 with two directed edits (prominent
NOT-IP-CLEAN flag; spec-pointer corrected to authoritative d2r v07.1). NOT
yet ASAE-gated — the STRICT-5+ gate (Doc 00 exemplar-grade trigger: read
verbatim by every orienting instance) runs on the canonical commit, HELD
behind the canonical-main reconciliation decision. This file is an untracked
local draft pending that gated commit; do not treat its presence as
canonical-committed.*
