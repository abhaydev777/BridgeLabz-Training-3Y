"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q3.js
 * Question: Transaction Validator
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Validates an array of financial transactions against integrity rules:
 * - Prevents null pointer crashes
 * - Enforces required attributes (id and amount)
 * - Restricts negative transaction values
 * 
 * DEBUGGER WATCH VARIABLES & STATE INSPECTION GUIDE:
 * --------------------------------------------------
 * 1. Breakpoint Placement:
 *    - Place a line breakpoint inside the loop at: `validateTransaction(tx);`
 *    - Place another breakpoint inside the `catch (err)` block.
 * 
 * 2. Watch Expressions (VS Code / Chrome DevTools):
 *    - `tx`                   : Inspects current transaction object.
 *    - `tx?.id`               : Checks if identifier exists before property access.
 *    - `tx?.amount`           : Inspects raw amount value.
 *    - `valid.length`         : Monitors running total of accepted entries.
 *    - `invalid.length`       : Monitors running total of rejected entries.
 *    - `err?.message`         : Captures the thrown exception message in the catch frame.
 * 
 * 3. Scope & Call Stack Inspection:
 *    - Call Stack: Displays `validateTransaction` stacked on top of the loop's context.
 *    - Local Scope: Observe block-scoped variables `i`, `tx`, and caught error `err`.
 *    - Stepping: Stepping over (`F10`) on invalid entries demonstrates the immediate jump
 *      from the `throw` statement into the `catch` block, bypassing subsequent validation lines.
 */

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

const valid = [];
const invalid = [];

/**
 * Validates a single transaction item and throws specific errors on integrity failures.
 */
function validateTransaction(tx) {
  // Check 1: Null or falsy entry
  if (!tx || typeof tx !== "object") {
    throw new Error("Null transaction entry");
  }

  // Check 2: Missing amount or id
  if (tx.id === undefined || tx.amount === undefined) {
    throw new Error("Missing amount or id");
  }

  // Check 3: Negative amount
  if (typeof tx.amount !== "number" || tx.amount < 0) {
    throw new Error("Negative transaction amount");
  }

  return true;
}

console.log("================================================================================");
console.log("                         TRANSACTION AUDIT PIPELINE                             ");
console.log("================================================================================\n");

// Iterate through transactions with defensive try...catch wrapping
for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];

  try {
    validateTransaction(tx);
    valid.push(tx);
    console.log(`[PASS] Transaction #${tx.id} validated successfully (Amount: ₹${tx.amount}).`);
  } catch (err) {
    // Record rejection metadata for invalid records
    invalid.push({
      index: i,
      rawRecord: tx,
      reason: err.message
    });
    console.log(`[FAIL] Transaction at index [${i}] rejected: ${err.message}`);
  }
}

// Summary Report Generation
console.log("\n============================ TRANSACTION SUMMARY ===============================");
console.log(`Total Transactions Checked : ${transactions.length}`);
console.log(`Successful / Valid Count   : ${valid.length}`);
console.log(`Failed / Invalid Count     : ${invalid.length}`);

console.log("\n--- Valid Transactions ---");
console.table(valid);

console.log("\n--- Invalid Transactions Details ---");
invalid.forEach((item) => {
  console.log(
    `Index: [${item.index}] | Reason: "${item.reason}" | Raw: ${JSON.stringify(item.rawRecord)}`
  );
});
console.log("================================================================================\n");
