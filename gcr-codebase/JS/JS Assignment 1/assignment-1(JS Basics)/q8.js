// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 8: Employee Salary Projection

// Initial employee salary and annual appraisal increment rate
let currentSalary = 50000;
const annualIncrementRate = 10; // 10% annual increase
const projectionYears = 5;

const projectionTable = [];

console.log("=== Question 8: Employee Salary Projection ===");
console.log(`Starting Base Salary  : ₹${currentSalary.toLocaleString("en-IN")}`);
console.log(`Annual Increment Rate : ${annualIncrementRate}%\n`);

// For loop to project salary for the next 5 years
for (let year = 1; year <= projectionYears; year++) {
  const previousSalary = currentSalary;
  
  // Computing increment amount and rounding to nearest whole integer
  const incrementAmount = Math.round((previousSalary * annualIncrementRate) / 100);
  
  // Applying compound assignment operator to update salary for the year
  currentSalary += incrementAmount;

  projectionTable.push({
    "Year": `Year ${year}`,
    "Opening Salary (₹)": previousSalary,
    "Increment Rate": `${annualIncrementRate}%`,
    "Increment (₹)": incrementAmount,
    "Projected Salary (₹)": currentSalary
  });
}

// Displaying the progression in a formatted table
console.table(projectionTable);

