import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from model import create_model
from data_preprocessing import load_data

EPOCHS = 20
LEARNING_RATE = 0.001

def train_model():
    # Point to the actual train directory
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "raw", "archive", 
                            "New Plant Diseases Dataset(Augmented)", 
                            "New Plant Diseases Dataset(Augmented)", "train")
    train_gen, val_gen = load_data(data_dir)
    
    model = create_model(num_classes=train_gen.num_classes)
    
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
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
    
    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=EPOCHS,
        callbacks=[checkpoint, early_stop]
    )
    
    model.save(os.path.join(model_dir, 'final_model.keras'))
    print(f"\n✅ Model saved to {model_dir}")
    
    return history

if __name__ == "__main__":
    history = train_model()
    print("Training completed!")
