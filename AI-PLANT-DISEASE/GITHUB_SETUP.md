# GitHub Repository Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `PlantCare-AI`
3. Description: `Advanced Plant Disease Detection Using Transfer Learning with MobileNetV2`
4. Choose: Public or Private
5. DO NOT initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push to GitHub

Open terminal in project directory and run:

```bash
cd C:\Users\ankit\PlantCare-AI

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/PlantCare-AI.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Configure Repository Settings

### Add Topics
- machine-learning
- deep-learning
- transfer-learning
- plant-disease-detection
- mobilenetv2
- flask
- tensorflow
- keras
- computer-vision
- agriculture

### Add Description
"Advanced Plant Disease Detection Using Transfer Learning with MobileNetV2 - Classify 38 plant diseases with high accuracy using deep learning"

### Enable GitHub Pages (Optional)
Settings → Pages → Deploy from branch → main → /docs

## Step 4: Create Releases

1. Go to Releases → Create a new release
2. Tag: v1.0.0
3. Title: "PlantCare AI v1.0.0 - Initial Release"
4. Description: Project features and setup instructions

## Step 5: Add Collaborators (Optional)

Settings → Collaborators → Add people

## Repository URL Structure
```
https://github.com/YOUR_USERNAME/PlantCare-AI
```

## Clone Command for Others
```bash
git clone https://github.com/YOUR_USERNAME/PlantCare-AI.git
```
