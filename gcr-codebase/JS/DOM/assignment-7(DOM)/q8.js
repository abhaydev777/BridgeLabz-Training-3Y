/**
 * Assignment 7: Question 8
 * Custom Dropdown Using Event Capturing (Capture Phase)
 * Author: Abhay Pratap Singh
 */

// DOM references
const customDropdown = document.getElementById('customDropdown');
const dropdownTrigger = document.getElementById('dropdownTrigger');
const selectedOptionText = document.getElementById('selectedOptionText');
const currentSelectionValue = document.getElementById('currentSelectionValue');
const dropdownItems = document.querySelectorAll('.dropdown-item');

/**
 * Opens the custom dropdown
 */
function openDropdown() {
  customDropdown.classList.add('open');
  dropdownTrigger.setAttribute('aria-expanded', 'true');
}

/**
 * Closes the custom dropdown
 */
function closeDropdown() {
  customDropdown.classList.remove('open');
  dropdownTrigger.setAttribute('aria-expanded', 'false');
}

// Toggle dropdown open/close on trigger button click
dropdownTrigger.addEventListener('click', () => {
  const isOpen = customDropdown.classList.contains('open');
  if (isOpen) {
    closeDropdown();
  } else {
    openDropdown();
  }
});

// Update selected option when an item is clicked
dropdownItems.forEach((item) => {
  item.addEventListener('click', () => {
    const text = item.textContent.trim();
    const value = item.getAttribute('data-value');

    // Update trigger label and details display
    selectedOptionText.textContent = text;
    currentSelectionValue.textContent = `${text} (${value})`;

    // Manage active visual state
    dropdownItems.forEach((i) => i.classList.remove('selected'));
    item.classList.add('selected');

    // Close menu after selection
    closeDropdown();
  });
});

/**
 * Outside click closing mechanism using Event Capturing:
 * window.addEventListener('click', handler, true) captures the event
 * at the root level before it bubbles.
 */
window.addEventListener(
  'click',
  (event) => {
    // If click originated outside the dropdown container, close the menu
    if (!customDropdown.contains(event.target)) {
      closeDropdown();
    }
  },
  true // true specifies the capture phase
);

// Close menu when Escape key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdown();
  }
});

