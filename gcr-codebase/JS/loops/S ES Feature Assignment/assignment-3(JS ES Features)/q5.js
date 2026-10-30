"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q5.js
 * Question: Hoisting Lab: The Sequence Trap
 * Author: Abhay Pratap Singh
 * 
 * ============================================================================
 * HOISTING MECHANISM IN-DEPTH ANALYSIS
 * ============================================================================
 * 
 * During the JavaScript Engine Creation / Compilation Phase:
 * 1. `var score`:
 *    - Memory is allocated in the VariableEnvironment.
 *    - Initialized automatically with `undefined`.
 *    - Result: `console.log(score)` outputs `undefined` instead of throwing an error.
 * 
 * 2. `function announce()`:
 *    - Function declarations are hoisted in full (both name and function body).
 *    - Placed into the Environment Record ready for immediate invocation.
 *    - Result: Calling `announce()` prior to its lexical declaration runs successfully.
 * 
 * 3. `let status = "ready"`:
 *    - Hoisted to the top of the block, but NOT initialized with any value.
 *    - Placed in the "Temporal Dead Zone" (TDZ) from the beginning of the scope
 *      until execution reaches the initialization line.
 *    - Any read/write in the TDZ throws a `ReferenceError`.
 * 
 * 4. `function startGame()`:
 *    - Fully hoisted like `announce()`.
 *    - Accesses outer variable `status`. In the original snippet, `startGame()` was called
 *      after `status` was initialized, so it logged `"ready"`. However, if called prior
 *      to `status` initialization, it would crash due to TDZ.
 */

console.log("================================================================================");
console.log("                      HOISTING LAB: THE SEQUENCE TRAP                           ");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// Part 1: Simulating the Original Hoisting Snippet
// -----------------------------------------------------------------------------
console.log("--- PART 1: Original Snippet Behavior Under JavaScript Hoisting ---");

// Hoisting simulation using standard var and function declarations
console.log("1. Output of console.log(score) before assignment:");
console.log("   ->", score); // logs 'undefined' due to var hoisting initialization
announce();               // logs "Game started" because function declaration is hoisted

var score = 50;
function announce() {
  console.log("2. Inside announce(): Game started (function declaration hoisted in full)");
}

let status = "ready";
startGame();
function startGame() {
  console.log("3. Inside startGame(): status is", status);
}

// -----------------------------------------------------------------------------
// Part 2: Corrected, Clean Sequential Code
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("--- PART 2: Corrected Sequential Execution Order ---");

// Step 1: Declare and initialize state variables
const correctScore = 50;
const correctStatus = "ready";

// Step 2: Define operations
function announceClean() {
  console.log("Clean announce: Game started");
}

function startGameClean(scoreVal, statusVal) {
  console.log(`Clean startGame: Score = ${scoreVal}, Status = "${statusVal}"`);
}

// Step 3: Invoke operations in a logical sequence
console.log("Executing in proper top-down sequential order:");
announceClean();
console.log("Current Score:", correctScore);
startGameClean(correctScore, correctStatus);

// -----------------------------------------------------------------------------
// Part 3: Modern ES6 Refactoring with Arrow Functions & const (TDZ Enforcement)
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("--- PART 3: Modern ES6 Arrow Functions & TDZ Safety ---");

/**
 * Why Arrow Functions + const prevent pre-declaration invocation:
 * - When assigning an arrow function to a `const` identifier, the identifier is
 *   lexically scoped and placed in the Temporal Dead Zone (TDZ) prior to initialization.
 * - Attempting to invoke `modernAnnounce()` before `const modernAnnounce = () => ...`
 *   throws a runtime `ReferenceError`, completely eliminating unexpected invocation bugs.
 */

// Demonstrating TDZ protection with try...catch
try {
  // @ts-ignore - Demonstrating TDZ invocation failure
  modernAnnounce(); // Will throw ReferenceError
} catch (err) {
  console.log("TDZ Safety Proof: Calling modernAnnounce() before declaration throws:");
  console.log(`  -> ${err.name}: ${err.message}`);
}

// Proper ES6 Declarations
const modernScore = 50;
const modernStatus = "ready";

const modernAnnounce = () => {
  console.log("Modern ES6 Announce: Game initialized cleanly via arrow function.");
};

const modernStartGame = () => {
  console.log(`Modern ES6 Start: Score is ${modernScore}, Game status is "${modernStatus}".`);
};

console.log("\nExecuting modern ES6 arrow functions safely after declaration:");
modernAnnounce();
modernStartGame();
console.log("================================================================================\n");

