/**
 * Assignment 7: Question 9
 * Form Submit Blocker with preventDefault() & Real-time Live Error Clearing
 * Author: Abhay Pratap Singh
 */

// Form and input element references
const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Inline error placeholders
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Success notification banner
const successBanner = document.getElementById('successBanner');

/**
 * Validates the Name field
 * @returns {boolean}
 */
function validateName() {
  const value = nameInput.value.trim();
  if (value === '') {
    nameError.textContent = 'Name is required.';
    nameInput.classList.add('input-error');
    return false;
  }
  nameError.textContent = '';
  nameInput.classList.remove('input-error');
  return true;
}

/**
 * Validates the Email field (must not be empty and must contain '@')
 * @returns {boolean}
 */
function validateEmail() {
  const value = emailInput.value.trim();
  if (value === '') {
    emailError.textContent = 'Email is required.';
    emailInput.classList.add('input-error');
    return false;
  }
  if (!value.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    emailError.textContent = 'Please enter a valid email address containing "@" and domain.';
    emailInput.classList.add('input-error');
    return false;
  }
  emailError.textContent = '';
  emailInput.classList.remove('input-error');
  return true;
}

/**
 * Validates the Password field (min 6 characters)
 * @returns {boolean}
 */
function validatePassword() {
  const value = passwordInput.value;
  if (value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordInput.classList.add('input-error');
    return false;
  }
  passwordError.textContent = '';
  passwordInput.classList.remove('input-error');
  return true;
}

// Real-time correction listeners: Clear error message automatically as user types valid input
nameInput.addEventListener('input', () => {
  if (nameInput.value.trim() !== '') {
    nameError.textContent = '';
    nameInput.classList.remove('input-error');
  }
  successBanner.style.display = 'none';
});

emailInput.addEventListener('input', () => {
  const val = emailInput.value.trim();
  if (val !== '' && val.includes('@') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    emailError.textContent = '';
    emailInput.classList.remove('input-error');
  }
  successBanner.style.display = 'none';
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.length >= 6) {
    passwordError.textContent = '';
    passwordInput.classList.remove('input-error');
  }
  successBanner.style.display = 'none';
});

// Form submit event handler
registrationForm.addEventListener('submit', (event) => {
  // Prevent default page reload and submission
  event.preventDefault();

  // Validate each field
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  // If all fields are valid, show success message
  if (isNameValid && isEmailValid && isPasswordValid) {
    successBanner.textContent = 'Form Submitted Successfully';
    successBanner.style.display = 'block';

    // Clear form inputs
    registrationForm.reset();
  } else {
    successBanner.style.display = 'none';
  }
});

