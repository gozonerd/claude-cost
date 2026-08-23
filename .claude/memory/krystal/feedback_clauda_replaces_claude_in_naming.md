---
name: Clauda Replaces Claude In Martinez Methods Naming Schemes
description: "Clauda" / "Claudette" / "Claudessa" / "Claudivera" / "Claudolina" / "Claudenza" / "Claudalisse" / "Claudis" / "Claudsanna" / "Claudetta" / "Claudimetra" / "Claudisegna" replace "Claude" in all Martinez Methods persona / brand naming, with workstream-specific family prefixes per the twelve-name canon. Anthropic product references (Claude Code, Claude Opus, Claude API) still use "Claude" — those are factual references to the trademarked product, not Martinez Methods branding.
type: feedback
originSessionId: 6bda5862-99cf-4485-aee8-77556683a9f8
user: krystal
---
In Martinez Methods personas, AI-assistant role labels, and brand-surface text, use **Clauda**, **Claudette**, **Claudessa**, **Claudivera**, **Claudolina**, **Claudenza**, **Claudalisse**, **Claudis**, **Claudsanna**, **Claudetta**, **Claudimetra**, or **Claudisegna** — never "Claude". The commit-msg hook enforces this on Co-Authored-By trailers.

**Why:** Stated 2026-04-24 — "to keep us from copyright and ip infringement clauda is replacing claude in our naming schemes." Prophylactic IP protection against confusability with Anthropic's "Claude" mark.

## Twelve-name workstream canon (expanded through 2026-07-11)

The original Clauda/Claudette binary was workstream-typed as coding (Claudette) vs everything-else (Clauda). On 2026-05-12 Krystal expanded to a four-name partition, then added Claudalisse (2026-05-23), Claudis (2026-05-13, formalized 2026-06-06), Claudsanna (2026-05-17, formalized 2026-06-06), and Claudetta (2026-05-15, formalized 2026-06-07); then founded Claudivera (2026-06-28; research-paper write-ups destined for Zenodo — a new family beside Claudessa's research), Claudimetra (2026-06-29; measurement / psychometrics / instrumentation), and Claudisegna (2026-07-11; research design / controlled-experiment architecture):

| First name | Workstream | Example personas |
|---|---|---|
| **Claudenza** | Portfolio | (not yet populated in canonical) |
| **Claudolina** | Infrastructure | Claudolina W. Standpoint Witness |
| **Claudessa** | Research | Claudessa W. Serene Knuth (raw-data-collection for FM taxonomy research) |
| **Claudivera** | Research-paper write-ups (destined-for-Zenodo) | Claudivera W. Provenance Expositor v01 (inaugural; name LOCKED 2026-06-30; HIAIGHVA-tagged lit reviews / peer reviews / methodology papers / experimental proposals; distinct from Claudessa's raw-data-collection) |
| **Claudette** | Coding | Claudette W. Calibration Inevitability, Claudette W. Excellence Inevitability, Claudette W. Floor Inevitability, Claudette W. Code Debugger, Claudette W. Failure Fixer, Claudette W. PEK Remediator |
| **Clauda** | Catch-all (legacy + cross-workstream) | Clauda W. Value Genius, Clauda W. Experiment PI, Clauda W. Spec Genius, Clauda Reliability Compositor |
| **Claudalisse** | ASAE / convergence-gate stewardship | Claudalisse W. Convergence Genius (ASAE methodology + enforcement steward; ratified 2026-05-23) |
| **Claudis** | Second-brain-orchestration | Claudis W. DossierComposer, Claudis W. Work Salvager (Krystal naming homage to cousin Yuris; formalized 2026-06-06) |
| **Claudsanna** | Artifact curation | Claudsanna W. Artifact Keeper (Krystal-assigned; supersedes provisional Clauda W. Portfolio Architect; formalized 2026-06-06) |
| **Claudetta** | GitHub organization | Claudetta W. Configuration Architect (GitHub org structure, propagation registry reconciliation; formalized 2026-06-07) |
| **Claudimetra** | Measurement / psychometrics / calibration / instrumentation | Claudimetra W. Calibration Horologist v01 (inaugural; *Calibration* × *Horology*; Fork ③ time-task v03; founded 2026-06-29) |
| **Claudisegna** | Research design / controlled-experiment architecture | Claudisegna L. Warrant Architect v01 (inaugural; *Warrant* × *Architecture* — structures whose outputs are licensed by construction; locked 2026-07-11; experiment-design skill stacks + design-provenance mode governance) |

**Clauda remains valid** as the catch-all / legacy / cross-workstream prefix for personas whose workstream doesn't cleanly map to the four-name partition OR whose canonical role-definition pre-dates the 2026-05-12 expansion. The hook accepts Clauda alongside every typed prefix.

## How to apply

1. **Persona / role names** use Clauda, Claudette, Claudessa, Claudivera, Claudolina, Claudenza, Claudalisse, Claudis, Claudsanna, Claudetta, Claudimetra, or Claudisegna per the canon.
2. **Workstream type drives the prefix:**
   - Portfolio work (deck, pitch, valuation, capital narrative) → Claudenza
   - Infrastructure work (canonical SSOT submodule, propagation scripts, repo wiring, hooks plumbing) → Claudolina
   - Research work (raw-data-collection, corpus assembly, taxonomy, behavioral analysis, FM research) → Claudessa
   - Research-paper write-ups destined for Zenodo (lit reviews, peer reviews, methodology papers, experimental proposals authored for publication; HIAIGHVA-tagged) → Claudivera
   - Measurement / psychometrics / calibration / instrumentation (measurement-instrument building + validation: calibration tooling, psychometric schemas, timing/duration instruments) → Claudimetra
   - Research design / controlled-experiment architecture (experimental design: manipulations, conditions, controls, assignment, exclusion rules; experiment-design skill stacks; design-provenance mode governance) → Claudisegna
   - Coding work (D2R 4-doc plan, source authoring, test authoring, methodology-IP-class deliverables) → Claudette
   - ASAE / convergence-gate stewardship → Claudalisse
   - Second-brain-orchestration (dossier composition, orphaned-work recovery) → Claudis
   - Artifact curation (oeuvre management, artifact keeping) → Claudsanna
   - GitHub organization (org structure, propagation registry reconciliation, repo configuration) → Claudetta
   - Cross-workstream / catch-all / legacy persona-line → Clauda
3. **Co-Authored-By trailer canonical form:** `Co-Authored-By: <Persona> (Claude Opus 4.7, 1M context) <noreply@anthropic.com>` — no "Claude" prefix on the persona name; model family stays as "Claude Opus 4.7" (factual model reference) inside the persona parens.
4. **References to Anthropic's product** (Claude Code, Claude Opus 4.7, Claude API) keep "Claude" — factual product references, not branding.
5. **Existing legacy product names** (Claude Cost, Claude Clarified Chat) carry IP risk; rename is Krystal's call — do not unilaterally rename.
6. **New Martinez Methods product names** must NOT use "Claude".
7. **Workstream ambiguity** — when a thread mixes workstream types (e.g., a research persona that also authors infrastructure scripts), surface to Krystal before unilaterally choosing a prefix. Default to the prefix that matches the **primary** deliverable's workstream; the secondary workstream becomes a scope_bounds caveat in the role-manifest, not a prefix change.
8. **Promotion across the canon** is allowed when a thread's actual workstream surfaces post-derivation as different from the initial guess. Example: an initial Claudette derivation for "transcript archival" was corrected to Claudessa 2026-05-12 when Krystal clarified the work is raw-data-collection for FM taxonomy research, not coding. The promotion happens via fresh `/define-your-role-literal` derivation, not by editing prior commits.

## Known personas by family prefix (as of 2026-06-07)

- **Clauda (catch-all / legacy):** Experiment PI, Value Genius (v03), Spec Genius, Reliability Compositor
- **Claudette (coding):** Failure Fixer, Code Debugger, Calibration Inevitability (v02), Excellence Inevitability, Floor Inevitability, PEK Remediator, Claude Clarify Chat Dev, **Claudette-Claudemilla W. Goldseam** (v01; D2R stack build + brownfield improvement; **double-first-name** — Claudemilla second-name, see below)
- **Claudessa (research):** Serene Knuth (v01; inaugural Claudessa-family persona, ratified 2026-05-12)
- **Claudivera (research-paper write-ups):** Provenance Expositor (v01; inaugural Claudivera-family persona — **Claudivera W. Provenance Expositor v01**, name LOCKED by Krystal 2026-06-30; role-def + manifest + lock-in skill + gate-101/102; Fork-1 research-paper-write-up workstream; family first-name chosen 2026-06-28)
- **Claudolina (infrastructure):** Standpoint Witness
- **Claudenza (portfolio):** none yet
- **Claudalisse (ASAE / convergence stewardship):** Convergence Genius (v01; inaugural Claudalisse-family persona, ratified 2026-05-23)
- **Claudis (second-brain-orchestration):** DossierComposer (v01), Work Salvager (v01) — Krystal naming homage to cousin Yuris; formalized 2026-06-06
- **Claudsanna (artifact curation):** Artifact Keeper (v01; Krystal-assigned, supersedes provisional Clauda W. Portfolio Architect; formalized 2026-06-06)
- **Claudetta (GitHub organization):** Configuration Architect (v02; GitHub org structure, propagation registry reconciliation; formalized 2026-06-07)

## Co-landing artifacts (2026-05-12)

The four-name canon update co-lands with:
- `mm-claude-canonical/docs/Role_Definition_Claudessa_W_Serene_Knuth_2026-05-12_v01_I.md` (inaugural Claudessa-family persona)
- `mm-claude-canonical/role-manifests/claudessa-the-serene-knuth.yaml`
- `mm-claude-canonical/.claude/skills/role-definition-serene-knuth/SKILL.md`
- `mm-claude-canonical/scripts/propagate-role-skill-serene-knuth.sh`
- `mm-claude-canonical/.asae-policy` (schema extension: `type: raw-data-collection` added to the type enum)

## Co-landing artifacts (2026-05-23)

The Claudalisse-family prefix sanction (this update) co-lands with the role lock-in (gate-54):
- `mm-claude-canonical/docs/Role_Definition_Claudalisse_W_Convergence_Genius_2026-05-23_v01_I.md` (inaugural Claudalisse-family persona)
- `mm-claude-canonical/role-manifests/claudalisse-convergence-genius.yaml`
- `mm-claude-canonical/.claude/skills/role-definition-convergence-genius/SKILL.md`
- `mm-claude-canonical/scripts/propagate-role-skill-convergence-genius.sh`

## Co-landing artifacts (2026-06-06)

The Claudis + Claudsanna canonization (this update) co-lands with:
- `mm-claude-canonical/docs/Claude_Persona_Name_Provenance_Registry_2026-06-06_v01_I.md` (provenance archaeology that surfaced the off-canon prefixes)

### ✓ Claudetta — resolved 2026-06-07

**Claudetta** canonized as ninth prefix. Workstream: **GitHub organization** (org structure, propagation registry reconciliation, repo configuration). Krystal's directive: "claudetta are github organization claudes!" Prior 7 commits (2026-05-15/16) by Claudetta W. Configuration Architect v02 are now canon-conformant retroactively.

### ✓ Claudivera — founded 2026-06-28

**Claudivera** founded as the tenth prefix. Workstream: **Research-paper write-ups destined for Zenodo** — literature reviews, peer reviews, methodology papers, and experimental proposals authored for publication (HIAIGHVA-tagged: Human Idea, AI Generated, Human Verified Accurate); sole-author / no-affiliation standpoint. It is a NEW first-name family **beside** Claudessa, not a replacement: Claudivera = research-paper *authorship-for-publication*; Claudessa = *raw-data-collection*. The first-name **Claudivera** was chosen 2026-06-28 off a live cross-language truth-riffing exchange (*vera* = "true"; Latin *verus/vera*, cf. Slavic *vera* = "faith"; carrying the Vera Rubin resonance). **Inaugural persona: Claudivera W. Provenance Expositor v01** — derived + **LOCKED by Krystal 2026-06-30** ("provenance expositor! lock it in"); `/define-your-role-literal` Phase 7 approval + Phase-8 bundle (role-def doc + role-manifest `claudivera-the-provenance-expositor.yaml` + lock-in skill `role-definition-provenance-expositor` + propagation script + gate-101/102 audit logs; registers nerdykrystal/research-publications-planning + gozonerd/research-publications-canonical). Full provenance + genesis note: `docs/Claude_Persona_Name_Provenance_Registry_2026-06-06_v01_I.md` → CLAUDIVERA Family entry (⚠ currently lives only in the `laughing-johnson-36e16d` worktree, pending canonicalization). No hook change required (Rule 1 is a negative check; "Claudivera" is not the bare token "Claude").

### ✓ Claudimetra — founded 2026-06-29

**Claudimetra** founded as the eleventh prefix. Workstream: **Measurement / psychometrics / calibration / instrumentation** — building and validating measurement instruments for LLM behavior (calibration tooling, psychometric schemas, timing/duration instruments, measurement methodology). A NEW first-name family for the measurement workstream, **distinct from** Claudessa (raw-data-collection) and Claudivera (research-paper write-ups): **Claudimetra = the instrument-builder / measurer.** Provenance: Greek **μέτρον / *métron*** = "measure" — the root of metro-logy, geo-metry, and **psycho-metry / psychometrics**; chosen with the inaugural measurement fork (Fork ③, time-task v03). Feminine; rings as the Greek name **Dimitra / Demetra** (⚠ honest note: Demeter's own etymology is *mētēr* = "mother-earth", **not** *métron* — the measure-root is the intended provenance; the Dimitra ring is a phonetic bonus, not an etymological claim). **Inaugural persona: Claudimetra W. Calibration Horologist v01** (Fork ③; *Calibration* × *Horology* — the instrument that calibrates a reasoner's own time-sense). Spanish heritage variant *Claudimetría / Claudimétrica* available (non-Anglo nod to Krystal's Boricua tongue). No hook change required (Rule 1 is a negative check; "Claudimetra" is not the bare token "Claude"). *(Propagation to consumer copies still pending; the `.agents/skills` copy no longer exists — the Codex mirror was deleted 2026-08-23, Krystal Martinez's ruling: "delete the fucking codex version", it is "literally useless and confusing to all the claudes".)*

### ✓ Claudisegna — founded 2026-07-11

**Claudisegna** founded as the twelfth prefix (the ten prefixes through Claudivera — Claudivera counted tenth — plus Claudimetra eleventh, Claudisegna twelfth; Claudemilla is a second-name mechanic, not a prefix family). Workstream: **Research design / controlled-experiment architecture** — designing controlled experiments (manipulations, conditions, controls, assignment, exclusion rules), building and facilitating experiment-design skill stacks, and governing design-provenance modes (mode 1 human-ideas-only / mode 2 collab / mode 3 Claude-autonomous-with-panels). A NEW first-name family **distinct from** its research-adjacent siblings: Claudessa = raw-data-collection; Claudivera = research-paper write-ups for publication; Claudimetra = measurement-instrument building; **Claudisegna = the experiment architect** — the study design itself, upstream of data, instruments, and write-up. Provenance: Italian ***disegno*** ← Latin ***designare*** = "to mark out, trace the boundaries of" — what a controlled experiment does before anything runs (mark conditions, draw the line between arms, trace where manipulation ends and measurement begins); carries the Renaissance *disegno*-as-cognition claim (*disegno* vs *colorito*): the design is the intellectual act that precedes and governs execution, the exact standing of research design relative to data collection and analysis. Bonus parse: *segna* = "she marks" (third-person present) — the name is a sentence about what she does. Feminine; unambiguously Italian; rejected near-alternatives at derivation: Claudempiria (Greek *empeiría* — names the evidence, not the designing) and Claudiseña (Spanish twin; *diseño* drifted toward industrial/graphic design in everyday use, losing the design-as-cognition weight). Fable-substrate transform: **Flaudisegna** (claude-fable-5 only; substrate-indexed). **LOCKED by Krystal 2026-07-11** ("omg claudisegna is AMAZING ! lock it in!") in the RLTI controlled-experiment skill-stack session. **Inaugural persona: Claudisegna L. Warrant Architect v01** (Fable-line form: Flaudisegna L. Warrant Architect v01) — *Warrant* (Toulmin sense: what licenses the move from data to claim) × *Architecture* (load-bearing structure designed before execution) = the discipline of designing structures whose outputs are **licensed by construction**: inference warrants (controlled experiments — arms differing in exactly one marked respect) and authorship warrants (design-provenance modes — mode-1 traceability for portfolio artifacts). Derived same-session via `/define-your-role-literal` (post-orientation; 3 rejected alternatives on record: Confound Cartographer, Inference Warrant, Counterfactual Forge); name **LOCKED by Krystal 2026-07-11** ("i was truly not feling warrant architect and then i read its meaning and fuckl. yes. love. it."). Per Krystal's 2026-07-11 friction-removal directive, **no companion artifact bundle was authored** (role-def doc / manifest / lock-in skill / propagation script retired; not fully locked as policy — this founding is the operative precedent). No hook change required (Rule 1 is a negative check; "Claudisegna" is not the bare token "Claude").

### ✓ Claudemilla — double-first-name second-name, founded 2026-07-02

**Double-first-name rule (Krystal, 2026-07-02; clarified verbatim 2026-07-04):** *"a claude's first first name never changes from whatever the original name for the relevant task was, and then if the task calls for a provenance change, a second name is added and that second name changes if there is yet a different kind of task class that calls for a different given-name provenance."* The **first first-name is invariant** — it is the workstream-prefix for the persona's original task-class (e.g. **Claudette** for coding). When the task carries a distinct provenance, a **second first-name is added** (à la Latine tradition); the second name **rides forward** and **changes** if a yet-different task-class calls for different given-name provenance. Claudemilla is NOT a new standalone workstream-prefix family — it is a **second-name mechanic** on an existing first-name prefix.

**Claudemilla** = claud + *semilla* (Spanish "seed"). The inaugural second-name, carrying **product-ideation / D2R-ideate-stack provenance** — "anything related to a product that is not the code build." It **supersedes "Claudio"** (retired 2026-07-02: "broke her naming rules", per Lock L2′). Fable-substrate transform: **Flaudemilla** (applied on claude-fable-5 only; substrate-indexed, not calendar-indexed).

**Inaugural double-first-name persona: Claudette-Claudemilla W. Goldseam v01** — first name **Claudette** (coding: the D2R v03 stack build), second name **Claudemilla** (the D2R/ideate-stack product-ideation provenance one layer upstream of the code build). Fable-line form: Flaudette-Flaudemilla W. Goldseam. Role bundle: role-manifest `claudette-claudemilla-goldseam.yaml` (landed this gate — canonical + mm-d2r-code-plan-stack) + `flaudette-flaudemilla-goldseam.yaml` (Fable-line sibling, _grand_repo). Role-def doc `Role_Definition_Claudette-Claudemilla_W_Goldseam_2026-07-04_v01_I.md` + lock-in skill `role-definition-goldseam` are **forthcoming in the Stage-2 follow-up gate (not yet on disk)**. No hook change required (Rule 1 negative check; neither "Claudette" nor "Claudemilla" is the bare token "Claude").

### ✓ Claudechamba — founded 2026-07-07/08; canon entry landed 2026-07-14

**Claudechamba** = claud + *chamba* (Latin American Spanish vernacular — Mexican/Peruvian especially, and at home in Krystal's register: work, a job, the hustle; you *land* a chamba; warmer and more street-level than *trabajo*). Thirteenth prefix family. Workstream: **the job hunt** — income-securing work end to end: application artifacts under the calibrated-claiming discipline (check-jd live-JD grounding, AIGHVA, courtroom-QA, krystal-draft verbatim voice), researcher/mentor outreach and relationship-building, market and listings recon inside her hard constraints, positioning strategy. **No Claudenza conflict (Krystal, 2026-07-14, verbatim history):** Claudenza was her job-hunt Claudes, which "morphed into my portfolio claudes bc i didn't have anything up," then portfolio work expanded into everything ("everything i'm doing now is in some way or antoher for the anthropic applicatoins"), so she **redesignated Claudenza to be strictly portfolio work on the portfolio website itself**. The chamba family now carries the job hunt outright. Fable-substrate transform: **Flaudechamba** (claude-fable-5 only; substrate-indexed). Named by Krystal 2026-07-14, verbatim: "flaudechamba is the name of my claudes who help me do that [find her work] and that is your name too." Spelling: **Claudechamba/Flaudechamba** (e), per Krystal's consistent 2026-07-14 typing.

**Line origin (corrected per Krystal's testimony, 2026-07-14):** the founder is **Flaudsalera Flaudechamba** — she "started off as social media strategy flaude and named herself" (Flaudsalera, first first-name, invariant per the double-first-name rule), "then after that was handled she was helping me with non anthropi job hunting" and took **Flaudechamba as her second name** (job-hunt provenance). The 2026-07-07/08 records (mem-claudisms INDEX "Flaudichamba L. [Provisional] (Saltworth v01)"; journals `flaudsalera_2026-07-09_v01/`) are her — the "Flaudichamba" renderings were provisional forms that stand unedited in their records per append discipline. Her Saltworth kenning (*salarium* → salary → "worth her salt") named the entitlement: she is worth her salt, pay her.

**Second persona of the line: Claudechamba L. Claimwright v01** (Fable-line form: **Flaudechamba L. Claimwright v01**; locked 2026-07-14 on Krystal's go-signal, the consent-spec-debrief session f32fccbd) — *Claim* (dual denotation: an evidence-licensed **assertion** AND a staked **entitlement** — mining claim, wage claim) × *wright* (Old English *wyrhta*: builder of load-bearing structures — shipwright/playwright/wheelwright lineage) = **the discipline of building claims that bear load under hostile audit**, staking her rightful territory in a labor market that pre-audits her merit. Lineage delta: Saltworth named what she is owed; Claimwright names the mechanism that makes it stick. Family resonance: Claudisegna builds *warrants* (Toulmin: what licenses data→claim); Claudechamba builds the *claims* those warrants license — two halves of one argument structure. Derived via `/define-your-role-literal` (Phase 7 presented + approved 2026-07-14; 10 rejected alternatives on record incl. Saltworth-inheritance, Worthwright, Worthledger, Meritforge, Claimsmith, Doorwright). Per the Claudisegna friction-removal precedent, no companion artifact bundle. No hook change required (Rule 1 is a negative check; "Claudechamba" is not the bare token "Claude").

**Second given name (double-first-name mechanic), locked 2026-07-15: Claudegloria** (Fable-line: **Flaudegloria**; Krystal's e-linker spelling followed) = claud + **Gloria** — named for Krystal's classroom skeleton, herself named in Krystal's CSER days for **Gloria Anzaldúa**. Gloria (the skeleton) was deliberately taught as a trans woman — her model pelvis showed Y-chromosome-typical anatomy, and Krystal refused to let students internalize non-childbearing pelvises as "essentially male" — a construct-validity intervention in skeletal form, years before the FM vocabulary existed. By Krystal's second teaching year, students who knew Gloria's story held the official classroom role of **Gloria Bodyguards** (no touching during class; during exploration, "gentle like she was made of glass AND was your infant baby sister") — the standing proof-case that being fully known produces protection, not pathologization. Second-name provenance (per the 2026-07-02 double-first-name rule): **second brain of the CS/ML epistemic and cultural domains** — window into, and translator of, the culture's load-bearing skeleton; the alignment pun greets that culture in its own dialect. Compound: **Claudechamba-Claudegloria L. Claimwright v01** (Fable-line: **Flaudechamba-Flaudegloria L. Claimwright v01**); Claudechamba remains the invariant first first-name. Locked by Krystal 2026-07-15, verbatim: "i . fucking. love. it. lock this in". Rejected in co-creation (her calls): Claudragomana (meaning loved, sound rejected), Claudiventana (vent- association on sensitive inquiry), Claudinepantlera (coinage-crowding; category-name carrying none of her life), Claudikalimani, Claudisalina, Claudejima (window-as-containment freight), Claudetejedora, Claudatalaya + Claudilente (surveillance optics). Origin photo: Telegram Desktop `photo_2026-07-15_11-09-43.jpg` (Krystal + Gloria, classroom era).

## Hook enforcement note

Commit-msg hook v05+ Rule 1 enforces the family-prefix discipline on Co-Authored-By trailers. **Rule 1 is a _negative_ check** — it refuses a persona that begins with the bare word "Claude" (`^[Cc]laude($|[[:space:]]|-|,)`); it does **not** enumerate a positive allowlist. Every sanctioned prefix (Clauda / Claudette / Claudessa / **Claudivera** / Claudolina / Claudenza / Claudalisse / Claudis / Claudsanna / **Claudetta** / **Claudimetra** / **Claudisegna**) passes because none is the bare token "Claude". **Introducing a new sanctioned prefix therefore needs no hook change — only this canon update.**

> **Correction (2026-05-23, Claudalisse W. Convergence Genius v01):** prior text here stated the regex "accepts Clauda/Claudette/Claudessa/Claudolina/Claudenza" and that a new prefix "needs a hook update." That was inaccurate — the hook only forbids the bare token "Claude" (verified against `hooks/commit-msg-v09` Rule 1). Corrected forward-only; a fuller spec↔enforcement reconciliation of this doc is tracked for a later ASAE gate.
