import { loadImageBase64, loadAI } from '../storage.js';

// Load and display the preview image
document.addEventListener('DOMContentLoaded', () => {
  const previewImage = document.getElementById('preview-image');
  const previewRect = document.querySelector('.header-rectangle');
  
  // Check if image and AI data exist (indicating successful upload/selfie)
  const imageBase64 = loadImageBase64();
  const aiData = loadAI();
  
  if (imageBase64 && aiData) {
    // Show success alert
    alert('Upload successful! Your image has been analyzed.');
    console.log('✅ Image and AI data found - upload was successful');
  } else if (imageBase64) {
    // Image exists but no AI data yet
    alert('Image uploaded successfully! Analysis in progress...');
    console.log('🔵 Image found but AI data not yet available');
  } else {
    // No image found
    console.log('🔵 No image found in storage');
  }
  
  if (previewImage && previewRect) {
    if (imageBase64) {
      console.log('🔵 Loading preview image from storage');
      previewImage.src = imageBase64;
      previewImage.style.display = 'block';
      previewImage.onload = () => {
        console.log('✅ Preview image loaded');
      };
      previewImage.onerror = () => {
        console.error('❌ Failed to load preview image');
        previewImage.style.display = 'none';
      };
    } else {
      console.log('🔵 No preview image found in storage');
    }
  }
});

const proceedBtn = document.getElementById('proceed-btn');
if (proceedBtn) {
  proceedBtn.addEventListener('click', () => {
    console.log('🟢 Proceed button clicked');
    // Navigate to processing page
    window.location.href = 'processing.html';
  });
} else {
  console.error('❌ Proceed button not found!');
}

