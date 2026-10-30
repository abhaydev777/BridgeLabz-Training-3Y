/**
 * Assignment 6: Question 3
 * Bug Tracker: Callback to Promise Migration
 * Author: Abhay Pratap Singh
 */

// --- Legacy Callback Implementation (For Reference) ---
// function fetchBugs(callback) {
//   setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
// }

/**
 * Refactored Promise-based bug fetcher with simulated API failure condition.
 * @returns {Promise<string[]>}
 */
function getBugs() {
  return new Promise((resolve, reject) => {
    console.log("Connecting to Bug Tracker API...");

    setTimeout(() => {
      // Simulate random network/API failure (30% probability)
      const isFailed = Math.random() < 0.3;

      if (isFailed) {
        reject(new Error("503 Service Unavailable: Remote database failed to respond"));
      } else {
        const bugs = [
          { id: 1, title: "UI glitch", priority: "Medium", status: "Open" },
          { id: 2, title: "API timeout", priority: "High", status: "In Progress" },
          { id: 3, title: "Login failure", priority: "Critical", status: "Open" }
        ];
        resolve(bugs);
      }
    }, 1000);
  });
}

// Fetch bugs and handle response or error alert cleanly
getBugs()
  .then((bugs) => {
    console.log("Bugs received successfully! Displaying report:");
    console.table(bugs);
  })
  .catch((err) => {
    console.error(`[ALERT - Bug Tracker Failure]: ${err.message}`);
    console.error("Action Required: Please verify network connection or ping the backend admin.");
  });

