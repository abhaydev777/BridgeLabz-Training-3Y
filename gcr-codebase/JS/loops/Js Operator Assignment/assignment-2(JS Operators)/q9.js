/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 9: Odd-Even Number Analyzer
 * Demonstrates array generation with loops, modulo operator (%) conditions, array push(), and count aggregation.
 */

// Step 1: Generate an array containing numbers 1 to 30 using a standard loop
const numbers = [];
for (let i = 1; i <= 30; i++) {
  numbers.push(i);
}

// Step 2: Iterate and classify numbers using conditionals and modulo operators
const classifiedResults = [];
let fizzBuzzCount = 0;
let evenCount = 0;
let oddCount = 0;

for (const num of numbers) {
  let label = "";

  // Priority Check 1: Divisible by both 3 AND 5
  if (num % 3 === 0 && num % 5 === 0) {
    label = "FizzBuzz";
    fizzBuzzCount++;
  }
  // Priority Check 2: Even number (divisible by 2)
  else if (num % 2 === 0) {
    label = "Even";
    evenCount++;
  }
  // Default Check 3: Odd number
  else {
    label = "Odd";
    oddCount++;
  }

  // Store result using .push()
  classifiedResults.push({ number: num, label: label });
}

// Output Results
console.log("==================================================");
console.log("            ODD-EVEN NUMBER ANALYZER              ");
console.log("==================================================");
console.log(`Generated Range: 1 to 30 (Total: ${numbers.length} numbers)\n`);

console.log("--- Classified Results List ---");
// Displaying 5 entries per row for clean, compact readability
for (let i = 0; i < classifiedResults.length; i += 5) {
  const row = classifiedResults
    .slice(i, i + 5)
    .map(entry => `${entry.number.toString().padStart(2, " ")}: [${entry.label.padEnd(8, " ")}]`)
    .join("  |  ");
  console.log(row);
}

console.log("\n--- Category Classification Counts ---");
console.log(`FizzBuzz (Divisible by 3 & 5) : ${fizzBuzzCount}`);
console.log(`Even (Divisible by 2)         : ${evenCount}`);
console.log(`Odd (Remaining numbers)       : ${oddCount}`);
console.log(`Total Verified Count          : ${fizzBuzzCount + evenCount + oddCount} / 30`);
console.log("==================================================\n");

