/**
 * Assignment 4 - Question 6: Employee Management System (Classes + Object Methods)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Employee class with id, name, department, salary.
 * - getAnnualSalary() method: returns salary * 12.
 * - applyBonus(percent) method: increases monthly salary by percent.
 * - Instantiate 5 employee objects across different departments.
 * - Calculate and log annual salary for each employee.
 * - Use Array.prototype.reduce() to calculate and display total company annual payout.
 */

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary; // Monthly compensation
  }

  // Calculates total salary over a 12-month period
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Increases monthly base salary by given percentage
  applyBonus(percent) {
    if (percent < 0) {
      console.log(`[Bonus Error] Invalid negative percentage for ${this.name}`);
      return;
    }
    const increase = (this.salary * percent) / 100;
    this.salary += increase;
    console.log(`[Bonus Added] ${percent}% increment applied to ${this.name}. New monthly salary: $${this.salary.toFixed(2)}`);
  }

  // Returns formatted record summary
  getDetails() {
    return `ID: ${this.id} | Name: ${this.name.padEnd(20, ' ')} | Dept: ${this.department.padEnd(22, ' ')} | Monthly: $${this.salary.toFixed(2)} | Annual: $${this.getAnnualSalary().toFixed(2)}`;
  }
}

// Instantiating 5 employee objects across distinct corporate departments
const employees = [
  new Employee(101, "Abhay Pratap Singh", "Software Engineering", 8500),
  new Employee(102, "Priya Sharma", "Product Management", 7800),
  new Employee(103, "Rohan Verma", "Data & Analytics", 9200),
  new Employee(104, "Ananya Gupta", "Human Resources", 5400),
  new Employee(105, "Vikram Malhotra", "Finance & Accounts", 6600)
];

console.log("=================================================");
console.log("     QUESTION 6: EMPLOYEE MANAGEMENT SYSTEM      ");
console.log("=================================================\n");

console.log("--- 1. Initial Employee Roster & Annual Salaries ---");
employees.forEach(emp => {
  console.log(emp.getDetails());
});

console.log("\n--- 2. Annual Performance Bonus Adjustments ---");
// Giving 10% bonus to Software Engineering (Abhay)
employees[0].applyBonus(10);
// Giving 15% bonus to Data & Analytics (Rohan)
employees[2].applyBonus(15);
// Giving 8% bonus to Product Management (Priya)
employees[1].applyBonus(8);

console.log("\n--- 3. Updated Salaries After Bonus Increments ---");
employees.forEach(emp => {
  console.log(emp.getDetails());
});

console.log("\n--- 4. Total Company Annual Payout (Array.prototype.reduce) ---");
// Using reduce() to accumulate total annual compensation
const totalAnnualPayout = employees.reduce((accumulator, currentEmployee) => {
  return accumulator + currentEmployee.getAnnualSalary();
}, 0);

console.log(`Total Annual Payroll Expense: $${totalAnnualPayout.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

const averageAnnualSalary = totalAnnualPayout / employees.length;
console.log(`Average Annual Salary:        $${averageAnnualSalary.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Employee, employees, totalAnnualPayout };
}

