/**
 * Assignment 5 - JS Functions
 * Question 8: Custom Array Prototype Polyfill (myMap)
 * Author: Abhay Pratap Singh
 */

// Adding custom myMap to Array.prototype without using built-in Array.prototype.map
Array.prototype.myMap = function (callback) {
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }

    const mappedArray = [];
    
    // 'this' refers to the array on which myMap was called
    for (let i = 0; i < this.length; i++) {
        // Passing element, index, and original array to callback as per map spec
        mappedArray.push(callback(this[i], i, this));
    }

    return mappedArray;
};

// Testing the polyfill
const numbers = [1, 2, 3];
const result = numbers.myMap((num) => num * 2);

console.log("--- Testing Custom Array.prototype.myMap ---");
console.log("Result (doubled):", result); // [2, 4, 6]

// Verifying that the original array is not mutated
console.log("Original array:  ", numbers); // [1, 2, 3]
console.log("Original array unmodified:", numbers.length === 3 && numbers[0] === 1 && numbers[1] === 2 && numbers[2] === 3);

// Additional check: mapping with index and array reference
const indexed = numbers.myMap((val, idx) => `Item at [${idx}] = ${val}`);
console.log("Mapped with indices:", indexed);

