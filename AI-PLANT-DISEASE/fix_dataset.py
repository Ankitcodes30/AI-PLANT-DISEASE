import os
from PIL import Image

def check_and_fix_images(data_dir):
    """Check all images and remove corrupted ones"""
    corrupted = []
    total = 0
    
    print("Scanning for corrupted images...")
    
    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                total += 1
                filepath = os.path.join(root, file)
                try:
                    # Try to open and verify the image
                    img = Image.open(filepath)
                    img.verify()
                except Exception as e:
                    print(f"❌ Corrupted: {filepath}")
                    corrupted.append(filepath)
                    try:
                        os.remove(filepath)
                        print(f"   Removed!")
                    except:
                        print(f"   Could not remove")
    
    print(f"\n✅ Scanned {total} images")
    print(f"❌ Found and removed {len(corrupted)} corrupted images")
    return corrupted

if __name__ == "__main__":
    data_dir = r"data\raw\archive\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train"
    
    if os.path.exists(data_dir):
        corrupted = check_and_fix_images(data_dir)
        print("\n✅ Dataset cleaned! You can now run training.")
    else:
        print(f"❌ Directory not found: {data_dir}")
