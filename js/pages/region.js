import { loadUser, saveUser } from '../storage.js';
import { isValidLettersOnly } from '../validators.js';
import { postPhaseOne } from '../api.js';

console.log('🌍 REGION PAGE: Initializing...');

const errorDiv = document.getElementById('error-message');
const proceedBtn = document.getElementById('proceed-btn');

console.log('Element Check:');
console.log('  errorDiv:', errorDiv ? '✅ Found' : '❌ NOT FOUND');
console.log('  proceedBtn:', proceedBtn ? '✅ Found' : '❌ NOT FOUND (button was removed)');

// Load saved user data
const user = loadUser();
console.log('Loaded user:', user);

// Function to proceed to next page
async function proceedToNextPage() {
  console.log('🚀 proceedToNextPage() called');

  const u = loadUser();
  const name = (u?.name ?? '').trim();
  const city = (u?.city ?? '').trim();
  const location = (u?.location ?? '').trim();
  
  console.log('  User data:', { name, city, location });

  if (!isValidLettersOnly(name)) {
    console.log('  ❌ Name validation failed');
    errorDiv.textContent = 'Name is missing/invalid. Go back and enter your name.';
    errorDiv.classList.remove('hidden');
    return;
  }
  console.log('  ✅ Name validation passed');

  if (!isValidLettersOnly(city)) {
    console.log('  ❌ City validation failed');
    errorDiv.textContent = 'City is missing/invalid. Go back and enter your city.';
    errorDiv.classList.remove('hidden');
    return;
  }
  console.log('  ✅ City validation passed');

  errorDiv.classList.add('hidden');
  console.log('  Saving user data...');
  saveUser({ name, city, location });
  
  console.log('  Calling postPhaseOne API...');
  try {
    await postPhaseOne({ name, location: location || city });
    console.log('  ✅ API call successful');
    console.log('  Navigating to permissions.html...');
    window.location.href = 'permissions.html';
  } catch (e) {
    console.error('  ❌ API call failed:', e);
    errorDiv.textContent = e?.message ?? 'Failed to submit Phase 1 API.';
    errorDiv.classList.remove('hidden');
  }
}

// Handle Enter key to proceed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log('  🌍 GLOBAL KEYDOWN: ENTER PRESSED');
    console.log('    ✅ Proceeding to next page.');
    e.preventDefault();
    e.stopPropagation();
    proceedToNextPage();
  }
});

if (proceedBtn) {
  console.log('  ✅ Proceed button found, adding click listener');
  proceedBtn.addEventListener('click', async () => {
    console.log('🖱️ PROCEED BUTTON CLICKED');
    await proceedToNextPage();
  });
} else {
  console.log('  ⚠️ Proceed button not found (it was removed from HTML)');
  console.log('  Navigation will work via Enter key instead');
}

console.log('✅ REGION PAGE: Initialization complete');
console.log('💡 Tips:');
console.log('  - Press Enter to proceed to next page');
console.log('  - Check console for detailed event logs');
