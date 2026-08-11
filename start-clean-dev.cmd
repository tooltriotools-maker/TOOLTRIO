@echo off
setlocal
cd /d "%~dp0"
echo Cleaning Next.js/Turbopack caches...
if exist .next rmdir /s /q .next
if exist .turbo rmdir /s /q .turbo
echo Starting Next.js in stable webpack development mode...
npm run dev
