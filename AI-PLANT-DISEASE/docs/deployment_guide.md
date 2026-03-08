# Deployment Guide

## Local Deployment

### Prerequisites
- Python 3.8+
- Virtual environment

### Steps
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Train model (or download pre-trained):
```bash
python src/train.py
```

3. Run Flask app:
```bash
python app/app.py
```

4. Access at: http://localhost:5000

## Production Deployment

### Using Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app.app:app
```

### Using Docker
```dockerfile
FROM python:3.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app/app.py"]
```

### Cloud Deployment (AWS)
1. Use AWS Elastic Beanstalk
2. Upload application
3. Configure environment
4. Deploy

## Environment Variables
- `FLASK_ENV`: development/production
- `MODEL_PATH`: Path to trained model
