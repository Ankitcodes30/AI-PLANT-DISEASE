# Technical Architecture

## System Overview
PlantCare AI uses transfer learning with MobileNetV2 for plant disease classification.

## Components

### 1. Data Pipeline
- Image loading and preprocessing
- Data augmentation (rotation, flip, zoom)
- Normalization (0-1 scale)
- Batch processing

### 2. Model Architecture
- **Base**: MobileNetV2 (ImageNet weights)
- **Custom Layers**:
  - GlobalAveragePooling2D
  - Dense(128, relu)
  - Dropout(0.5)
  - Dense(38, softmax)

### 3. Training Pipeline
- Optimizer: Adam (lr=0.001)
- Loss: Categorical Crossentropy
- Callbacks: ModelCheckpoint, EarlyStopping

### 4. Deployment
- Flask web server
- REST API for predictions
- Static file serving for UI

## Data Flow
User → Upload Image → Flask API → Preprocessing → Model → Prediction → User
