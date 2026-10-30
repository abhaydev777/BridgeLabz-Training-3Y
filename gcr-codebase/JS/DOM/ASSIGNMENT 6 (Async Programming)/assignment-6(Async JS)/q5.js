/**
 * Assignment 6: Question 5
 * Frontend Rush: Avoiding Callback Hell
 * Author: Abhay Pratap Singh
 */

/*
================================================================================
PART A: The Pyramid of Doom (Callback Hell)
Nested callbacks make code grow horizontally rather than vertically.
Handling errors at each level leads to repetitive boilerplate and fragile code.
================================================================================
*/

function runCallbackPipeline(onComplete) {
  console.log("=== Part A: Executing Pipeline via Deeply Nested Callbacks ===");

  // Stage 1: Design
  setTimeout(() => {
    console.log("[Callback] 1. Design finished");

    // Stage 2: Build
    setTimeout(() => {
      console.log("[Callback] 2. Build finished");

      // Stage 3: Test
      setTimeout(() => {
        console.log("[Callback] 3. Test finished");

        // Stage 4: Deploy
        setTimeout(() => {
          console.log("[Callback] 4. Deploy finished");

          // Stage 5: Celebrate
          setTimeout(() => {
            console.log("[Callback] 5. Celebrate: Shipped to production! 🎉");
            if (onComplete) onComplete();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

/*
================================================================================
PART B: Refactored Pipeline Using Promises & Async/Await
Sequential, flat, readable, and structured.
================================================================================
*/

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function stepDesign() {
  await wait(1000);
  console.log("[Async/Await] 1. Design finished");
  return "UI Mockups";
}

async function stepBuild() {
  await wait(1000);
  console.log("[Async/Await] 2. Build finished");
  return "Compiled Artifacts";
}

async function stepTest() {
  await wait(1000);
  console.log("[Async/Await] 3. Test finished (All tests passing)");
  return "QA Approval";
}

async function stepDeploy() {
  await wait(1000);
  console.log("[Async/Await] 4. Deploy finished (Released to Cloud CDN)");
  return "Production URL";
}

async function stepCelebrate() {
  await wait(1000);
  console.log("[Async/Await] 5. Celebrate: Project successfully live! 🚀");
  return "Done";
}

/**
 * Executes the entire deployment pipeline sequentially using async/await.
 */
async function runAsyncAwaitPipeline() {
  console.log("\n=== Part B: Executing Pipeline via Modern Async/Await ===");
  try {
    await stepDesign();
    await stepBuild();
    await stepTest();
    await stepDeploy();
    await stepCelebrate();
    console.log("Pipeline completed cleanly without callback nesting!");
  } catch (error) {
    console.error("Pipeline encountered an unexpected error:", error.message);
  }
}

/*
================================================================================
WHY ASYNC/AWAIT IS SUPERIOR TO NESTED CALLBACKS:
1. Readability & Mental Model:
   - Nested callbacks form a triangular "Pyramid of Doom" that moves sideways.
   - async/await allows asynchronous code to be read and reasoned about linearly,
     from top to bottom, exactly like synchronous code.

2. Centralized Error Handling:
   - With callbacks, every nested step must manually inspect an 'err' parameter
     (`if (err) return handle(err)`), creating repetitive and easily-missed logic.
   - With async/await, any rejection or exception thrown in any step bubbles up
     cleanly to a single enclosing try/catch block.

3. Easy Composition & Refactoring:
   - Adding, removing, or re-ordering steps in an async/await sequence is trivial.
   - In callback hell, rearranging steps requires re-nesting entire blocks of code.
================================================================================
*/

// Execute Part A first, then launch Part B when Part A finishes
runCallbackPipeline(() => {
  runAsyncAwaitPipeline();
});

