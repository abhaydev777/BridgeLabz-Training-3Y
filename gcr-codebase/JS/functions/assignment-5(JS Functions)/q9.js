/**
 * Assignment 5 - JS Functions
 * Question 9: Refactoring Prototypal Inheritance to ES6 Classes
 * Author: Abhay Pratap Singh
 */

// Base Class
class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

// Derived Class extending Person
class Student extends Person {
    constructor(name, branch) {
        // Calls the superclass constructor (equivalent to Person.call(this, name))
        super(name);
        this.branch = branch;
    }

    study() {
        console.log(`${this.name} is studying ${this.branch}.`);
    }
}

// Instantiating Student
const student = new Student("Abhay Pratap Singh", "Computer Science");

// Demonstrating method execution
console.log("--- ES6 Class Method Invocations ---");
student.introduce(); // Inherited method from Person class
student.study();     // Method defined on Student class

// Demonstrating that prototype chain behavior is identical to Question 5
console.log("\n--- Prototype Chain & Instanceof Checks ---");
console.log("student instanceof Student:", student instanceof Student); // true
console.log("student instanceof Person: ", student instanceof Person);  // true
console.log("student instanceof Object: ", student instanceof Object);  // true

/*
 * Explanation:
 * ES6 classes are syntactic sugar over JavaScript's existing prototype-based inheritance.
 * Under the hood:
 * - 'class' creates a constructor function.
 * - Methods in class bodies are stored on the prototype (Student.prototype, Person.prototype).
 * - 'extends' sets up the prototype chain between Student.prototype and Person.prototype.
 * - 'super()' invokes the parent constructor with the current 'this' binding.
 */
console.log("\n--- Underlying Prototype Chain Verification ---");
console.log(
    "Object.getPrototypeOf(Student.prototype) === Person.prototype:",
    Object.getPrototypeOf(Student.prototype) === Person.prototype
); // true

