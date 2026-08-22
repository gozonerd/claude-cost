# Martinez Methods Versioning Rules — Full Reference

**Source:** Versioning_Rules_Extract_2026-03-22_v03_I.docx
**This file is a verbatim markdown conversion of the versioning rules for reference by the file-versioning skill.**

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
