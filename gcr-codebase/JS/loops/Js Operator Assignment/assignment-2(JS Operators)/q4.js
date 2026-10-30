/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 4: Array Performance Analyzer
 * Demonstrates array generation, spread operator Math methods, reduce, filter, and map.
 */

// Step 1: Generate an array of 8 random scores between 30 and 100
const totalStudents = 8;
const scores = [];
for (let i = 0; i < totalStudents; i++) {
  // Math.floor(Math.random() * (100 - 30 + 1)) + 30 generates 30 to 100 inclusive
  const randomScore = Math.floor(Math.random() * 71) + 30;
  scores.push(randomScore);
}

// Step 2: Calculate highest and lowest scores using spread operator
const highestScore = Math.max(...scores);
const lowestScore = Math.min(...scores);

// Step 3: Calculate average score using reduce()
const totalScoreSum = scores.reduce((accumulator, current) => accumulator + current, 0);
const averageScore = totalScoreSum / scores.length;

// Step 4: Count passed students (score >= 50) using filter()
const passingScores = scores.filter(score => score >= 50);
const passedCount = passingScores.length;
const failedCount = scores.length - passedCount;

// Step 5: Format grades using map()
const studentPerformanceList = scores.map((score, index) => {
  let grade = "F (Fail)";
  if (score >= 90) grade = "A+";
  else if (score >= 80) grade = "A";
  else if (score >= 70) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 50) grade = "D";

  return `Student #${index + 1} | Score: ${score.toString().padStart(3, " ")} | Grade: ${grade}`;
});

// Output Summary
console.log("==================================================");
console.log("           ARRAY PERFORMANCE ANALYZER             ");
console.log("==================================================");
console.log(`Generated Raw Scores : [ ${scores.join(", ")} ]\n`);

console.log("--- Performance Metrics ---");
console.log(`Highest Score        : ${highestScore}`);
console.log(`Lowest Score         : ${lowestScore}`);
console.log(`Total Score Sum      : ${totalScoreSum}`);
console.log(`Average Score        : ${averageScore.toFixed(2)}`);
console.log(`Passed (Score >= 50) : ${passedCount} / ${scores.length} students`);
console.log(`Failed (Score < 50)  : ${failedCount} / ${scores.length} students\n`);

console.log("--- Student Grade Breakdown (via map) ---");
studentPerformanceList.forEach(line => console.log(line));
console.log("==================================================\n");

