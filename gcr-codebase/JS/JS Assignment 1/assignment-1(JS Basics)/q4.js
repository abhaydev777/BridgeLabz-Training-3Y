// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 4: Academic Performance Evaluator

// Function to evaluate student's academic result
function evaluatePerformance(studentName, marks) {
  const numberOfSubjects = marks.length;
  let totalMarks = 0;
  let hasFailedSubject = false;

  // Calculating total marks and checking individual pass criteria
  for (let i = 0; i < numberOfSubjects; i++) {
    totalMarks += marks[i];
    if (marks[i] < 35) {
      hasFailedSubject = true;
    }
  }

  // Assuming each subject is out of 100 marks
  const averageMarks = totalMarks / numberOfSubjects;
  const percentage = (totalMarks / (numberOfSubjects * 100)) * 100;

  let status = "";
  let reason = "";

  // Validation rule: If any single subject score < 35, student is automatically Detained
  if (hasFailedSubject) {
    status = "Detained";
    reason = "Failed in one or more individual subjects (Score < 35)";
  } 
  // Evaluation tiers using logical operators
  else if (percentage >= 85) {
    status = "Promoted with Distinction";
    reason = "Scored 85% or above across all subjects";
  } else if (percentage >= 50 && percentage < 85) {
    status = "Promoted";
    reason = "Scored between 50% and 84%";
  } else {
    status = "Detained";
    reason = "Overall percentage fell below 50%";
  }

  console.log(`Student: ${studentName}`);
  console.log(`Marks: [${marks.join(", ")}]`);
  console.log(`Total: ${totalMarks}/${numberOfSubjects * 100} | Average: ${averageMarks.toFixed(2)} | Percentage: ${percentage.toFixed(2)}%`);
  console.log(`Result: ${status} (${reason})`);
  console.log("-------------------------------------------------------------");
}

console.log("=== Question 4: Academic Performance Evaluator ===\n");

// Scenario 1: High scorer (Promoted with Distinction)
evaluatePerformance("Student A (Distinction)", [85, 92, 78, 88, 90]);

// Scenario 2: Average pass (Promoted)
evaluatePerformance("Student B (Pass)", [65, 72, 58, 64, 71]);

// Scenario 3: Low overall percentage (Detained)
evaluatePerformance("Student C (Low Percentage)", [45, 48, 42, 40, 46]);

// Scenario 4: High score but failed in one subject < 35 (Detained by validation rule)
evaluatePerformance("Student D (Subject Failure)", [90, 88, 32, 85, 92]);

