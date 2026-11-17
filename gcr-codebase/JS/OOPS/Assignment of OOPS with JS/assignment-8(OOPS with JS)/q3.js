/**
 * Assignment 8 - OOPS with JS
 * Question 3: Product Discount System (Constructor Function + Prototype)
 * Author: Abhay Pratap Singh
 *
 * Prototype-Based Abstraction Explanation:
 * In JavaScript, constructor functions act as blueprints for creating objects.
 * When a method is attached to `Product.prototype`, it exists in exactly one place in memory.
 * All instances created using `new Product()` link to this prototype via their internal [[Prototype]]
 * chain (instance.__proto__ === Product.prototype).
 *
 * Benefits:
 * 1. Memory Efficiency: Avoids allocating duplicate function copies across thousands of instances.
 * 2. Centralized Maintenance: Any update or bug fix on the prototype is instantly available to all instances.
 * 3. Separation of Concerns: Instance-specific state stays on the object, while shared behaviors live on the prototype.
 */

// Constructor function initializing instance-specific properties
function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Attaching applyDiscount method to Product.prototype
// All Product instances delegate to this shared implementation
Product.prototype.applyDiscount = function (percent) {
  if (typeof percent !== "number" || percent < 0 || percent > 100) {
    throw new Error(`Invalid discount percentage (${percent}%). It must be between 0 and 100.`);
  }

  const discountAmount = (this.price * percent) / 100;
  const discountedPrice = this.price - discountAmount;
  return discountedPrice;
};

// Helper method on prototype to format product details
Product.prototype.getSummary = function (percent) {
  const finalPrice = this.applyDiscount(percent);
  return `Product: ${this.name}\nOriginal Price: Rs. ${this.price.toFixed(2)} | Discount: ${percent}% | Final Price: Rs. ${finalPrice.toFixed(2)}`;
};

console.log("==================================================");
console.log("      QUESTION 3: PRODUCT DISCOUNT SYSTEM         ");
console.log("==================================================\n");

// Instantiating 3 distinct products
const product1 = new Product("Wireless Noise-Canceling Headphones", 4500);
const product2 = new Product("Mechanical Gaming Keyboard", 3200);
const product3 = new Product("Ergonomic Office Chair", 8000);

// Applying varying discount percentages
const discountRates = [
  { product: product1, discount: 15 },
  { product: product2, discount: 25 },
  { product: product3, discount: 40 }
];

discountRates.forEach(({ product, discount }, index) => {
  console.log(`--- Product ${index + 1} ---`);
  console.log(product.getSummary(discount));
  console.log();
});

// Verifying prototype reference equality to prove shared method storage in memory
console.log("--- Prototype Chain Verification ---");
console.log("Does product1.applyDiscount === product2.applyDiscount?");
console.log(product1.applyDiscount === product2.applyDiscount); // true (Single shared reference)
console.log("product1.__proto__ === Product.prototype:", Object.getPrototypeOf(product1) === Product.prototype);

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Product };
}

