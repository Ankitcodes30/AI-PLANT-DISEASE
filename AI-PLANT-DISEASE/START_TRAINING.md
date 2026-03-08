# \ud83d\ude80 PlantCare AI - Ready to Train!

## \u2705 What's Done

1. **Project Setup** - All files and folders created
2. **Environment** - Virtual environment with all dependencies installed
3. **Dataset** - Downloaded and extracted (87K+ images, 38 classes)
4. **Code** - All source files ready (model.py, train.py, evaluate.py, app.py)

---

## \ud83c\udfaf Next Step: Train the Model

### Quick Start (Easiest Way)

**Just double-click this file:**
```
train_model.bat
```

### Manual Way

```bash
cd C:\Users\ankit\PlantCare-AI
venv\Scripts\activate
python src\train.py
```

---

## \u23f1\ufe0f What to Expect

- **Time**: 2-4 hours on GPU, 8-12 hours on CPU
- **Progress**: You'll see epoch progress bars
- **Output**: Model saves to `models/saved_models/`
  - `best_model.keras` - Best performing model
  - `final_model.keras` - Final trained model

### Training Output Example:
```
Found 70295 images belonging to 38 classes.
Found 17572 images belonging to 38 classes.
Epoch 1/20
2197/2197 [==============================] - 450s 204ms/step - loss: 0.5234 - accuracy: 0.8456 - val_loss: 0.2134 - val_accuracy: 0.9234
Epoch 2/20
...
```

---

## \ud83d\udcca Expected Results

- **Training Accuracy**: 95-98%
- **Validation Accuracy**: 92-95%
- **Model Size**: ~15-20 MB

---

## \ud83d\udc1b Troubleshooting

### If training is too slow:
Edit `config.py`:
```python
BATCH_SIZE = 16  # Reduce from 32
EPOCHS = 10      # Reduce from 20
```

### If you get memory errors:
```python
BATCH_SIZE = 8   # Even smaller batches
```

### If you see "No module found":
```bash
venv\Scripts\activate
pip install -r requirements.txt
```

---

## \ud83c\udfaf After Training Completes

### 1. Evaluate the Model
```bash
python src\evaluate.py
```

### 2. Run the Web App
```bash
python app\app.py
```
Then open: http://localhost:5000

### 3. Test with an Image
- Upload a plant leaf image
- Get disease prediction with confidence score

---

## \ud83d\udcbe Dataset Info

**Location**: `data\raw\archive\New Plant Diseases Dataset(Augmented)\`

**Structure**:
- `train/` - 70,295 training images
- 38 disease classes including:
  - Apple diseases (scab, black rot, rust, healthy)
  - Corn diseases (leaf spot, rust, blight, healthy)
  - Grape diseases (black rot, esca, leaf blight, healthy)
  - Potato diseases (early blight, late blight, healthy)
  - Tomato diseases (10 different diseases + healthy)

---

## \ud83d\ude80 Ready? Let's Train!

**Run this now:**
```bash
train_model.bat
```

Or manually:
```bash
cd C:\Users\ankit\PlantCare-AI
venv\Scripts\activate
python src\train.py
```

---

**Good luck! The training will take a few hours, so grab a coffee \u2615**
