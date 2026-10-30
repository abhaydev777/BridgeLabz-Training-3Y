"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q1.js
 * Question: Dynamic Data Parser
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Parses an array of mixed raw API data values into Number, Boolean, and String types.
 * Filters out invalid numeric values (handling JS type coercion quirks like whitespace
 * and null coercing to 0) and segregates the data into valid numbers and invalid entries.
 */

// Input dataset representing unparsed values received from an API endpoint
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// Output arrays for segregated results
const validNumbers = [];
const invalidEntries = [];

/**
 * Validates whether a given raw value can be cleanly converted to a real number.
 * Note on JS coercion:
 * - Number("") or Number(" ") evaluates to 0, which is misleading for a data parser.
 * - Number(null) evaluates to 0, though null represents missing data, not zero.
 * - Number(undefined) evaluates to NaN.
 */
function isValidNumericValue(val) {
  // Reject null and undefined upfront
  if (val === null || val === undefined) {
    return false;
  }

  // Reject strings that are empty or contain only whitespace
  if (typeof val === "string" && val.trim() === "") {
    return false;
  }

  // Convert to number and check if result is NaN
  const numericVal = Number(val);
  return !Number.isNaN(numericVal);
}

console.log("================================================================================");
console.log("                         API DATA PARSER & TYPE AUDIT                           ");
console.log("================================================================================");
console.log(
  "Index".padEnd(8) +
  "Raw Value".padEnd(16) +
  "As Number".padEnd(16) +
  "As Boolean".padEnd(16) +
  "As String".padEnd(14) +
  "Status"
);
console.log("-".repeat(80));

// Iterate over apiData and convert each entry
for (let i = 0; i < apiData.length; i++) {
  const rawItem = apiData[i];

  // Perform standard ES6 type conversions
  const asNumber = Number(rawItem);
  const asBoolean = Boolean(rawItem);
  const asString = String(rawItem);

  const isValid = isValidNumericValue(rawItem);

  if (isValid) {
    validNumbers.push(asNumber);
  } else {
    invalidEntries.push(rawItem);
  }

  // Format raw value for display to clearly show string quotes vs null/undefined
  const displayRaw = typeof rawItem === "string" ? `"${rawItem}"` : String(rawItem);
  const statusLabel = isValid ? "[VALID]" : "[INVALID]";

  console.log(
    `[${i}]`.padEnd(8) +
    displayRaw.padEnd(16) +
    String(asNumber).padEnd(16) +
    String(asBoolean).padEnd(16) +
    `"${asString}"`.padEnd(14) +
    statusLabel
  );
}

console.log("-".repeat(80));
console.log("\n============================= PARSER SUMMARY =================================");
console.log(`Total Items Processed : ${apiData.length}`);
console.log(`Valid Numbers Count   : ${validNumbers.length}`);
console.log(`Invalid Entries Count : ${invalidEntries.length}`);

console.log("\nValid Numbers Array:");
console.log(validNumbers);

console.log("\nInvalid Entries Array:");
console.log(invalidEntries);
console.log("================================================================================\n");

