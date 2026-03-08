import os

data_dir = os.path.join("data", "raw", "archive", 
                        "New Plant Diseases Dataset(Augmented)", 
                        "New Plant Diseases Dataset(Augmented)", "train")

if os.path.exists(data_dir):
    class_names = sorted(os.listdir(data_dir))
    print(f"Total classes: {len(class_names)}\n")
    print("CLASS_NAMES = [")
    for name in class_names:
        print(f"    '{name}',")
    print("]")
else:
    print(f"Directory not found: {data_dir}")
