/**
 * Assignment 7: Question 3
 * Multi-Step Form with Next/Back & Step Validation
 * Author: Abhay Pratap Singh
 */

// Step containers
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const stepSummary = document.getElementById('stepSummary');

// Progress indicator circles
const circles = [
  document.getElementById('circle1'),
  document.getElementById('circle2'),
  document.getElementById('circle3'),
  document.getElementById('circle4')
];

// Input fields
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

// Error message placeholders
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Navigation buttons
const nextBtn1 = document.getElementById('nextBtn1');
const backBtn2 = document.getElementById('backBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const backBtn3 = document.getElementById('backBtn3');
const submitBtn3 = document.getElementById('submitBtn3');
const restartBtn = document.getElementById('restartBtn');

// Summary review fields
const summaryName = document.getElementById('summaryName');
const summaryEmail = document.getElementById('summaryEmail');
const summaryPassword = document.getElementById('summaryPassword');

// Stored form data
const formData = {
  name: '',
  email: '',
  password: ''
};

// Current active step index (0: Step 1, 1: Step 2, 2: Step 3, 3: Summary)
let currentStepIndex = 0;
const stepElements = [step1, step2, step3, stepSummary];

// Updates which step is visible and updates the progress indicator
function showStep(index) {
  currentStepIndex = index;

  stepElements.forEach((step, idx) => {
    if (idx === index) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Update circle indicators
  circles.forEach((circle, idx) => {
    circle.classList.remove('active', 'completed');
    if (idx < index) {
      circle.classList.add('completed');
    } else if (idx === index) {
      circle.classList.add('active');
    }
  });
}

// Validation logic for Step 1: Name
function validateStep1() {
  const value = nameInput.value.trim();
  if (value.length < 2) {
    nameError.textContent = 'Please enter a valid name (at least 2 characters).';
    nameInput.focus();
    return false;
  }
  nameError.textContent = '';
  formData.name = value;
  return true;
}

// Validation logic for Step 2: Email format check
function validateStep2() {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    emailError.textContent = 'Please enter a valid email address (e.g., user@domain.com).';
    emailInput.focus();
    return false;
  }
  emailError.textContent = '';
  formData.email = value;
  return true;
}

// Validation logic for Step 3: Password minimum length
function validateStep3() {
  const value = passwordInput.value;
  if (value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordInput.focus();
    return false;
  }
  passwordError.textContent = '';
  formData.password = value;
  return true;
}

// Populate and display final summary review
function renderSummary() {
  summaryName.textContent = formData.name;
  summaryEmail.textContent = formData.email;
  // Mask password with bullets matching length for privacy
  summaryPassword.textContent = '•'.repeat(formData.password.length);
}

// Step 1 -> Step 2
nextBtn1.addEventListener('click', () => {
  if (validateStep1()) {
    showStep(1);
    emailInput.focus();
  }
});

// Step 2 -> Step 1 (Back)
backBtn2.addEventListener('click', () => {
  emailError.textContent = '';
  showStep(0);
});

// Step 2 -> Step 3
nextBtn2.addEventListener('click', () => {
  if (validateStep2()) {
    showStep(2);
    passwordInput.focus();
  }
});

// Step 3 -> Step 2 (Back)
backBtn3.addEventListener('click', () => {
  passwordError.textContent = '';
  showStep(1);
});

// Step 3 -> Summary (Submit)
submitBtn3.addEventListener('click', () => {
  if (validateStep3()) {
    renderSummary();
    showStep(3);
  }
});

// Restart button to reset form
restartBtn.addEventListener('click', () => {
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  formData.name = '';
  formData.email = '';
  formData.password = '';
  showStep(0);
  nameInput.focus();
});

// Clear error on input while typing
nameInput.addEventListener('input', () => {
  if (nameError.textContent) nameError.textContent = '';
});

emailInput.addEventListener('input', () => {
  if (emailError.textContent) emailError.textContent = '';
});

passwordInput.addEventListener('input', () => {
  if (passwordError.textContent) passwordError.textContent = '';
});

