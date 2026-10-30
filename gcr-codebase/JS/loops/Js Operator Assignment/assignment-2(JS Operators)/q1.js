/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 1: Scope Conflict Resolver
 * Demonstrates global vs local scope, conditional assignment, and scope isolation.
 */

// Global variable definition
let bonus = 5000;

function calculateSalary(status) {
  // Local variables scoped strictly within calculateSalary()
  let salary = 40000;
  let isPermanent = Boolean(status);
  let totalSalary = salary;

  // Add global bonus only if the employee is permanent
  if (isPermanent) {
    totalSalary += bonus;
  }

  // Displaying local calculation results
  console.log(`[calculateSalary] isPermanent: ${isPermanent}`);
  console.log(`  Base Salary  : ₹${salary}`);
  console.log(`  Bonus Added  : ₹${isPermanent ? bonus : 0}`);
  console.log(`  Total Salary : ₹${totalSalary}\n`);

  return totalSalary;
}

// --- Driver & Verification Code ---
console.log("==========================================");
console.log("       QUESTION 1: SCOPE CONFLICT         ");
console.log("==========================================");
console.log(`Initial Global Bonus value: ₹${bonus}\n`);

// Scenario 1: Permanent employee (bonus should be included)
console.log("--- Scenario 1: Permanent Employee (true) ---");
calculateSalary(true);

// Scenario 2: Contractual employee (bonus should not be included)
console.log("--- Scenario 2: Contractual Employee (false) ---");
calculateSalary(false);

// Verifying scope isolation: global bonus remains intact
console.log("--- Scope Verification ---");
console.log(`Global Bonus value after function calls: ₹${bonus}`);
console.log("Verified: Local computations did not modify or shadow global bonus.");
console.log("==========================================\n");

