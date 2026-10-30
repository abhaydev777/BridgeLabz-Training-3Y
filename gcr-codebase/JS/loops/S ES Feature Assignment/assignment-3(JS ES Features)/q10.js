"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q10.js
 * Question: Nested Hoisting and Closures
 * Author: Abhay Pratap Singh
 * 
 * ============================================================================
 * THEORETICAL ANALYSIS: EXECUTION CONTEXTS, VARIABLE SHADOWING & CALL STACK
 * ============================================================================
 * 
 * 1. Target Code Snippet:
 *    ```javascript
 *    function outer() {
 *      console.log(count);
 *      var count = 5;
 *      function inner() {
 *        console.log(count);
 *        var count = 10;
 *      }
 *      inner();
 *    }
 *    outer();
 *    ```
 * 
 * 2. Prediction & Output Explanation:
 *    - Expected Output: `undefined` followed by `undefined`.
 *    - Why first `undefined` (in outer):
 *      When `outer()` is invoked, its Execution Context (EC) is created. During the
 *      creation/compilation phase, `var count` is hoisted to the top of `outer`'s
 *      VariableEnvironment and initialized with `undefined`. When line 1 runs,
 *      `count` has not yet been assigned 5, so it logs `undefined`.
 *    - Why second `undefined` (in inner) - The Variable Shadowing Trap:
 *      Inside `inner()`, there is an independent declaration: `var count = 10;`.
 *      When `inner()` EC is created, its own local `count` is hoisted in `inner`'s
 *      VariableEnvironment and initialized to `undefined`.
 *      Because a local identifier named `count` exists, it SHADOWS the outer `count` (5).
 *      The JavaScript engine resolves identifiers by checking the immediate Environment
 *      Record first. Since it finds local `count` (currently `undefined`), it stops
 *      searching and never reaches the outer scope. Hence, inner logs `undefined`!
 * 
 * 3. Call Stack Lifecycle & Memory Stores:
 *    - [Step 1] Global Execution Context (GEC) pushed to stack.
 *    - [Step 2] outer() called: [GEC -> outer() EC] pushed.
 *               Memory Store (outer): { count: undefined } -> updated to { count: 5 }.
 *    - [Step 3] inner() called: [GEC -> outer() EC -> inner() EC] pushed.
 *               Memory Store (inner): { count: undefined } -> updated to { count: 10 }.
 *    - [Step 4] inner() finishes: inner() EC popped from stack (teardown).
 *    - [Step 5] outer() finishes: outer() EC popped from stack (teardown).
 *    - [Step 6] GEC finishes.
 */

console.log("================================================================================");
console.log("                    NESTED HOISTING & CLOSURE LAB                               ");
console.log("================================================================================\n");

// -----------------------------------------------------------------------------
// PART 1: Demonstrating the Original Snippet & Hoisting Output
// -----------------------------------------------------------------------------
console.log("--- PART 1: Original Snippet Execution ---");

function originalOuter() {
  console.log("  [outer] Log before assignment :", count); // undefined
  var count = 5;

  function inner() {
    console.log("  [inner] Log before assignment :", count); // undefined (shadowed!)
    var count = 10;
  }

  inner();
}

console.log("Running originalOuter():");
originalOuter();

// -----------------------------------------------------------------------------
// PART 2: Refactoring with ES6 Arrow Function & True Closure Behavior
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("--- PART 2: ES6 Arrow Function Refactoring (True Closure) ---");

/**
 * True Closure Implementation:
 * - We remove the inner `var count` declaration.
 * - `inner` is defined as an ES6 arrow function.
 * - Because `inner` does not declare its own `count`, identifier resolution climbs
 *   the Lexical Scope Chain up to `outerWithClosure`'s environment.
 * - `inner` forms a closure over `count`, retaining access to it even if called later.
 */
function outerWithClosure() {
  let count = 5;

  // Arrow function closes over the lexical environment of outerWithClosure
  const innerArrow = () => {
    console.log(`  [innerArrow] Accessing outer count directly via closure: ${count}`);
    count += 10; // Mutates outer count through closure reference
  };

  console.log(`  [outerWithClosure] Initial count: ${count}`);
  innerArrow();
  console.log(`  [outerWithClosure] Count after innerArrow mutation: ${count}`);
}

console.log("Running outerWithClosure():");
outerWithClosure();

// -----------------------------------------------------------------------------
// PART 3: Closure Persistence Beyond Stack Frame Teardown
// -----------------------------------------------------------------------------
console.log("\n--------------------------------------------------------------------------------");
console.log("--- PART 3: Closure Persistence Beyond Stack Frame Teardown ---");

/**
 * Demonstrates how a closure preserves outer variables on the heap even after
 * the outer function's execution context has been popped from the call stack.
 */
function createPersistentCounter(initialValue = 0) {
  let currentCount = initialValue; // Stored in the closure heap record

  return {
    increment: () => ++currentCount,
    decrement: () => --currentCount,
    getValue: () => currentCount
  };
}

// createPersistentCounter executes and its stack frame is popped!
const counter = createPersistentCounter(100);

console.log("Counter initialized to 100 (stack frame already popped).");
console.log("Calling counter.increment() -> Value:", counter.increment());
console.log("Calling counter.increment() -> Value:", counter.increment());
console.log("Calling counter.decrement() -> Value:", counter.decrement());
console.log("Final counter value         -> Value:", counter.getValue());
console.log("================================================================================\n");

