# Build the Android .APK (native WebView wrapper)

The APK wraps the finished web app in `../web-app/` — one codebase, three
deliveries (web / EXE / APK). It is a thin native WebView wrapper
(`native/MainActivity.java`) compiled directly with the Android SDK
build-tools — no Gradle, no Android Studio, no Capacitor runtime.

## Build (this machine)

```bash
export JAVA_HOME=~/workspace/tools/jdk17
export ANDROID_HOME=~/workspace/tools/android-sdk
export PATH=$JAVA_HOME/bin:$PATH
cd native
./build-apk.sh
```

The script compiles the wrapper, DEXes it, packages it with the web app as
`assets/index.html`, zip-aligns it and signs it.

## Signing — RELEASE from day one

- Keystore: `release/courseahead-fiber.keystore` (alias `courseahead-fiber`),
  generated for this app only. Passwords live **only** in
  `release/keystore.properties` (file mode 0600, git-ignored) — never in
  scripts, never printed.
- The build script signs with the release keystore and **fails** if it is
  missing; there is no debug-signed fallback.
- Verify any built APK with:
  `apksigner verify --print-certs RHU-Course-Ahead-Fiber-ISP-Labs.apk`

## Output

`android-apk/RHU-Course-Ahead-Fiber-ISP-Labs.apk` — package
`com.rhu.courseahead.fiberlabs`, label "RHU Course Ahead — Fiber & ISP Labs",
min SDK 24, target SDK 35. Fully offline: all files are bundled inside the
APK, no server URL.

## App icon

The launcher icon is the RHU logo (`native/res/drawable/icon.png`, 192 px).
