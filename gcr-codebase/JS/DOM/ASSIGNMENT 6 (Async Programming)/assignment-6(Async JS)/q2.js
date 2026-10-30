/**
 * Assignment 6: Question 2
 * Task Scheduler: Micro vs Macro Challenge
 * Author: Abhay Pratap Singh
 *
 * PREDICTED OUTPUT ORDER:
 * 1. Start
 * 2. Intermediate synchronous message
 * 3. End
 * 4. Microtask: Promise callback executed
 * 5. Macrotask: setTimeout callback executed
 */

console.log("Start");

// Macrotask (Timer Queue)
setTimeout(() => {
  console.log("Macrotask: setTimeout callback executed (0ms delay)");
}, 0);

// Microtask (Promise Jobs Queue)
Promise.resolve().then(() => {
  console.log("Microtask: Promise callback executed");
});

// Intermediate synchronous message
console.log("Intermediate synchronous message");

// Final synchronous log
console.log("End");

/*
================================================================================
EVENT LOOP EXPLANATION: Microtasks vs Macrotasks
================================================================================
1. Synchronous Execution Phase (Call Stack):
   - JavaScript is single-threaded. Synchronous statements ("Start",
     "Intermediate synchronous message", and "End") are pushed directly onto
     the Call Stack and executed immediately one after another.

2. Scheduling Asynchronous Tasks:
   - setTimeout(..., 0) registers a timer with the host environment (browser / Node.js).
     When the timer expires (almost immediately), its callback is placed in the
     Macrotask Queue (also known as the Task Queue).
   - Promise.resolve().then(...) immediately resolves and places its callback
     function into the Microtask Queue (Promise Job Queue).

3. Event Loop Processing & Priority:
   - When the Call Stack becomes completely empty after logging "End", the
     Event Loop checks the Microtask Queue first before touching any macrotasks.
   - The Event Loop guarantees that ALL microtasks in the Microtask Queue must be
     exhausted/drained completely before moving on to render UI or pick the next
     task from the Macrotask Queue.
   - Because of this strict priority rule, the Promise callback (microtask)
     runs before the setTimeout callback (macrotask), even though setTimeout was
     registered earlier in the code.
================================================================================
*/

