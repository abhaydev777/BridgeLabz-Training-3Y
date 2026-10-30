/**
 * Assignment 6: Question 7
 * The Lazy Loader: Promise Combinator Practice
 * Author: Abhay Pratap Singh
 */

// Module 1: Resolves after 2000ms
function loadProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Profile Loaded");
    }, 2000);
  });
}

// Module 2: Resolves after 1500ms or randomly fails (50% probability)
function loadPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failed = Math.random() < 0.5;
      if (failed) {
        reject(new Error("Database timeout while querying user posts"));
      } else {
        resolve("Posts Loaded");
      }
    }, 1500);
  });
}

// Module 3: Resolves after 1000ms
function loadMessages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Messages Loaded");
    }, 1000);
  });
}

// Track execution duration using Date.now()
const startTime = Date.now();
console.log("=== Initiating Concurrent Module Lazy-Loading ===");
console.log("Running loadProfile (2s), loadPosts (1.5s), and loadMessages (1s)...");

Promise.allSettled([loadProfile(), loadPosts(), loadMessages()])
  .then((results) => {
    const totalTimeMs = Date.now() - startTime;
    const taskLabels = ["Profile Module", "Posts Module", "Messages Module"];

    console.log("\n=== Module Loading Status Report ===");
    results.forEach((outcome, index) => {
      const label = taskLabels[index];
      if (outcome.status === "fulfilled") {
        console.log(`[FULFILLED] ${label} -> Value: "${outcome.value}"`);
      } else {
        console.log(`[REJECTED]  ${label} -> Reason: "${outcome.reason.message || outcome.reason}"`);
      }
    });

    console.log(`\nTotal Execution Duration: ${totalTimeMs} ms (~${(totalTimeMs / 1000).toFixed(2)}s)`);
    console.log("Observation: Promise.allSettled waits for all promises to finish regardless of rejection, taking the time of the longest task (~2000ms) rather than sequential sum (4500ms).");
  });

