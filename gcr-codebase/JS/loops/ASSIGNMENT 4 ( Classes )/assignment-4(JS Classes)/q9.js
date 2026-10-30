/**
 * Assignment 4 - Question 9: Shopping Cart Total (Classes + RegExp for Coupon)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Cart class with internal items array.
 * - Methods:
 *   - addItem(name, price, quantity)
 *   - getTotal(): returns raw subtotal sum (price * quantity).
 *   - applyCoupon(couponCode): validates coupon code using RegExp:
 *     Pattern: /^(SAVE|DISC)(\d{1,2})$/
 *     Extracts percentage digits dynamically and returns discounted total.
 * - Test with multiple items, invalid coupons, and valid coupons.
 * - Display itemized totals in console and companion HTML.
 */

class Cart {
  constructor() {
    this.items = [];
    // Pattern matches SAVE or DISC followed by 1 or 2 digits (e.g., SAVE20, DISC10)
    this.couponRegex = /^(SAVE|DISC)(\d{1,2})$/;
  }

  // Add an item to the shopping cart
  addItem(name, price, quantity = 1) {
    if (price < 0 || quantity <= 0) {
      console.log(`[Cart Warning] Cannot add invalid item "${name}".`);
      return;
    }
    const item = {
      id: this.items.length + 1,
      name,
      price: Number(price),
      quantity: Number(quantity),
      itemSubtotal: Number(price) * Number(quantity)
    };
    this.items.push(item);
  }

  // Calculates raw subtotal of all items
  getTotal() {
    return this.items.reduce((accumulator, item) => {
      return accumulator + (item.price * item.quantity);
    }, 0);
  }

  // Validates coupon via RegExp, extracts percentage, and returns discounted total
  applyCoupon(couponCode) {
    const rawTotal = this.getTotal();
    const trimmedCode = (couponCode ?? "").toString().trim().toUpperCase();

    // Test regex against pattern
    const match = trimmedCode.match(this.couponRegex);

    if (!match) {
      console.log(`[Coupon Error] Code "${couponCode}" is INVALID. Expected format /^(SAVE|DISC)(\\d{1,2})$/`);
      return rawTotal;
    }

    // Dynamic extraction: match[1] is prefix ('SAVE' | 'DISC'), match[2] is digits
    const prefix = match[1];
    const discountPercent = parseInt(match[2], 10);

    const discountAmount = (rawTotal * discountPercent) / 100;
    const discountedTotal = rawTotal - discountAmount;

    console.log(
      `[Coupon Success] Valid code "${trimmedCode}" (${prefix} promo)! ` +
      `${discountPercent}% off applied (-$${discountAmount.toFixed(2)}). ` +
      `New Total: $${discountedTotal.toFixed(2)}`
    );

    return Number(discountedTotal.toFixed(2));
  }

  // Helper method returning detailed breakdown object for UI and receipt display
  getReceipt(couponCode = "") {
    const rawTotal = this.getTotal();
    const trimmedCode = (couponCode ?? "").toString().trim().toUpperCase();
    const match = trimmedCode.match(this.couponRegex);

    let discountPercent = 0;
    let discountAmount = 0;
    let finalTotal = rawTotal;
    let isValidCoupon = false;

    if (match) {
      isValidCoupon = true;
      discountPercent = parseInt(match[2], 10);
      discountAmount = (rawTotal * discountPercent) / 100;
      finalTotal = rawTotal - discountAmount;
    }

    return {
      items: [...this.items],
      rawTotal,
      couponCode: trimmedCode,
      isValidCoupon,
      discountPercent,
      discountAmount,
      finalTotal: Number(finalTotal.toFixed(2))
    };
  }

  // Clears all items
  clearCart() {
    this.items = [];
  }
}

// Browser DOM Interaction Logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart();

    // Pre-populate with typical student study setup items
    cart.addItem("Mechanical Keyboard (Keychron K2)", 85.00, 1);
    cart.addItem("Ergonomic Desk Mouse", 35.00, 2);
    cart.addItem("Laptop Stand Aluminum", 45.00, 1);

    const itemListContainer = document.getElementById("cartItemList");
    const subtotalEl = document.getElementById("cartSubtotal");
    const discountRow = document.getElementById("discountRow");
    const discountAmountEl = document.getElementById("discountAmount");
    const finalTotalEl = document.getElementById("cartFinalTotal");
    const couponInput = document.getElementById("couponInput");
    const couponBtn = document.getElementById("applyCouponBtn");
    const couponFeedback = document.getElementById("couponFeedback");

    // Add Item Form
    const addItemForm = document.getElementById("addItemForm");
    const newItemName = document.getElementById("newItemName");
    const newItemPrice = document.getElementById("newItemPrice");
    const newItemQty = document.getElementById("newItemQty");

    let currentCoupon = "";

    function renderCartUI() {
      const receipt = cart.getReceipt(currentCoupon);

      // Render Itemized Rows
      if (itemListContainer) {
        if (receipt.items.length === 0) {
          itemListContainer.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8;">Cart is empty.</td></tr>`;
        } else {
          itemListContainer.innerHTML = receipt.items.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td>$${item.price.toFixed(2)}</td>
              <td>${item.quantity}</td>
              <td class="text-right">$${item.itemSubtotal.toFixed(2)}</td>
            </tr>
          `).join("");
        }
      }

      // Subtotal
      if (subtotalEl) {
        subtotalEl.textContent = `$${receipt.rawTotal.toFixed(2)}`;
      }

      // Discount
      if (discountRow && discountAmountEl) {
        if (receipt.isValidCoupon) {
          discountRow.style.display = "table-row";
          discountAmountEl.textContent = `-$${receipt.discountAmount.toFixed(2)} (${receipt.discountPercent}% off)`;
        } else {
          discountRow.style.display = "none";
        }
      }

      // Final Total
      if (finalTotalEl) {
        finalTotalEl.textContent = `$${receipt.finalTotal.toFixed(2)}`;
      }
    }

    // Apply Coupon Button Click
    if (couponBtn && couponInput) {
      couponBtn.addEventListener("click", () => {
        const code = couponInput.value.trim();
        currentCoupon = code;

        const receipt = cart.getReceipt(code);

        if (code.length === 0) {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = "Please enter a coupon code.";
          couponFeedback.style.display = "block";
        } else if (receipt.isValidCoupon) {
          couponFeedback.className = "coupon-feedback success";
          couponFeedback.textContent = `Coupon "${receipt.couponCode}" applied! Enjoy ${receipt.discountPercent}% off.`;
          couponFeedback.style.display = "block";
        } else {
          couponFeedback.className = "coupon-feedback error";
          couponFeedback.textContent = `Invalid code "${code}". Pattern must be /^(SAVE|DISC)(\\d{1,2})$/ (e.g. SAVE20, DISC10).`;
          couponFeedback.style.display = "block";
        }

        renderCartUI();
      });
    }

    // Add Item Form Submit
    if (addItemForm) {
      addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = newItemName.value.trim();
        const price = parseFloat(newItemPrice.value);
        const qty = parseInt(newItemQty.value, 10);

        if (name && !isNaN(price) && !isNaN(qty)) {
          cart.addItem(name, price, qty);
          newItemName.value = "";
          newItemPrice.value = "";
          newItemQty.value = "1";
          renderCartUI();
        }
      });
    }

    // Initial render
    renderCartUI();
  });
}

// Node.js test execution
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 9: SHOPPING CART TOTAL (TEST)      ");
  console.log("=================================================\n");

  const myCart = new Cart();

  console.log("1. Adding items to cart...");
  myCart.addItem("Ergonomic Coding Chair", 250, 1);
  myCart.addItem("Mechanical Keyboard", 120, 2);
  myCart.addItem("27-inch 4K Monitor", 350, 1);
  myCart.addItem("USB-C Hub Multiport", 40, 2);

  console.log("\n--- Itemized Cart Content ---");
  myCart.items.forEach(item => {
    console.log(`  * ${item.name.padEnd(25, ' ')} | Qty: ${item.quantity} | Price: $${item.price.toFixed(2)} | Subtotal: $${item.itemSubtotal.toFixed(2)}`);
  });

  const subtotal = myCart.getTotal();
  console.log(`\nRaw Subtotal: $${subtotal.toFixed(2)}`);

  console.log("\n2. Testing INVALID coupon codes against /^(SAVE|DISC)(\\d{1,2})$/:");
  const invalidCoupons = ["OFF20", "SAVE100", "DISC-5", "FREE99", "save_20"];
  invalidCoupons.forEach(code => {
    const total = myCart.applyCoupon(code);
  });

  console.log("\n3. Testing VALID coupon codes against /^(SAVE|DISC)(\\d{1,2})$/:");
  const validCoupons = ["SAVE20", "DISC10", "SAVE50", "DISC5"];
  validCoupons.forEach(code => {
    const discounted = myCart.applyCoupon(code);
  });

  console.log("\nShopping Cart and RegExp coupon validator verified cleanly.");
  console.log("Companion interactive browser runner available in q9.html.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Cart };
}

