// Author: Abhay Pratap Singh
// JS Assignment 1 (Lecture 1-3)
// Question 6: Progressive Discount System

// Function to calculate discount tier and final payable amount
function calculateDiscount(totalAmount) {
  let discountPercent = 0;

  // Determining progressive discount tier
  if (totalAmount >= 10000) {
    discountPercent = 25;
  } else if (totalAmount >= 5000) {
    discountPercent = 15;
  } else if (totalAmount >= 2000) {
    discountPercent = 5;
  } else {
    discountPercent = 0;
  }

  // Calculating discount value and discounted total
  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalPrice = Math.round(totalAmount - discountAmount);

  return {
    originalTotal: totalAmount,
    discountPercent: discountPercent,
    discountAmount: discountAmount,
    finalPrice: finalPrice
  };
}

console.log("=== Question 6: Progressive Discount System ===\n");

// Testing multiple purchase amounts to verify every tier
const testPurchases = [12500, 7200, 3500, 1499, 10000, 5000, 2000];

testPurchases.forEach((amount, index) => {
  const result = calculateDiscount(amount);

  console.log(`Test Case #${index + 1}: Purchase of ₹${result.originalTotal.toFixed(2)}`);
  console.log(`1. Original Total     : ₹${result.originalTotal.toFixed(2)}`);
  console.log(`2. Discount Applied   : ${result.discountPercent}% (Savings: ₹${result.discountAmount.toFixed(2)})`);
  console.log(`3. Final Price (Net)  : ₹${result.finalPrice} (Rounded using Math.round())`);
  console.log("-----------------------------------------------------");
});

