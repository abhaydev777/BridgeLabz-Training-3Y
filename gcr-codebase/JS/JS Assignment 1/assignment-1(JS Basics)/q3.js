// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 3: Monthly Expense Tracker

// Array of monthly expenses covering 5 categories
const monthlyExpenses = [
  { category: "Food", amount: 4500.50 },
  { category: "Travel", amount: 1850.00 },
  { category: "Rent", amount: 12000.00 },
  { category: "Bills", amount: 2450.75 },
  { category: "Leisure", amount: 3200.25 }
];

// Computing total expenses using a loop
let totalExpenses = 0;
for (let i = 0; i < monthlyExpenses.length; i++) {
  totalExpenses += monthlyExpenses[i].amount; // compound assignment operator
}

// Computing average expense across all categories
const categoryCount = monthlyExpenses.length;
const averageExpense = totalExpenses / categoryCount;

// Adding 10% tax using arithmetic and compound assignment
const taxRate = 0.10;
const taxAmount = totalExpenses * taxRate;

let finalAmountWithTax = totalExpenses;
finalAmountWithTax += taxAmount; // Compound assignment operator (+=)

// Displaying formatted console summary
console.log("=== Question 3: Monthly Expense Tracker ===");
console.log("--- Category-wise Breakdown ---");
monthlyExpenses.forEach((item) => {
  console.log(`- ${item.category.padEnd(10)}: ₹${item.amount.toFixed(2)}`);
});

console.log("-----------------------------------------");
console.log(`Total Expense (Before Tax) : ₹${totalExpenses.toFixed(2)}`);
console.log(`Average Expense (Per Item) : ₹${averageExpense.toFixed(2)}`);
console.log(`Applicable Tax (10%)       : ₹${taxAmount.toFixed(2)}`);
console.log(`Final Amount (After Tax)   : ₹${finalAmountWithTax.toFixed(2)}`);
console.log("-----------------------------------------");

