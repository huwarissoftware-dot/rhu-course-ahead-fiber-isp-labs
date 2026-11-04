# Day 4 — Final Packaging: COMPLETE

App: **RHU Course Ahead — Fiber & ISP Labs** · Publisher: Raja Huwaris Usmani · Contact in-app: Instagram: i.huwaris only.

## Step 0 — MikroTik title fix (done first)

The LABS list titles for labs 45/46/47/49/50 named different topics than their content bodies. Verified each body from its scenario/steps, then renamed (EN list + UR title map; ids, order, minutes unchanged):

| Lab | Body is actually about | New EN title | New UR title |
|---|---|---|---|
| 45 | DHCP server, IP pool, static leases | DHCP Server and IP Pool Management | DHCP Server aur IP Pool Management |
| 46 | Simple queues + burst | Simple Queues: Setting Bandwidth Plans | Simple Queues: Bandwidth Plans Set Karna |
| 47 | NAT (masquerade/dst-nat) + firewall | NAT and Firewall: Protecting the Node | NAT aur Firewall: Node ki Hifazat |
| 49 | Hotspot, profiles, vouchers | Hotspot Setup: Portal, Profiles and Vouchers | Hotspot Setup: Portal, Profiles aur Vouchers |
| 50 | Monitoring (graphing/Netwatch) + backups | Monitoring and Backup: Watching a Live Node | Monitoring aur Backup: Live Node ki Nigrani |

## 1. Final verification — `tests/day4-verify.js`: **52 PASS / 0 FAIL**

Fresh 3-boot VM harness driving the real app (DOM/localStorage stubs):
- **EN boot:** all 50 labs completed end-to-end through the real UI flow (openLab → answer checks → runCheck → completeLab), doneCount 50 / progress 100%; all 6 quizzes perfect-run (best 10 saved each); all 9 helpdesk tickets resolved; mock test perfect run (mockBest 30); certificate issued (ID format `RHU-FIB-YYYYMMDD-XXXXXX`, doc carries name, course, "Valid until" = +2 years, Instagram: i.huwaris); interview renders 20 Q&As.
- **Tools math (research worked examples, exact):** power budget 10 km @1550 + 6 splices + 4 connector pairs + 1:32 + 3 dB margin = **25.3 dB → PASS B+**, Rx **−22.3 dBm**; same link at 1:64 = **29.3 dB → FAIL B+ / PASS C+**; splitter design table 1:32 = 16.5 dB, 1:64 = 20.5 dB, strictly increasing; dB converter 0 dBm = 1 mW, 10 dBm = 10 mW, 100 mW = 20 dBm; pbRun UI renders the PASS verdict.
- **Builder verdicts:** GPON preset yields traffic verdicts; MikroTik + block-all → LOCKOUT RISK; mgmt-subnet rule → LOCKOUT RISK; port-3389 rule → no lockout + ok verdict; VLAN mismatch → blocking verdict.
- **Persistence boot:** fresh VM on the same localStorage store → 50 done, cert, mockBest 30, 6 quiz bests, 9 tickets all intact.
- **Urdu boot:** all 50 labs completed in Urdu mode with zero notice screens; UR titles for 45–50 verified; UR MikroTik quiz perfect; UR ticket t1 resolves; EN round-trip restores lab-45's original English body; EN home has zero Urdu markers.
- **Static scans on final file:** "Tracer" 0 · http/https strings 0 · Arabic-script chars 0 · fully offline. Final `web-app/index.html` = **563,071 bytes**, SHA-256 `26fbc67ce27ce3865f8d022f42bceab1a137764d5ce6a7a24d5b3b352646ecf4`.

## 2. GitHub repo (local, ready to push)

`git init` in `~/workspace/fiber-isp-labs/` + first commit (app source, README, LICENSE, DESIGN/reports, tests, android + windows build sources). `android-apk/release/` (keystore) and `dist/` are git-ignored, as in the CCNA pattern. No remote configured — no push attempted (no credentials flow approved).

## 3. Android APK — RELEASE-signed

- Native WebView wrapper (CCNA pattern, no Gradle/Capacitor), package `com.rhu.courseahead.fiberlabs`, label "RHU Course Ahead — Fiber & ISP Labs", min SDK 24 / target 35.
- **New keystore generated for this app:** `~/workspace/fiber-isp-labs/android-apk/release/courseahead-fiber.keystore` (alias `courseahead-fiber`, mode 0600; password stored only in the sibling 0600 `keystore.properties`, never printed). The build script has **no debug fallback** — it fails if the release keystore is missing.
- `apksigner verify`: **Verifies — v2 scheme true, v3 scheme true**; signer DN `CN=Raja Huwaris Usmani, O=Course Ahead, L=Karachi, ST=Sindh, C=PK`; cert SHA-256 `8c269ad221ac4c3b8a1f6ae70d936f54fdff9f25435f80db2aecff1fc1640aaf`.
- Payload identity: `assets/index.html` inside the APK hashes to the same SHA-256 as the final web app (26fbc67c…) — the APK ships exactly the verified build.

## 4. Windows EXE — NSIS FILE-BASED installer (no 7z)

- Electron runtime (v33.4.11) via electron-builder `--dir`; `resources/app.asar` contains the byte-identical final index.html (hash-checked after extraction from the asar).
- App exe stamped with resedit: RHU icon (**pixel-match verified** at all sizes) + CompanyName "Raja Huwaris Usmani" + product strings.
- `installer.nsi` embeds the whole win-unpacked tree as **individual files** (`File /r`, plain copy + shortcuts + WriteUninstaller on the user's machine). **No .nsis.7z, no Nsis7z plugin anywhere** — the CCNA v1 failure mode is designed out.
- Content proof: `7z l -slt` on the produced Setup — **all 73 payload files present, 0 missing**; only extras are the 3 MUI plugin files + uninstaller stub.
- Setup exe itself verified with inspect-exe: RHU icon pixel-match, CompanyName "Raja Huwaris Usmani", FileDescription correct.
- **Build gotcha found & fixed:** the POSIX makensis build segfaults when its recursive `File /r` scan meets a non-ASCII filename (proven with a 5-byte em-dash test file; the 188 MB exe alone compressed fine). The installed app exe is therefore named `RHU Course Ahead - Fiber & ISP Labs.exe` (hyphen); all display names (shortcuts, ARP, window title) keep the proper em dash. Documented in `windows-exe/BUILD.md` and in the .nsi.
- Not Authenticode-signed (same position as CCNA): publisher name is in the file properties; SmartScreen will still say "unknown publisher" without a CA certificate.

## 5. Deliverables — `~/workspace/your_files/fiber-isp-labs-packages/`

| File | Size | SHA-256 |
|---|---|---|
| `RHU-Course-Ahead-Fiber-ISP-Labs.apk` | 205,357 bytes | `c1ef9e113fb52bc37213fbfa526da26f3b4a2415e887915439d92205cbce5711` |
| `RHU-Course-Ahead-Fiber-ISP-Labs-Setup.exe` | 83,965,660 bytes | `ee7036947b54edb695e2c6641c99a936fdf8d607174fd1a432b88a2dbcb2196e` |
| `RHU-Course-Ahead-Fiber-ISP-Labs-Web.html` | 563,071 bytes | `26fbc67ce27ce3865f8d022f42bceab1a137764d5ce6a7a24d5b3b352646ecf4` |

## Notes for the user

- This is a **brand-new app** — no old copies to delete; install the Setup / APK fresh.
- The Windows installer could not be executed on this Linux VM (no wine possible here), so the on-PC install run remains the user's final smoke test — everything checkable from here (payload completeness, icons, metadata, signatures) has been verified.
- Keep `android-apk/release/` safe and private: it holds the only signing key for future updates of this app.
