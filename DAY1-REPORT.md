# Course Ahead: Fiber & ISP Labs — Day 1 Report

Day 1 scope: professional theme/design + working app skeleton, per
`DESIGN.md` and the approved series plan
(`Course-Ahead-Simulator-Series-Plan.md`). No APK / EXE / repo — packaging
is Day 4, as planned.

## Files

| File | Size | State |
|---|---|---|
| `DESIGN.md` | 7,514 bytes | Done (previous builder) — theme spec, lab anatomy, Builder "safe pre-testing" principle |
| `web-app/index.html` | 37,465 bytes | **Completed this session** — was 15,273 bytes ending mid-script; render/navigation engine, Lab 1, view wiring and closing tags added |
| `DAY1-REPORT.md` | this file | Day 1 record |

## What works now

- **Navigation** between all five views — Home, Category, Lab, Custom Lab
  Builder, About — through a single `showView` switch, with the top bar
  (wordmark, live progress, About) always visible.
- **Home**: app title + description, overall progress bar and %, all
  **6 category cards** (lab count, per-category progress, Open / Complete /
  Locked chip), Custom Lab Builder entry card, footer carrying the
  100% FREE line and the only author line: **Instagram: i.huwaris**.
- **Category screens**: list **all 50 labs** (data-driven) with number,
  title, minutes and state (Open / Done / Locked). Category 1 is open;
  category *N* stays locked — with a plain on-screen explanation — until
  every lab in category *N−1* is complete. No paywall wording anywhere.
- **Progress saving**: `localStorage` key **`fiber-labs-save-v1`**
  (`{ done: { labId: timestamp }, lastLab }`), written only on verified
  lab completion, reloaded on start; progress % = completed / 50, shown
  on Home, on each category, and in the top bar.
- **Lab 1 — "Identifying Single-Mode vs Multi-Mode Fiber" — fully working
  gold template**, following the DESIGN.md anatomy exactly:
  scenario box → labelled inline-SVG diagram (SM yellow/OS2 9 µm vs MM
  orange/OM3 50 µm, light paths) → 4 easy steps, **each with its own Hint
  button**, short command blocks and Details lines → 3-question check with
  per-question explanations → **Mark Lab Complete activates only when
  every answer is correct**, then writes progress and shows the completed
  state. Wrong and partial answers are rejected; completion cannot be
  forced without passing.
- **Labs 2–50** open to the standard lab header with a "guided content in
  preparation" panel — their structure, progression and saving already
  work; the written content itself is Day 2–3 work (per plan).
- **Custom Lab Builder** screen reachable from Home, carrying the
  documented safe pre-testing copy ("Test here first — break it in the
  app, not on the live network"), the 7-device palette (OLT, ONU,
  Splitter, OTDR, Fusion Splicer, MikroTik Router, PC), a working canvas
  (devices can be placed and removed), and the effect-preview panel
  describing traffic verdicts, conflict warnings and lockout-risk
  warnings. The simulation logic itself is Day 2–3.
- **About** screen: app description, 100% FREE statement, offline note,
  and the single author line **Instagram: i.huwaris** — nothing else.

## Hard rules — verified

- Author info: `Instagram: i.huwaris` appears exactly **2 times** (Home
  footer + About). No personal name, no bio, no photo anywhere in the file.
- 100% FREE wording only; whole-word scan for
  price / payment / premium / subscription / trial / purchase / paywall:
  **0 hits**. One honest exception to note: the word "Upgrade" appears
  once, inside Lab 39's approved title *"Bandwidth Upgrade Order: Service
  Order Workflow"* — it names an ISP service-order task from the plan,
  not any pricing or upsell wording.
- English UI: whole-word Roman-Urdu scan over the full file: **0 hits**.
- Professional theme only: palette/typography per DESIGN.md, inline SVG
  line icons, no mascot, no cartoon elements, no Kids Mode.
- Fully offline: no external URLs (http/https) anywhere in the file;
  everything inline.

## Verification evidence

- **Syntax**: the page's script block extracted and passed
  `node --check` — no errors.
- **HTTP**: served with `python3 -m http.server` — `HTTP 200`,
  37,465 bytes, served bytes identical to the file on disk.
- **Behaviour** (Node VM harness with a DOM/localStorage stub driving the
  real page script): **36 / 36 checks passed**, including —
  - data loads as 6 categories / 50 labs; Home renders all six titles,
    Builder entry and Instagram line;
  - Category 1 renders 8 clickable lab rows; Category 2 renders the lock
    explanation with non-clickable rows;
  - Lab 1 renders scenario, SVG diagram, 4 hint buttons, check section
    and the complete button;
  - wrong answers fail (`passed=false`), `completeLab()` stays blocked,
    and **nothing is written** to the save key;
  - partial answers (1 of 3) are rejected;
  - correct answers pass, completion writes
    `fiber-labs-save-v1` with a numeric timestamp for `lab-01` and
    `lastLab`, `doneCount=1`, progress = 2%;
  - a **simulated reload** (fresh script context, same storage) restores
    progress: Home shows "1 of 50 labs complete", Category 2 still locked;
  - Builder palette/effect-preview render, a device (OLT) can be placed
    on and removed from the canvas;
  - About renders the single author line.
- No browser engine (Chromium/jsdom) exists on this VM, so the page was
  not screenshot-tested; layout relies on the same CSS shell patterns as
  the verified CCNA Labs app, and the DOM checks above cover structure
  and behaviour. A visual pass on a real device remains part of the
  Day 4 pre-delivery verification, as with the previous app.

## Remaining for Day 2–3

1. **Written content for Labs 2–50** to the Lab 1 standard (scenario,
   diagram, hints, commands/details, check) — the big content block:
   Splicing, OTDR, GPON, ISP Operations, MikroTik categories.
2. **Custom Lab Builder logic**: connect devices, apply changes, and the
   effect-preview engine — traffic verdicts, conflict warnings,
   lockout-risk warnings (the Builder's core purpose per DESIGN.md §2).
3. Quiz Arena (6 quizzes × 10 questions), 9 ISP helpdesk ticket
   scenarios, 30-question mock test, and the certificate flow — per plan.
4. Urdu Mode toggle decision (engine feature from the CCNA app; not in
   the Day 1 skeleton — English only today).
5. Day 4: full self-verification of every lab end-to-end, then one
   combined delivery — GitHub repo + release-signed APK + Windows EXE.
