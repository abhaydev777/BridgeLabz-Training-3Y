// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 7: Smart Guessing Game (Number Range)

// Function to evaluate user's guess using nested if conditions
function evaluateGuess(userGuess, secret) {
  // Primary check: Exact match
  if (userGuess === secret) {
    return "Correct guess!";
  } else {
    // Nested check: Proximity check within +/- 3 range
    const difference = Math.abs(userGuess - secret);
    
    if (difference <= 3) {
      return "Very close!";
    } else {
      // Directional feedback (Too high or Too low)
      if (userGuess > secret) {
        return "Too high";
      } else {
        return "Too low";
      }
    }
  }
}

console.log("=== Question 7: Smart Guessing Game (1 - 50) ===\n");

// 1. Live Random Run
const secret = Math.floor(Math.random() * 50) + 1;
const userGuess = 25; // Sample guess
const liveResult = evaluateGuess(userGuess, secret);

console.log("--- Single Round with Random Secret ---");
console.log(`Target Secret Number : ${secret}`);
console.log(`User's Guess         : ${userGuess}`);
console.log(`Evaluation Result    : ${liveResult}\n`);

// 2. Demonstration of all outcome branches against a fixed target
console.log("--- Demonstrating All Branches (Fixed Secret = 30) ---");
const testTarget = 30;
const testGuesses = [
  { guess: 30, scenario: "Exact Match" },
  { guess: 32, scenario: "Close (Within +2)" },
  { guess: 28, scenario: "Close (Within -2)" },
  { guess: 45, scenario: "Much Higher" },
  { guess: 10, scenario: "Much Lower" }
];

testGuesses.forEach((t) => {
  const result = evaluateGuess(t.guess, testTarget);
  console.log(`Secret: ${testTarget} | Guess: ${t.guess} (${t.scenario.padEnd(18)}) -> Result: "${result}"`);
});

