/**
 * Assignment 7: Question 2
 * Live Character Counter with Warning Behavior
 * Author: Abhay Pratap Singh
 */

const MAX_CHARACTERS = 100;

// DOM element references
const messageInput = document.getElementById('messageInput');
const counterDisplay = document.getElementById('counterDisplay');
const resetBtn = document.getElementById('resetBtn');

// Keys allowed even when the character limit is reached
const ALLOWED_KEYS = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Tab',
  'Home',
  'End',
  'Escape'
];

// Updates character counter text and color state
function updateCharacterCount() {
  // Guard in case characters are pasted beyond the max limit
  if (messageInput.value.length > MAX_CHARACTERS) {
    messageInput.value = messageInput.value.slice(0, MAX_CHARACTERS);
  }

  const remaining = MAX_CHARACTERS - messageInput.value.length;
  counterDisplay.textContent = `Characters remaining: ${remaining}`;

  // Reset classes
  counterDisplay.classList.remove('normal', 'warning', 'danger');

  // Apply appropriate visual style based on threshold
  if (remaining === 0) {
    counterDisplay.classList.add('danger');
  } else if (remaining <= 20) {
    counterDisplay.classList.add('warning');
  } else {
    counterDisplay.classList.add('normal');
  }
}

// Blocks key entry when limit is reached unless it's a deletion/navigation key
messageInput.addEventListener('keydown', (event) => {
  const currentLength = messageInput.value.length;
  const isTextSelected = messageInput.selectionStart !== messageInput.selectionEnd;

  // Allow shortcut keys (Ctrl/Cmd + C, V, A, Z, etc.)
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  // If limit reached and no text is selected for replacement, block standard typing
  if (currentLength >= MAX_CHARACTERS && !ALLOWED_KEYS.includes(event.key) && !isTextSelected) {
    event.preventDefault();
  }
});

// Update counter on input (handles typing, backspacing, and paste)
messageInput.addEventListener('input', updateCharacterCount);

// Reset textarea and counter display
resetBtn.addEventListener('click', () => {
  messageInput.value = '';
  updateCharacterCount();
  messageInput.focus();
});

// Initial render
updateCharacterCount();

