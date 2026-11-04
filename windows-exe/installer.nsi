; ============================================================================
; RHU Course Ahead — Fiber & ISP Labs — Windows Setup (NSIS, FILE-BASED)
; Publisher: Raja Huwaris Usmani. Copyright (C) 2026 Raja Huwaris Usmani.
;
; Why hand-written and file-based: electron-builder's NSIS flow pre-generates
; the uninstaller by RUNNING the installer under wine (only so it can be
; signed); this machine cannot execute 32-bit binaries at all (the ia32
; loader segfaults), so the classic NSIS flow is used instead:
; WriteUninstaller generates the uninstaller on the user's own machine at
; install time. No wine, no signing step.
;
; FILE-BASED payload: unlike the earlier CCNA Setup v1, which embedded one
; .nsis.7z archive and extracted it with the Nsis7z plugin (that extraction
; failed on the user's PC), this installer embeds the win-unpacked app tree
; as individual files (File /r) and NSIS itself writes them out — plain file
; copy, no 7z anywhere in the chain.
;
; Build (Linux, native makensis from the electron-builder cache):
;   makensis installer.nsi
; ============================================================================

Unicode True

!ifndef NSIS_ROOT
  !define NSIS_ROOT "/home/hatch/.cache/electron-builder/nsis/nsis-3.0.4.1"
!endif
!addincludedir "${NSIS_ROOT}/Include"

!include "MUI2.nsh"
!include "FileFunc.nsh"

!define APP_NAME "RHU Course Ahead — Fiber & ISP Labs"
; NOTE: the installed exe uses a hyphen, not an em dash — the POSIX makensis
; build segfaults when its recursive File scan meets a non-ASCII filename.
; (Display names everywhere else keep the proper em dash.)
!define APP_EXE "RHU Course Ahead - Fiber & ISP Labs.exe"
!define UNINST_EXE "Uninstall RHU Course Ahead — Fiber & ISP Labs.exe"
!define PUBLISHER "Raja Huwaris Usmani"
!define VERSION "1.0.0"
!define UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\RHUFiberISPLabs"
!define PAYLOAD_DIR "dist/win-unpacked"

Name "${APP_NAME}"
Caption "${APP_NAME} Setup"
OutFile "dist/RHU-Course-Ahead-Fiber-ISP-Labs-Setup.exe"
InstallDir "$LOCALAPPDATA\Programs\${APP_NAME}"
InstallDirRegKey HKCU "Software\RHU\FiberISPLabs" "InstallDir"
RequestExecutionLevel user
SetCompressor lzma ; non-solid: solid LZMA bus-errors on this build VM when memory is tight (2026-11-02)
Icon "build/icon.ico"
UninstallIcon "build/icon.ico"

VIProductVersion "1.0.0.0"
VIAddVersionKey /LANG=1033 "ProductName" "${APP_NAME}"
VIAddVersionKey /LANG=1033 "CompanyName" "${PUBLISHER}"
VIAddVersionKey /LANG=1033 "FileDescription" "RHU Course Ahead — Fiber & ISP Labs — free fiber and ISP labs by Raja Huwaris Usmani"
VIAddVersionKey /LANG=1033 "LegalCopyright" "© 2026 Raja Huwaris Usmani — All Rights Reserved"
VIAddVersionKey /LANG=1033 "FileVersion" "${VERSION}"
VIAddVersionKey /LANG=1033 "ProductVersion" "${VERSION}"

!define MUI_ICON "build/icon.ico"
!define MUI_UNICON "build/icon.ico"
!define MUI_ABORTWARNING

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "Install" SEC01
  ; --- install the app payload: plain file copy of the whole win-unpacked
  ;     tree (NSIS File /r recreates the directory structure under $INSTDIR).
  ;     No archive extraction, no external plugins. ---
  SetOutPath "$INSTDIR"
  File /r "${PAYLOAD_DIR}\*.*"

  ; --- shortcuts (desktop + Start Menu), icon = the app exe's stamped RHU icon ---
  CreateShortcut "$DESKTOP\${APP_NAME}.lnk" "$INSTDIR\${APP_EXE}" "" "$INSTDIR\${APP_EXE}" 0
  CreateDirectory "$SMPROGRAMS\${APP_NAME}"
  CreateShortcut "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk" "$INSTDIR\${APP_EXE}" "" "$INSTDIR\${APP_EXE}" 0
  CreateShortcut "$SMPROGRAMS\${APP_NAME}\Uninstall ${APP_NAME}.lnk" "$INSTDIR\${UNINST_EXE}" "" "$INSTDIR\${UNINST_EXE}" 0

  ; --- uninstaller, generated here on the user's machine ---
  WriteUninstaller "$INSTDIR\${UNINST_EXE}"

  ; --- Add/Remove Programs registration ---
  WriteRegStr HKCU "Software\RHU\FiberISPLabs" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "${UNINST_KEY}" "DisplayName" "${APP_NAME}"
  WriteRegStr HKCU "${UNINST_KEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKCU "${UNINST_KEY}" "Publisher" "${PUBLISHER}"
  WriteRegStr HKCU "${UNINST_KEY}" "DisplayIcon" "$INSTDIR\${APP_EXE}"
  WriteRegStr HKCU "${UNINST_KEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "${UNINST_KEY}" "UninstallString" '"$INSTDIR\${UNINST_EXE}"'
  WriteRegStr HKCU "${UNINST_KEY}" "QuietUninstallString" '"$INSTDIR\${UNINST_EXE}" /S'
  WriteRegDWORD HKCU "${UNINST_KEY}" "NoModify" 1
  WriteRegDWORD HKCU "${UNINST_KEY}" "NoRepair" 1
  ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
  IntFmt $0 "0x%08X" $0
  WriteRegDWORD HKCU "${UNINST_KEY}" "EstimatedSize" "$0"
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\${APP_NAME}.lnk"
  Delete "$SMPROGRAMS\${APP_NAME}\${APP_NAME}.lnk"
  Delete "$SMPROGRAMS\${APP_NAME}\Uninstall ${APP_NAME}.lnk"
  RMDir "$SMPROGRAMS\${APP_NAME}"
  DeleteRegKey HKCU "${UNINST_KEY}"
  DeleteRegKey HKCU "Software\RHU\FiberISPLabs"
  RMDir /r "$INSTDIR"
SectionEnd
