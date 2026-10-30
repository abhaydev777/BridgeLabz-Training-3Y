/**
 * Assignment 6: Question 9
 * Debugging the Event Loop
 * Author: Abhay Pratap Singh
 *
 * ============================================================================
 * PREDICTED CONSOLE OUTPUT ORDER (Written prior to running):
 * 1. "Script start"
 * 2. "Script end"
 * 3. "Promise callback"
 * 4. "Timeout callback"
 * ============================================================================
 */

// --- Code Snippet Under Analysis ---
console.log("Script start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("Script end");

/*
================================================================================
CONTRAST: PREDICTION VS REALITY
================================================================================
Actual Observed Output:
  1. Script start
  2. Script end
  3. Promise callback
  4. Timeout callback

Conclusion:
  The prediction matched reality 100%.

================================================================================
EVENT LOOP & QUEUE DRAINING MECHANICS (Why microtasks run first):
================================================================================
1. Call Stack (Synchronous Phase):
   - JavaScript begins executing top-level script synchronously.
   - Line 16: "Script start" is pushed to the call stack and printed immediately.
   - Line 18: setTimeout(..., 0) hands off the timer to the Node/browser host API.
     Upon 0ms expiry, the timer's callback is enqueued into the MACROTASK Queue.
   - Line 22: Promise.resolve() creates an already-fulfilled promise. The attached
     .then() handler is enqueued into the MICROTASK Queue (Job Queue).
   - Line 26: "Script end" is pushed to the call stack and printed immediately.

2. Turn of the Event Loop:
   - Synchronous script execution completes; the Call Stack is now idle.
   - High-Priority Microtask Draining:
     The Event Loop specification requires that all pending jobs in the
     Microtask Queue must be processed and fully drained before the engine can
     move to the next macrotask or repaint the browser frame.
   - Therefore, "Promise callback" executes first.

3. Macrotask Turn:
   - Once the Microtask Queue is completely empty, the Event Loop takes the
     oldest task from the Macrotask Queue (the setTimeout callback).
   - "Timeout callback" executes last.
================================================================================
*/

