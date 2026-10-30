/**
 * Assignment 7: Question 5
 * Image Gallery with Modal Preview & Event Bubbling Control
 * Author: Abhay Pratap Singh
 */

// DOM references
const galleryCards = document.querySelectorAll('.gallery-card');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalCloseBtn = document.getElementById('modalCloseBtn');

/**
 * Opens the modal with full-resolution image and caption
 * @param {string} src 
 * @param {string} caption 
 */
function openModal(src, caption) {
  modalImg.src = src;
  modalImg.alt = caption;
  modalCaption.textContent = caption;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Closes the modal popup
 */
function closeModal() {
  modalOverlay.classList.remove('active');
  modalImg.src = '';
  document.body.style.overflow = '';
}

// Attach click listeners to gallery cards to trigger modal
galleryCards.forEach((card) => {
  card.addEventListener('click', () => {
    const fullSrc = card.getAttribute('data-full');
    const caption = card.getAttribute('data-caption') || 'Image Preview';
    openModal(fullSrc, caption);
  });
});

// Click on the backdrop (outside modalContent) closes the modal
modalOverlay.addEventListener('click', () => {
  closeModal();
});

// Stop click events inside modalContent from bubbling up to modalOverlay
modalContent.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Close button click handler
modalCloseBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  closeModal();
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

