"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q7.js
 * Question: Smart Calculator
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Implements a robust calculator engine with a custom Error subclass,
 * switch-case dispatching for arithmetic, zero-division guards,
 * negative root validation, and a formatted summary table.
 */

// Custom Error subclass for unrecognized operations
class InvalidOperationError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidOperationError";
  }
}

/**
 * Performs arithmetic calculation based on operation string.
 * @param {string} operation - Operation to perform ("add", "subtract", "divide", "power", "root").
 * @param {number} a - First operand.
 * @param {number} [b=0] - Second operand.
 * @returns {number} Computed numeric result.
 */
function calculate(operation, a, b = 0) {
  if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError("Operands must be valid numeric values.");
  }

  switch (operation.toLowerCase()) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "divide":
      if (b === 0) {
        throw new Error("Cannot divide by zero");
      }
      return a / b;

    case "power":
      return a ** b;

    case "root":
      if (a < 0) {
        throw new Error("Cannot compute square root of negative number");
      }
      return Math.sqrt(a);

    default:
      throw new InvalidOperationError(`Unknown or unsupported operation: "${operation}"`);
  }
}

console.log("================================================================================");
console.log("                        SMART ARITHMETIC CALCULATOR                             ");
console.log("================================================================================\n");

// Test Suite 1: Specified Input Parameters (num1 = 25, num2 = 0)
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25;
const num2 = 0;

console.log(`[TEST SUITE 1] Running requested operations with num1 = ${num1}, num2 = ${num2}:`);

const suite1Results = [];

for (let i = 0; i < operations.length; i++) {
  const op = operations[i];
  try {
    const result = calculate(op, num1, num2);
    suite1Results.push({
      Operation: op,
      InputA: num1,
      InputB: num2,
      Status: "SUCCESS",
      Result: result,
      Note: "-"
    });
  } catch (err) {
    suite1Results.push({
      Operation: op,
      InputA: num1,
      InputB: num2,
      Status: "FAILED",
      Result: "N/A",
      Note: `${err.name}: ${err.message}`
    });
  }
}

console.table(suite1Results);

// Test Suite 2: Boundary & Edge Case Verifications
console.log("\n[TEST SUITE 2] Edge Cases & Custom Exception Handling:");

const edgeCases = [
  { op: "root", a: -16, b: 0, description: "Square root of negative number" },
  { op: "divide", a: 50, b: 5, description: "Valid division" },
  { op: "modulus", a: 10, b: 3, description: "Unregistered operation (InvalidOperationError test)" },
  { op: "power", a: 2, b: 8, description: "Exponentiation (2^8)" }
];

const suite2Results = [];

for (let i = 0; i < edgeCases.length; i++) {
  const { op, a, b, description } = edgeCases[i];
  try {
    const result = calculate(op, a, b);
    suite2Results.push({
      Test: description,
      Operation: op,
      Status: "SUCCESS",
      Output: result,
      ErrorCaught: "None"
    });
  } catch (err) {
    suite2Results.push({
      Test: description,
      Operation: op,
      Status: "CAUGHT EXPECTED ERROR",
      Output: "N/A",
      ErrorCaught: `[${err.name}] ${err.message}`
    });
  }
}

console.table(suite2Results);
console.log("================================================================================\n");

