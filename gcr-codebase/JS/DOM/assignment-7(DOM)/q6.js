/**
 * Assignment 7: Question 6
 * Real-Time Table Filter Using the 'input' Event
 * Author: Abhay Pratap Singh
 */

// DOM references
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
const noResultsRow = document.getElementById('noResultsRow');
const matchInfo = document.getElementById('matchInfo');

// Select all data rows (excluding the no-results row)
const studentRows = Array.from(tableBody.querySelectorAll('tr')).filter(
  (row) => row.id !== 'noResultsRow'
);

const totalStudents = studentRows.length;

/**
 * Filters table rows based on input search query
 */
function filterTable() {
  const query = searchInput.value.trim().toLowerCase();
  let matchingCount = 0;

  studentRows.forEach((row) => {
    // Combine text content from all cells in this row for case-insensitive comparison
    const rowText = row.textContent.toLowerCase();

    if (rowText.includes(query)) {
      row.style.display = ''; // Show row
      matchingCount++;
    } else {
      row.style.display = 'none'; // Hide non-matching row
    }
  });

  // Display 'No results found' message if 0 matches
  if (matchingCount === 0) {
    noResultsRow.style.display = '';
  } else {
    noResultsRow.style.display = 'none';
  }

  // Update counter summary
  matchInfo.textContent = `Showing ${matchingCount} of ${totalStudents} students`;
}

// Listen to real-time keystrokes using the 'input' event
searchInput.addEventListener('input', filterTable);

