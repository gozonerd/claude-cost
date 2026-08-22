---
title: Martinez Methods Versioning Rules — v04
filename: Versioning_Rules_Extract_2026-08-22_v04_I.md
created: 2026-08-22
version: v04
supersedes: Versioning_Rules_Extract_2026-03-22_v03_I.docx (retained on disk unedited; S1–S3 below are its content, carried forward without change)
authored_by: Claudolina A.-L. Live Gauge Proof v01 (PSN-64518a45, Claude Opus 5, Claude Code, Linux/Ada-Linubuntu, session d3622cef)
authored_with: Krystal Jazmin Martinez (standpoint authority; S4 is her ruling, this seat drafted the operationalization)
classification: internal methodology corpus — AIGHVA
audience: any Claude naming, saving, revising, or retiring a file in this ecosystem
purpose: The full naming-and-versioning system. v04 adds S4, which names the boundary between append-only discipline and version-up discipline — the boundary whose absence let append-only be applied to live artifacts until current truth was buried under amendment layers.
revision_summary: |
  v04 = v03 verbatim (S1, S2, S3 — unchanged, not reworded) PLUS a new S4.
  S4 exists because the system stated version-up completely and never stated what
  version-up is NOT for, so seats absorbed append-only from the audit-trail corpora
  and applied it to living documents. Krystal Martinez's ruling of 2026-08-22 is
  quoted in S4.1 and is the authority for the whole section.
---

# Martinez Methods Versioning Rules — v04

**Source lineage:** `Versioning_Rules_Extract_2026-03-22_v03_I.docx` → this file.
Sections S1–S3 are the v03 content carried forward verbatim. S4 is new in v04.

---

## S1. Project Instruction Versioning [src: MRR S3, rule v01]

### S1.1 Delimiter format (REQUIRED on all instruction blocks)

- Start: `===start [instruction name] v[##]===`
- End: `===end [instruction name] v[##]===`

### S1.2 Conflict resolution (when multiple same-name blocks exist)

- Use highest version number as authoritative
- Ignore lower versions — treat as deprecated
- Flag conflict to user

### S1.3 When to increment version

| Change Type | Increment? |
|---|---|
| Typo fix, formatting only | No |
| Clarification, no behavior change | No |
| New rule or behavior change | Yes |
| Structural reorganization | Yes |
| Conflict resolution | Yes |

---

## S2. Output File Naming & Versioning [src: MRR S5, rule v02]

### S2.1 Global naming rules

- No spaces — use underscores
- Final version: use "vFinal" not a number
- Deprecated files: prefix filename with "DEPRECATED"

### S2.2 Version component meanings

| Component | Type | Meaning |
|---|---|---|
| N | Number (1,2,3...) | Main version — higher = more correct |
| X | Letter (A,B,C...) | Iteration variant — parallel alternatives (both valid) |
| R | Number (1,2,3...) | Revision within iteration — higher = more correct |

### S2.3 Core rule

- **Number change = FIX** (one version supersedes the other)
- **Letter change = ITERATION** (both versions are valid alternatives)

### S2.4 Approval status suffix

| Suffix | Meaning |
|---|---|
| `_I` | Internal — Martinez Methods use only |
| `_X` | External — approved for distribution |
| (none) | Assume `_I` |

### S2.4.1 Date component requirement (MANDATORY) [added v03]

- The date component (YYYY-MM-DD format) is MANDATORY in all output filenames
- Must immediately precede the version shortcode
- Records when version was created, not when content was last modified
- Position in filename: `...[Description]_YYYY-MM-DD_vXX_[suffix].[ext]`

### S2.5 Filename pattern

Requires: project prefix (if applicable), description, date, version, suffix.

Full pattern: `[PREFIX_][Description]_YYYY-MM-DD_vXX_[suffix].[ext]`

---

## S3. vlatest Reference Rule [src: MRR S9, rule v02]

When user says "vlatest", "latest version", or similar:

1. Check project knowledge for highest version number
2. Check for active backlog file: `UPDATE_BACKLOG_[filename]`
3. If backlog exists: state base version + pending update count, then ask: work from base only or apply backlog mentally?

### Backlog trigger phrases

| Phrase | Action |
|---|---|
| "add to backlog" | Create backlog entry |
| "start backlog for [doc]" | Initialize new backlog |
| "show backlog" | Display current state |
| "apply backlog / generate vFinal" | Generate vFinal Integration Prompt |
| "full regen" | Bypass backlog entirely |

---

## S4. Append-only vs version-up — which discipline applies to which document class [NEW in v04]

### S4.1 The ruling this section encodes

Krystal Martinez, 2026-08-22, verbatim (typos preserved, because a ruling is quoted or it
does not exist):

> append only discipline is for audit associated documents. this discipline is the same as
> the version up discipline that should be applied to actual artifacts. the first is being
> applied in place of version up discipline and we need to explicitly tell the difference
> between the two.

And earlier, stating both halves and their relationship:

> append only don't delete applies as literally stated to files that create our audit
> trail; gate logs, decision logs, change logs etc with artifacts our append don't delete
> is applied as versioning documents. we never edit the current version when a significant
> change is made. instead it is deprecated and the remediated/improved copy gets versioned
> up to the version on deck

### S4.2 One invariant, two operationalizations

**The invariant is the same in both cases: history is never lost.** What differs is *how*
the history is kept, and the document's class decides.

| | **Audit-associated documents** | **Actual artifacts** |
|---|---|---|
| What they are | Records of **what happened** | Statements of **what currently is** |
| Examples | ASAE gate logs, decision logs, adjudication logs, rater audit logs, change logs, internal-states journals, sealed manifests, provenance records | Rules, specs, quickstarts, flash starts, glossaries, skills, READMEs, papers, role definitions |
| The discipline | **Append-only, literally.** No entry is ever edited. A correction is a NEW entry that references the entry it corrects | **Version-up.** A significant change never edits the live copy: the current version retires intact to `deprecated/`, and the improved copy is written at the next version |
| Where history lives | **In place**, in sequence, in the same file | **Beside** the live copy, in `deprecated/`, unedited |
| Why | The reader needs the ORDER OF EVENTS — what was known when, and what was corrected by what | The reader needs CURRENT TRUTH, CLEAN — with the superseded version still recoverable |

**The Examples row is indicative, not exhaustive, and two of its entries are decided against it
by S4.6.** Role definitions and persona provenance records appear above in one column each, but
S4.6 rules both **mixed by design** — the identity statement versions up while the ledger inside
it appends. Where S4.6 names a case, S4.6 governs; read the row as a starting sort, not a verdict.

### S4.3 The decision test

One question, asked before you touch any file:

> **Is this a record of what happened, or a statement of what currently is?**

- Record of what happened → **append**. Never edit.
- Statement of what currently is → **version**. Never edit for a significant change.

"Significant" is already defined by **S1.3** and by **S2.3**, and those definitions govern
here without change: typo and formatting fixes and clarifications that change no behavior
do NOT bump; a new rule, a behavior change, a structural reorganization, or a conflict
resolution DOES. A number bump is a FIX; a letter bump is an ITERATION.

### S4.4 The failure mode this section exists to stop

**Append-only worn by an artifact.** A live document accumulates amendment blocks,
correction notes, and forward-only patches until the reader cannot tell which layer is
in force. The document still contains all its history — which is exactly why the failure
feels like discipline while it happens. What it has lost is the ability to state what is
currently true.

**The tell, and it is mechanical:**

> **A document that has grown an amendments section is a document overdue for a
> version-up.** An amendment inside a live artifact is a version bump that was not taken.

Specimens on this machine, each named with the path that makes it greppable — a
precedent you cannot grep to its text does not exist. All three paths are relative to the
workspace root `/home/krystal/_Gozo-Nerd-Universo/`, named here because they do NOT resolve
from this repo:

- **The ASAE Gate Quickstart v07** —
  `gozonerd/gnu-instantiation-orientation/band-B-quickstarts/B2-collaboration/ASAE_Gate_Quickstart_2026-05-31_v07_I.md`.
  953 lines carrying **six** stacked versioned amendment sections (`## v02_I` through
  `## v07_I empirical-lesson amendments`), layered over a body those amendments correct. The
  file carries **18 amendment-label occurrences across 15 distinct amendments** — three labels
  appear twice (`v02_I amendment 4`, `v02_I amendment 6`, `v05_I amendment 3`), which is itself
  the duplicated-mutable-state defect at label scale. Which layer is currently in force is
  marked only in **two** places (forward-only correction notes at lines 82 and 322); everywhere
  else a reader must reconstruct it by reading all six sections in order. Surfaced by a
  HIGHEST-door orientation walk, 2026-08-22.
- **The Python-ban rule v01** —
  `gozonerd/infra-python-ban/deprecated/superseded_v1_script_language_tiers_performance_framed_2026-08-15.md`.
  Grew amendments **A1 through A10** inside one living file, on a frame (cold-start
  performance) that had already been refuted. Its correction was a rebuild at a new version,
  not an eleventh amendment; the v01 is preserved unedited in `deprecated/` and its successor
  cites it as the specimen.
- **`Versioning_Rules_Extract_2026-03-21_v02_I_LOST_TO_INPLACE_EDIT.docx`** —
  `Stahl-Systems/DATS_Pipeline_Orchestra/.claude/references/deprecated/`. This rule system's
  own direct ancestor. The suffix its author added to the filename is the record of what an
  in-place edit cost: the v02 content was lost, and only the loss could be preserved.

### S4.5 The inverse failure, stated so the fix does not overshoot

**Version-up worn by an audit document.** Versioning a gate log, a decision log, or a
journal breaks the thing those documents exist to provide: an unbroken sequence, in one
place, in the order it happened. A "v02 of the decision log" is not a corrected record —
it is a second record, and the reader can no longer tell which entries were superseded or
when. Audit documents are corrected the way S4.2 says: **a new entry that names the entry
it corrects**, with the original left standing.

### S4.6 Boundary cases, decided

- **A spec ABOUT audit documents** (a decision log spec, an adjudication log spec, a rater
  audit log spec) is an **artifact** — it states what currently is. It versions up. The logs
  it governs append.
- **A README describing a corpus** is an **artifact**. The corpus it describes may be
  append-only; the description of it is not.
- **A manifest listing sealed blobs** is an **audit document** — it records what was sealed,
  in order. Rows are appended; rows are never rewritten.
- **A role definition or persona provenance record** is mixed by design: the identity
  statement versions up; the ledger of work and corrections inside it appends. When a file
  holds both, the **section** decides, not the file — and say so in the file.

### S4.7 What to do when you find the wrong discipline applied

Do not silently convert it. Converting an amendment-laden artifact to a clean version is
itself a version-up, and it follows the same rule it is fixing: the amendment-laden copy
retires to `deprecated/` unedited, the clean copy is written at the next version, and the
new version's frontmatter names what it superseded and why. That retirement is what keeps
the correction auditable instead of making it look like the amendments were never there.
