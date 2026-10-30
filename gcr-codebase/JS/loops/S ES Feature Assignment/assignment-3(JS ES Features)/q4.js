"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q4.js
 * Question: Debugging Mystery (Strict Mode Scope)
 * Author: Abhay Pratap Singh
 * 
 * ============================================================================
 * THEORETICAL ANALYSIS & DEBUGGER OBSERVATIONS
 * ============================================================================
 * 
 * 1. Sloppy Mode (Non-Strict Mode) Behavior:
 *    - In sloppy mode, when the JavaScript engine encounters `greeting = "Welcome"`,
 *      it searches the local function scope. Not finding `greeting`, it climbs the scope chain
 *      up to the Global Environment.
 *    - Because `greeting` is not declared anywhere, sloppy mode automatically creates a new
 *      property on the global object (`global.greeting` in Node.js, `window.greeting` in browsers).
 *    - Consequence: "Global Pollution" / "Implicit Global Variable Leakage".
 *      Any other script or function can accidentally overwrite or read `greeting`, leading
 *      to unpredictable side effects and hard-to-trace bugs.
 * 
 * 2. Strict Mode ("use strict";) Behavior:
 *    - Strict mode disables implicit global creation.
 *    - When the assignment `greeting = "Welcome"` is evaluated without a declaration
 *      keyword (`let`, `const`, or `var`), the engine halts execution and throws:
 *      `ReferenceError: greeting is not defined`.
 *    - Benefit: Enforces strict lexical scoping and catches typos or accidental leakage
 *      at runtime immediately.
 * 
 * 3. Call Stack & Execution Context Observations:
 *    - Call Stack State at Crash:
 *      [Frame 2] showMessageBroken()  --> Local Environment: greeting is undeclared
 *      [Frame 1] <anonymous> (Global) --> Global Execution Context
 *    - When the ReferenceError is thrown inside `showMessageBroken`, the engine unwinds
 *      the call stack to the nearest enclosing try...catch block.
 *    - With `const` or `let`, the variable is bound strictly to `showMessageFixed`'s
 *      local Environment Record. Once `showMessageFixed` finishes execution, its stack
 *      frame is popped and discarded, freeing memory cleanly.
 */

// -----------------------------------------------------------------------------
// Part 1: Demonstrating the Strict Mode ReferenceError
// -----------------------------------------------------------------------------

function showMessageBroken() {
  // Attempting to assign to an undeclared identifier in strict mode
  greeting = "Welcome"; // eslint-disable-line no-undef
  console.log(greeting);
}

console.log("================================================================================");
console.log("                   STRICT MODE SCOPE & LEAKAGE INVESTIGATION                    ");
console.log("================================================================================\n");

console.log("[TEST 1] Running broken function (undeclared variable in strict mode):");

try {
  showMessageBroken();
} catch (err) {
  console.log(`\n  >> CAUGHT EXPECTED ERROR:`);
  console.log(`     Type    : ${err.name}`);
  console.log(`     Message : ${err.message}`);
  console.log(`     Notice  : Strict mode prevented implicit global leakage!`);
}

// -----------------------------------------------------------------------------
// Part 2: Refactored and Fixed Implementation
// -----------------------------------------------------------------------------

console.log("\n--------------------------------------------------------------------------------");
console.log("[TEST 2] Running fixed function (explicit declaration with let / const):");

function showMessageFixed() {
  // Properly declared within the local function's lexical scope
  const greeting = "Welcome";
  console.log(`  >> Inside showMessageFixed: greeting = "${greeting}"`);
  return greeting;
}

const result = showMessageFixed();

// Verify that 'greeting' did not leak into the global scope
const isLeakedGlobally = typeof globalThis.greeting !== "undefined";
console.log(`\n  >> Scope Verification Check:`);
console.log(`     Has 'greeting' leaked to global scope? ${isLeakedGlobally ? "YES (LEAK!)" : "NO (Clean scope isolation)"}`);
console.log(`     Function executed cleanly with return value: "${result}"`);
console.log("================================================================================\n");

