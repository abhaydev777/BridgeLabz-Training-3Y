/**
 * Assignment 4 - Question 3: Library Management System (Classes + Objects)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Book class with title, author, isbn, and isIssued (default false).
 * - issueBook() method: sets isIssued to true if available; otherwise logs warning.
 * - returnBook() method: sets isIssued to false.
 * - Array of book objects.
 * - Helper functions:
 *   1. displayAvailableBooks() using filter().
 *   2. searchAndIssueByISBN() to locate and issue book.
 */

class Book {
  constructor(title, author, isbn, isIssued = false) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = isIssued;
  }

  // Attempts to issue the book
  issueBook() {
    if (this.isIssued) {
      console.log(`[Status] "${this.title}" (ISBN: ${this.isbn}) is ALREADY issued to someone else.`);
      return false;
    }
    this.isIssued = true;
    console.log(`[Success] "${this.title}" (ISBN: ${this.isbn}) has been successfully ISSUED.`);
    return true;
  }

  // Returns the book to the library
  returnBook() {
    if (!this.isIssued) {
      console.log(`[Notice] "${this.title}" (ISBN: ${this.isbn}) was not issued. It is already on the shelf.`);
      return false;
    }
    this.isIssued = false;
    console.log(`[Success] "${this.title}" (ISBN: ${this.isbn}) has been RETURNED and is now available.`);
    return true;
  }

  // Summary string
  getInfo() {
    const status = this.isIssued ? "ISSUED" : "AVAILABLE";
    return `[${status}] "${this.title}" by ${this.author} (ISBN: ${this.isbn})`;
  }
}

// Sample library inventory
const library = [
  new Book("Clean Code", "Robert C. Martin", "978-0132350884"),
  new Book("You Don't Know JS Yet", "Kyle Simpson", "978-1098174484"),
  new Book("Design Patterns", "Erich Gamma et al.", "978-0201633610", true), // initially issued
  new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1593279509"),
  new Book("The Pragmatic Programmer", "Andrew Hunt, David Thomas", "978-0135957059")
];

// Helper function 1: Filter and display all currently available books
function displayAvailableBooks(books) {
  console.log("\n--- Currently Available Books (filter) ---");
  const available = books.filter(book => !book.isIssued);

  if (available.length === 0) {
    console.log("No books are currently available.");
  } else {
    available.forEach((book, index) => {
      console.log(`  ${index + 1}. ${book.getInfo()}`);
    });
  }
  return available;
}

// Helper function 2: Search book by ISBN and issue it to a user
function searchAndIssueByISBN(books, isbn, borrowerName) {
  console.log(`\n--- Action: Attempting to issue ISBN: ${isbn} for student: ${borrowerName} ---`);
  const foundBook = books.find(book => book.isbn === isbn);

  if (!foundBook) {
    console.log(`[Error] Book with ISBN "${isbn}" not found in library catalogue.`);
    return null;
  }

  const success = foundBook.issueBook();
  if (success) {
    console.log(`-> Assigned to borrower: ${borrowerName}`);
  }
  return foundBook;
}

// Helper function 3: Return book by ISBN
function returnBookByISBN(books, isbn) {
  console.log(`\n--- Action: Returning book with ISBN: ${isbn} ---`);
  const foundBook = books.find(book => book.isbn === isbn);

  if (!foundBook) {
    console.log(`[Error] Book with ISBN "${isbn}" not found in library catalogue.`);
    return null;
  }

  foundBook.returnBook();
  return foundBook;
}

// ================= Execution & Verification =================
console.log("=================================================");
console.log("     QUESTION 3: LIBRARY MANAGEMENT SYSTEM       ");
console.log("=================================================");

// Initial catalog status
console.log("\n--- Complete Library Catalog ---");
library.forEach(b => console.log(b.getInfo()));

// 1. Show available books
displayAvailableBooks(library);

// 2. Issue an available book (Eloquent JavaScript)
searchAndIssueByISBN(library, "978-1593279509", "Abhay Pratap Singh");

// 3. Attempt to issue a book that is already issued (Design Patterns)
searchAndIssueByISBN(library, "978-0201633610", "Rahul Sharma");

// 4. Attempt to issue a book that does not exist
searchAndIssueByISBN(library, "978-0000000000", "Aman Verma");

// 5. Return a book (Design Patterns)
returnBookByISBN(library, "978-0201633610");

// 6. Now issue Design Patterns after it was returned
searchAndIssueByISBN(library, "978-0201633610", "Rahul Sharma");

// 7. Check final available books
displayAvailableBooks(library);

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Book, library, displayAvailableBooks, searchAndIssueByISBN, returnBookByISBN };
}

