/**
 * Assignment 5 - JS Functions
 * Question 3: Arrow Function vs Normal Function 'this' Context
 * Author: Abhay Pratap Singh
 */

// Step 1: Create object 'user' with showName as an arrow function
const user = {
    name: "Abhay",
    showName: () => {
        console.log("Arrow function output:", this.name);
    }
};

console.log("--- Calling method defined with Arrow Function ---");
user.showName(); // Logs: undefined

/*
 * Explanation:
 * Arrow functions do not have their own 'this' binding. Instead, they lexically
 * inherit 'this' from the enclosing scope (which in a Node.js module is module.exports / {}).
 * Therefore, 'this.name' is undefined because 'this' does not point to the 'user' object.
 */

// Step 2: Fix the object by redefining showName using a regular function
user.showName = function () {
    console.log("Regular function output:", this.name);
};

console.log("\n--- Calling method redefined with Regular Function ---");
user.showName(); // Logs: "Regular function output: Abhay"

/*
 * Explanation:
 * Traditional functions bind 'this' dynamically at call time based on the execution context.
 * When invoked as user.showName(), 'this' correctly points to the 'user' object.
 */
