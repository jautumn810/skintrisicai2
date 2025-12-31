import { loadUser, saveUser } from '../storage.js';
import { isValidLettersOnly } from '../validators.js';
import { postPhaseOne } from '../api.js';

console.log('🏙️ CITY PAGE: Initializing...');

const input = document.getElementById('city-input');
const display = document.getElementById('city-display');
const text = document.getElementById('city-text');
const caret = document.getElementById('city-caret');
const errorDiv = document.getElementById('error-message');
const proceedBtn = document.getElementById('proceed-btn');

console.log('Element Check:');
console.log('  input:', input ? '✅ Found' : '❌ NOT FOUND');
console.log('  display:', display ? '✅ Found' : '❌ NOT FOUND');
console.log('  text:', text ? '✅ Found' : '❌ NOT FOUND');
console.log('  caret:', caret ? '✅ Found' : '❌ NOT FOUND');
console.log('  errorDiv:', errorDiv ? '✅ Found' : '❌ NOT FOUND');
console.log('  proceedBtn:', proceedBtn ? '✅ Found' : '❌ NOT FOUND (button was removed)');

// Load saved city
const user = loadUser();
console.log('Loaded user:', user);
if (user?.location) {
  console.log('Setting saved city:', user.location);
  input.value = user.location;
  text.textContent = user.location;
  display.classList.add('has-value');
  caret.classList.add('hidden');
}

input.addEventListener('input', (e) => {
  const value = e.target.value;
  console.log('⌨️ INPUT EVENT:', {
    value: value,
    length: value.length,
    isEmpty: !value
  });
  text.textContent = value || 'your city name';
  if (value) {
    display.classList.add('has-value');
    caret.classList.add('hidden');
    console.log('  ✅ Text has value, hiding caret');
  } else {
    display.classList.remove('has-value');
    caret.classList.remove('hidden');
    console.log('  ✅ Text cleared, showing caret');
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
  const city = input.value.trim();
  console.log('  City value:', city);
  console.log('  City length:', city.length);
  
  if (!isValidLettersOnly(city)) {
    console.log('  ❌ City validation failed');
    errorDiv.textContent = 'Enter a valid city (letters only).';
    errorDiv.classList.remove('hidden');
    return;
  }
  console.log('  ✅ City validation passed');

  const u = loadUser();
  const name = (u?.name ?? '').trim();
  const cityValue = city.trim();
  
  console.log('  User data:', { name, city: cityValue });

  if (!isValidLettersOnly(name)) {
    console.log('  ❌ Name validation failed');
    errorDiv.textContent = 'Name is missing/invalid. Go back and enter your name.';
    errorDiv.classList.remove('hidden');
    return;
  }
  console.log('  ✅ Name validation passed');

  errorDiv.classList.add('hidden');
  console.log('  Saving user data...');
  saveUser({ name, city: cityValue });
  
  console.log('  Navigating to location.html...');
  window.location.href = 'location.html';
}

// Handle Enter key
input.addEventListener('keydown', (e) => {
  console.log('⌨️ KEYDOWN EVENT:', {
    key: e.key,
    code: e.code,
    keyCode: e.keyCode,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    shiftKey: e.shiftKey,
    altKey: e.altKey
  });

  // Handle Enter key
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log('  ✅ ENTER KEY PRESSED');
    e.preventDefault();
    e.stopPropagation();
    proceedToNextPage();
    return;
  }

  // Handle Backspace/Delete to clear
  if (e.key === 'Backspace' || e.key === 'Delete' || e.keyCode === 8 || e.keyCode === 46) {
    console.log('  ✅ BACKSPACE/DELETE KEY PRESSED');
    console.log('  Current value before key:', input.value);
    setTimeout(() => {
      console.log('  Value after key:', input.value);
      if (!input.value) {
        console.log('  ✅ Input is now empty');
      }
    }, 0);
  }
});

input.addEventListener('keyup', (e) => {
  console.log('⌨️ KEYUP EVENT:', {
    key: e.key,
    code: e.code,
    value: input.value,
    length: input.value.length
  });
});

// Global keydown listener as a fallback
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.keyCode === 13) {
    console.log('  🌍 GLOBAL KEYDOWN: ENTER PRESSED');
    if (document.activeElement === input) {
      console.log('    ✅ Input is focused, proceeding via global listener.');
      e.preventDefault();
      e.stopPropagation();
      proceedToNextPage();
    } else {
      console.log('    ⚠️ Enter pressed but input is not focused. Active element:', document.activeElement);
    }
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

console.log('✅ CITY PAGE: Initialization complete');
console.log('💡 Tips:');
console.log('  - Press Enter to proceed to next page');
console.log('  - Use Backspace/Delete to clear text');
console.log('  - Check console for detailed event logs');

