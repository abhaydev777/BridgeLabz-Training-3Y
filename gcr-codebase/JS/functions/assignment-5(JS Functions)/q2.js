/**
 * Assignment 5 - JS Functions
 * Question 2: Custom Higher-Order Array Operation
 * Author: Abhay Pratap Singh
 */

// Higher-order function that takes an array and a callback function
function applyOperation(numbers, operation) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        // Apply operation on each element without altering the original array
        result.push(operation(numbers[i], i, numbers));
    }
    return result;
}

// Test array
const numbers = [1, 2, 3, 4];

console.log("Original array:", numbers);

// 1. Double each number
const doubled = applyOperation(numbers, (num) => num * 2);
console.log("Doubled numbers:", doubled);

// 2. Square each number
const squared = applyOperation(numbers, (num) => num ** 2);
console.log("Squared numbers:", squared);

// Confirming original array remains unchanged
console.log("Original array after operations (unmodified):", numbers);

