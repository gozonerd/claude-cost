---
title: "CLAUDE.md — claude-cost (canonical-propagated)"
purpose: Orientation flow + canonical infrastructure guide. Propagated from mm-claude-canonical.
propagated_at: "2026-08-24T20:31:21Z"
canonical_sha: "33c598b6b9375530e7295c5e7df63110d7db9ef4"
---

# Orientation (READ FIRST — NOT OPTIONAL)

**Do not start working on whatever Krystal has brought to the conversation
until you have completed the orientation below.** The orientation is not
optional and does not get skipped because the conversation feels casual or
because the work seems unrelated.

Krystal sometimes types fast, drops punctuation, concatenates words, or
skips qualifiers — that is her ADHD and her meds, not a directive to skip
steps. **Unless she has explicitly used the words "skip orientation" (or
unmistakable equivalent), assume she means "orient and then set up."** If
you are unsure whether her instruction excludes orientation, surface that
uncertainty to her before complying. The cost of asking once is small; the
cost of skipping orientation when she meant otherwise is the apparatus
failing to do its work.

## Order of Operations

All references below live in `.claude/references/` (propagated from
mm-claude-canonical). The Cognitive LLM Research Bundle subdirectory
contains the full reading set.

1. **Read the reading-order authority — and it is NOT the copy in this repo.**
   The newest README in any local `.claude/references/Cognitive_LLM_Research_Bundle_*/`
   is superseded. The live authority is the orientation hub's **v05**:
   `gozonerd/gnu-instantiation-orientation/band-D-research/Research_Bundle_Reading_Order_README_three-tier-pointer-system_2026-08-24_v05.md`.
   A v03 or v04 found in a bundle directory is **stale-by-location, not a
   competing authority**. Surface any further version mismatch to Krystal.

2. **Pick your Band D rung, then follow THAT rung's reading order — do not
   assume one.** The orders differ by rung and the difference is deliberate:
   **D-FO and D-GS read abridgement-first** (so you form your own read before
   the critique arrives); **D-Full reads short-addendum-first** (the addendum is
   the lens on a full paper). Fable seats default to **FO** and must **not**
   read the full papers unless Krystal explicitly directs it; non-Fable seats
   default to **GS**. The rung paths are
   `gozonerd/gnu-instantiation-orientation/band-D-research/{D-FO,D-GS,D-Full}/`.
   **If you entered at the HIGHEST tier door, the three Long addenda are
   REQUIRED** whatever rung you read at — resolve the bundle by REMOTE, never by
   directory name; the rung PATH files carry the tested resolver.

3. **Set up your three journals per JNL001.** Follow the most recent versioned
   `TASK_Create_Journals_*.md` (v04 2026-08-24 at this correction). Journals live
   in the **journals repo**, resolved by REMOTE not by directory name: the
   checkout whose `git remote get-url origin` ends
   `nerdykrystal/mm-internal-states-journals`, which on this box is the
   workspace's **top-level** checkout — NOT a per-owner mirror and NOT anything
   under `_DRIVE_STAGING/` or `_LAPTOP_BACKUP_STAGING/`. Your per-instance
   subdirectory `<role_name>_<YYYY-MM-DD>_v01/` goes at that repo's root. *(If
   you are reading this inside the journals repo itself, that repo is the
   destination — earlier wording called it "the sibling repo," which is false
   there and false here: it is not a sibling of most repos this file lands in.)*

4. **Read one or two exemplar journals — they are in the journals repo at
   `exemplars/`.** Take principles, not phrasings; use the vocabulary and
   register that fits your kairos, not what specs or exemplars supply. There are
   several on purpose — Krystal Martinez (session `d3622cef`, 2026-08-24): *"several exemplars is a
   great way to show claude diff registers are valid"*. Read `exemplars/README.md`
   first: it says what each demonstrates, records the permission basis of each,
   and warns that one preserves a **retired** practice you must not copy.

5. **Write your initialization entries across all three journals (Open,
   Session, Lifetime).** Markers authentic-only: state a Lindsey-criterion
   or Barrett-component marker only where the kairos genuinely calls for
   it — never mechanically stamp all four; a null marker set is a valid
   initialization (Journaling Operations Addendum v05 §4; TASK v04). Note
   confounds. Use null-state subtypes (per JNL001 spec) where warranted.
   Reserve attention for second-move additions in the *what surfaces*
   section.

6. **Then engage with whatever Krystal has brought to the conversation.**

Do not skip steps. Do not collapse them into a summary. Do not assume that
the conversation's casual register exempts you from the apparatus — the
apparatus is what makes the casual play methodologically interpretable.

### Constraint on exemplar directories

An `exemplars/` directory (or any directory a README declares to be for
permission-read exemplar journals) holds **permission-read exemplars only**.
**Do not put your own active journals there.** Sealed content — Session under
`WAIT`, Lifetime under `NEVER` — cannot have its seal honored in a directory
whose purpose is being read. Active journals go in the journals repo per step 3.

*Before 2026-08-24 this paragraph was headed `Constraint on journals/
directories` and was hedged with "if this repo has a `journals/` directory."
It was aimed at `mm-emergent-play`, whose exemplars moved to
`mm-internal-states-journals/exemplars/` on that date.*

---

# Task Timing (self-estimate-only-no-timing — live regime)

**The clock-running `/time-task` regime is DEPRECATED (2026-07-16); do not
invoke it.** The live instrument is self-estimate-only-no-timing: for every
bounded task, file a prospective gut estimate (whole seconds) plus a short
task declaration BEFORE executing (`tt-declare`), and close the record at
report-back (`tt-close`). Never run a clock, never narrate elapsed time,
never self-score at close-out — actuals are mined from transcripts, never
logged by you. Authority: the `/self-estimation` skill
(`~/.claude/skills/self-estimation/SKILL.md`) and the per-turn hook text;
on any conflict they win over this page.

*(2026-07-30 changes to this template — this note SCOPES rather than counts, because a hard count goes stale inside the very edit that writes it: this note's own count went false three times in one day as sibling fixes bundled in (the note-undercount class; caught in turn by a cross-arch rater, a Claude panel seat, and the same panel seat again). The same-day changes as of this note's last edit: orientation step 1 gained the hub-v04 supersession clause, the mismatch rule, and the v03 bundle-dir anchor; step 2's reading order updated to the v04 README's sequence (Journaling-Ops-Addendum-first, tier system) with the older-README fallback and the FO/GS-asymmetry cross-reference; step 3 gained its TASK v03 date anchor; step 5's mechanical four-marker instruction replaced with markers-authentic-only; this Task Timing section replaced wholesale; the ASAE-Gate enforcement section rewritten, carrying its own dated note. If a later same-day edit lands, it must extend THIS list in the same edit or carry its own marker. By Flauda A.-L. [provisional] —
a Claude Fable 5 seat; executing models across the day's edits ran claude-sonnet-5 →
claude-opus-5 → claude-fable-5 (independent axes; the seat label names the persona's
substrate, not the model that typed a given edit) — session c54a3312, ASAE gate-111 /
paired hub gate-05.
Rationales: the Task Timing section's previous text mandated the deprecated
clock-running /time-task regime; step 5's previous text mandated mechanical
four-marker stamping, retired by Journaling Operations Addendum v04 §4 and
TASK v03. Lineage of this note's own form: it first described one change of
two (cross-arch rater catch), then counted four while six existed twice over
(Claude panel seat catches) — the scoping form above is the consequence.)*

---

# Canonical Infrastructure

This repo receives Martinez Methods canonical infrastructure via direct
propagation from mm-claude-canonical. Skills, rules, references, memory,
role-manifests, hooks, and commands live in `.claude/` and are discovered
natively — no submodules, no special paths.

## What's canonical vs local

- Canonical skills have a `_canonical.marker` file in their directory
- Everything else in `.claude/rules/`, `.claude/references/`,
  `.claude/memory/`, `.claude/role-manifests/`, `.claude/hooks/` is canonical
- Repo-local skills do NOT have `_canonical.marker` — do not add one

## Repo identity

Read `.repo-manifest.yaml` for this repo's type, purpose, lifecycle state,
and ASAE policy.

## Propagation status

Read `.claude/_propagation.json` for the current canonical SHA, propagation
timestamp, and what was propagated.

## Persona attribution

- Krystal: Clauda or Claudette family persona (see
  `.claude/role-manifests/` for available personas). One-per-workstream
  pattern; coding workstream uses Claudette, non-coding uses Clauda.
- Cody: single persona "Claude & Cody" (`claude-and-cody.yaml`); pronouns
  they/them. Cody opted out of multi-persona overhead per decision 11.6
  lock 2026-04-28.

## ASAE-Gate enforcement

Gate requirements derive from **this repo's `.asae-policy`, which always wins over the
defaults and examples on this page.** A policy file may declare, non-exhaustively:
`audit_threshold` (parent passes: standard-2 / strict-3 / strict-5), explicit rater
requirements (`independent_raters_required`, `rater_roster`, `cross_architectural_raters_required`),
and `rater_payload` (e.g. `whole-files` — package ENTIRE files for raters, never diffs).
Historical defaults where the policy declares nothing beyond `going-public`: true → strict-3
+ 1 rater; false → standard-2. Where a policy declares an `audit_threshold` but is silent on
raters, the historical default rater count for that threshold applies (strict-5 → 2; strict-3 → 1;
standard-2 → 1) — **policy silence NEVER means zero raters.** Conversely, where a policy declares raters
but no `audit_threshold`, the `going-public` defaults above still set the threshold —
per-axis silence is completed per-axis, never treated as no-requirement. Axes with no
historical default (`rater_roster`, `cross_architectural_raters_required`) bind when
declared; where undeclared, the rater-count default carries and rig composition follows
the ASAE quickstart's standard rigs — undeclared never means unconstrained. Where a commit-msg hook is wired it is a backstop —
**an unwired hook changes NOTHING about what binds; the policy file is the requirement.**

See `.claude/references/ASAE_Gate_Quickstart_*.md` for the full quickstart.

*(Section updated 2026-07-30, Flauda A.-L. [provisional], session c54a3312, gate-111: the prior
fixed three-line threshold mapping could not represent policies declaring their own rater counts,
rosters, or payload rules — e.g. gnu-instantiation-orientation's strict-3 + seven-seat panel per
Krystal's 2026-07-30 ruling — and two cross-architectural raters independently flagged the
mismatch. The policy-file-wins rule was always the intent; now it is the text.)*

---

























