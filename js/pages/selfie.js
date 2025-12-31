import { postPhaseTwo } from '../api.js';
import { saveAI, saveImageBase64 } from '../storage.js';

console.log('🔵 Selfie.js script loaded');

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const retryCameraBtn = document.getElementById('retry-camera-btn');
const errorDiv = document.getElementById('error-message');

console.log('🔵 Elements found:', {
  video: !!video,
  canvas: !!canvas,
  captureBtn: !!captureBtn,
  errorDiv: !!errorDiv
});

let stream = null;
let loading = false;

async function start() {
  console.log('🔵 start() function called');
  
  // Check if getUserMedia is available
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('❌ getUserMedia not supported');
    if (errorDiv) {
      errorDiv.textContent = 'Camera access is not supported in this browser.';
      errorDiv.classList.remove('hidden');
    }
    if (captureBtn) {
      captureBtn.disabled = true;
    }
    return;
  }
  
  // Check current permission status
  try {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    console.log('🔵 Camera permission status:', permissionStatus.state);
  } catch (e) {
    console.log('🔵 Could not check permission status (may not be supported):', e);
  }
  
  try {
    console.log('🔵 Requesting camera access...');
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }, 
      audio: false 
    });
    console.log('✅ Camera access granted, stream:', stream);
    
    if (!video) {
      console.error('❌ Video element not found!');
      return;
    }
    
    console.log('🔵 Setting video srcObject...');
    video.srcObject = stream;
    console.log('🔵 Playing video...');
    await video.play();
    console.log('✅ Video is playing');
    console.log('🔵 Video dimensions:', video.videoWidth, 'x', video.videoHeight);
    console.log('🔵 Video readyState:', video.readyState);
    
    // Enable capture button once video is ready
    if (captureBtn) {
      captureBtn.disabled = false;
      console.log('✅ Capture button enabled');
    }
  } catch (e) {
    console.error('❌ Camera access error:', e);
    console.error('❌ Error name:', e.name);
    console.error('❌ Error message:', e.message);
    
    let errorMessage = 'Camera permission denied or unavailable.';
    if (e.name === 'NotAllowedError') {
      errorMessage = 'Camera permission was denied. Please allow camera access in your browser settings and refresh the page.';
    } else if (e.name === 'NotFoundError') {
      errorMessage = 'No camera found. Please connect a camera and try again.';
    } else if (e.name === 'NotReadableError') {
      errorMessage = 'Camera is being used by another application. Please close other apps using the camera.';
    } else {
      errorMessage = `Camera error: ${e.message || 'Unknown error'}`;
    }
    
    if (errorDiv) {
      errorDiv.textContent = errorMessage;
      errorDiv.classList.remove('hidden');
    }
    if (captureBtn) {
      captureBtn.disabled = true;
      captureBtn.style.display = 'none';
    }
    if (retryCameraBtn) {
      retryCameraBtn.style.display = 'block';
      retryCameraBtn.textContent = 'REQUEST CAMERA ACCESS';
    }
  }
}

// Add retry button handler
if (retryCameraBtn) {
  console.log('✅ Retry camera button found, adding click listener...');
  retryCameraBtn.addEventListener('click', async () => {
    console.log('🟢 RETRY CAMERA BUTTON CLICKED');
    if (retryCameraBtn) {
      retryCameraBtn.disabled = true;
      retryCameraBtn.textContent = 'REQUESTING...';
    }
    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }
    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    // Retry camera access
    await start();
  });
}

// Wait for DOM to be ready
console.log('🔵 Document readyState:', document.readyState);
if (document.readyState === 'loading') {
  console.log('🔵 Waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔵 DOMContentLoaded fired, calling start()');
    start();
  });
} else {
  console.log('🔵 DOM already ready, calling start() immediately');
  start();
}

if (captureBtn) {
  console.log('✅ Capture button found, adding click listener...');
  captureBtn.addEventListener('click', async () => {
    console.log('🟢 CAPTURE BUTTON CLICKED!');
    console.log('🔵 Current state:', {
      video: !!video,
      canvas: !!canvas,
      loading: loading,
      videoReadyState: video?.readyState,
      videoWidth: video?.videoWidth,
      videoHeight: video?.videoHeight
    });
    
    if (!video || !canvas || loading) {
      console.error('❌ Cannot capture:', {
        noVideo: !video,
        noCanvas: !canvas,
        isLoading: loading
      });
      return;
    }

    // Check if video is ready
    console.log('🔵 Checking video readyState:', video.readyState);
    if (video.readyState < 2) {
      console.error('❌ Video not ready, readyState:', video.readyState);
      if (errorDiv) {
        errorDiv.textContent = 'Video is not ready. Please wait.';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    console.log('🔵 Setting loading state...');
    loading = true;
    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }
    if (captureBtn) {
      captureBtn.disabled = true;
      captureBtn.textContent = 'CAPTURING...';
    }

    try {
      console.log('🟢 Starting capture process...');
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;
      console.log('🔵 Video dimensions:', w, 'x', h);
      
      if (w === 0 || h === 0) {
        console.error('❌ Invalid video dimensions');
        throw new Error('Video dimensions are invalid');
      }
      
      console.log('🔵 Setting canvas dimensions...');
      canvas.width = w;
      canvas.height = h;
      console.log('🔵 Canvas dimensions set to:', canvas.width, 'x', canvas.height);
      
      console.log('🔵 Getting canvas context...');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('❌ Canvas context not supported');
        throw new Error('Canvas not supported.');
      }
      console.log('✅ Canvas context obtained');
      
      console.log('🔵 Drawing video to canvas...');
      ctx.drawImage(video, 0, 0, w, h);
      console.log('✅ Image drawn to canvas');

      console.log('🔵 Converting canvas to base64...');
      const b64 = canvas.toDataURL('image/png');
      console.log('✅ Base64 conversion complete, length:', b64.length);
      
      console.log('🔵 Saving image to storage...');
      saveImageBase64(b64);
      console.log('✅ Image saved to storage');

      console.log('🔵 Calling postPhaseTwo API...');
      console.log('🔵 Payload size:', JSON.stringify({ Image: b64.substring(0, 100) + '...' }).length);
      const json = await postPhaseTwo({ Image: b64 });
      console.log('✅ API response received:', json);
      
      console.log('🔵 Saving AI data...');
      saveAI(json);
      console.log('✅ AI data saved');
      
      console.log('🔵 Stopping camera stream...');
      // Stop camera
      if (stream) {
        stream.getTracks().forEach(t => {
          console.log('🔵 Stopping track:', t.kind);
          t.stop();
        });
      }
      console.log('✅ Camera stopped');
      
      // Show success alert
      alert('Image analyzed successfully');
      
      console.log('🟢 Navigating to skin analysis page...');
      window.location.href = 'skin-analysis.html';
    } catch (e) {
      console.error('❌ CAPTURE ERROR:', e);
      console.error('❌ Error stack:', e.stack);
      console.error('❌ Error message:', e.message);
      if (errorDiv) {
        errorDiv.textContent = e?.message ?? 'Failed to capture selfie.';
        errorDiv.classList.remove('hidden');
      }
      if (captureBtn) {
        captureBtn.disabled = false;
        captureBtn.textContent = 'CAPTURE & ANALYZE';
      }
      loading = false;
    }
  });
  console.log('✅ Click listener added to capture button');
} else {
  console.error('❌ Capture button not found!');
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
});

