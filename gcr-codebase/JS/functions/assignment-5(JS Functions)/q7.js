/**
 * Assignment 5 - JS Functions
 * Question 7: Closure with Multiplier Function
 * Author: Abhay Pratap Singh
 */

// Function returning an inner function that remembers 'multiplier'
function makeMultiplier(multiplier) {
    return function (number) {
        return number * multiplier;
    };
}

/*
 * Explanation of Closure:
 * When makeMultiplier is invoked, an execution context is created with its argument 'multiplier'.
 * The returned inner function forms a closure: it retains a reference to its lexical environment.
 * Even after makeMultiplier finishes execution and is popped off the call stack, the returned
 * function remembers and continues to access the 'multiplier' variable whenever invoked.
 */

// Creating multiplier instances
const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log("--- Testing Closure with makeMultiplier ---");
console.log("double(5):", double(5)); // 10
console.log("double(8):", double(8)); // 16

console.log("triple(5):", triple(5)); // 15
console.log("triple(7):", triple(7)); // 21

