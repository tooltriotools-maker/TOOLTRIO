@echo off
echo ========================================
echo   TOOLTRIO - Starting Development Server
echo ========================================
echo.

:: Delete old Next.js cache if it exists
if exist ".next" (
    echo Clearing old build cache...
    rmdir /s /q .next
    echo Done.
)

:: Install dependencies if node_modules missing
if not exist "node_modules" (
    echo Installing dependencies (first time setup)...
    npm install
    echo Done.
)

echo.
echo Starting server...
echo Open: http://localhost:3000
echo.
npm run dev
