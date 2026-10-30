"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q6.js
 * Question: Pyramid Pattern Generator
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Generates an increasing asterisk pyramid pattern using nested loops.
 * Demonstrates the critical differences between block-scoped `let` vs
 * function/global-scoped `var` in nested loop iterations.
 */

console.log("================================================================================");
console.log("                           PYRAMID PATTERN GENERATOR                            ");
console.log("================================================================================\n");

/**
 * Generates and prints an asterisk pyramid with a configurable number of rows.
 * @param {number} [rows=5] - Number of rows for the pyramid (default is 5).
 */
function generatePyramid(rows = 5) {
  if (typeof rows !== "number" || rows <= 0 || !Number.isInteger(rows)) {
    console.log("Invalid rows parameter. Must be a positive integer.");
    return;
  }

  console.log(`Generating Pyramid with ${rows} rows:`);
  console.log("-".repeat(30));

  // Outer loop controls row count (strictly block-scoped with let)
  for (let row = 1; row <= rows; row++) {
    let rowString = "";

    // Inner loop controls column elements per row
    for (let col = 1; col <= row; col++) {
      // Append asterisk and space delimiter (trimmed for clean line output)
      rowString += (col === 1 ? "*" : " *");
    }

    console.log(rowString);
  }
  console.log("-".repeat(30));
}

// Test with default parameter (rows = 5)
console.log("[CASE 1] Invoking with default parameter (rows = 5):");
generatePyramid();

console.log("\n[CASE 2] Invoking with custom parameter (rows = 4):");
generatePyramid(4);

// -----------------------------------------------------------------------------
// SCOPE ANALYSIS: Block-scoped `let` vs Function-scoped `var`
// -----------------------------------------------------------------------------
console.log("\n================================================================================");
console.log("                 SCOPE INVESTIGATION: let VS var IN NESTED LOOPS                ");
console.log("================================================================================\n");

/**
 * DEMO 1: Variable Leakage
 * - Variables declared with `var` ignore block boundaries ({}) of loops.
 *   They leak directly into the enclosing function or global scope.
 * - Variables declared with `let` are strictly bound to the block scope.
 */
function demonstrateVariableLeakage() {
  console.log("--- 1. Variable Scope Leakage Test ---");

  // Loop using 'var'
  for (var varIndex = 1; varIndex <= 3; varIndex++) {
    // iterating...
  }
  console.log(`Using 'var': varIndex leaks outside the loop block! Value = ${varIndex}`);

  // Loop using 'let'
  for (let letIndex = 1; letIndex <= 3; letIndex++) {
    // iterating...
  }

  try {
    // @ts-ignore
    console.log(letIndex); // Throws ReferenceError
  } catch (err) {
    console.log(`Using 'let': letIndex is contained safely within block scope. Access outside throws:`);
    console.log(`  -> ${err.name}: ${err.message}`);
  }
}

demonstrateVariableLeakage();

/**
 * DEMO 2: The Nested Loop Collision Trap with `var`
 * - When `var` is accidentally used with the same variable name in nested loops,
 *   the inner loop mutates the outer loop's counter because both point to the
 *   same slot in the function's VariableEnvironment!
 * - With `let`, each block creates a new lexical environment binding, allowing
 *   clean shadowing without corrupting the outer loop.
 */
function demonstrateNestedCollision() {
  console.log("\n--- 2. Nested Counter Collision Bug (Demonstrated with let safety) ---");
  console.log("If an inner loop reuses `var i`, it corrupts the outer `var i`, causing early termination or infinite loops.");
  console.log("With ES6 `let`, inner `let i` cleanly shadows outer `let i` without collision:\n");

  for (let i = 1; i <= 2; i++) {
    console.log(`  Outer loop iteration: i = ${i}`);
    for (let i = 1; i <= 2; i++) {
      console.log(`    Inner loop iteration: inner i = ${i} (outer i is protected)`);
    }
  }
}

demonstrateNestedCollision();
console.log("\n================================================================================\n");
