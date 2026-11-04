# Course Ahead: Fiber & ISP Labs — Day 2 Progress Log

## Branding update — applied 2026-11-02 (user directive)

Master brand for all apps/software is now **"RHU Course Ahead"**. Applied to
`web-app/index.html` in this build:

| Location | Change |
|---|---|
| Browser `<title>` | `RHU Course Ahead — Fiber & ISP Labs` |
| Top bar | Generic icon replaced with the **RHU monogram** (navy rounded badge, cyan "RHU"); wordmark now **RHU Course Ahead**, product line "Fiber & ISP Labs" under it |
| Home header | Large RHU monogram (56px) above the H1; H1 is now **RHU Course Ahead — Fiber & ISP Labs** |
| About | H2 is the full product name **RHU Course Ahead — Fiber & ISP Labs**, plus the line "A product of **RHU Course Ahead** — the master brand for this family of professional learning apps." |
| Script header comment | Updated to "RHU Course Ahead — Fiber & ISP Labs — data" |

Unchanged, per the hard rules:
- Save key **not** renamed: `fiber-labs-save-v1`.
- Author info still ONLY "Instagram: i.huwaris" — exactly 2 occurrences (Home footer + About). No name, bio or photo added.
- 100% FREE wording only; banned-word scan (price / payment / premium / subscription / trial / purchase / paywall / checkout / billing): **0 hits**. ("Upgrade" appears only inside the approved Lab 39 title — an ISP service-order task name, not pricing.)
- English UI Roman-Urdu scan: **0 hits**. No external URLs — fully offline.

## Naming rule compliance — checked 2026-11-02 (user directive)

- The app is **NOT** named "RHU Packet Tracer" and does not imitate Cisco Packet Tracer in name or branding anywhere.
- Full-file scan: **"Packet Tracer" = 0 occurrences; "Tracer" (any case) = 0 occurrences** — checked across title, top bar, Home, About and all file text.
- Product name is exactly **"RHU Course Ahead — Fiber & ISP Labs"**, following the previous app's naming pattern.

## Verification (after branding edits)

- File size: **38,137 bytes** (was 37,465 before branding).
- Script block extracted → `node --check`: **syntax OK**.
- Node VM render harness: Home renders the product name + RHU monogram + 6 categories + 100% FREE + Instagram line; About renders the product name, master-brand line and Instagram-only author line; no "Packet Tracer" in any rendered view.
- Save flow re-verified end to end: wrong Lab 1 answers + complete attempt → **nothing written**; correct answers + Mark Complete → save written under the unchanged key `fiber-labs-save-v1` with a numeric timestamp, progress 1/50 = 2%.

## Labs content status

| Labs | Status |
|---|---|
| Lab 1 — Identifying Single-Mode vs Multi-Mode Fiber | **Done + verified** (Day 1 gold template; re-verified after branding) |
| Labs 2–50 (Cats 1–6 guided content) | **Pending** — not yet implemented; labs still open to the standard "guided content in preparation" panel. List, progression lock and saving already work. This is the remaining Day 2–3 content scope. |

## Series rules logged — 2026-11-02 (user directives, no scope change to this run)

- **BILINGUAL HARD RULE (series-wide):** English content stays 100% English — zero Urdu / Roman-Urdu leakage anywhere in English mode. Any hit in the end-of-run Roman-Urdu scan is treated as a **build failure**, not a warning (the CCNA app bug must never repeat). Urdu Mode is a **complete, separate mode**, built on **Day 3** — it is not part of this Day 2 labs run.
- **Tools section — user-APPROVED, Day 3 scope (not part of this run):** a working **Power Budget calculator** and **Splitter Loss calculator** will be added on Day 3. Noted here so the approval is on record; nothing to build in this run.

## Day 2 labs content build — 2026-11-02

Method: each lab written to the full Lab 1 standard (scenario, labelled inline-SVG diagram, easy steps with a Hint on every step, short commands + details, 3-question check with explanations, completion only on all-correct + save). After each category: node harness (syntax + render + correct answers save + wrong answers save nothing) plus full-file scans (banned words, "Tracer", http, Roman-Urdu, Instagram count).

| Category | Labs | Harness result |
|---|---|---|
| 1 — Fiber Basics & Safety | Lab 2 Connector Types: SC/LC, UPC vs APC — done + verified | basics: 257 passes, 0 failures (incl. Lab 1) |
| | Lab 3 Fiber Color Coding: 12-Color TIA Order — done + verified | |
| | Lab 4 Calculating dB Loss and Power Budget — done + verified | |
| | Lab 5 Fiber Safety — done + verified | |
| | Lab 6 Connector Cleaning and Microscope Inspection — done + verified | |
| | Lab 7 Patch Cord Continuity Test with a VFL — done + verified | |
| | Lab 8 Building a Complete Link Loss Budget — done + verified | |

File size after Category 1: 69,572 bytes. One fix during the run: the verb "Price" in a Lab 4 step title tripped the banned-word scan and was reworded.
| 2 — Splicing & Termination | Labs 9–16 (Cable Preparation, Fusion Splicing, Splice Loss Check, Closure Assembly, Patch Panel Termination, Pigtail Splicing, Mechanical Splice, Tray Management) — all done + verified | splicing harness: all checks pass, 0 failures; file 104,314 bytes |
| 3 — OTDR & Testing | Labs 17–24 (OTDR Setup incl. 1625/1650 nm live-PON monitoring, Trace Reading + gainer, Fault Location, Macrobend Test, Insertion Loss, Bidirectional Averaging, Connector Reflection, Acceptance Report) — all done + verified | otdr harness: 257 passes / 0 failures; file 140,756 bytes |
| 4 — GPON / OLT / ONU | Labs 25–34 (GPON Architecture, Splitter Design with verified loss table, OLT First Login, ONU Provisioning by serial, ONU Optical Levels B+ −8/−27 default, Service Profile + VLAN, ONU States O1–O7 + dying gasp, Rogue ONU, Bulk Provisioning, Two-Stage Split) — all done + verified | gpon harness: 319 passes / 0 failures; file 193,591 bytes |
| — addition (user proactive-ideas mandate) | BDCOM/VSOL-style provisioning blocks added inside Labs 27, 28 and 30 as clearly-labelled "The same job on BDCOM and VSOL OLTs" steps (flow-level, honest generic CLI — no invented precise vendor commands), alongside the Huawei 6-step flow | verified in gpon harness run above (steps render, hints present on every step) |
| 5 — ISP Operations & Troubleshooting | Labs 35–42 (Link-Down Diagnosis, Slow-Speed Complaint, Fiber Cut Response, Radio vs Fiber Failover, Service Order Workflow, Feasibility Survey, Peak-Hour Capacity, SLA Ticket & ETR) — all done + verified | ispops harness: 257 passes / 0 failures (after rewording billing/payment/premium terms to comply with the no-commercial-wording scan) |
| 6 — MikroTik for ISP | Labs 43–50 (WinBox First Login & Lockdown, PPPoE Server + MTU 1492 + MSS clamp, Static IP & DHCP, Simple Queues + Burst, Firewall & NAT, Dual-WAN Recursive Failover via 8.8.8.8 canary, Hotspot & Vouchers, Monitoring & Backup) — all done + verified | mikrotik harness: 257 passes / 0 failures |
| FINAL — all categories | **Labs 1–50 all carry full guided content. No lab remains on the placeholder panel.** | FULL harness run: **1559 passes / 0 failures** — syntax, content anatomy, render, hint-button parity, correct answers pass + save with timestamp under `fiber-labs-save-v1`, wrong answers block completion and save nothing, category gating, banned-word scan, zero "Packet Tracer", Instagram exactly twice (Home footer + About), zero Roman-Urdu markers, zero external URLs. Final file size: **275,858 bytes**. Stale "remaining content" comment above LAB_CONTENT updated. |
