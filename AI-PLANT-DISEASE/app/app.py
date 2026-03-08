from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from utils import predict_disease
import uvicorn
from fastapi import FastAPI

app = FastAPI()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            result = predict_disease(filepath)
            return jsonify(result)
        except FileNotFoundError as e:
            return jsonify({
                'error': 'Model not trained yet',
                'message': str(e),
                'instruction': 'Please run: python src/train.py'
            }), 500
        except Exception as e:
            return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)


# ... your other imports ...



# ... your routes ...

if __name__ == "__main__":
    # This prevents the multiprocessing error on Windows
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
