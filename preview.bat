@echo off
title SmartPark Puducherry - Live Hackathon Presentation
color 0B
cls

echo ======================================================================
echo           SMARTPARK PUDUCHERRY - SMART CITY INNOVATION
echo        Automated Presentation Launcher & Live Dynamic Server
echo ======================================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js not detected in system PATH.
    echo Opening application directly in your default browser...
    start "" "%~dp0index.html"
    goto finish
)

echo [*] Starting Local Smart City Web Server on http://localhost:3000 ...
echo [*] Live Simulated IoT Sensor & Traffic Stream Active
echo.

:: Launch Node server in background and open the web preview in default browser
start "SmartPark Server" /min node "%~dp0server.js"

:: Give the server a moment to bind port 3000
timeout /t 2 /nobreak >nul

:: Open Chrome or default web browser
echo [*] Launching SmartPark Presentation Web App...
start http://localhost:3000/

:finish
echo.
echo ======================================================================
echo  Server is running at: http://localhost:3000/
echo  Press any key to close this preview launcher window.
echo  (The web app will continue running in your browser)
echo ======================================================================
pause >nul
exit
