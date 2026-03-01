@echo off
echo ========================================
echo PlantCare AI - Setup Script
echo ========================================
echo.

echo Creating virtual environment...
python -m venv venv
echo.

echo Activating virtual environment...
call venv\Scripts\activate
echo.

echo Installing dependencies...
pip install -r requirements.txt
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Download dataset to data/raw/
echo 2. Run: python src/train.py
echo 3. Run: python app/app.py
echo.
pause
