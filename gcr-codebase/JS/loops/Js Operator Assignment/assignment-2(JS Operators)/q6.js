/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 6: Event-Based Counter Simulation
 * Demonstrates state modification, sequential event invocation, nested inner functions, and closures.
 */

console.log("==================================================");
console.log("      EVENT-BASED COUNTER SIMULATION (PART 1)     ");
console.log("==================================================");

// Initialize global count variable
let count = 0;

// Standard event handlers modifying outer variable
function increment() {
  count++;
  console.log(`[Event Triggered: Click (+)] Count updated to: ${count}`);
}

function decrement() {
  count--;
  console.log(`[Event Triggered: Click (-)] Count updated to: ${count}`);
}

console.log(`Initial Count: ${count}`);
console.log("--- Simulating sequential user click events ---");
increment(); // 1
increment(); // 2
increment(); // 3
decrement(); // 2
increment(); // 3
decrement(); // 2
console.log(`Final Global Count after sequence: ${count}\n`);

console.log("==================================================");
console.log("   CLOSURE & NESTED INNER FUNCTION DEMO (PART 2)  ");
console.log("==================================================");

// Function scope and closure simulation
function createCounterManager(startingCount = 0) {
  // Scoped count variable isolated inside createCounterManager
  let count = startingCount;

  // Nested inner function accessing and modifying outer 'count' via closure
  function updateState(delta, actionLabel) {
    count += delta;
    console.log(`[Closure Event: ${actionLabel}] Inner count updated to: ${count}`);
    return count;
  }

  // Returning functions that close over 'count' and 'updateState'
  return {
    clickUp: function() {
      return updateState(1, "BUTTON_CLICK_UP");
    },
    clickDown: function() {
      return updateState(-1, "BUTTON_CLICK_DOWN");
    },
    getCount: function() {
      return count;
    }
  };
}

const uiCounter = createCounterManager(10);
console.log(`Initial Enclosed Count: ${uiCounter.getCount()}`);
console.log("--- Simulating UI button presses on isolated counter ---");
uiCounter.clickUp();   // 11
uiCounter.clickUp();   // 12
uiCounter.clickDown(); // 11
uiCounter.clickDown(); // 10
uiCounter.clickDown(); // 9
console.log(`Final Enclosed Count: ${uiCounter.getCount()}`);
console.log("==================================================\n");

