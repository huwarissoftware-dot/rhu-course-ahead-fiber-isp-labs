# RHU Course Ahead — Fiber & ISP Labs

A fully offline, hands-on simulator app for fiber-optic and ISP field skills —
built for students and working technicians who want to practise on a safe
simulated network before touching a live one.

**Test here first — break it in the app, not on the live network.**

## What's inside

- **50 hands-on labs** in 6 categories, each with a real-world scenario, a
  diagram, step-by-step guided tasks with hints, and a knowledge check:
  1. Fiber Basics (8) — connectors, colour code, dB & power, safety, cleaning, VFL, link budget
  2. Splicing & Closures (8) — cable prep, fusion splicing, closures, patch panels, trays
  3. OTDR Testing (8) — setup, trace reading, fault location, macrobends, acceptance reports
  4. GPON Networks (10) — OLT/ONU provisioning (incl. BDCOM/VSOL-style flows), splitters, optical levels, rogue ONU
  5. ISP Operations (8) — link-down diagnosis, fiber-cut response, failover, SLA tickets & ETR
  6. MikroTik for ISP (8) — WinBox lockdown, PPPoE (MTU 1492 + MSS clamp), DHCP, queues, NAT/firewall, dual-WAN failover, hotspot, monitoring & backup
- **Custom Lab Builder** — build your own GPON / MikroTik topology and preview
  the effect of a planned change (traffic verdicts, conflict warnings and
  lockout-risk warnings) before applying it on a real network.
- **Tools** — Power Budget Calculator (Class B+/C+ pass-fail), Splitter Loss
  lookup (verified loss table) and a dBm ↔ mW converter.
- **Quiz Arena** — 6 category quizzes × 10 questions drawn from the labs.
- **Helpdesk Tickets** — 9 realistic ISP customer scenarios to resolve step by step.
- **Mock Test** — 30 questions, 30 minutes, CFOT-style 70% pass mark.
- **Certificate** — issued when all 50 labs are complete (unique ID, 2-year validity).
- **Interview Mode** — 20 NOC / fiber-technician interview Q&As with model answers.
- **Bilingual** — full English and full Roman-Urdu modes; English mode is
  100% English, Urdu mode is complete and separate.
- **Progression** — categories unlock in order as you complete them; progress
  is saved on the device. The app is completely free — no price, no payments,
  no upgrades.

## Deliverables (one codebase, three builds)

| Build | Where | How |
|---|---|---|
| Web app | `web-app/index.html` | Single offline HTML file — open in any browser |
| Android APK | `android-apk/` | Native WebView wrapper, release-signed — see `android-apk/BUILD.md` |
| Windows Setup | `windows-exe/` | Electron app + file-based NSIS installer — see `windows-exe/BUILD.md` |

## Verification

`tests/day4-verify.js` boots the real app in a VM and drives it end-to-end:
all 50 labs completable in English and in Urdu, quizzes, tickets, mock test,
builder verdicts, tools math against published worked examples, certificate
issuing and save persistence. Day 4 result: **52 PASS / 0 FAIL**.

## Author

Publisher: Raja Huwaris Usmani — RHU Course Ahead
Contact: Instagram: i.huwaris

Copyright (C) 2026 Raja Huwaris Usmani. All Rights Reserved — see `LICENSE.txt`.
This is an independent educational application; vendor names in the labs are
trademarks of their respective owners.
