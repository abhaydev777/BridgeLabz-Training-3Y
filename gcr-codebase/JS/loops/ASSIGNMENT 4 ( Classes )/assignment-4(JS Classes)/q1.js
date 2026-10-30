/**
 * Assignment 4 - Question 1: E-Commerce Product Manager (Classes + Objects)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Product class with id, name, price, category.
 * - applyDiscount(percent) method to update price.
 * - getDetails() method to return a formatted string.
 * - Array of at least 4 products.
 * - filter() to display products with price > 1000.
 */

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Method to apply discount percentage to the product price
  applyDiscount(percent) {
    if (percent < 0 || percent > 100) {
      console.log(`[Error] Invalid discount percentage (${percent}%) for product: ${this.name}`);
      return;
    }
    const discountAmount = (this.price * percent) / 100;
    this.price -= discountAmount;
    console.log(`[Discount Applied] ${percent}% off on "${this.name}". New price: $${this.price.toFixed(2)}`);
  }

  // Returns formatted string with product specifications
  getDetails() {
    return `ID: ${this.id} | Name: ${this.name} | Category: ${this.category} | Price: $${this.price.toFixed(2)}`;
  }
}

// Creating an inventory of at least 4 product objects with varied prices
const products = [
  new Product(101, "Dell XPS 15 Laptop", 1500, "Electronics"),
  new Product(102, "Logitech MX Master 3S", 99, "Accessories"),
  new Product(103, "Apple iPhone 15 Pro", 1199, "Electronics"),
  new Product(104, "Sony WH-1000XM5 Headphones", 399, "Audio"),
  new Product(105, "Samsung 49-inch Odyssey Neo G9", 1400, "Monitors"),
  new Product(106, "Mechanical Keyboard Keychron Q1", 180, "Accessories")
];

console.log("=================================================");
console.log("     QUESTION 1: E-COMMERCE PRODUCT MANAGER      ");
console.log("=================================================\n");

console.log("--- 1. Initial Product Inventory ---");
products.forEach(product => {
  console.log(product.getDetails());
});

console.log("\n--- 2. Applying Discounts to Select Items ---");
// Applying 10% discount on Dell XPS 15 (Initial $1500 -> $1350)
products[0].applyDiscount(10);
// Applying 20% discount on Samsung Odyssey (Initial $1400 -> $1120)
products[4].applyDiscount(20);

console.log("\n--- 3. Filtering Products with Price > $1000 ---");
// Using Array.prototype.filter() to find all products costing more than $1000
const premiumProducts = products.filter(product => product.price > 1000);

console.log(`Found ${premiumProducts.length} product(s) priced over $1000:`);
premiumProducts.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.getDetails()}`);
});

// Export class for testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Product, products };
}

