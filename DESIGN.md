# Course Ahead: Fiber & ISP Labs — Design Specification (Day 1)

App 1 of the Course Ahead Simulator Series. A fully offline, single-file web app
(same proven engine family as Course Ahead CCNA Labs: view navigation, local
progress save, progression lock) with a completely new **professional** skin.
No mascot, no cartoon elements, no Kids Mode, no playful styling anywhere.

---

## 1. Visual identity — professional theme

Target look: the clean, dense, trustworthy UI of large professional network
tools (think enterprise NOC dashboards and vendor consoles), not a game.

### Palette (dark navy + cyan)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#081120` | App background (deep navy) |
| `--bg2` | `#0b1a30` | Raised background / header band |
| `--panel` | `#0f2238` | Cards and panels |
| `--panel2` | `#0c1c30` | Inset panels, code blocks |
| `--line` | `#1d3a57` | Borders, dividers |
| `--ink` | `#e8f1f8` | Primary text |
| `--muted` | `#8fa9bd` | Secondary text |
| `--cyan` | `#29b7dd` | Primary accent, links, active states |
| `--cyan-d` | `#7fd4f2` | Accent text on dark |
| `--ok` | `#2fbf71` | Success / verified / completed |
| `--warn` | `#e8a13a` | Caution states |
| `--bad` | `#e5534b` | Errors / failed checks |

Background: flat `--bg` with a very subtle vertical gradient to `--bg2`.
No patterns, no dots, no confetti, no emoji decoration in the UI chrome.

### Typography
- Font stack: `"Segoe UI", system-ui, -apple-system, Roboto, sans-serif`
- Headings: 600 weight, tight letter-spacing, sentence case
- Body: 15–16px, line-height 1.55
- Commands / values: `"Cascadia Mono", Consolas, monospace` on `--panel2`

### Layout & components
- Max content width 1060px, 16px gutters, 8px spacing grid
- Cards: 1px `--line` border, 12px radius, no heavy shadows
- Buttons: solid cyan primary, outline secondary; 10px radius; min height 44px
- Icons: inline SVG line icons only (stroke-based, 1.8px stroke, currentColor)
- Top bar: app wordmark left, overall progress + About right — always visible
- Bottom padding sized for mobile; layout is tested at 360px width first

## 2. Screens

1. **Home** — app title, one-line description, overall progress bar + %,
   6 category cards (name, lab count, per-category progress, lock state),
   a Custom Lab Builder entry card, footer note (100% FREE + Instagram).
2. **Category** — category title, progress, list of its labs (number, title,
   minutes, state: open / done / locked).
3. **Lab** — the standard lab screen (Section 3). Used by every lab.
4. **Custom Lab Builder** — a safe pre-testing sandbox (see the design
   principle below): concept line, device palette
   (OLT, ONU, Splitter, OTDR, Fusion Splicer, MikroTik Router, PC),
   canvas area, and an effect-preview panel. Full drag/connect/test
   logic arrives Day 2–3.
5. **About** — app name, what it is, "100% FREE" statement, and the only
   author line in the whole app: **Instagram: i.huwaris**. Nothing else.

### Custom Lab Builder — design principle: safe pre-testing

The Builder exists for one reason: **safe pre-testing of real-world changes.**

> **Test here first — break it in the app, not on the live network.**

A technician often knows the change he wants to make but is afraid of its
side effects on a production network. Example: an engineer wants to apply a
new firewall policy on a real network, but fears the policy will bring the
network down — or lock him out of the firewall itself. In the Builder he
builds the same setup, applies the same policy, and sees the result first.

Therefore the Builder must always show the **simulated effect** of an
action before the user applies it in the real world:

- **Traffic verdicts** — which traffic the change would allow and which it
  would block, shown on the affected links/devices.
- **Conflict warnings** — rules or settings that contradict each other
  (for example a new policy that conflicts with an existing rule).
- **Lockout-risk warnings** — any action that would cut the user's own
  management/access path (for example blocking the admin's own access to a
  router or firewall) is flagged as a lockout risk before it is "applied".

The same principle applies beyond firewalls: a queue change, a VLAN or
service-profile change, a PON power problem — the user tries it in the app,
watches the simulated effect and the warnings, fixes the mistake here, and
only then touches the live network.

Builder screen anatomy: concept line carrying the principle above, device
palette, canvas, and an **effect-preview area** where verdicts and warnings
appear. Safe pre-testing is not an extra feature of the Builder — it is
the Builder's core purpose, and the Day 2–3 logic is built around it.

## 3. The standard lab screen (every lab, no exceptions)

Fixed top-to-bottom anatomy — this is the quality template for all 50 labs:

1. **Header** — lab number + title, category, estimated minutes, state chip.
2. **Scenario box** — a short real-world situation (2–4 lines): where the
   technician is, what the customer/field problem is, what "done" looks like.
3. **Diagram / picture area** — a labelled diagram of the setup for this lab
   (inline SVG: devices, cables, ports, values). Every lab has one.
4. **Steps** — numbered, easy-language instructions, one action per step.
   Each step may carry:
   - **Hint button** — reveals a short hint for that step only.
   - **Command block** — the short command(s) for the step, in mono type,
     with a **Details** line under it explaining what the command does and
     what output to expect.
5. **Check / Verify step** — the final block: a concrete verification
   (questions or an observable result) the learner must pass. Only then does
   the **Mark Lab Complete** button enable.
6. **Completion** — writes progress to the save file, updates home progress,
   and unlocks the next category when a category is finished.

## 4. Progression & saving

- Save key: `fiber-labs-save-v1` (localStorage, JSON:
  `{ done: { labId: timestamp }, lastLab: labId }`).
- Category 1 is open from the start. Category *N* unlocks when every lab in
  category *N−1* is complete. Locked items show a lock icon and a plain
  explanation — always with the "100% FREE" reassurance, never a paywall.
- Progress % = completed labs / 50, shown on Home and in the top bar.

## 5. Hard content rules (series-wide)

- Author info: **only** "Instagram: i.huwaris". No name, no bio, no photo.
- 100% FREE wording only. The words price / payment / premium / upgrade /
  subscription / trial never appear.
- English UI: professional English only — zero Roman-Urdu words in any
  string. (An Urdu mode, if added later, is a separate explicit toggle.)
- Every lab: scenario + diagram + steps + per-step hints + short commands
  with details + a verify step. No lab ships half-built.
- Fully offline. No external requests, no fonts/CDN — everything inline.

## 6. Day 1 state

- DESIGN.md (this file) + `web-app/index.html` skeleton.
- All 6 categories and all 50 lab titles loaded from a data structure.
- Lab 1 (Identifying Single-Mode vs Multi-Mode Fiber) implemented in full
  as the gold template for the remaining 49 labs.
- Custom Lab Builder screen present as a placeholder (palette + canvas +
  effect-preview area), with its safe pre-testing principle documented
  in Section 2.
- Remaining lab content, Quiz Arena, tickets, mock test and certificate
  are Day 2–3 work; packaging (APK / EXE / repo) is Day 4.
