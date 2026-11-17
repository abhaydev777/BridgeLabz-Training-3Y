/**
 * Assignment 8 - OOPS with JS
 * Question 4: Employee Inheritance & Polymorphism
 * Author: Abhay Pratap Singh
 *
 * OOP Concept - Inheritance & Runtime Polymorphism:
 * - Inheritance (`extends`, `super`): Allows `Manager` to inherit properties and methods
 *   from the base `Employee` class, avoiding duplicated initialization logic.
 * - Polymorphism: Different classes implement the same method interface (`work()`), but provide
 *   their own specific behavior. When iterating over a mixed collection of `Employee` and `Manager`
 *   objects, JavaScript resolves the method call dynamically at runtime based on the actual object type.
 */

// Base Class: Employee
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  // Base implementation of work()
  work() {
    return `${this.name} (${this.department}) is performing regular day-to-day operational tasks.`;
  }

  getDetails() {
    return `[Employee] Name: ${this.name} | Department: ${this.department}`;
  }
}

// Subclass: Manager inheriting from Employee
class Manager extends Employee {
  constructor(name, department, teamSize) {
    // Calling the parent constructor using super()
    super(name, department);
    this.teamSize = teamSize;
  }

  // Overriding the work() method specifically for managers (Polymorphism)
  work() {
    return `${this.name} (${this.department} Manager) is leading a team of ${this.teamSize} members, conducting reviews, and allocating project resources.`;
  }

  getDetails() {
    return `[Manager] Name: ${this.name} | Department: ${this.department} | Team Size: ${this.teamSize}`;
  }
}

console.log("==================================================");
console.log("    QUESTION 4: EMPLOYEE INHERITANCE & POLYMORPHISM");
console.log("==================================================\n");

// Instantiating objects of both Employee and Manager
const emp1 = new Employee("Neha Gupta", "Human Resources");
const emp2 = new Employee("Vikram Patel", "Finance");
const mgr1 = new Manager("Rajesh Sharma", "Engineering", 14);
const mgr2 = new Manager("Ananya Sen", "Product Management", 6);

// Storing both types in a polymorphic collection (Staff Array)
const staff = [emp1, mgr1, emp2, mgr2];

console.log("--- Demonstrating Runtime Polymorphism ---");
console.log("Calling the same work() method on different staff objects:\n");

staff.forEach((member, index) => {
  console.log(`Staff Member ${index + 1}: ${member.getDetails()}`);
  // Runtime polymorphism: The correct version of work() is dispatched dynamically
  console.log(`Action: ${member.work()}`);
  console.log();
});

// Verifying inheritance relationship
console.log("--- Inheritance Verification ---");
console.log("mgr1 instanceof Manager :", mgr1 instanceof Manager); // true
console.log("mgr1 instanceof Employee:", mgr1 instanceof Employee); // true
console.log("emp1 instanceof Manager :", emp1 instanceof Manager); // false

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Employee, Manager };
}

