@echo off
echo ========================================
echo PlantCare AI - Training Script
echo ========================================
echo.

cd /d "%~dp0"

echo Activating virtual environment...
call venv\Scripts\activate

echo.
echo Starting model training...
echo This will take 2-4 hours depending on your hardware.
echo.

python src\train.py

echo.
echo ========================================
echo Training Complete!
echo ========================================
pause
