---
name: file-versioning
description: "Use this skill when creating, saving, or naming ANY output file. Enforces Martinez Methods file naming and versioning conventions. Triggers on any file write, file save, or filename decision. Also use when the user says 'version this', 'what version is this', 'increment version', 'bump the version', 'bump the versioning', or asks about naming conventions. When 'bump' is used, determine the correct version increment type (number bump = fix/supersede, letter bump = iteration/alternative) based on the nature of the change."
---

# File Versioning Skill

## Purpose

Enforce consistent file naming and versioning across all Martinez Methods output. This skill applies to ALL file operations universally.

## Filename Pattern (MANDATORY)

Every output file MUST follow this pattern:

```
[PREFIX_][Description]_YYYY-MM-DD_vXX_[suffix].[ext]
```

### Component definitions

| Component | Rule | Example |
|---|---|---|
| PREFIX | Project prefix if applicable. Omit if none exists. | `CLI-SM-DATS_` |
| Description | Underscored, no spaces, descriptive | `Full_Context_Assessment` |
| YYYY-MM-DD | Date version was CREATED (not last modified). MANDATORY. Must immediately precede the version shortcode. | `2026-03-23` |
| vXX | Version number | `v01`, `v02`, `vFinal` |
| suffix | `_I` (internal) or `_X` (external). Default `_I` if omitted. | `_I` |
| ext | File extension | `.md`, `.docx` |

**Full example:** `CLI-SM-DATS_Pipeline_Playbook_2026-03-22_v03_I.md`

## Version Component Meanings

- **N (Number 1,2,3...)** = Main version. Higher supersedes lower.
- **X (Letter A,B,C...)** = Iteration variant. Parallel alternatives — both are valid.
- **R (Number 1,2,3...)** = Revision within iteration. Higher = more correct.

**Core rule:** Number change = FIX (one supersedes the other). Letter change = ITERATION (both versions are valid alternatives).

## When to Increment

| Change Type | Increment? |
|---|---|
| Typo fix, formatting only | No |
| Clarification, no behavior change | No |
| New rule or behavior change | Yes — bump number |
| Structural reorganization | Yes — bump number |
| Conflict resolution | Yes — bump number |
| Parallel alternative created | Yes — bump letter |

## When User Says "Bump"

Determine the correct increment type from context:
- If the change fixes, corrects, or supersedes: **bump the number** (v01 -> v02)
- If the change creates a parallel alternative: **bump the letter** (vA -> vB)
- If unclear, ask the user: "Is this a fix (number bump) or a parallel alternative (letter bump)?"

## Deprecated File Handling

When a new version supersedes an old one:

1. Check if a `deprecated/` subfolder exists in the same directory
2. Create `deprecated/` if it does not exist
3. Move the old file to `deprecated/`
4. Do NOT delete the old version — move only
5. Do NOT rename the deprecated file

## vlatest Rule

When the user says "vlatest", "latest version", or similar:

1. Check the directory for the highest version number
2. Check for an active `UPDATE_BACKLOG_[filename]` file
3. If a backlog exists: state the base version + pending update count, then ask the user whether to work from base only or apply the backlog mentally
4. If no backlog: use the highest version number as authoritative

## Instruction Block Versioning

For instruction blocks embedded in documents:

- Start delimiter: `===start [instruction name] v[##]===`
- End delimiter: `===end [instruction name] v[##]===`
- When multiple same-name blocks exist: use highest version number as authoritative, ignore lower versions, flag conflict to user

## Special Values

- `vFinal` = final version. Use instead of a number for the last version.
- `[DEPRECATED]` prefix = file has been superseded. Should live in `deprecated/` subfolder.

## Reference

For full versioning rules including all edge cases, see `references/versioning-rules-full.md`.
