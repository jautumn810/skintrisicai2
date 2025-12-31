import { fileToBase64, postPhaseTwo } from '../api.js';
import { saveAI, saveImageBase64 } from '../storage.js';

console.log('🔵 Image.js script loaded');

const fileInput = document.getElementById('file-input');
const cameraBtn = document.getElementById('camera-btn');
const errorDiv = document.getElementById('error-message');

console.log('🔵 Elements found:', {
  fileInput: !!fileInput,
  cameraBtn: !!cameraBtn,
  errorDiv: !!errorDiv
});

let loading = false;

if (fileInput) {
  console.log('🔵 File input found, enabling it...');
  fileInput.disabled = false;
  console.log('✅ File input enabled');

  fileInput.addEventListener('change', async (e) => {
    console.log('🟢 FILE INPUT CHANGE EVENT TRIGGERED');
    console.log('🔵 Event:', e);
    console.log('🔵 Event target:', e.target);
    console.log('🔵 Files:', e.target.files);
    console.log('🔵 Files length:', e.target.files?.length);
    
    const file = e.target.files?.[0];
    console.log('🔵 Selected file:', file);
    
    if (file) {
      console.log('🔵 File details:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    }
    
    if (!file) {
      console.error('❌ No file selected');
      return;
    }
    
    if (loading) {
      console.error('❌ Already processing a file, ignoring');
      return;
    }

    console.log('🟢 Starting file upload process...');
    loading = true;
    
    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }
    
    if (fileInput) {
      fileInput.disabled = true;
      console.log('🔵 File input disabled');
    }
    
    if (cameraBtn) {
      cameraBtn.disabled = true;
      console.log('🔵 Camera button disabled');
    }

    try {
      console.log('🔵 Converting file to base64...');
      const b64 = await fileToBase64(file);
      console.log('✅ File converted to base64, length:', b64.length);
      console.log('🔵 Base64 preview (first 100 chars):', b64.substring(0, 100));
      
      console.log('🔵 Saving image to storage...');
      saveImageBase64(b64);
      console.log('✅ Image saved to storage');
      
      console.log('🔵 Calling postPhaseTwo API...');
      
      // Check if base64 has data URL prefix
      const hasDataPrefix = b64.startsWith('data:');
      console.log('🔵 Base64 has data URL prefix:', hasDataPrefix);
      
      // Try sending just the base64 part (without data:image/... prefix)
      let imageData = b64;
      if (hasDataPrefix) {
        const base64Index = b64.indexOf(',');
        if (base64Index !== -1) {
          imageData = b64.substring(base64Index + 1);
          console.log('🔵 Extracted base64 string (without prefix), length:', imageData.length);
        }
      }
      
      // Try lowercase 'image' first (API might be case-sensitive)
      let payload = { image: imageData };
      console.log('🔵 Trying payload with lowercase "image" field');
      console.log('🔵 Payload keys:', Object.keys(payload));
      console.log('🔵 Payload image length:', payload.image.length);
      console.log('🔵 Payload image preview (first 50 chars):', payload.image.substring(0, 50));
      
      const json = await postPhaseTwo(payload);
      console.log('✅ API response received:', json);
      
      console.log('🔵 Saving AI data...');
      saveAI(json);
      console.log('✅ AI data saved');
      
      // Show success alert
      alert('Image analyzed successfully');
      
      console.log('🟢 Navigating to skin analysis page...');
      window.location.href = 'skin-analysis.html';
    } catch (e) {
      console.error('❌ UPLOAD ERROR:', e);
      console.error('❌ Error name:', e.name);
      console.error('❌ Error message:', e.message);
      console.error('❌ Error stack:', e.stack);
      
      if (errorDiv) {
        errorDiv.textContent = e?.message ?? 'Failed to upload image.';
        errorDiv.classList.remove('hidden');
      }
      
      if (fileInput) {
        fileInput.disabled = false;
        console.log('🔵 File input re-enabled');
      }
      
      if (cameraBtn) {
        cameraBtn.disabled = false;
        console.log('🔵 Camera button re-enabled');
      }
      
      loading = false;
      console.log('🔵 Loading state reset to false');
    }
  });
  
  console.log('✅ File input change listener added');
} else {
  console.error('❌ File input element not found!');
}

if (cameraBtn) {
  console.log('✅ Camera button found, adding click listener...');
  cameraBtn.addEventListener('click', () => {
    console.log('🟢 CAMERA BUTTON CLICKED');
    console.log('🔵 Loading state:', loading);
    if (!loading) {
      console.log('🟢 Navigating to selfie page...');
      window.location.href = 'selfie.html';
    } else {
      console.log('❌ Cannot navigate, file upload in progress');
    }
  });
  console.log('✅ Camera button click listener added');
} else {
  console.error('❌ Camera button element not found!');
}

