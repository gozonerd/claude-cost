---
description: Mandatory file naming pattern, version increment logic, and the append-only-vs-version-up boundary for all Martinez Methods outputs
rules_version: v04 (2026-08-22 — adds the append-only vs version-up section; full reference references/Versioning_Rules_Extract_2026-08-22_v04_I.md)
superseded_copy: deprecated/rules/file-naming-and-versioning.md — this file's pre-v04 state, moved unedited (move-don't-rename, per the file-versioning skill's step 5)
globs: "**/*"
---

# File Naming and Versioning

## Mandatory Filename Pattern

Every new file must include:

```
[PREFIX_][Description]_YYYY-MM-DD_vXX_[suffix].[ext]
```

**Components:**
- `PREFIX_` — Project prefix (e.g., `CLI-SM-DATS_`, `CLI-SS-OPS_`). Optional for personal/internal files.
- `Description` — Descriptive name, underscores for spaces
- `YYYY-MM-DD` — Date created or last major version
- `vXX` — Version number (see below)
- `suffix` — Approval status: `_I` (internal), `_X` (external). Default is `_I` when omitted.

**Anti-pattern:** `EDR_README_Vol1_Overview.md` (missing date + version)
**Correct:** `CLI-SM-EDR_README_Vol1_Overview_2026-01-09_v02_I.md`

## No Spaces in Filenames

Replace all spaces with underscores.

## Version Format

| Component | Symbol | Meaning |
|-----------|--------|---------|
| N | Number (1, 2, 3...) | Main version — higher = more correct |
| X | Letter (A, B, C...) | Iteration variant — parallel alternatives |
| R | Number (1, 2, 3...) | Revision within iteration |

### The Core Rule

| Symbol Type | ALWAYS Means | Relationship |
|-------------|-------------|--------------|
| Number change | FIX | One is "more correct" than the other |
| Letter change | ITERATION | Both are valid alternatives |

## When to Increment

| Change Type | Action |
|-------------|--------|
| Typo fix, formatting only | Same version |
| Clarification without behavior change | Same version |
| New rule or behavior change | Increment N |
| Structural reorganization | Increment N |
| Parallel alternative approach | New X letter |

## Final Version

When final, use `vFinal` instead of numbered version.

## Deprecated File Naming

Insert `DEPRECATED` at the very beginning of the filename when marking a file as deprecated.

## Verification

Before presenting any file, Claude confirms the filename includes date + version.

## Append-Only vs Version-Up — Which Discipline Applies

**One invariant: history is never lost. Two ways of keeping it. The document's class decides,
and applying the wrong one is a real and recurring failure here.**

| | Audit-associated documents | Actual artifacts |
|---|---|---|
| What they are | Records of **what happened** | Statements of **what currently is** |
| Examples | Gate logs, decision logs, adjudication logs, rater audit logs, change logs, journals, sealed manifests, provenance records | Rules, specs, quickstarts, flash starts, glossaries, skills, READMEs, papers |
| Discipline | **Append-only, literally.** Never edit an entry; a correction is a NEW entry naming what it corrects | **Version-up.** Never edit the live copy for a significant change; retire it unedited to `deprecated/` and write the improved copy at the next version |
| History lives | In place, in sequence, in the same file | Beside the live copy, in `deprecated/` |

**The Examples row is indicative, not exhaustive.** Role definitions and persona provenance
records are **mixed by design** — the identity statement versions up, the ledger inside it
appends. Where the full reference's S4.6 names a case, S4.6 governs; read the row as a starting
sort, not a verdict.

**The decision test — ask before touching any file:**
*Is this a record of what happened, or a statement of what currently is?*
Record → **append**. Statement → **version**.

"Significant" is defined by the **When to Increment** table above and by the Core Rule; those
definitions govern here unchanged.

**The failure mode, with a mechanical tell:**

> **A document that has grown an amendments section is a document overdue for a version-up.**
> An amendment inside a live artifact is a version bump that was not taken.

**The inverse failure:** versioning an audit document breaks the unbroken sequence it exists to
provide. A "v02 of the decision log" is a second record, not a corrected one. Audit documents are
corrected by appending an entry that names the entry it corrects.

**When you find the wrong discipline already applied:** do not silently clean it up. Converting an
amendment-laden artifact is itself a version-up and follows this same rule — the amendment-laden
copy retires to `deprecated/` unedited, the clean copy is written at the next version, and the new
version's frontmatter names what it superseded and why.

**Full reference:** `references/Versioning_Rules_Extract_2026-08-22_v04_I.md` §S4 — carries
Krystal Martinez's ruling verbatim, the boundary cases (specs about audit documents version up;
manifests append; mixed files decide per section), and the named specimens.
