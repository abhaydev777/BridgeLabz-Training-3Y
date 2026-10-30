/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 2: String Manipulation Report
 * Demonstrates string trimming, case transformation, mapping, and replacement.
 */

// Initial raw product title with irregular whitespace and casing
const productTitle = " wireless headphones PRO ";

console.log("==========================================");
console.log("   QUESTION 2: STRING MANIPULATION REPORT ");
console.log("==========================================");
console.log(`Original Input String : "${productTitle}"`);
console.log(`Original Length       : ${productTitle.length} characters\n`);

// Step 1: Remove leading and trailing whitespaces
const trimmedTitle = productTitle.trim();
console.log(`Step 1 - Trimmed      : "${trimmedTitle}"`);

// Step 2: Convert to lowercase to normalize text
const lowerTitle = trimmedTitle.toLowerCase();
console.log(`Step 2 - Lowercase    : "${lowerTitle}"`);

// Step 3: Capitalize first letter of each word (Title Case) using split, map, and join
const titleCased = lowerTitle
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
console.log(`Step 3 - Title Case   : "${titleCased}"`);

// Step 4: Replace "Pro" with "Pro Edition" using replace()
const finalTitle = titleCased.replace("Pro", "Pro Edition");
console.log(`Step 4 - Replaced     : "${finalTitle}"\n`);

// Final Output Summary
console.log("--- Final Cleaned Report ---");
console.log(`Cleaned Product Title : ${finalTitle}`);
console.log(`Total Character Count : ${finalTitle.length}`);
console.log("==========================================\n");

