/**
 * Assignment 7: Question 1
 * Dynamic Product List Manager (Event Delegation & Inline Editing)
 * Author: Abhay Pratap Singh
 */

// DOM element references
const productInput = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const productList = document.getElementById('productList');
const emptyNotice = document.getElementById('emptyNotice');

// Toggles the visibility of the empty list message
function updateEmptyNotice() {
  const items = productList.querySelectorAll('.product-item');
  if (items.length === 0) {
    if (!document.getElementById('emptyNotice')) {
      productList.appendChild(emptyNotice);
    }
    emptyNotice.style.display = 'block';
  } else if (emptyNotice && emptyNotice.parentNode) {
    emptyNotice.style.display = 'none';
  }
}

// Function to add a new product item to the list
function addProduct() {
  const productName = productInput.value.trim();

  if (productName === '') {
    alert('Please enter a product name.');
    productInput.focus();
    return;
  }

  // Create list item container
  const li = document.createElement('li');
  li.className = 'product-item';

  // Create product name text element
  const span = document.createElement('span');
  span.className = 'product-name';
  span.textContent = productName;

  // Create actions container with Edit and Delete buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-edit';
  editBtn.textContent = 'Edit';
  editBtn.setAttribute('data-action', 'edit');

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('data-action', 'delete');

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsDiv);

  productList.appendChild(li);

  // Clear input and restore focus
  productInput.value = '';
  productInput.focus();
  updateEmptyNotice();
}

// Enables inline editing on a selected product row
function startInlineEdit(listItem) {
  const nameSpan = listItem.querySelector('.product-name');
  if (!nameSpan) return; // Already in edit mode

  const currentText = nameSpan.textContent;

  // Create temporary input element for editing
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = currentText;

  // Replace text span with input
  listItem.replaceChild(editInput, nameSpan);
  editInput.focus();
  editInput.select();

  let hasSaved = false;

  // Save changes and revert back to span element
  const commitEdit = () => {
    if (hasSaved) return;
    hasSaved = true;

    const newText = editInput.value.trim();
    nameSpan.textContent = newText !== '' ? newText : currentText;

    if (editInput.parentNode) {
      listItem.replaceChild(nameSpan, editInput);
    }
  };

  // Auto-save on blur (losing focus / clicking outside)
  editInput.addEventListener('blur', commitEdit);

  // Allow pressing Enter to save, or Escape to cancel
  editInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      editInput.blur();
    } else if (event.key === 'Escape') {
      editInput.value = currentText;
      editInput.blur();
    }
  });
}

// Event Delegation: single click listener on parent <ul>
productList.addEventListener('click', (event) => {
  const target = event.target;
  const action = target.getAttribute('data-action');

  if (!action) return;

  const listItem = target.closest('.product-item');
  if (!listItem) return;

  if (action === 'delete') {
    listItem.remove();
    updateEmptyNotice();
  } else if (action === 'edit') {
    startInlineEdit(listItem);
  }
});

// Event listeners for adding products
addBtn.addEventListener('click', addProduct);

productInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addProduct();
  }
});

// Initialize state
updateEmptyNotice();

