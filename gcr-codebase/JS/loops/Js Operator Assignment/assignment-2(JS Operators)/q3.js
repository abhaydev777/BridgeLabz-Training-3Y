/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 3: Math Utility Dashboard
 * Demonstrates standard Math object functions and formatted template literals.
 */

// Given base number
const x = 16.75;

// Math calculations
const roundedValue = Math.round(x);
const squareRootValue = Math.sqrt(x);
const powerCubedValue = Math.pow(x, 3);

// Formula: Math.floor(Math.random() * (max - min + 1)) + min
// For range 10 to 50 inclusive: (50 - 10 + 1) = 41
const randomInt = Math.floor(Math.random() * 41) + 10;

// Structured Dashboard using ES6 Template Literals
const dashboardOutput = `
============================================================
              MATHEMATICAL UTILITY DASHBOARD                
============================================================
 Input Value (x)           : ${x}
------------------------------------------------------------
 1. Math.round(x)          : ${roundedValue}
 2. Math.sqrt(x)           : ${squareRootValue} (approx ${squareRootValue.toFixed(4)})
 3. Math.pow(x, 3)         : ${powerCubedValue}
 4. Random Int [10, 50]    : ${randomInt}
------------------------------------------------------------
 Formula Verified          : Math.floor(Math.random() * 41) + 10
 Generated Range           : 10 <= ${randomInt} <= 50
============================================================
`;

console.log(dashboardOutput);

