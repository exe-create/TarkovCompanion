@echo off
cd /d "%~dp0"
start "Tarkov Companion" http://127.0.0.1:4317
node server.cjs
