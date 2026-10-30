/**
 * Assignment 7: Question 7
 * Detect Mouse Path & Coordinates Logger
 * Author: Abhay Pratap Singh
 */

// DOM references
const trackerBox = document.getElementById('trackerBox');
const clientCoords = document.getElementById('clientCoords');
const offsetCoords = document.getElementById('offsetCoords');
const dotCounter = document.getElementById('dotCounter');
const clearDotsBtn = document.getElementById('clearDotsBtn');

let dotsCount = 0;

// Updates live coordinate displays on mouse move inside the 400x400 box
trackerBox.addEventListener('mousemove', (event) => {
  const clientX = event.clientX;
  const clientY = event.clientY;
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  clientCoords.textContent = `X: ${clientX}, Y: ${clientY}`;
  offsetCoords.textContent = `X: ${offsetX}, Y: ${offsetY}`;
});

// Reset display when mouse leaves the tracking boundary
trackerBox.addEventListener('mouseleave', () => {
  clientCoords.textContent = 'X: --, Y: --';
  offsetCoords.textContent = 'X: --, Y: --';
});

// Dynamically create a small red dot on double-click
trackerBox.addEventListener('dblclick', (event) => {
  const dot = document.createElement('div');
  dot.className = 'red-dot';

  // Position dot exactly at clicked coordinates inside the box
  dot.style.left = `${event.offsetX}px`;
  dot.style.top = `${event.offsetY}px`;

  trackerBox.appendChild(dot);
  dotsCount++;
  dotCounter.textContent = `Dots Placed: ${dotsCount}`;
});

// Clear all dropped dots
clearDotsBtn.addEventListener('click', () => {
  const dots = trackerBox.querySelectorAll('.red-dot');
  dots.forEach((dot) => dot.remove());
  dotsCount = 0;
  dotCounter.textContent = 'Dots Placed: 0';
});

