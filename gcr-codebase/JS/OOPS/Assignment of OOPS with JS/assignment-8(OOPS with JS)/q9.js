/**
 * Assignment 8 - OOPS with JS
 * Question 9: Fitness App Analytics
 * Author: Abhay Pratap Singh
 *
 * Concepts Demonstrated:
 * - OOP class construction with constructor-level input validation.
 * - Defensive programming: Throwing an Error on invalid/empty datasets and handling with try...catch.
 * - Declarative array processing with .filter(), .reduce(), and .map().
 */

// Provided workout dataset
const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

class FitnessAnalytics {
  constructor(dataset) {
    // Validate dataset is a non-empty array
    if (!Array.isArray(dataset) || dataset.length === 0) {
      throw new Error("Workout dataset cannot be empty. An array with at least one record is required.");
    }

    this.dataset = dataset;
  }

  // 1. Returns active users who have taken more than 7,000 steps (.filter)
  getActiveUsers() {
    return this.dataset.filter((entry) => entry.steps > 7000);
  }

  // 2. Calculates average calories burned across all users (.reduce)
  getAverageCalories() {
    const totalCalories = this.dataset.reduce((accumulator, entry) => {
      return accumulator + entry.calories;
    }, 0);

    return totalCalories / this.dataset.length;
  }

  // 3. Generates readable formatted summary strings for every user (.map)
  getUserSummary() {
    return this.dataset.map((entry) => {
      const activeTag = entry.steps > 7000 ? "[ACTIVE GOAL MET]" : "[GOAL INCOMPLETE]";
      return `User ${entry.user} -> Steps: ${entry.steps.toString().padEnd(5)} | Calories Burned: ${entry.calories} kcal ${activeTag}`;
    });
  }
}

console.log("==================================================");
console.log("       QUESTION 9: FITNESS APP ANALYTICS          ");
console.log("==================================================\n");

// 1. Testing with the valid dataset
console.log("--- Initializing Analytics with Valid Dataset ---");
const tracker = new FitnessAnalytics(workoutData);

// Active users (steps > 7000)
console.log("\n1. Active Users (Steps > 7,000):");
const activeUsers = tracker.getActiveUsers();
activeUsers.forEach((user) => {
  console.log(`   • User ${user.user}: ${user.steps} steps (${user.calories} calories)`);
});

// Average calories burned
console.log("\n2. Average Calories Burned Across Users:");
const avgCalories = tracker.getAverageCalories();
console.log(`   • Average: ${avgCalories.toFixed(2)} kcal`);

// Formatted user summary
console.log("\n3. User Workout Summaries (.map):");
const summaries = tracker.getUserSummary();
summaries.forEach((summary) => {
  console.log(`   ${summary}`);
});

// 2. Testing error handling with empty dataset using try...catch
console.log("\n--------------------------------------------------");
console.log("--- Testing Error Handling on Empty/Invalid Input ---");

function testEmptyDataset(testCaseName, inputData) {
  try {
    console.log(`Testing: ${testCaseName}`);
    const invalidTracker = new FitnessAnalytics(inputData);
    console.log("   Result: Unexpected Success");
  } catch (error) {
    console.log(`   Result: Caught Expected Error -> "${error.message}"`);
  }
}

testEmptyDataset("Passing empty array []", []);
testEmptyDataset("Passing null", null);

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { FitnessAnalytics, workoutData };
}

