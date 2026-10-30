"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q2.js
 * Question: Employee Bonus Calculator
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Processes employee records with string-based numerical inputs.
 * Uses strict mode, safe type conversion, business logic for seniority bonus,
 * ES6 template literals for reporting, and try...catch blocks for robust error handling.
 */

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
  // Edge cases included to demonstrate try...catch handling of data anomalies
  { name: "Rohan", salary: "invalid_num", years: "4" },
  { name: "Pooja", salary: "60000" } // Missing 'years' property
];

/**
 * Calculates compensation breakdown for a given employee object.
 * Throws errors if required fields are missing or not parseable into valid positive numbers.
 */
function processEmployeeBonus(emp) {
  if (!emp || typeof emp !== "object") {
    throw new TypeError("Employee record must be a valid object.");
  }

  const { name, salary: rawSalary, years: rawYears } = emp;

  if (!name || typeof name !== "string") {
    throw new Error("Missing or invalid employee name.");
  }

  if (rawSalary === undefined || rawYears === undefined) {
    throw new Error(`Incomplete record for ${name}: salary and years are both required.`);
  }

  // Convert string values to numbers
  const salary = Number(rawSalary);
  const years = Number(rawYears);

  // Validate numeric conversion
  if (Number.isNaN(salary) || salary <= 0) {
    throw new TypeError(`Invalid salary value "${rawSalary}" for employee ${name}. Must be a positive number.`);
  }

  if (Number.isNaN(years) || years < 0) {
    throw new TypeError(`Invalid experience years "${rawYears}" for employee ${name}. Must be a non-negative number.`);
  }

  // Bonus logic: 10% for > 3 years of service, otherwise 5%
  const bonusRate = years > 3 ? 0.10 : 0.05;
  const bonusAmount = salary * bonusRate;
  const totalCompensation = salary + bonusAmount;

  return {
    name,
    salary,
    years,
    bonusRatePercent: (bonusRate * 100).toFixed(0),
    bonusAmount,
    totalCompensation
  };
}

console.log("================================================================================");
console.log("                     EMPLOYEE ANNUAL BONUS & COMPENSATION                       ");
console.log("================================================================================\n");

for (let i = 0; i < employees.length; i++) {
  const currentRecord = employees[i];

  try {
    const result = processEmployeeBonus(currentRecord);

    // Using ES6 multi-line template literals for readable compensation slips
    console.log(`[Record #${i + 1}] Compensation Summary for ${result.name}:`);
    console.log(`  - Base Salary       : ₹${result.salary.toLocaleString("en-IN")}`);
    console.log(`  - Tenure / Exp      : ${result.years} year(s)`);
    console.log(`  - Bonus Tier        : ${result.bonusRatePercent}% (${result.years > 3 ? "Senior Tier (> 3 yrs)" : "Standard Tier (<= 3 yrs)"})`);
    console.log(`  - Bonus Amount      : ₹${result.bonusAmount.toLocaleString("en-IN")}`);
    console.log(`  - Total Payout      : ₹${result.totalCompensation.toLocaleString("en-IN")}`);
    console.log("-".repeat(80));
  } catch (error) {
    // Graceful error handling for corrupt or incomplete data
    console.log(`[Record #${i + 1}] Processing Failed:`);
    console.log(`  - Target Name       : ${currentRecord?.name || "Unknown"}`);
    console.log(`  - Reason            : ${error.message}`);
    console.log("-".repeat(80));
  }
}
