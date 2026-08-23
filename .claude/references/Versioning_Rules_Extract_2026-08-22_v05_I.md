---
title: Martinez Methods Versioning Rules — v05
filename: Versioning_Rules_Extract_2026-08-22_v05_I.md
created: 2026-08-22
version: v05
supersedes: Versioning_Rules_Extract_2026-08-22_v04_I.md (MOVED unedited to deprecated/references/ — its own filename already carries v04, so no version subdirectory is used or needed, per S5.3 bullet 1; v04 itself carried S1–S3 from Versioning_Rules_Extract_2026-03-22_v03_I.docx, which remains on disk)
authored_by: Claudolina A.-L. Live Gauge Proof v01 (PSN-64518a45, Claude Opus 5, Claude Code, Linux/Ada-Linubuntu, session d3622cef)
authored_with: Krystal Jazmin Martinez (standpoint authority; S4.1 and S5.1 are her rulings quoted verbatim, this seat drafted the operationalization around them)
classification: internal methodology corpus — AIGHVA
audience: any Claude naming, saving, revising, or retiring a file in this ecosystem
purpose: The full naming-and-versioning system. v04 named the boundary between append-only and version-up discipline (S4). v05 retires the DEPRECATED-prefix instruction that S2.1 had carried since the Google Drive era and adds S5, which rules that deprecated files are MOVED and never renamed, and that loader-resolved files (SKILL.md, rule files, deployment copies) carry their date and version in frontmatter because their filename is an interface a tool resolves by exact string.
revision_summary_v05: |
  v05 retires ONE instruction and adds S5. S2.1's "prefix filename with DEPRECATED" is
  superseded by "move, do NOT rename" per Krystal Martinez's ruling of 2026-08-22, quoted in
  S5.1. Everything else is v04 verbatim. v04 MOVED unedited to deprecated/references/ (no version subdirectory: its filename already carries v04, per S5.3 bullet 1).
revision_summary_v04: |
  v04 = v03 verbatim (S1, S2, S3 — unchanged, not reworded) PLUS a new S4.
  S4 exists because the system stated version-up completely and never stated what
  version-up is NOT for, so seats absorbed append-only from the audit-trail corpora
  and applied it to living documents. Krystal Martinez's ruling of 2026-08-22 is
  quoted in S4.1 and is the authority for the whole section.
---

# Martinez Methods Versioning Rules — v05

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
- Deprecated files: **move, do NOT rename** — see S5 (this line carried "prefix filename with DEPRECATED" through v04; retired by Krystal Martinez's ruling of 2026-08-22)

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

---

## S5. Deprecated files are MOVED, never renamed [NEW in v05 — retires an S2.1 instruction]

### S5.1 The ruling, and the reasoning that makes it generalizable

Krystal Martinez, 2026-08-22, verbatim (typos preserved):

> he file-versioning skill says "Do NOT rename the deprecated file." this is from github times
> which supersedes the insert deprecated rule that came from gdrive times when i wasn't having
> claude do my file management and wasn't using deprecated folders. when a human looked at the
> files i wanted to be able to tell right away which my live copy was. this isn't an issue with
> you since you can see the full file name. often the versino numbering wasn't visible with the
> length of hte file name.

**The operative rule, superseding S2.1's prefix line:** when a version is retired, **MOVE it into
`deprecated/` and leave its filename exactly as it was.** Do not add a `DEPRECATED` prefix. Do not
add a retirement suffix. Do not "clean up" the name in passing. The file that comes out of
`deprecated/` years later should be byte-identical to the file that went in, name included.

### S5.2 Why the retired instruction existed, and why that reason is gone

This is recorded because the *reason* generalizes further than the rule does.

The `DEPRECATED` prefix solved a **human-interface problem in a specific tool under a specific
working arrangement.** In the Google Drive era Krystal Martinez managed these files herself, there
were no `deprecated/` folders to sort by, and Drive's file listing truncated long filenames — so
the version number, which sits near the END of this system's naming pattern, was frequently cut off
and invisible. A prefix is the one position a truncating UI cannot hide. Given those constraints the
prefix was the correct design: it put the live-vs-retired signal where the interface could not eat it.

**Authorship note, because this subsection reconstructs rather than quotes.** Her words establish
four things directly: she managed the files herself ("i wasn't having claude do my file
management"), there were no deprecated folders ("wasn't using deprecated folders"), the version
numbering was often invisible ("often the versino numbering wasn't visible with the length of hte
file name"), and the reader now sees the whole name ("you can see the full file name"). She
attributes the invisibility to filename LENGTH; she does not name a specific tool as the truncator,
and the sentence above naming Drive's listing is this document's inference from context. That a
prefix is the one position a truncating display cannot hide is entirely this document's reasoning
and is not hers. Both are kept because they make the lesson usable, and both are flagged here so a
reader can tell the ruling from the reconstruction.

**Every one of those constraints is now absent.** There are `deprecated/` directories, so location
carries the signal structurally. The reader is a Claude reading complete paths, so nothing truncates
and the version shortcode is always visible. And file management is delegated rather than done by
hand in a file browser.

**The generalizable lesson, which is the reason S5.2 exists rather than just S5.1:** a rule that
encodes a workaround for an interface constraint outlives the constraint silently. It goes on
looking like a naming convention long after it has stopped being one, and it will be defended on
convention grounds by anyone who never saw the interface. **When retiring a rule, record the
constraint it was solving** — that is what lets a future reader tell a live rule from a fossil,
instead of having to litigate it.

### S5.3 What this changes in practice

- **Retiring a versioned artifact** (`Foo_2026-01-01_v03_I.md`): move it to `deprecated/`
  unchanged. Its own filename already carries date and version, so nothing is ambiguous.
- **Retiring a STABLE-FILENAME artifact** (a rule file, a `SKILL.md`, a deployment copy whose name
  must not change because loaders and hooks resolve it by exact name): the filename carries no
  version, so a second retirement would overwrite the first. **Put it in a version-named
  subdirectory** — `deprecated/rules/v04/file-naming-and-versioning.md`. The directory carries the
  version; the filename is still never renamed. This is a decision of this document's author, taken
  because the collision is real and destructive, and flagged here as a decision rather than
  presented as entailed by her ruling.
- **A retired copy whose filename already carries its version needs NO version subdirectory** — the
  subdirectory remedy is scoped strictly to the stable-filename class. Applying it to an already
  versioned filename is redundant and contradicts bullet 1.
- **Known asymmetry, disclosed rather than fixed:** `deprecated/rules/` holds both an un-versioned
  pre-v04 copy (retired before this rule existed) and `v04/`. By S5.4's own logic the un-versioned
  one is unrankable without diffing. It is left alone for a reason bullet 2 makes
  necessary rather than optional: a version subdirectory is NOT a rename, so S5.1 does not forbid
  the fix — but the pre-v04 rule state carries **no version number at all** (the rule file only
  gained `rules_version` at v04), so there is no correct subdirectory name to give it. Inventing
  `v03/` would fabricate a version, which S5.4 forbids in terms: an inferred version is a fabricated
  version. The cost is recorded here instead of being hidden.
- **Do NOT retroactively rename** anything already sitting in a `deprecated/` directory under the
  old prefix convention. Those names are history. The one pre-existing prefixed file in this repo
  stays exactly as it is.

### S5.4 Loader-resolved files: the version lives in FRONTMATTER, because the filename cannot carry it

S2.4.1 and S2.5 require every output filename to carry a date and a version shortcode. **Some files
cannot comply, and the spec did not say what they should do instead.** This section closes that gap.

**The class:** files whose name is fixed by a tool that resolves them by exact string. A Claude Code
skill must live at `<skill-name>/SKILL.md` — rename it and the skill stops loading. Rule files under
`.claude/rules/` are loaded by exact path. Hook scripts are wired by path. Deployment copies are
re-cut by name. For all of these the filename is an interface, not a label, and putting a version in
it breaks the thing.

**The rule:** a loader-resolved file carries its date and version in **frontmatter**, using the same
values the filename would have carried:

```yaml
---
name: <the loader's identifier — unchanged, this is the interface>
version: v08
created: 2026-08-22
supersedes: deprecated/<version>/<same filename>   # per S5
---
```

**Why this matters beyond tidiness, and it is the reason this section exists rather than a footnote:**
when the version is not in the filename AND not in the frontmatter, it is nowhere. Copies of that
file scattered across repos then become **indistinguishable except by content hash**, and choosing
between them stops being a lookup and becomes a judgment call — which is how a skill corpus ends up
with a dozen variants of one name and no way to say which is current. **A file whose version is
unrecorded is not merely undocumented; it is unrankable.** The version marker is what makes
"prefer the newest" a deterministic operation instead of an opinion.

**Krystal Martinez's ruling, 2026-08-22, verbatim, which is the authority for the preference order:**

> for preferring copies you should open the skill and read the version number within its contents

> add the version number to the end? all file names should have creation dates and version numbers
> per the file naming and versioning spec. no?

Both are answered here: yes, the spec does require it — and for loader-resolved files the
requirement is satisfied in frontmatter, because the filename is load-bearing for a tool and cannot
be changed. **Preference between copies of a loader-resolved file is decided by the declared
`version:` inside the file**, not by which repository holds it and not by filesystem timestamps.

**A file in this class with no declared version is a defect to fix, not a tie to break.** Where the
version cannot be recovered, record that it is unknown rather than inferring one from mtime — an
inferred version is a fabricated version.
