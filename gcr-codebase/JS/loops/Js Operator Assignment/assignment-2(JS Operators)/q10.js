/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 10: Departmental Employee Evaluator
 * Demonstrates iteration over 2D arrays, chained conditionals, and structured report formatting.
 */

// Given nested array representing [DepartmentName, Score]
const departments = [
  ["HR", 72],
  ["Finance", 88],
  ["Tech", 95],
  ["Support", 63]
];

// Helper evaluation function using chained conditional logic
function evaluateScore(score) {
  if (score >= 90) {
    return "Excellent";
  } else if (score >= 75 && score <= 89) {
    return "Good";
  } else if (score >= 60 && score <= 74) {
    return "Average";
  } else {
    return "Needs Improvement";
  }
}

// Function to print formatted departmental evaluation report
function generateEvaluationReport(deptList, reportTitle = "Departmental Evaluation Report") {
  console.log("================================================================");
  console.log(`             ${reportTitle.toUpperCase()}             `);
  console.log("================================================================");
  console.log(
    "Dept Name".padEnd(18) +
    "Performance Score".padEnd(22) +
    "Evaluation Grade"
  );
  console.log("-".repeat(64));

  let totalScore = 0;
  const countByGrade = {
    "Excellent": 0,
    "Good": 0,
    "Average": 0,
    "Needs Improvement": 0
  };

  // Iterating through each department entry in the 2D array
  for (let i = 0; i < deptList.length; i++) {
    const [deptName, score] = deptList[i];
    const grade = evaluateScore(score);

    totalScore += score;
    countByGrade[grade] = (countByGrade[grade] || 0) + 1;

    console.log(
      deptName.padEnd(18) +
      score.toString().padEnd(22) +
      `[${grade}]`
    );
  }

  const averageScore = totalScore / deptList.length;

  console.log("-".repeat(64));
  console.log(`Total Departments Evaluated : ${deptList.length}`);
  console.log(`Average Departmental Score  : ${averageScore.toFixed(2)} / 100`);
  console.log("Evaluation Breakdown        : " +
    Object.entries(countByGrade)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ")
  );
  console.log("================================================================\n");
}

// Primary Run: Given assignment dataset
generateEvaluationReport(departments, "Primary Departmental Evaluation");

// Secondary Run: Extended dataset to verify all conditional branches (including < 60)
const extendedDepartments = [
  ...departments,
  ["Logistics", 52],
  ["Security", 91]
];
generateEvaluationReport(extendedDepartments, "Extended Verification Report");

