import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

MODEL_PATH = 'models/saved_models/best_model.keras'
IMG_PATH = 'static/uploads/0e94696b-3e0d-4d4c-a712-01197e228cf1___UF.GRC_BS_Lab_Leaf_8641.JPG'

model = load_model(MODEL_PATH)
print(f"Model output shape: {model.output_shape}")

img = image.load_img(IMG_PATH, target_size=(224, 224))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array /= 255.0

predictions = model.predict(img_array, verbose=0)
print(f"Predictions shape: {predictions.shape}")
print(f"Predicted class: {np.argmax(predictions[0])}")
print(f"Confidence: {predictions[0][np.argmax(predictions[0])] * 100:.2f}%")
print(f"Top 3 predictions:")
top3 = np.argsort(predictions[0])[-3:][::-1]
for idx in top3:
    print(f"  Class {idx}: {predictions[0][idx] * 100:.2f}%")
