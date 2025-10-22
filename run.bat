@echo off
title run Gymbo

echo Starting backend...
cd backend
call venv\Scripts\activate
cd src
start cmd /k "uvicorn main:app --reload"
cd ..
cd ..

timeout /t 3 >nul

echo Starting frontend...
cd frontend
start cmd /k "ionic serve"
cd ..

timeout /t 10 >nul

echo Opening browser...

echo All systems running!
pause
