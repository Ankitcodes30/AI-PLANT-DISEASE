# 🚀 PlantCare AI - Execution Guide

## Current Status: Ready for Dataset Download & Training

---

## 📥 STEP 1: Download Dataset (5-10 minutes)

### Method 1: Direct Download (Recommended)
1. Go to: https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset
2. Click the **"Download"** button (requires Kaggle login)
3. Save `new-plant-diseases-dataset.zip` to your Downloads folder
4. Extract the ZIP file
5. Copy the extracted folders to: `C:\Users\ankit\PlantCare-AI\data\raw\`

**Expected Structure After Extraction:**
```
data/raw/
├── train/          (70,295 images in 38 class folders)
├── valid/          (17,572 images in 38 class folders)
└── test/           (33 test images)
```

### Method 2: Kaggle API (Automated)
```bash
pip install kaggle
kaggle datasets download -d vipoooool/new-plant-diseases-dataset
# Extract to data/raw/
```

---

## ✅ STEP 2: Verify Dataset (30 seconds)

```bash
cd C:\Users\ankit\PlantCare-AI
venv\Scripts\activate
python verify_dataset.py
```

**Expected Output:**
```
✅ Found directories: ['train', 'valid', 'test']
✅ Training classes: 38
First 5 classes: ['Apple___Apple_scab', 'Apple___Black_rot', ...]
```

---

## 🧪 STEP 3: Test Data Loading (1 minute)

```bash
python src\data_preprocessing.py
```

**Expected Output:**
```
✅ Training samples: 70295
✅ Validation samples: 17572
✅ Number of classes: 38
```

---

## 🏋️ STEP 4: Train the Model (2-4 hours depending on hardware)

```bash
python src\train.py
```

**What to Expect:**
- Epoch 1/20 progress bars
- Training accuracy and loss
- Validation accuracy and loss
- Model checkpoints saved automatically
- Early stopping if validation loss doesn't improve

**Training Tips:**
- Use GPU if available (CUDA-enabled)
- Training time: ~2-4 hours on GPU, 8-12 hours on CPU
- Model saves automatically to `models/saved_models/`

---

## 📊 STEP 5: Evaluate Model (2 minutes)

```bash
python src\evaluate.py
```

**Expected Output:**
- Test accuracy
- Confusion matrix
- Classification report
- Results saved to `results/`

---

## 🌐 STEP 6: Run Web Application (30 seconds)

```bash
python app\app.py
```

**Then:**
1. Open browser: http://localhost:5000
2. Upload a plant leaf image
3. Get disease prediction with confidence score

---

## 🎯 Quick Commands Summary

```bash
# Activate environment
cd C:\Users\ankit\PlantCare-AI
venv\Scripts\activate

# Verify dataset
python verify_dataset.py

# Test data loading
python src\data_preprocessing.py

# Train model
python src\train.py

# Evaluate model
python src\evaluate.py

# Run web app
python app\app.py
```

---

## 🐛 Troubleshooting

### Issue: "No module named tensorflow"
```bash
venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: "data/raw not found"
- Ensure dataset is extracted to correct location
- Run `python verify_dataset.py` to check

### Issue: "Model file not found"
- Train the model first using `python src\train.py`
- Check `models/saved_models/` for `best_model.keras`

### Issue: Training too slow
- Reduce BATCH_SIZE in config.py (32 → 16)
- Reduce EPOCHS (20 → 10)
- Use GPU if available

---

## 📈 Expected Results

- **Training Accuracy**: 95-98%
- **Validation Accuracy**: 92-95%
- **Test Accuracy**: 90-93%
- **Training Time**: 2-4 hours (GPU) / 8-12 hours (CPU)

---

## 🎉 Success Checklist

- [ ] Dataset downloaded and extracted
- [ ] Dataset verified (38 classes, 87K+ images)
- [ ] Data loading tested successfully
- [ ] Model trained (best_model.keras exists)
- [ ] Model evaluated (>90% accuracy)
- [ ] Web app running (localhost:5000)
- [ ] Can predict diseases from uploaded images

---

## 🚀 Next Steps After Completion

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add trained model and results"
   git push origin main
   ```

2. **Deploy to Cloud** (AWS, Heroku, etc.)
3. **Create Mobile App** (React Native, Flutter)
4. **Add More Features** (disease treatment recommendations, etc.)

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify dataset structure
3. Ensure all dependencies are installed
4. Check that virtual environment is activated

---

**Current Step: STEP 1 - Download Dataset**
**Estimated Time to Complete: 3-5 hours (mostly training time)**
