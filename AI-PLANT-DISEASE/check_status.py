import os

print("=" * 50)
print("PlantCare AI - Training Status Check")
print("=" * 50)

# Check if model exists
model_dir = "models/saved_models"
model_files = [f for f in os.listdir(model_dir) if f.endswith('.keras')]

if model_files:
    print("\n✅ TRAINED MODELS FOUND:")
    for model in model_files:
        model_path = os.path.join(model_dir, model)
        size = os.path.getsize(model_path) / (1024 * 1024)  # MB
        print(f"   - {model} ({size:.2f} MB)")
    print("\n✅ Your app is ready to use!")
else:
    print("\n❌ NO TRAINED MODEL FOUND")
    print("\n📋 TO FIX THIS:")
    print("   1. Run training: python src\\train.py")
    print("   2. Wait 2-4 hours for training to complete")
    print("   3. Model will be saved automatically")
    print("\n⚡ QUICK START:")
    print("   venv\\Scripts\\activate")
    print("   python src\\train.py")

print("\n" + "=" * 50)
