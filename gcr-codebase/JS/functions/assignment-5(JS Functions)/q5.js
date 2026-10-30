/**
 * Assignment 5 - JS Functions
 * Question 5: Prototypal Inheritance (Person -> Student)
 * Author: Abhay Pratap Singh
 */

// Base Constructor
function Person(name) {
    this.name = name;
}

// Method on Person prototype
Person.prototype.introduce = function () {
    console.log(`Hello, my name is ${this.name}.`);
};

// Derived Constructor
function Student(name, branch) {
    // Borrow Person constructor to initialize inherited 'name' property
    Person.call(this, name);
    this.branch = branch;
}

// Link Student prototype to Person prototype
Student.prototype = Object.create(Person.prototype);

// Correct the constructor pointer back to Student
Student.prototype.constructor = Student;

// Method on Student prototype
Student.prototype.study = function () {
    console.log(`${this.name} is studying ${this.branch}.`);
};

// Instantiate Student
const student1 = new Student("Abhay Pratap Singh", "Computer Science");

// Demonstrating method execution
console.log("--- Method Invocations ---");
student1.introduce(); // Inherited from Person.prototype
student1.study();     // Defined on Student.prototype

// Demonstrating prototype chain via instanceof and constructor checks
console.log("\n--- Prototype Chain Checks ---");
console.log("student1 instanceof Student:", student1 instanceof Student); // true
console.log("student1 instanceof Person: ", student1 instanceof Person);  // true
console.log("student1 instanceof Object: ", student1 instanceof Object);  // true
console.log("student1.constructor === Student:", student1.constructor === Student); // true

