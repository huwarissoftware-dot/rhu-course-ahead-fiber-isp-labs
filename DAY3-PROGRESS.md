# Course Ahead: Fiber & ISP Labs — Day 3 Progress Log

Scope: Builder logic · Tools · Quiz Arena · Helpdesk Tickets · Mock Test · Certificate · Interview Mode + More Apps · Urdu Mode.
Method: features built in plan order; each block harness-verified (node VM: render + interaction + save behaviour) before the next starts; final scans in both language modes.

## Structural prep — done
- 7 new view sections added (tools, quiz, tickets, mock, cert, interview, apps); Day-3 CSS added; top bar gained a language toggle button.
- Bilingual layer started in the main script: LANG (own key `fiber-labs-lang-v1`, save key untouched), TT() helper, category/lab title helpers, featCard() for the home feature grid; home + category renderers now language-aware; home shows the 7 feature cards.

## Blocks
| # | Block | Status |
|---|---|---|
| 1 | Custom Lab Builder logic | **done + verified** — harness 27/27 (shared with Block 2): GPON preset path ALLOWED; empty canvas BLOCKED; firewall block-all through own path → lockout warning; mgmt-subnet rule → lockout; port-3389 rule → safe OK; VLAN mismatch → blocked verdict; queue below plan → warning |
| 2 | Tools (Power Budget, Splitter Lookup, dB Converter) | **done + verified** — worked example A exact: 10 km @1550 + 6×0.1 splices + 4×0.3 connectors + 1:32 (16.5) + 3.0 margin = **25.3 dB, PASS B+, Rx −22.3 dBm**; 1:64 variant = 29.3 dB → fails B+, passes C+; splitter design values 1:32 = 16.5 / 1:64 = 20.5; 0 dBm = 1 mW, 10 dBm = 10 mW, 100 mW = 20 dBm |
| 3 | Quiz Arena (6 × 10) | **done + verified** — questions derived from each category's lab check questions (facts trace to labs); perfect-score run saves best=10; unanswered submit refused |
| 4 | Helpdesk Tickets (9) | **done + verified** — 9 authored ISP tickets × 3 decision steps; wrong pick → hint feedback, right pick → consequence feedback; full t1 flow resolves and persists in save.tickets |
| 5 | Mock Test (30, timed, 70%) | **done + verified** — 30 questions via stride-7 selection across all 50 labs, 30-min countdown, ≥21 PASS; ace run saves mockBest=30, later fail does not lower it |
| 6 | Certificate | **done + verified** — locked panel below 50/50; name-only claim form; issued doc shows name, course name, ID (RHU-FIB-YYYYMMDD-CODE), issue date, valid-until = issue + 2 years, "Instagram: i.huwaris" connect line, RHU watermark |
| 7 | Interview Mode + More Apps | **done + verified** — 20 authored NOC/fiber Q&As (EN + UR model answers) in accordions; More Apps screen: 6 series apps, CCNA = Available now, this app = This app, 4 × Coming soon (honest wording) |
| — | Combined harness after Blocks 3–4 | **62 PASS / 0 FAIL** (27 base + 35 new) |
| 8 | Urdu Mode | **done + verified** — dedicated bilingual harness **60 PASS / 0 FAIL** (27 base + 33 bilingual checks); coverage detailed below |

## Urdu coverage (exact)
Fully Urdu screens (no English body text; technical terms/commands stay English, CCNA pattern):
- Home, category lists, all 6 category titles/descs, all 50 lab titles
- **Labs 1–8 (the complete Fiber Basics category)**: full content — scenario, diagram (Urdu-captioned), all steps + hints, all check questions. Command blocks stay English (technical)
- Custom Lab Builder (chrome + all verdicts/conflicts/lockout warnings via TT)
- Tools (all labels; numeric tables are language-neutral)
- Quiz Arena chrome + **Basics quiz fully in Urdu** (drawn from LAB_UR checks)
- Certificate screen + issued certificate (labels bilingual; name/dates/ID are data)
- Interview Mode (all 20 Q&As have full Roman-Urdu versions)
- More Apps, About (full Urdu version)
- Tickets list (all 9 titles + customer lines translated)

Honest gaps — these show a **fully-Urdu notice screen** in Urdu mode (never a mixed screen):
- Labs 9–50 body content (notice offers one-tap switch to the same lab in English)
- Quizzes for the other 5 categories; Mock Test questions; ticket decision steps (ticket list itself is translated; the run screen stays English-mode only)

## Final scans (on the shipped file, 391,076 bytes)
- "Tracer" occurrences: **0** · external resource loads (src/href http): **0** · http strings anywhere: **0** (fully offline)
- Arabic-script characters: **0** (Urdu mode is pure Roman Urdu, CCNA pattern)
- Monetization wording: **none** — the only scan hits are ISP domain terms inside ticket content ("customer's billing record" = a wrong-answer option; "oversubscription" = PON capacity term). "Upgrade" appears only in Lab 39's approved title
- Author info: only "Instagram: i.huwaris" (home footer, About EN+UR, certificate connect line, More Apps footer) — no other author details anywhere
- English-mode purity: harness renders home/cat/lab in EN with zero Roman-Urdu marker hits; toggling UR→EN restores the original English lab content exactly (content-swap is reversible, snapshot-based)
- Save key unchanged: `fiber-labs-save-v1`; Day-3 fields (quiz, tickets, mockBest, cert) added lazily onto the same save object; language persists separately under `fiber-labs-lang-v1`

## Harness totals (final)
- harness.js (Blocks 1–2): **27 PASS / 0 FAIL**
- harness2.js (Blocks 1–4): **62 PASS / 0 FAIL**
- harness3.js (Blocks 1–2 + Urdu): **60 PASS / 0 FAIL**

## Day 3 status: ALL 8 BLOCKS COMPLETE. File: web-app/index.html = 391,076 bytes, fully working offline. Remaining for Day 4 (not in Day-3 scope): GitHub repo, release-signed APK, Windows EXE.
- URDU COMPLETION (retry): Splicing labs 9–16 full Roman-Urdu added + verified (harness 54/54: UR render no notice, EN restore exact, splicing quiz live in UR).
- URDU COMPLETION: OTDR labs 17–24 full Roman-Urdu added + verified (harness 54/54). Fix landed en route: setLang now swaps ALL lab content both ways (Day-3 per-lab swap left stale Urdu in LAB_CONTENT, which EN quizzes/mock could serve) and buildMock reads LAB_UR in UR mode; mock UR notice removed. Day-3 harness3 gap-assertions for lab-20 now fail by design (notice intentionally gone).
- URDU COMPLETION: GPON labs 25–34 full Roman-Urdu added + verified (harness incl. UR gpon quiz live + UR/EN mock question sourcing checks).
- URDU COMPLETION: ISP Ops labs 35–42 full Roman-Urdu added + verified (harness incl. UR ispops quiz live).
- URDU COMPLETION: MikroTik labs 43–50 full Roman-Urdu added + verified (harness 65/65, incl. command blocks unchanged, UR mock now fully Urdu across all 50 labs, EN mock pure). NOTE (pre-existing, not changed): MikroTik LABS/__URL titles for labs 45/46/47/49/50 name different topics than their LAB_CONTENT bodies (titles say Queues/Hotspot/DHCP/Firewall/Suspend; bodies are DHCP/Queues/NAT-Firewall/Hotspot/Monitoring) — translations follow the content bodies.
- URDU COMPLETION: Helpdesk tickets fully Urdu (TK_UR extended with problem/steps/resolution for all 9; renderer rewired via tkProblem/tkSteps/tkRes + TT chrome; UR gate and list notice removed) — harness 19/19 incl. full t1 resolution in UR.

## Urdu coverage — FINAL (completion run, supersedes the gap list above)
**Coverage: 100%.** Every Urdu-mode notice screen is replaced with the real full Roman-Urdu translation:
- **Labs 9–50 bodies complete** (scenario, Urdu-captioned urDia diagrams, all steps + hints, all check questions) — Splicing 9–16, OTDR 17–24, GPON 25–34 (BDCOM/VSOL steps included), ISP Ops 35–42, MikroTik 43–50. Command blocks stay English verbatim (verified identical to EN for MikroTik).
- **Quizzes for all 6 categories** live in Urdu (drawn from LAB_UR checks) — perfect-run saves verified per category.
- **Mock Test questions fully Urdu** (buildMock reads LAB_UR in UR mode; all 30 sampled questions verified Urdu; the mock intro notice panel removed).
- **Ticket decision steps fully Urdu**: TK_UR extended with problem + 3 steps (q/opts/hint/fb) + resolution for all 9 tickets; renderer rewired (tkProblem/tkSteps/tkRes, TT chrome); the UR-mode gate in openTicket and the tickets-list notice removed. Full t1 run resolves in Urdu and persists.
- Mechanism fix: setLang now swaps ALL LAB_CONTENT entries both ways, so EN mode can never serve stale Urdu via quizzes/mock after a UR session (Day-3 per-lab swap flaw).
- The 3 remaining "tayyar ho raha hai" strings are unreachable fallback code paths (lab notice + quiz fallback); the final suite proves no notice renders for any lab/quiz/mock/ticket.
- Harness evidence (this run): splicing 54/54 · otdr 54/54 · gpon 70/70 · ispops 54/54 · mikrotik 65/65 · tickets 19/19 · FINAL comprehensive bilingual suite 21/21 · Day-3 regressions: harness 27/27, harness2 62/62 (harness3's 4 gap-assertions — lab-20 notice, gpon-quiz-null, ticket gate — fail by design now that the gaps are closed).
- Final scans on shipped file (563,001 bytes): "Tracer" 0 · http strings 0 · Arabic-script chars 0 · save keys unchanged (fiber-labs-save-v1, fiber-labs-lang-v1) · LAB_UR entries = 50/50.
- Remaining for Day 4 (unchanged): GitHub repo, release-signed APK, Windows EXE.
