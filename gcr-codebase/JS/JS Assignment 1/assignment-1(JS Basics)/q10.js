// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 10: Citizen Eligibility Validator

// Function to validate eligibility using nested if-else and logical operators
function validateEligibility(age, isCitizen) {
  // Outer condition: Check citizenship status
  if (isCitizen) {
    // Inner condition 1: Young adult citizen branch (18 to 20 years inclusive)
    if (age >= 18 && age <= 20) {
      return "Eligible to vote only.";
    } 
    // Inner condition 2: Fully eligible citizen (above 20)
    else if (age > 20) {
      return "Eligible for all services.";
    } 
    // Underage citizen
    else {
      return "Not eligible yet.";
    }
  } else {
    // Non-citizen: checking if age requirement is satisfied
    if (age >= 18) {
      return "Only age criteria met.";
    } else {
      return "Not eligible yet.";
    }
  }
}

console.log("=== Question 10: Citizen Eligibility Validator ===\n");

// Varied demographic test profiles covering all logical branches
const userProfiles = [
  { name: "Rahul Sharma",    age: 26, isCitizen: true,  scenario: "Citizen, Age > 20" },
  { name: "Priya Verma",     age: 19, isCitizen: true,  scenario: "Citizen, Age 18-20 (Voting subset)" },
  { name: "John Miller",     age: 32, isCitizen: false, scenario: "Non-Citizen, Age >= 18" },
  { name: "Aarav Gupta",     age: 16, isCitizen: true,  scenario: "Citizen minor (Under 18)" },
  { name: "Elena Rostova",   age: 15, isCitizen: false, scenario: "Non-Citizen minor" }
];

userProfiles.forEach((profile, index) => {
  const result = validateEligibility(profile.age, profile.isCitizen);
  
  console.log(`Profile #${index + 1}: ${profile.name}`);
  console.log(`- Age        : ${profile.age}`);
  console.log(`- Citizenship: ${profile.isCitizen ? "Citizen" : "Non-Citizen"}`);
  console.log(`- Scenario   : ${profile.scenario}`);
  console.log(`- Status     : "${result}"`);
  console.log("------------------------------------------------------");
});

