/**
 * Assignment 5 - JS Functions
 * Question 1: Callback Function Demonstration
 * Author: Abhay Pratap Singh
 */

// Function that accepts a name and a callback function
function greetUser(name, callback) {
    console.log(`Hello ${name}`);
    
    // Executing the callback function after the greeting
    if (typeof callback === "function") {
        callback();
    }
}

// Callback function to be passed to greetUser
function showEndMessage() {
    console.log("Welcome to the course!");
}

// Demonstrating the sequential callback execution flow
console.log("--- Callback Function Demonstration ---");
greetUser("Abhay", showEndMessage);

