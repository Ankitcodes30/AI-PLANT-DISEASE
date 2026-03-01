import os
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from model import create_model
from data_preprocessing import load_data

EPOCHS = 20
LEARNING_RATE = 0.001

def train_model():
    data_dir = "../data/raw/"
    train_gen, val_gen = load_data(data_dir)
    
    model = create_model(num_classes=train_gen.num_classes)
    
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    checkpoint = ModelCheckpoint(
        '../models/saved_models/best_model.keras',
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
    
    model.save('../models/saved_models/final_model.keras')
    
    return history

if __name__ == "__main__":
    history = train_model()
    print("Training completed!")
