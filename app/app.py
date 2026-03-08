from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
from utils import predict_disease

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})
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
    
    # Validate file size
    file.seek(0, os.SEEK_END)
    file_length = file.tell()
    if file_length == 0:
        return jsonify({'error': 'Empty file uploaded'}), 400
    file.seek(0)
    
    if file and allowed_file(file.filename):
        # Generate unique filename to prevent conflicts
        ext = secure_filename(file.filename).rsplit('.', 1)[1].lower()
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(filepath)
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
        finally:
            # Clean up uploaded file after prediction
            if os.path.exists(filepath):
                try:
                    os.remove(filepath)
                except Exception:
                    pass
    
    return jsonify({'error': 'Invalid file type. Please upload JPG, JPEG, or PNG'}), 400

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
