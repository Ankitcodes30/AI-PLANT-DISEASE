const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const resultCard = document.getElementById('result-card');
const dropZoneContent = document.querySelector('.drop-zone-content');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            showAnalysis();
        }
        reader.readAsDataURL(file);
    }
});

function showAnalysis() {
    dropZoneContent.classList.add('hidden');
    previewContainer.classList.remove('hidden');
    
    // Simulate AI Processing
    setTimeout(() => {
        resultCard.classList.remove('hidden');
        document.getElementById('upload-section').scrollIntoView({behavior: 'smooth'});
    }, 2000);
}

function resetUpload() {
    resultCard.classList.add('hidden');
    previewContainer.classList.add('hidden');
    dropZoneContent.classList.remove('hidden');
    fileInput.value = "";
}

function scrollToUpload() {
    document.getElementById('upload-section').scrollIntoView({behavior: 'smooth'});
}