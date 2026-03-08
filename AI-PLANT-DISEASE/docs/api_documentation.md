# API Documentation

## Endpoints

### GET /
Returns the main web interface.

**Response**: HTML page

### POST /predict
Predicts plant disease from uploaded image.

**Request**:
- Method: POST
- Content-Type: multipart/form-data
- Body: file (image file)

**Response**:
```json
{
  "disease": "Tomato___Late_blight",
  "confidence": "95.67%"
}
```

**Error Response**:
```json
{
  "error": "Error message"
}
```

## Usage Example

### cURL
```bash
curl -X POST -F "file=@plant_leaf.jpg" http://localhost:5000/predict
```

### Python
```python
import requests

url = "http://localhost:5000/predict"
files = {"file": open("plant_leaf.jpg", "rb")}
response = requests.post(url, files=files)
print(response.json())
```
