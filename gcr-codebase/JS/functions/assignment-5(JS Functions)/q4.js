/**
 * Assignment 5 - JS Functions
 * Question 4: Prototype Method Sharing with Constructor
 * Author: Abhay Pratap Singh
 */

// Constructor function
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// Attaching getDetails to Car.prototype so instances share a single function reference
Car.prototype.getDetails = function () {
    console.log(`Car: ${this.brand} ${this.model}`);
};

// Instantiating two distinct car objects
const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Honda", "Civic");

// Invoking getDetails on both instances
console.log("--- Invoking getDetails on Instances ---");
car1.getDetails();
car2.getDetails();

// Demonstrating method sharing via prototype equality check
console.log("\n--- Prototype Method Sharing Check ---");
console.log("car1.getDetails === car2.getDetails:", car1.getDetails === car2.getDetails); // true

/*
 * Explanation:
 * Because getDetails is attached to Car.prototype rather than being defined inside
 * the constructor body, both car1 and car2 delegate to the same function in memory.
 * This optimizes memory consumption by sharing methods among all instances.
 */
