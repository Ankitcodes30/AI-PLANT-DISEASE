document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            
            // Hide previous results when new image is selected
            document.getElementById('result').style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
});

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        showError('Please select an image first');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading"></div> <span style="margin-left: 10px;">Analyzing your plant...</span>';
    resultDiv.style.display = 'block';

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            resultDiv.innerHTML = `
                <h3>✅ Detection Result:</h3>
                <p><strong>Disease:</strong> ${formatDiseaseName(data.disease)}</p>
                <p><strong>Confidence:</strong> ${data.confidence}</p>
            `;
        }
    })
    .catch(error => {
        showError(error.error || error.message || 'An unexpected error occurred');
    });
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color:#dc2626; font-weight: 600;">❌ ${message}</p>`;
    resultDiv.style.display = 'block';
}

function formatDiseaseName(name) {
    // Replace underscores with spaces and improve readability
    return name.replace(/_/g, ' ').replace(/\s+/g, ' ');
}
