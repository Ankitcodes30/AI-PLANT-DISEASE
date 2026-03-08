import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split

IMG_SIZE = 224
BATCH_SIZE = 32

def create_data_generators():
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        zoom_range=0.2,
        validation_split=0.2
    )
    
    test_datagen = ImageDataGenerator(rescale=1./255)
    
    return train_datagen, test_datagen

def load_data(data_dir):
    """Load training and validation data from directory.
    Expects data_dir to point to 'train' folder with class subdirectories.
    """
    train_datagen, test_datagen = create_data_generators()
    
    # Check if there's a separate valid folder at the same level as train
    parent_dir = os.path.dirname(data_dir)
    valid_dir = os.path.join(parent_dir, 'valid')
    
    if os.path.exists(valid_dir):
        print(f"Using separate validation folder: {valid_dir}")
        train_generator = test_datagen.flow_from_directory(
            data_dir,
            target_size=(IMG_SIZE, IMG_SIZE),
            batch_size=BATCH_SIZE,
            class_mode='categorical'
        )
        
        validation_generator = test_datagen.flow_from_directory(
            valid_dir,
            target_size=(IMG_SIZE, IMG_SIZE),
            batch_size=BATCH_SIZE,
            class_mode='categorical'
        )
    else:
        print(f"Using validation_split from training data")
        train_generator = train_datagen.flow_from_directory(
            data_dir,
            target_size=(IMG_SIZE, IMG_SIZE),
            batch_size=BATCH_SIZE,
            class_mode='categorical',
            subset='training'
        )
        
        validation_generator = train_datagen.flow_from_directory(
            data_dir,
            target_size=(IMG_SIZE, IMG_SIZE),
            batch_size=BATCH_SIZE,
            class_mode='categorical',
            subset='validation'
        )
    
    return train_generator, validation_generator

if __name__ == "__main__":
    data_dir = os.path.join("..", "data", "raw", "train")
    if not os.path.exists(data_dir):
        print(f"❌ Error: {data_dir} not found. Please download the dataset first.")
    else:
        train_gen, val_gen = load_data(data_dir)
        print(f"✅ Training samples: {train_gen.samples}")
        print(f"✅ Validation samples: {val_gen.samples}")
        print(f"✅ Number of classes: {train_gen.num_classes}")
