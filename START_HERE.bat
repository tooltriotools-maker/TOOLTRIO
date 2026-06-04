@echo off
echo ===================================
echo  TOOLTRIO - Fresh Start
echo ===================================
echo.

:: Show Node version
echo Your Node version:
node --version
echo (Need v18 or higher - get it at nodejs.org)
echo.

:: Create .env.local if missing
if not exist ".env.local" (
  echo Creating .env.local...
  copy .env.local.example .env.local
  echo.
  echo  ** IMPORTANT: Open .env.local and paste your Anthropic API key **
  echo  ** Get a free key at: https://console.anthropic.com             **
  echo.
  pause
)

:: ALWAYS delete old builds - they are platform-specific
echo Deleting old build (platform-specific, must rebuild on your machine)...
if exist ".next"       rmdir /s /q ".next"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /f /q "package-lock.json"
echo Done.
echo.

:: Fresh install for THIS machine's Node version
echo Installing packages for your Node version (1-2 min)...
call npm install --legacy-peer-deps
if %ERRORLEVEL% neq 0 (
  echo.
  echo ERROR: npm install failed.
  echo Make sure you have internet access and Node v18+
  pause
  exit /b 1
)
echo.

:: Build fresh on this machine
echo Building project for your machine (1-2 min)...
call npm run build
if %ERRORLEVEL% neq 0 (
  echo.
  echo ERROR: Build failed. See errors above.
  pause
  exit /b 1
)
echo.

:: Start
echo ===================================
echo  Site ready at http://localhost:3000
echo  Press Ctrl+C to stop
echo ===================================
echo.
npm run start
