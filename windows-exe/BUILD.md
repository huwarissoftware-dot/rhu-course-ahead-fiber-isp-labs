# Build the Windows package (Electron + file-based NSIS)

Publisher: **Raja Huwaris Usmani**. The app exe and the Setup exe ship with
his RHU logo as the icon and `CompanyName / Publisher = "Raja Huwaris Usmani"`
in the file properties. App code ships inside `resources/app.asar` (no loose
source); `LICENSE.txt` (all rights reserved) is installed next to the app.

## Output

| File | What it is |
|---|---|
| `RHU-Course-Ahead-Fiber-ISP-Labs-Setup.exe` | NSIS Setup — installs per-user, directory choice, license page, desktop + Start Menu shortcuts, Add/Remove Programs entry with uninstaller |

## The installer is FILE-BASED (no 7z)

The earlier CCNA Setup v1 embedded electron-builder's `.nsis.7z` payload and
extracted it at install time with the Nsis7z plugin — that extraction failed
on the user's PC. This installer (`installer.nsi`, hand-written) instead
embeds the whole `win-unpacked` tree as **individual files** (`File /r`) and
NSIS itself copies them into the install folder: plain file copy + shortcuts,
no archive extraction anywhere. `WriteUninstaller` generates the uninstaller
on the user's own machine, so no wine is needed at build time either.

## Linux build (this machine — no wine possible)

This VM's kernel kills every 32-bit binary (the ia32 loader segfaults), so
wine can never run electron-builder's uninstaller pre-generation step.
The package is therefore produced in wine-free steps (scripts in `tools/`):

```bash
cp ../web-app/index.html app/index.html
PHASE=dir node tools/build-windows.js    # unpacked app (resource editing off, locally)
node tools/stamp-exe.js "dist/win-unpacked/RHU Course Ahead — Fiber & ISP Labs.exe"
~/.cache/electron-builder/nsis/nsis-3.0.4.1/linux/makensis installer.nsi
```

- `tools/build-windows.js` runs electron-builder's `--dir` target only, with
  `signAndEditExecutable` disabled locally (the committed `package.json`
  keeps it `true` so Windows / GitHub Actions builds stamp natively).
- `tools/stamp-exe.js` (resedit, pure JS) writes the RHU icon + version
  strings into the app exe.
- Verify any produced exe with `tools/inspect-exe.js <file> --icon-out x.ico`
  and `tools/compare_icon.py x.ico build/icon.png` — the extracted icon must
  pixel-match the RHU logo, and CompanyName must read "Raja Huwaris Usmani".
  An exe still showing Electron's atom icon or "GitHub, Inc." metadata is a
  failed build — do not ship it.

## Code signing

The files are **not** Authenticode-signed. The publisher *name* is embedded
in the file properties, but Windows SmartScreen will still say "unknown
publisher" until a CA-issued code-signing certificate in the name
"Raja Huwaris Usmani" is used. Self-signing was deliberately not used: an
untrusted self-signed signature adds warnings without adding trust.
