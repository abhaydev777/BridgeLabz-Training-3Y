"use strict";

/**
 * ASSIGNMENT 3 - JS ES Features
 * File: q9.js
 * Question: JSON Audit
 * Author: Abhay Pratap Singh
 * 
 * Description:
 * Parses raw JSON strings safely using try...catch blocks.
 * Audits each record against a mandatory schema (`user` and `age` fields).
 * Implements age normalization (string to number) and filters for adulthood (age >= 18).
 */

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
  // Additional record to test bonus age < 18 filtering
  '{"user":"Kunal","age":16}'
];

const validUsers = [];
const rejectedEntries = [];

console.log("================================================================================");
console.log("                             JSON SCHEMA AUDITOR                                ");
console.log("================================================================================\n");

for (let i = 0; i < rawData.length; i++) {
  const rawString = rawData[i];
  console.log(`[Item #${i}] Processing string: ${rawString}`);

  try {
    // Step 1: Parse JSON safely
    const parsed = JSON.parse(rawString);

    // Step 2: Validate parsed object type
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("Parsed JSON must be a key-value object.");
    }

    // Step 3: Validate presence of mandatory schema keys: 'user' and 'age'
    const missingKeys = [];
    if (!("user" in parsed) || typeof parsed.user !== "string" || parsed.user.trim() === "") {
      missingKeys.push("user");
    }
    if (!("age" in parsed)) {
      missingKeys.push("age");
    }

    if (missingKeys.length > 0) {
      throw new Error(`Schema Violation: Missing or invalid mandatory key(s): [${missingKeys.join(", ")}]`);
    }

    // Step 4: Bonus - Normalize age to Number and validate numeric integrity
    const ageAsNumber = Number(parsed.age);
    if (Number.isNaN(ageAsNumber) || ageAsNumber < 0) {
      throw new Error(`Invalid age value: "${parsed.age}" cannot be converted to a positive number.`);
    }

    // Step 5: Bonus - Filter out minors (age < 18)
    if (ageAsNumber < 18) {
      throw new Error(`Eligibility Rejection: User "${parsed.user}" is underage (${ageAsNumber} < 18).`);
    }

    // Record normalized valid user
    const normalizedUser = {
      user: parsed.user,
      age: ageAsNumber
    };

    validUsers.push(normalizedUser);
    console.log(`  -> STATUS: ACCEPTED (User: "${normalizedUser.user}", Age: ${normalizedUser.age})\n`);
  } catch (err) {
    // Record rejection metadata
    rejectedEntries.push({
      index: i,
      rawString,
      reason: err.message
    });
    console.log(`  -> STATUS: REJECTED | Reason: ${err.message}\n`);
  }
}

// Summary Tables & Reports
console.log("================================================================================");
console.log("                               AUDIT SUMMARY                                    ");
console.log("================================================================================");
console.log(`Total Records Audited : ${rawData.length}`);
console.log(`Valid Adults Approved : ${validUsers.length}`);
console.log(`Total Rejected        : ${rejectedEntries.length}\n`);

console.log("--- Approved Valid Users (Normalized & Age >= 18) ---");
console.table(validUsers);

console.log("\n--- Rejected Records Audit Log ---");
console.table(rejectedEntries);
console.log("================================================================================\n");

