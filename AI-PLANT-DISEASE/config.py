import os

class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    # Data settings
    DATA_DIR = os.path.join(BASE_DIR, 'data', 'raw')
    PROCESSED_DIR = os.path.join(BASE_DIR, 'data', 'processed')
    
    # Model settings
    MODEL_DIR = os.path.join(BASE_DIR, 'models', 'saved_models')
    CHECKPOINT_DIR = os.path.join(BASE_DIR, 'models', 'checkpoints')
    
    # Training settings
    IMG_SIZE = 224
    BATCH_SIZE = 32
    EPOCHS = 20
    LEARNING_RATE = 0.001
    NUM_CLASSES = 38
    
    # Flask settings
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'app', 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
