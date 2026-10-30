// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 1: Personalized Login Greeting

// Function to determine greeting based on user name and the given hour (0-23)
function getGreeting(userName, hour) {
  // Morning check: before 12 PM
  if (hour < 12) {
    return `Good Morning ${userName}!`;
  } 
  // Afternoon check: 12 PM to 5 PM (inclusive of 12 up to 17)
  else if (hour >= 12 && hour <= 17) {
    return `Good Afternoon ${userName}!`;
  } 
  // Evening check: after 5 PM
  else {
    return `Good Evening ${userName}!`;
  }
}

// Live demonstration with current system time
const userName = "Abhay";
const currentHour = new Date().getHours();

console.log("=== Question 1: Personalized Login Greeting ===");
console.log(`User: ${userName}`);
console.log(`Current System Hour: ${currentHour}`);
console.log(`Result: ${getGreeting(userName, currentHour)}`);

// Test cases to verify each branch (Morning, Afternoon, Evening)
console.log("\n--- Demonstration with Mock Hours ---");
const testCases = [
  { name: "Abhay", hour: 9, label: "Morning (09:00)" },
  { name: "Abhay", hour: 14, label: "Afternoon (14:00)" },
  { name: "Abhay", hour: 20, label: "Evening (20:00)" }
];

testCases.forEach((test) => {
  const greeting = getGreeting(test.name, test.hour);
  console.log(`${test.label} -> "${greeting}"`);
});

