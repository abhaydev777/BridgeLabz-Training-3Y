// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 2: Multi-Type Data Summary

// Declaring variables for different JavaScript data types
const studentName = "Abhay Pratap Singh";              // String
const rollNumber = 101;                               // Number
const isPassed = true;                                // Boolean
const skills = ["JavaScript", "React", "Node.js"];    // Array (Object)
const studentProfile = { course: "B.Tech", year: 3 }; // Object
const backlog = null;                                 // Null (Special primitive object)
let internshipOffer;                                  // Undefined

// Function to accurately detect the type of any variable
function detectType(value) {
  // In JavaScript, typeof null returns 'object' (legacy bug/behavior)
  if (value === null) {
    return "null";
  }
  // Array is technically an object, so we use Array.isArray() to distinguish it
  if (Array.isArray(value)) {
    return "array";
  }
  // For other primitives and objects, typeof works as expected
  return typeof value;
}

// Storing the results into an array of objects
const dataReport = [
  { label: "studentName", value: studentName, type: detectType(studentName) },
  { label: "rollNumber", value: rollNumber, type: detectType(rollNumber) },
  { label: "isPassed", value: isPassed, type: detectType(isPassed) },
  { label: "skills", value: skills, type: detectType(skills) },
  { label: "studentProfile", value: studentProfile, type: detectType(studentProfile) },
  { label: "backlog", value: backlog, type: detectType(backlog) },
  { label: "internshipOffer", value: internshipOffer, type: detectType(internshipOffer) }
];

console.log("=== Question 2: Multi-Type Data Summary ===");
console.table(dataReport);

