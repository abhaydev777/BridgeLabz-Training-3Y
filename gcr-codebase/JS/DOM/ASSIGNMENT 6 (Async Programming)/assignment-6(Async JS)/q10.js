/**
 * Assignment 6: Question 10
 * The Final Delivery: Async Pipeline Debugger
 * Author: Abhay Pratap Singh
 */

// Helper to simulate asynchronous processing with random delay (1-2s) & failure
function simulateStep(stepName, stepMessage, failureChance = 0.15) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 1000) + 1000; // 1000ms to 2000ms

    setTimeout(() => {
      const isFailed = Math.random() < failureChance;

      if (isFailed) {
        reject(new Error(`${stepName} failed due to an unexpected operational issue`));
      } else {
        resolve(stepMessage);
      }
    }, delay);
  });
}

// Five distinct stages of the food delivery workflow
function takeOrder() {
  return simulateStep("Order Reception", "Step 1: Order taken");
}

function prepare() {
  return simulateStep("Kitchen Preparation", "Step 2: Food prepared");
}

function pack() {
  return simulateStep("Packaging Station", "Step 3: Package ready");
}

function dispatch() {
  return simulateStep("Rider Dispatch", "Step 4: Out for delivery");
}

function deliver() {
  return simulateStep("Customer Handover", "Delivery completed!");
}

/**
 * Runs the food delivery simulation pipeline sequentially.
 */
async function runPipeline() {
  console.log("Start Pipeline");

  try {
    const msg1 = await takeOrder();
    console.log(msg1);

    const msg2 = await prepare();
    console.log(msg2);

    const msg3 = await pack();
    console.log(msg3);

    const msg4 = await dispatch();
    console.log(msg4);

    const msg5 = await deliver();
    console.log(msg5);
  } catch (error) {
    // If any step rejects, execution halts immediately and jumps here
    console.error("Pipeline failed!");
    console.error(`Failure Cause: ${error.message}`);
  }
}

/*
================================================================================
ASYNC CONTROL FLOW & ERROR PROPAGATION EXPLANATION:
================================================================================
1. Sequential Control Flow:
   - When JavaScript hits an `await` expression, execution inside `runPipeline`
     is paused until the returned Promise settles (fulfills or rejects).
   - This guarantees that food preparation cannot begin before the order is taken,
     packing cannot occur before food is cooked, and dispatch waits for packing.

2. Error Propagation Mechanics:
   - If a Promise rejects (e.g. kitchen runs out of ingredients in `prepare()`),
     the `await` operator converts the Promise rejection into a thrown exception.
   - The JavaScript runtime immediately aborts any remaining statements in the
     `try` block. Neither `pack()`, `dispatch()`, nor `deliver()` will execute.
   - The error propagates directly to the enclosing `catch (error)` block, where
     "Pipeline failed!" is logged alongside the specific failure reason.
   - This model mirrors standard synchronous try/catch semantics, making error
     propagation predictable, safe, and leak-free.
================================================================================
*/

runPipeline();

