@echo off
cd /d "%~dp0"
if not exist "node_modules\electron\dist\electron.exe" (
  echo Desktop runtime missing. Run npm install and node node_modules/electron/install.js in this folder.
  pause
  exit /b 1
)
start "Tarkov Companion" "node_modules\electron\dist\electron.exe" .
