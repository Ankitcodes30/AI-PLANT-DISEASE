# PlantCare AI - Quick Reference

## 🚀 Quick Start

### 1. Setup Environment
```bash
setup.bat
```

### 2. Download Dataset
- Visit: https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset
- Extract to: `data/raw/`

### 3. Train Model
```bash
python src/train.py
```

### 4. Run Application
```bash
run_app.bat
```

## 📂 Project Structure
```
PlantCare-AI/
├── app/              # Flask web application
├── data/             # Dataset storage
├── docs/             # Documentation
├── models/           # Trained models
├── notebooks/        # Jupyter notebooks (5 epics)
├── src/              # Source code
├── tests/            # Unit tests
└── results/          # Training results
```

## 🎯 Key Files
- `src/model.py` - MobileNetV2 model
- `src/train.py` - Training script
- `src/evaluate.py` - Evaluation script
- `app/app.py` - Flask server
- `config.py` - Configuration

## 📊 Notebooks
1. `01_data_exploration.ipynb` - Data analysis
2. `02_data_preprocessing.ipynb` - Preprocessing
3. `02_model_building.ipynb` - Model architecture
4. `03_model_training.ipynb` - Training
5. `04_model_evaluation.ipynb` - Evaluation

## 🔧 Commands
```bash
# Setup
setup.bat

# Train
python src/train.py

# Evaluate
python src/evaluate.py

# Run app
run_app.bat

# Docker
docker-compose up

# Tests
python -m pytest tests/
```

## 🌐 GitHub Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/PlantCare-AI.git
git push -u origin main
```

## 📱 Access Web App
http://localhost:5000

## 📖 Documentation
- `README.md` - Main documentation
- `PROJECT_GUIDE.md` - Complete guide
- `GITHUB_SETUP.md` - GitHub instructions
- `docs/architecture.md` - Technical details
- `docs/api_documentation.md` - API reference
- `docs/deployment_guide.md` - Deployment
- `docs/conclusion.md` - Project summary
