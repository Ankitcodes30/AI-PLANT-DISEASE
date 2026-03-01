document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview').style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image first');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Analyzing...</p>';
    resultDiv.style.display = 'block';

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <h3>Detection Result:</h3>
                <p><strong>Disease:</strong> ${data.disease}</p>
                <p><strong>Confidence:</strong> ${data.confidence}</p>
            `;
        }
    })
    .catch(error => {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error}</p>`;
    });
}
