import { loadUser, saveUser } from '../storage.js';
import { isValidLettersOnly } from '../validators.js';
import { postPhaseOne } from '../api.js';

console.log('📍 LOCATION PAGE: Initializing...');

const input = document.getElementById('location-input');
const display = document.getElementById('location-display');
const text = document.getElementById('location-text');
const errorDiv = document.getElementById('error-message');
const proceedBtn = document.getElementById('proceed-btn');

console.log('Element Check:');
console.log('  input:', input ? '✅ Found' : '❌ NOT FOUND');
console.log('  display:', display ? '✅ Found' : '❌ NOT FOUND');
console.log('  text:', text ? '✅ Found' : '❌ NOT FOUND');
console.log('  errorDiv:', errorDiv ? '✅ Found' : '❌ NOT FOUND');
console.log('  proceedBtn:', proceedBtn ? '✅ Found' : '❌ NOT FOUND (button was removed)');

// Load saved location
const user = loadUser();
console.log('Loaded user:', user);
if (user?.location) {
  console.log('Setting saved location:', user.location);
  input.value = user.location;
  text.innerHTML = user.location;
  text.classList.remove('loading-dots');
  display.classList.add('has-value');
} else {
  // Show loading dots if no saved location
  text.classList.add('loading-dots');
}

input.addEventListener('input', (e) => {
  const value = e.target.value;
  console.log('⌨️ INPUT EVENT:', {
    value: value,
    length: value.length,
    isEmpty: !value
  });
  if (value) {
    text.innerHTML = value;
    text.classList.remove('loading-dots');
  } else {
    text.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    text.classList.add('loading-dots');
  }
  if (value) {
    display.classList.add('has-value');
    console.log('  ✅ Text has value');
  } else {
    display.classList.remove('has-value');
    console.log('  ✅ Text cleared');
  }
  if (!errorDiv.classList.contains('hidden')) {
    errorDiv.classList.add('hidden');
    console.log('  ✅ Hiding error message');
  }
});

// Focus on load
setTimeout(() => {
  console.log('🎯 Attempting to focus input...');
  if (input) {
    input.focus();
    console.log('  ✅ Input focused');
  } else {
    console.log('  ❌ Input element not found');
  }
}, 100);

// Function to proceed to next page
async function proceedToNextPage() {
  console.log('🚀 proceedToNextPage() called');

  const u = loadUser();
  const name = (u?.name ?? '').trim();
  const city = (u?.city ?? '').trim();
  
  console.log('  User data:', { name, city });

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
  saveUser({ name, city });
  
  console.log('  Navigating to region.html...');
  window.location.href = 'region.html';
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

console.log('✅ LOCATION PAGE: Initialization complete');
console.log('💡 Tips:');
console.log('  - Press Enter to proceed to next page');
console.log('  - Use Backspace/Delete to clear text');
console.log('  - Check console for detailed event logs');

