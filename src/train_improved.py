import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.layers import RandomFlip, RandomRotation, RandomZoom, RandomContrast
from model import create_model

EPOCHS = 30
LEARNING_RATE = 0.0001
IMG_SIZE = 224
BATCH_SIZE = 16

def train_improved_model():
    # Configure GPU memory
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(f"GPU config: {e}")
    
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "archive", 
                            "New Plant Diseases Dataset(Augmented)", 
                            "New Plant Diseases Dataset(Augmented)", "train")
    
    print(f"Loading data from: {data_dir}")
    
    # Load datasets
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
    
    num_classes = len(train_ds_raw.class_names)
    print(f"\nFound {num_classes} classes")
    
    # Data augmentation
    data_augmentation = tf.keras.Sequential([
        RandomFlip("horizontal"),
        RandomRotation(0.2),
        RandomZoom(0.2),
        RandomContrast(0.2),
    ])
    
    # Normalize and augment
    normalization_layer = tf.keras.layers.Rescaling(1./255)
    
    def prepare_train(x, y):
        x = normalization_layer(x)
        x = data_augmentation(x, training=True)
        return x, y
    
    def prepare_val(x, y):
        x = normalization_layer(x)
        return x, y
    
    train_ds = train_ds_raw.map(prepare_train)
    val_ds = val_ds_raw.map(prepare_val)
    
    # Performance optimization
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)
    
    # Create model
    model = create_model(num_classes=num_classes)
    
    # Compile with lower learning rate
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Callbacks
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models", "saved_models")
    os.makedirs(model_dir, exist_ok=True)
    
    checkpoint = ModelCheckpoint(
        os.path.join(model_dir, 'best_model_v2.keras'),
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
    
    early_stop = EarlyStopping(
        monitor='val_loss',
        patience=7,
        restore_best_weights=True
    )
    
    reduce_lr = ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=3,
        min_lr=1e-7,
        verbose=1
    )
    
    print("\n🚀 Starting improved training...")
    print(f"Epochs: {EPOCHS}")
    print(f"Batch size: {BATCH_SIZE}")
    print(f"Learning rate: {LEARNING_RATE}")
    print(f"Data augmentation: ON\n")
    
    # Phase 1: Train with frozen base
    history1 = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=15,
        callbacks=[checkpoint, early_stop, reduce_lr]
    )
    
    # Phase 2: Fine-tune top layers
    print("\n🔥 Fine-tuning top layers...")
    base_model = model.layers[0]
    base_model.trainable = True
    
    # Freeze first 100 layers
    for layer in base_model.layers[:100]:
        layer.trainable = False
    
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE/10),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    checkpoint2 = ModelCheckpoint(
        os.path.join(model_dir, 'best_model.keras'),
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    )
    
    history2 = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=15,
        callbacks=[checkpoint2, early_stop, reduce_lr]
    )
    
    model.save(os.path.join(model_dir, 'final_model.keras'))
    print(f"\n✅ Model saved to {model_dir}")
    
    return history1, history2

if __name__ == "__main__":
    history = train_improved_model()
    print("✅ Training completed!")
