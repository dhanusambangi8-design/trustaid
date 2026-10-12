@echo off
title Push Trust Aid to GitHub
color 0b
echo =======================================================
echo          Pushing Trust Aid to GitHub
echo  Repository: https://github.com/dhanusambangi8-design/trustaid.git
echo =======================================================
echo.
cd /d "%~dp0"
git push -u origin main
echo.
if %errorlevel% equ 0 (
    color 0a
    echo =======================================================
    echo  SUCCESS! Your code has been pushed to GitHub.
    echo  Visit: https://github.com/dhanusambangi8-design/trustaid
    echo =======================================================
) else (
    color 0c
    echo =======================================================
    echo  Push encountered an issue. See message above.
    echo =======================================================
)
echo.
pause
