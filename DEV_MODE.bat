@echo off
echo ===================================
echo  TOOLTRIO - Dev Mode (live reload)
echo ===================================
echo  NOTE: If you see webpack errors, use START_HERE.bat instead
echo.

if exist ".next" (
  rmdir /s /q .next
)

npm run dev
