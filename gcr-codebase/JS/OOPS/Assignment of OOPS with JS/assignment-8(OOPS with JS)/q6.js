/**
 * Assignment 8 - OOPS with JS
 * Question 6: E-Commerce Inventory System
 * Author: Abhay Pratap Singh
 *
 * Concepts Demonstrated:
 * - Higher-order array methods: .filter(), .sort(), .reduce().
 * - Immutability: Cloning arrays with spread syntax ([...products]) before sorting to avoid mutating original state.
 * - Complex state aggregation and hash-map style grouping using .reduce().
 */

// Dataset of inventory products across multiple categories
const inventory = [
  { id: 101, name: "Wireless Mechanical Keyboard", category: "Electronics", price: 4200, stock: 8 },
  { id: 102, name: "Gaming Mouse Pad", category: "Accessories", price: 650, stock: 25 },
  { id: 103, name: "Ergonomic Desk Chair", category: "Furniture", price: 9500, stock: 4 },
  { id: 104, name: "USB-C Multi-port Hub", category: "Electronics", price: 1800, stock: 3 },
  { id: 105, name: "Noise Cancelling Headphones", category: "Electronics", price: 7500, stock: 12 },
  { id: 106, name: "Standing Desk Riser", category: "Furniture", price: 5400, stock: 5 },
  { id: 107, name: "Hardcover Bullet Journal", category: "Stationery", price: 450, stock: 30 },
  { id: 108, name: "Gel Pen 0.5mm Pack", category: "Stationery", price: 180, stock: 2 }
];

/**
 * 1. Filters products whose stock level is strictly below the given threshold.
 */
function getLowStockProducts(products, threshold = 5) {
  return products.filter((product) => product.stock < threshold);
}

/**
 * 2. Returns a new sorted array of products by price without mutating the input array.
 */
function sortProductsByPrice(products, order = "asc") {
  // Use spread operator to shallow-copy array before running mutating .sort()
  return [...products].sort((a, b) => {
    return order.toLowerCase() === "desc" ? b.price - a.price : a.price - b.price;
  });
}

/**
 * 3. Calculates the cumulative financial value of the entire inventory (price * stock).
 */
function calculateTotalInventoryValue(products) {
  return products.reduce((accumulator, product) => {
    return accumulator + product.price * product.stock;
  }, 0);
}

/**
 * 4. Groups product objects by their category into an object of arrays.
 */
function groupByCategory(products) {
  return products.reduce((grouped, product) => {
    const category = product.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(product);
    return grouped;
  }, {});
}

// -------------------------------------------------------------
// Demonstration & Formatted Logging
// -------------------------------------------------------------
console.log("==================================================");
console.log("     QUESTION 6: E-COMMERCE INVENTORY SYSTEM      ");
console.log("==================================================\n");

// Operation 1: Low stock products
const LOW_STOCK_THRESHOLD = 5;
console.log(`--- 1. Low Stock Products (Stock < ${LOW_STOCK_THRESHOLD}) ---`);
const lowStock = getLowStockProducts(inventory, LOW_STOCK_THRESHOLD);
lowStock.forEach((item) => {
  console.log(`- [ID: ${item.id}] ${item.name.padEnd(28)} | Stock: ${item.stock} left | Rs. ${item.price}`);
});

// Operation 2: Sorted by price (ascending & descending)
console.log("\n--- 2. Products Sorted By Price (Ascending) ---");
const sortedAsc = sortProductsByPrice(inventory, "asc");
sortedAsc.forEach((item) => {
  console.log(`- Rs. ${item.price.toString().padEnd(6)} : ${item.name} (${item.category})`);
});

// Operation 3: Total inventory valuation
console.log("\n--- 3. Total Inventory Valuation ---");
const totalValue = calculateTotalInventoryValue(inventory);
console.log(`Total Cumulative Valuation: Rs. ${totalValue.toLocaleString("en-IN")}`);

// Operation 4: Group products by category
console.log("\n--- 4. Products Grouped By Category ---");
const groupedInventory = groupByCategory(inventory);
for (const [category, items] of Object.entries(groupedInventory)) {
  console.log(`\n• Category: ${category} (${items.length} item${items.length > 1 ? "s" : ""})`);
  items.forEach((p) => {
    console.log(`    - ${p.name.padEnd(30)} | Price: Rs. ${p.price} | Stock: ${p.stock}`);
  });
}

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    inventory,
    getLowStockProducts,
    sortProductsByPrice,
    calculateTotalInventoryValue,
    groupByCategory
  };
}

