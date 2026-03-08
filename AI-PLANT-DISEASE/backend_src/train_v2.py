import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from model import create_model

EPOCHS = 20
LEARNING_RATE = 0.001
IMG_SIZE = 224
BATCH_SIZE = 16

def train_model():
    # Configure GPU memory growth
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(f"GPU config: {e}")
    
    # Point to the actual train directory
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "archive", 
                            "New Plant Diseases Dataset(Augmented)", 
                            "New Plant Diseases Dataset(Augmented)", "train")
    
    print(f"Loading data from: {data_dir}")
    
    # Use tf.keras.utils.image_dataset_from_directory - better path handling
    train_ds_raw = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE
    )
    
    val_ds_raw = tf.keras.utils.image_dataset_from_directory(
        data_dir,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE
    )
    
    # Get number of classes before normalization
    num_classes = len(train_ds_raw.class_names)
    print(f"\nFound {num_classes} classes")
    print(f"Classes: {train_ds_raw.class_names[:5]}...")
    
    # Normalize pixel values
    normalization_layer = tf.keras.layers.Rescaling(1./255)
    train_ds = train_ds_raw.map(lambda x, y: (normalization_layer(x), y))
    val_ds = val_ds_raw.map(lambda x, y: (normalization_layer(x), y))
    
    # Performance optimization
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)
    
    # Create model
    model = create_model(num_classes=num_classes)
    
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Create model directory
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models", "saved_models")
    os.makedirs(model_dir, exist_ok=True)
    
    checkpoint = ModelCheckpoint(
        os.path.join(model_dir, 'best_model.keras'),
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
    
    early_stop = EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True
    )
    
    print("\n🚀 Starting training...")
    print(f"Epochs: {EPOCHS}")
    print(f"Batch size: {BATCH_SIZE}")
    print(f"Learning rate: {LEARNING_RATE}\n")
    
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=[checkpoint, early_stop]
    )
    
    model.save(os.path.join(model_dir, 'final_model.keras'))
    print(f"\n✅ Model saved to {model_dir}")
    
    return history

if __name__ == "__main__":
    history = train_model()
    print("✅ Training completed!")
