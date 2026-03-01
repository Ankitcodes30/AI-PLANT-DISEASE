# PlantCare AI - Advanced Plant Disease Detection Using Transfer Learning

## 🌱 Project Overview
PlantCare AI is an intelligent plant disease detection system that leverages transfer learning with MobileNetV2 to classify 38 different plant diseases across multiple crop types including Apple, Corn, Grape, Potato, and Tomato.

## 📊 Dataset
- **Source**: New Plant Diseases Dataset
- **Size**: 87,000+ annotated plant leaf images
- **Classes**: 38 disease categories
- **Image Size**: 224×224 pixels

## 🏗️ Architecture
- **Base Model**: MobileNetV2 (pre-trained on ImageNet)
- **Transfer Learning**: Fine-tuned for plant disease classification
- **Framework**: TensorFlow/Keras
- **Deployment**: Flask web application

## 🚀 Features
- Real-time plant disease detection
- High accuracy classification (38 classes)
- Web-based interface for easy access
- Mobile-friendly design
- Automated agricultural monitoring support

## 📁 Project Structure
```
PlantCare-AI/
├── data/               # Dataset storage
├── notebooks/          # Jupyter notebooks for each epic
├── src/               # Source code
├── models/            # Trained models
├── app/               # Flask web application
├── tests/             # Unit tests
├── docs/              # Documentation
└── results/           # Training results and metrics
```

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- pip

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/PlantCare-AI.git
cd PlantCare-AI

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

## 📥 Dataset Setup
1. Download the New Plant Diseases Dataset from Kaggle
2. Extract to `data/raw/` directory
3. Run preprocessing script:
```bash
python src/data_preprocessing.py
```

## 🎯 Usage

### Training the Model
```bash
python src/train.py
```

### Running the Web Application
```bash
python app/app.py
```
Visit `http://localhost:5000` in your browser.

### Model Evaluation
```bash
python src/evaluate.py
```

## 🎓 Project Epics

### Epic 1: Data Collection & Data Preprocessing
- Dataset acquisition and exploration
- Train/validation/test split
- Image preprocessing and augmentation

### Epic 2: Model Building
- MobileNetV2 architecture implementation
- Transfer learning setup
- Custom layer addition

### Epic 3: Model Training
- Training pipeline
- Hyperparameter tuning
- Model checkpointing

### Epic 4: Model Evaluation and Testing
- Performance metrics
- Confusion matrix
- Error analysis

### Epic 5: Application Building
- Flask web application
- User interface design
- Model integration

## 🌍 Use Cases
1. **Automated Agricultural Monitoring**: Real-time crop health management
2. **Mobile App for Home Gardeners**: Instant disease identification
3. **Educational Tools**: Agricultural training platforms

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

## 👥 Authors
- Your Name

## 🙏 Acknowledgments
- New Plant Diseases Dataset contributors
- TensorFlow/Keras team
- MobileNetV2 authors
