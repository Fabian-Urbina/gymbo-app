@echo off
title Setup Gymbo

echo === Setting up Gymbo ===
echo.

echo [Backend] Recreating virtual environment...
cd backend

if exist venv (
    echo [Backend] Deleting old virtual environment...
    rmdir /s /q venv
)

echo [Backend] Creating new virtual environment...
python -m venv venv

echo [Backend] Activating virtual environment...
call venv\Scripts\activate

if exist requirements.txt (
    echo [Backend] Installing backend dependencies...
    pip install -r requirements.txt
)

cd ..

timeout /t 2 >nul

echo [Frontend] Recreating node_modules...
cd frontend

if exist node_modules (
    echo [Frontend] Deleting old node_modules...
    rmdir /s /q node_modules
)

echo [Frontend] Installing npm dependencies...
npm install
npm install -g @ionic/cli

cd ..

echo.
echo === Setup completed! ===
pause
