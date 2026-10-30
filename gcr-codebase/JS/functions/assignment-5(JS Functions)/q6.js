/**
 * Assignment 5 - JS Functions
 * Question 6: Multi-Level Prototype Chain (Person -> Faculty -> Professor)
 * Author: Abhay Pratap Singh
 */

// Tier 1: Base Constructor
function Person(name) {
    this.name = name;
}

Person.prototype.speak = function () {
    console.log(`${this.name} speaks with students and colleagues.`);
};

// Tier 2: Faculty inherits from Person
function Faculty(name, department) {
    Person.call(this, name);
    this.department = department;
}

Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.teach = function () {
    console.log(`${this.name} is teaching in the ${this.department} department.`);
};

// Tier 3: Professor inherits from Faculty
function Professor(name, department, researchArea) {
    Faculty.call(this, name, department);
    this.researchArea = researchArea;
}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.conductResearch = function () {
    console.log(`${this.name} is conducting research on ${this.researchArea}.`);
};

// Instantiating a Professor object
const prof = new Professor(
    "Dr. Sharma",
    "Computer Science & Engineering",
    "Distributed Systems & Cloud Computing"
);

// Demonstrating access to methods across all levels of the prototype chain
console.log("--- Multi-Level Method Invocations ---");
prof.speak();           // Inherited from Person.prototype
prof.teach();           // Inherited from Faculty.prototype
prof.conductResearch(); // Defined on Professor.prototype

// Proving the multi-level prototype chain with instanceof
console.log("\n--- Multi-Level Prototype Chain Verification ---");
console.log("prof instanceof Professor:", prof instanceof Professor); // true
console.log("prof instanceof Faculty:  ", prof instanceof Faculty);   // true
console.log("prof instanceof Person:   ", prof instanceof Person);    // true
console.log("prof instanceof Object:   ", prof instanceof Object);    // true

