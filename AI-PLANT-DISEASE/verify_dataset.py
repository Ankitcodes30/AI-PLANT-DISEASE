import os

data_dir = "data/raw"

if os.path.exists(data_dir):
    subdirs = os.listdir(data_dir)
    print(f"✅ Found directories: {subdirs}")
    
    if 'train' in subdirs:
        train_classes = os.listdir(os.path.join(data_dir, 'train'))
        print(f"✅ Training classes: {len(train_classes)}")
        print(f"First 5 classes: {train_classes[:5]}")
    else:
        print("❌ 'train' folder not found")
else:
    print("❌ data/raw directory not found")
