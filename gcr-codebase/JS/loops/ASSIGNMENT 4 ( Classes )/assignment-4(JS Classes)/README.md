# ASSIGNMENT 4 - Submission of JS Classes
**Student Name:** Abhay Pratap Singh  
**Course:** Full Stack Web Development (JavaScript Loops, Classes & RegExp)  
**Target Directory:** `assignment-4(JS Classes)`

---

## 📁 Repository & File Structure

```text
assignment-4(JS Classes)/
├── index.html        # Interactive submission dashboard & runner portal
├── README.md         # Documentation & verification instructions
├── q1.js             # Q1: E-Commerce Product Manager (Product Class)
├── q2.js             # Q2: Student Form Validator logic & tests
├── q2.html           # Q2: Companion browser runner for real-time validation
├── q3.js             # Q3: Library Management System (Book Class)
├── q4.js             # Q4: Custom Form Builder (FormBuilder Class)
├── q4.html           # Q4: Companion browser runner with dynamic form rendering
├── q5.js             # Q5: Movie Ticket Booking logic & tests
├── q5.html           # Q5: Companion browser runner with cinema ticket card
├── q6.js             # Q6: Employee Management System (Employee Class & reduce)
├── q7.js             # Q7: Login Form Validation (RegExp & granular feedback)
├── q7.html           # Q7: Companion browser runner with criteria checklist
├── q8.js             # Q8: Dynamic Object Updater logic & tests
├── q8.html           # Q8: Companion browser runner with pre-populated form
├── q9.js             # Q9: Shopping Cart Total (Cart Class & Promo RegExp)
└── q9.html           # Q9: Companion browser runner with itemized cart & coupon
```

---

## 🚀 Execution & Testing Guide

All `.js` files can be executed directly in the terminal using Node.js, and interactive questions include companion `.html` runners for testing directly in any web browser without external frameworks or dependencies.

### 1. Terminal Console Execution (Node.js)
Navigate to the directory and run any question:
```bash
cd "assignment-4(JS Classes)"

node q1.js   # Q1: Product class & filter(price > 1000)
node q2.js   # Q2: Student form regex validation test suite
node q3.js   # Q3: Library management, book issuing & ISBN search
node q4.js   # Q4: FormBuilder class schema & HTML generation
node q5.js   # Q5: Movie ticket booking regex validation & ticket creation
node q6.js   # Q6: Employee annual salary, bonus, & reduce() total payroll
node q7.js   # Q7: Login form regex rules & criteria test cases
node q8.js   # Q8: In-memory user object mutation verification
node q9.js   # Q9: Shopping cart subtotal, itemization & promo coupon regex
```

### 2. Browser Interactive Execution
Open `index.html` or any individual `.html` companion file (`q2.html`, `q4.html`, `q5.html`, `q7.html`, `q8.html`, `q9.html`) directly in Google Chrome, Firefox, or Edge.

---

## 🔍 Detailed Solutions Summary

### Question 1: E-Commerce Product Manager (`q1.js`)
- **Class:** `Product` with properties `id`, `name`, `price`, `category`.
- **Methods:**
  - `applyDiscount(percent)`: Adjusts `this.price` by calculating `(this.price * percent) / 100`.
  - `getDetails()`: Returns formatted product details.
- **Filter:** Uses `products.filter(p => p.price > 1000)` to display high-end products.

### Question 2: Student Form Validator (`q2.js` & `q2.html`)
- **Fields & RegExp Patterns:**
  - `Name`: `/^[A-Za-z\s]+$/` (letters and spaces only)
  - `Email`: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (standard email address)
  - `Phone`: `/^\d{10}$/` (exactly 10 digits)
  - `Password`: `/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/` (at least 1 uppercase, 1 digit, 1 special character)
- **Visual Feedback:** Dynamically toggles red border + inline error message if invalid, and green border if valid.

### Question 3: Library Management System (`q3.js`)
- **Class:** `Book` with `title`, `author`, `isbn`, and `isIssued` (default `false`).
- **Methods:**
  - `issueBook()`: Sets `isIssued = true` if available; otherwise warns that it is already issued.
  - `returnBook()`: Sets `isIssued = false`.
- **Helper Functions:**
  - `displayAvailableBooks(books)`: Filters books where `isIssued === false`.
  - `searchAndIssueByISBN(books, isbn, borrowerName)`: Locates book by ISBN and marks it issued.

### Question 4: Custom Form Builder (`q4.js` & `q4.html`)
- **Class:** `FormBuilder` accepting container and an array of field schema objects.
- **Methods:**
  - `render()`: Injects dynamic `<form>` HTML using `innerHTML` and attaches submit handler.
  - `getFormData()`: Retrieves values of all input fields into a key-value object upon `event.preventDefault()`.

### Question 5: Movie Ticket Booking (`q5.js` & `q5.html`)
- **RegExp Validations:**
  - `Name`: `/^[A-Za-z\s]+$/`
  - `Email`: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - `Seats`: `/^([1-9]|10)$/` (strictly 1 to 10 seats)
- **DOM Output:** On valid submission, constructs `{ bookingId, name, email, seats, totalAmount, bookingTime }` and renders an authentic cinema ticket card.

### Question 6: Employee Management System (`q6.js`)
- **Class:** `Employee` with `id`, `name`, `department`, `salary`.
- **Methods:**
  - `getAnnualSalary()`: Returns `salary * 12`.
  - `applyBonus(percent)`: Increases monthly salary by the given percentage.
- **Aggregation:** Calculates total company annual payroll using `employees.reduce((acc, curr) => acc + curr.getAnnualSalary(), 0)`.

### Question 7: Login Form Validation using RegExp (`q7.js` & `q7.html`)
- **RegExp Validations:**
  - `Username`: `/^.{5,}$/` (&ge; 5 characters)
  - `Password`: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/` (&ge; 8 characters with lowercase, uppercase, number, and special character)
- **Feedback:** Displays green success banner on pass; presents a granular list of failed criteria if any check fails.

### Question 8: Dynamic Object Updater (`q8.js` & `q8.html`)
- **Initial Object:** `const user = { name: "John", email: "john@mail.com", age: 21 };`
- **Dynamic Sync:** Form pre-populated with these values; upon submit (`event.preventDefault()`), mutates the in-memory `user` object and re-renders both a formatted `<pre>` and visual profile card.

### Question 9: Shopping Cart Total & Coupons (`q9.js` & `q9.html`)
- **Class:** `Cart` managing internal `items` array.
- **Methods:**
  - `addItem(name, price, quantity)`
  - `getTotal()`: Computes total sum (`price * quantity`).
  - `applyCoupon(couponCode)`: Validates promo code using `/^(SAVE|DISC)(\d{1,2})$/` (e.g., `SAVE20`, `DISC10`), extracts the discount percentage dynamically from capture group 2, and returns the discounted total.

---
**Verified locally on:** Linux x86_64 | Node.js v22.23.3

