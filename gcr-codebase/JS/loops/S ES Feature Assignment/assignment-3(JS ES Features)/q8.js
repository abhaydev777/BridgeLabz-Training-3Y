"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q8.js
 * Question: Strict Mode Showdown
 * Author: Abhay Pratap Singh
 * 
 * ============================================================================
 * CODE UNDER TEST & THE THREE FATAL STRICT MODE VIOLATIONS
 * ============================================================================
 * 
 * Target Snippet:
 * ```javascript
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * ```
 * 
 * Fatal Error 1: Duplicate Parameter Names `(a, a)`
 * - Sloppy Mode Behavior:
 *   Permits duplicate parameter names. The second parameter simply shadows the
 *   first, so accessing `a` refers only to the second argument passed, while the
 *   first value is accessible only through the legacy `arguments[0]` object.
 * - Strict Mode Behavior:
 *   Throws a compile/parse-time `SyntaxError: Duplicate parameter name not allowed in this context`.
 *   Strict mode requires all parameter names to be distinct identifiers.
 * 
 * Fatal Error 2: Assigning to Undeclared Variable (`total = 10`)
 * - Sloppy Mode Behavior:
 *   Silently creates an accidental global variable (`global.total` in Node.js or
 *   `window.total` in browser runtimes), causing global namespace pollution.
 * - Strict Mode Behavior:
 *   Throws a runtime `ReferenceError: total is not defined`.
 *   Variables must be explicitly declared using `let`, `const`, or `var`.
 * 
 * Fatal Error 3: Deleting an Unqualified Identifier (`delete total`)
 * - Sloppy Mode Behavior:
 *   The `delete` operator is intended solely for object properties. In sloppy mode,
 *   calling `delete total` on a plain variable name evaluates to `false` (or deletes
 *   a global property) without throwing an error, masking bugs.
 * - Strict Mode Behavior:
 *   Throws a compile-time `SyntaxError: Delete of an unqualified identifier in strict mode.`
 *   Only configurable properties on objects (e.g., `delete obj.prop`) can be deleted.
 */

console.log("================================================================================");
console.log("                           STRICT MODE SHOWDOWN                                 ");
console.log("================================================================================\n");

console.log("--- PART 1: Demonstrating the 3 Fatal Strict Mode Violations ---\n");

// 1. Violation 1: Duplicate Parameter Names
try {
  // Using dynamic evaluation to capture the compile-time SyntaxError safely
  new Function('"use strict"; function demo(a, a) { return a; }')();
} catch (err) {
  console.log(`[VIOLATION 1] Duplicate Parameter Names:`);
  console.log(`  Code    : function demo(a, a) { ... }`);
  console.log(`  Thrown  : ${err.name} -> ${err.message}`);
  console.log(`  Why     : Strict mode forbids identical parameter identifiers to prevent shadowing bugs.\n`);
}

// 2. Violation 2: Implicit Global Variable Assignment
try {
  new Function('"use strict"; total = 10;')();
} catch (err) {
  console.log(`[VIOLATION 2] Undeclared Variable Assignment:`);
  console.log(`  Code    : total = 10;`);
  console.log(`  Thrown  : ${err.name} -> ${err.message}`);
  console.log(`  Why     : In strict mode, assignments to undeclared identifiers trigger ReferenceError instead of polluting global scope.\n`);
}

// 3. Violation 3: Deleting an Unqualified Identifier
try {
  new Function('"use strict"; var total = 10; delete total;')();
} catch (err) {
  console.log(`[VIOLATION 3] Deleting an Unqualified Identifier:`);
  console.log(`  Code    : delete total;`);
  console.log(`  Thrown  : ${err.name} -> ${err.message}`);
  console.log(`  Why     : The delete operator cannot be called directly on variable bindings, only on configurable object properties.\n`);
}

// -----------------------------------------------------------------------------
// PART 2: ES6 Refactored Clean Solution
// -----------------------------------------------------------------------------
console.log("--------------------------------------------------------------------------------");
console.log("--- PART 2: ES6 Refactored Version ---");

/**
 * Clean, production-ready ES6 implementation:
 * - Uses distinct, descriptive parameter names (e.g. `baseScore`, `bonusMultiplier`).
 * - Declares variables explicitly with `let` / `const`.
 * - Avoids illegal deletion and operates cleanly on local state.
 */
function demoRefactored(baseScore, bonusMultiplier) {
  // Explicitly declared local variable
  let total = 10;

  total += baseScore * bonusMultiplier;
  return total;
}

const calculation1 = demoRefactored(5, 2);  // 10 + (5 * 2) = 20
const calculation2 = demoRefactored(15, 3); // 10 + (15 * 3) = 55

console.log(`\nRefactored Function Executed Successfully:`);
console.log(`  demoRefactored(5, 2)  => Output: ${calculation1}`);
console.log(`  demoRefactored(15, 3) => Output: ${calculation2}`);
console.log("================================================================================\n");

