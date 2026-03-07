import os

model_path = "models/saved_models/best_model.keras"
data_path = "data/raw/archive/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"

print("=== PlantCare AI - Project Status ===\n")

if os.path.exists(model_path):
    print("✅ Model trained")
    print(f"   Location: {model_path}\n")
    print("Next: Test the web app")
    print("   Run: python app/app.py")
else:
    print("❌ Model not trained yet\n")
    if os.path.exists(data_path):
        print("✅ Dataset found")
        print("\nNext: Train the model")
        print("   Run: python src/train_v2.py")
    else:
        print("❌ Dataset not found")
        print(f"   Expected: {data_path}")
        print("\nNext: Download and extract dataset")
