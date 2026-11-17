/**
 * Assignment 8 - OOPS with JS
 * Question 2: Online Food Ordering (map + Error Handling)
 * Author: Abhay Pratap Singh
 */

// Catalog of available food items with their prices
const menu = [
  { id: 1, name: "Veg Burger", price: 120 },
  { id: 2, name: "Cheese Pizza", price: 350 },
  { id: 3, name: "White Sauce Pasta", price: 240 },
  { id: 4, name: "French Fries", price: 90 },
  { id: 5, name: "Cold Coffee", price: 80 },
  { id: 6, name: "Garlic Bread", price: 110 }
];

/**
 * Calculates the total bill for a list of ordered food items.
 * Uses .map() to extract prices with error handling for unavailable items,
 * and .reduce() to accumulate the total amount.
 */
function calculateBill(orderItems) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("Order must be a non-empty list of item names.");
  }

  // 1. Map each item name to its corresponding price from the menu catalog
  const priceList = orderItems.map((itemName) => {
    const menuItem = menu.find(
      (item) => item.name.toLowerCase() === itemName.trim().toLowerCase()
    );

    // Throw an error if an ordered item is not found in the menu
    if (!menuItem) {
      throw new Error(`Item "${itemName}" is not available on the menu.`);
    }

    return menuItem.price;
  });

  // 2. Reduce the extracted price list to calculate the total bill amount
  const totalAmount = priceList.reduce((accumulator, price) => {
    return accumulator + price;
  }, 0);

  return {
    items: orderItems,
    priceList,
    totalAmount
  };
}

// Display available menu
console.log("========================================");
console.log("    QUESTION 2: ONLINE FOOD ORDERING    ");
console.log("========================================\n");

console.log("--- Restaurant Menu ---");
menu.forEach((item) => {
  console.log(`- ${item.name.padEnd(20)} : Rs. ${item.price}`);
});
console.log("\n----------------------------------------\n");

// Helper function to process orders with try...catch error handling
function processOrder(orderLabel, orderItems) {
  console.log(`Processing ${orderLabel}: [${orderItems.join(", ")}]`);
  try {
    const bill = calculateBill(orderItems);
    console.log(`✓ Order placed successfully!`);
    console.log(`  Itemized Prices : [${bill.priceList.map((p) => `Rs. ${p}`).join(", ")}]`);
    console.log(`  Total Bill      : Rs. ${bill.totalAmount}\n`);
  } catch (error) {
    // Graceful error handling for missing/invalid items or bad input
    console.log(`✗ Order Failed: ${error.message}\n`);
  }
}

// Test Case 1: Valid Order
processOrder("Order #1 (Valid)", ["Veg Burger", "French Fries", "Cold Coffee"]);

// Test Case 2: Another Valid Order
processOrder("Order #2 (Valid)", ["Cheese Pizza", "Garlic Bread"]);

// Test Case 3: Invalid Order with missing menu item
processOrder("Order #3 (Invalid Item)", ["Veg Burger", "Tandoori Paneer Tikka", "Cold Coffee"]);

// Test Case 4: Invalid Order with empty array
processOrder("Order #4 (Empty Order)", []);

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { menu, calculateBill };
}

