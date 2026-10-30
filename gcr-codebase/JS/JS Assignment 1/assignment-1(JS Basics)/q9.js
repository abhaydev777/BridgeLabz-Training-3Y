// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 9: Random Math Quiz Generator

// Function to generate and evaluate a random math quiz question
function generateQuizQuestion() {
  // Generating two random integers between 1 and 20
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;

  // List of math operators
  const operators = ['+', '-', '*', '/'];
  const operatorIndex = Math.floor(Math.random() * operators.length);
  const operator = operators[operatorIndex];

  let calculatedAnswer;
  let calculationNote = "";

  // Switch statement to compute answer based on operator
  switch (operator) {
    case '+':
      calculatedAnswer = num1 + num2;
      break;
    case '-':
      calculatedAnswer = num1 - num2;
      break;
    case '*':
      calculatedAnswer = num1 * num2;
      break;
    case '/':
      // Division: round to two decimal places using toFixed(2)
      calculatedAnswer = parseFloat((num1 / num2).toFixed(2));
      calculationNote = " (rounded to 2 decimal places)";
      break;
    default:
      calculatedAnswer = null;
  }

  const questionString = `${num1} ${operator} ${num2}`;

  return {
    num1,
    operator,
    num2,
    questionString,
    answer: calculatedAnswer,
    note: calculationNote
  };
}

console.log("=== Question 9: Random Math Quiz Generator ===\n");

// 1. Single Quiz Question Demonstration
const quiz = generateQuizQuestion();
console.log("--- Generated Quiz Question ---");
console.log(`Question  : What is ${quiz.questionString}?`);
console.log(`Answer    : ${quiz.answer}${quiz.note}`);
console.log(`Verified  : ${quiz.questionString} = ${quiz.answer}`);
console.log("------------------------------------------\n");

// 2. Generating a batch of 5 questions to demonstrate all operator cases
console.log("--- Batch Sample Quiz Set (5 Questions) ---");
for (let i = 1; i <= 5; i++) {
  const item = generateQuizQuestion();
  console.log(`Q${i}: ${item.questionString.padEnd(8)} => Answer: ${item.answer}${item.note}`);
}

