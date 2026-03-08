import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
from data_preprocessing import load_data

def evaluate_model(model_path):
    model = load_model(model_path)
    
    _, val_gen = load_data("../data/raw/")
    
    loss, accuracy = model.evaluate(val_gen)
    print(f"Validation Loss: {loss:.4f}")
    print(f"Validation Accuracy: {accuracy:.4f}")
    
    predictions = model.predict(val_gen)
    y_pred = np.argmax(predictions, axis=1)
    y_true = val_gen.classes
    
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=list(val_gen.class_indices.keys())))
    
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(15, 15))
    sns.heatmap(cm, annot=False, cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('../results/plots/confusion_matrix.png')
    plt.close()

if __name__ == "__main__":
    evaluate_model('../models/saved_models/best_model.keras')
