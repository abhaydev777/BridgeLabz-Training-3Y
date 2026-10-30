/**
 * Assignment 7: Question 4
 * Theme Switcher Using Attribute Manipulation
 * Author: Abhay Pratap Singh
 */

// DOM references
const themeButtons = document.querySelectorAll('.theme-btn');
const themeStatus = document.getElementById('themeStatus');

/**
 * Applies a theme by setting attributes and classes on <body>
 * @param {string} themeName - 'light', 'dark', or 'blue'
 */
function applyTheme(themeName) {
  // 1. Store theme in custom data attribute via setAttribute()
  document.body.setAttribute('data-theme', themeName);

  // 2. Add corresponding theme class to body
  document.body.className = `${themeName}-theme`;

  // 3. Update active state on buttons
  themeButtons.forEach((btn) => {
    if (btn.getAttribute('data-theme') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 4. Update preview status badge text
  if (themeStatus) {
    themeStatus.textContent = `Active Theme: ${themeName}`;
  }
}

// Attach click listeners to all theme buttons
themeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const selectedTheme = event.currentTarget.getAttribute('data-theme');
    if (selectedTheme) {
      applyTheme(selectedTheme);
    }
  });
});

