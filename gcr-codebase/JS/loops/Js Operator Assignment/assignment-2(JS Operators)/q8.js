/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 8: Dynamic Discount Evaluator
 * Demonstrates loops, conditional discount logic, reduce aggregation, and itemized billing.
 */

// Function to process a cart and generate an itemized invoice
function evaluateCart(cartItems, cartName = "Cart") {
  console.log(`================================================================`);
  console.log(`         DISCOUNT EVALUATOR INVOICE: ${cartName.toUpperCase()}  `);
  console.log(`================================================================`);
  console.log(
    "Item".padEnd(14) +
    "Category".padEnd(16) +
    "Original".padEnd(12) +
    "Discount%".padEnd(12) +
    "Discount ₹".padEnd(14) +
    "Final Price"
  );
  console.log("-".repeat(78));

  // Step 1: Use a loop and conditionals to compute item-level discounts
  const itemizedBill = [];
  for (const product of cartItems) {
    let discountPercent = 0;

    // Category-based conditional discount rules
    if (product.category === "electronics") {
      discountPercent = 10;
    } else if (product.category === "fashion") {
      discountPercent = 5;
    } else {
      discountPercent = 0;
    }

    const discountAmount = (product.price * discountPercent) / 100;
    const discountedPrice = product.price - discountAmount;

    itemizedBill.push({
      item: product.item,
      category: product.category,
      originalPrice: product.price,
      discountPercent: discountPercent,
      discountAmount: discountAmount,
      discountedPrice: discountedPrice
    });

    console.log(
      product.item.padEnd(14) +
      product.category.padEnd(16) +
      `₹${product.price}`.padEnd(12) +
      `${discountPercent}%`.padEnd(12) +
      `₹${discountAmount.toFixed(2)}`.padEnd(14) +
      `₹${discountedPrice.toFixed(2)}`
    );
  }

  // Step 2: Use reduce() to compute subtotal and discounted cart value
  const totalOriginal = itemizedBill.reduce((acc, curr) => acc + curr.originalPrice, 0);
  const totalItemLevelDiscount = itemizedBill.reduce((acc, curr) => acc + curr.discountAmount, 0);
  const cartDiscountedSubtotal = itemizedBill.reduce((acc, curr) => acc + curr.discountedPrice, 0);

  // Step 3: Check if total discounted cart value > 50000 for extra 5% overall discount
  let overallDiscountPercent = 0;
  let overallDiscountAmount = 0;

  if (cartDiscountedSubtotal > 50000) {
    overallDiscountPercent = 5;
    overallDiscountAmount = (cartDiscountedSubtotal * overallDiscountPercent) / 100;
  }

  const finalPayableTotal = cartDiscountedSubtotal - overallDiscountAmount;
  const totalSavings = totalItemLevelDiscount + overallDiscountAmount;

  console.log("-".repeat(78));
  console.log(`Original Subtotal                     : ₹${totalOriginal.toFixed(2)}`);
  console.log(`Item-level Total Discount             : -₹${totalItemLevelDiscount.toFixed(2)}`);
  console.log(`Cart Subtotal (after item discounts)  : ₹${cartDiscountedSubtotal.toFixed(2)}`);
  console.log(`Extra 5% Cart Discount (> ₹50,000)   : ${overallDiscountPercent > 0 ? `-₹${overallDiscountAmount.toFixed(2)} (5% applied)` : "₹0.00 (Not eligible, <= ₹50,000)"}`);
  console.log("-".repeat(78));
  console.log(`FINAL PAYABLE GRAND TOTAL             : ₹${finalPayableTotal.toFixed(2)}`);
  console.log(`TOTAL CUSTOMER SAVINGS                : ₹${totalSavings.toFixed(2)}`);
  console.log(`================================================================\n`);

  return finalPayableTotal;
}

// Primary Test Case: Given input cart from assignment specification
const standardCart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

evaluateCart(standardCart, "Standard Cart (Given Specification)");

// Secondary Test Case: Cart value > ₹50,000 to verify overall 5% discount logic
const highValueCart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Monitor", category: "electronics", price: 15000 },
  { item: "Sneakers", category: "fashion", price: 4000 },
  { item: "Novel", category: "education", price: 500 }
];

evaluateCart(highValueCart, "High-Value Cart (> ₹50,000 threshold)");

