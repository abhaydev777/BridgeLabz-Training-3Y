/**
 * Assignment 8 - OOPS with JS
 * Question 7: Banking Application (Private Class Fields)
 * Author: Abhay Pratap Singh
 *
 * OOP Concept - Encapsulation & Private Class Fields:
 * - ES2022 introduced hard-private fields denoted with the `#` prefix (e.g., `#balance`).
 * - Unlike conventional underscore prefixes (_balance) which were merely naming conventions,
 *   `#` fields provide genuine encapsulation enforced at the JavaScript engine level.
 * - Outside code cannot read or overwrite `#balance` directly. State mutations are restricted
 *   to controlled public methods (`deposit`, `withdraw`), preserving class invariants and data integrity.
 */

class BankAccount {
  // Private class field declaration
  #balance;

  constructor(accountHolder, initialDeposit = 0) {
    this.accountHolder = accountHolder;

    if (typeof initialDeposit !== "number" || Number.isNaN(initialDeposit) || initialDeposit < 0) {
      throw new Error("Initial deposit must be a non-negative number.");
    }

    this.#balance = initialDeposit;
  }

  // Deposits money into the account after validating the amount
  deposit(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
      throw new Error(`Invalid deposit amount (${amount}). Amount must be greater than zero.`);
    }

    this.#balance += amount;
    return this.#balance;
  }

  // Withdraws money from the account with overdraft protection
  withdraw(amount) {
    if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
      throw new Error(`Invalid withdrawal amount (${amount}). Amount must be greater than zero.`);
    }

    if (amount > this.#balance) {
      throw new Error(
        `Insufficient balance! Attempted withdrawal: Rs. ${amount.toFixed(2)}, Available Balance: Rs. ${this.#balance.toFixed(2)}.`
      );
    }

    this.#balance -= amount;
    return this.#balance;
  }

  // Public getter method to safely read the current balance
  getBalance() {
    return this.#balance;
  }

  // Formats account summary
  getStatement() {
    return `Account Holder: ${this.accountHolder} | Current Balance: Rs. ${this.#balance.toFixed(2)}`;
  }
}

console.log("==================================================");
console.log("    QUESTION 7: BANKING APP (PRIVATE FIELDS)      ");
console.log("==================================================\n");

// Helper function to safely execute banking transactions
function performTransaction(actionName, transactionFn) {
  try {
    transactionFn();
    console.log(`✓ ${actionName} succeeded.`);
  } catch (error) {
    console.log(`✗ ${actionName} failed: ${error.message}`);
  }
}

// 1. Initializing account
const myAccount = new BankAccount("Abhay Pratap Singh", 5000);
console.log("Account Created:");
console.log(myAccount.getStatement());
console.log("--------------------------------------------------\n");

// 2. Valid Deposit
performTransaction("Deposit of Rs. 2,500", () => {
  myAccount.deposit(2500);
  console.log(`  Updated Balance: Rs. ${myAccount.getBalance().toFixed(2)}`);
});

// 3. Valid Withdrawal
performTransaction("Withdrawal of Rs. 1,800", () => {
  myAccount.withdraw(1800);
  console.log(`  Updated Balance: Rs. ${myAccount.getBalance().toFixed(2)}`);
});

// 4. Invalid Overdraft Withdrawal (amount > #balance)
console.log("\n--- Testing Overdraft Protection ---");
performTransaction("Overdraft Withdrawal of Rs. 10,000", () => {
  myAccount.withdraw(10000);
});

// 5. Invalid Input Validation (Negative deposit)
console.log("\n--- Testing Invalid Input Validation ---");
performTransaction("Negative Deposit of Rs. -500", () => {
  myAccount.deposit(-500);
});

// 6. Invalid Input Validation (Zero/Negative withdrawal)
performTransaction("Zero Withdrawal of Rs. 0", () => {
  myAccount.withdraw(0);
});

// 7. Demonstrating Private Field Encapsulation
console.log("\n--- Encapsulation Inspection ---");
console.log("Attempting direct access to 'myAccount.balance' (public property):", myAccount.balance); // undefined
console.log("Current balance retrieved via getBalance() public method  : Rs.", myAccount.getBalance());

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BankAccount };
}

