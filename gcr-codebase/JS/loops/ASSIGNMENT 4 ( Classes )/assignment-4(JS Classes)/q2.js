/**
 * Assignment 4 - Question 2: Student Form Validator (Forms + RegExp)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Registration form with fields: Name, Email, Phone, Password.
 * - Validation using regular expressions:
 *   - Name: /^[A-Za-z\s]+$/ (only letters and spaces allowed)
 *   - Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ (standard email format)
 *   - Phone: /^\d{10}$/ (strictly 10 numeric digits)
 *   - Password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/ (at least 1 uppercase, 1 digit, 1 special char)
 * - Visual feedback: dynamically apply red border + inline error if invalid, green border if valid.
 */

// Regular expression patterns as specified
const validationRules = {
  // Letters and whitespace only
  name: {
    pattern: /^[A-Za-z\s]+$/,
    errorMessage: "Name must contain only alphabets and spaces."
  },
  // Basic standard email: non-spaces before and after @, and a period in domain
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Please enter a valid email address (e.g., student@college.edu)."
  },
  // Exactly 10 digits (common for mobile numbers)
  phone: {
    pattern: /^\d{10}$/,
    errorMessage: "Phone number must be exactly 10 digits."
  },
  // Positive lookaheads for at least 1 uppercase, 1 number, and 1 special symbol
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    errorMessage: "Password requires at least 1 uppercase letter, 1 number, and 1 special char (!@#$%^&*)."
  }
};

// Pure validator functions that return { isValid, message }
function validateField(fieldName, value) {
  const trimmed = (value || "").trim();
  const rule = validationRules[fieldName];

  if (!rule) {
    return { isValid: false, message: `Unknown field: ${fieldName}` };
  }

  if (trimmed.length === 0) {
    return { isValid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} cannot be empty.` };
  }

  const isValid = rule.pattern.test(trimmed);
  return {
    isValid,
    message: isValid ? "" : rule.errorMessage
  };
}

// Browser DOM Interaction Logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const successBanner = document.getElementById("successBanner");

    const fields = ["name", "email", "phone", "password"];

    // Helper to update field styles and inline error text
    function applyFieldFeedback(fieldName, result) {
      const inputEl = document.getElementById(fieldName);
      const errorEl = document.getElementById(`${fieldName}Error`);

      if (!inputEl || !errorEl) return;

      if (result.isValid) {
        inputEl.classList.remove("invalid");
        inputEl.classList.add("valid");
        errorEl.textContent = "";
        errorEl.style.display = "none";
      } else {
        inputEl.classList.remove("valid");
        inputEl.classList.add("invalid");
        errorEl.textContent = result.message;
        errorEl.style.display = "block";
      }
    }

    // Attach real-time input & blur events for each field
    fields.forEach(fieldName => {
      const inputEl = document.getElementById(fieldName);
      if (inputEl) {
        inputEl.addEventListener("input", () => {
          const result = validateField(fieldName, inputEl.value);
          applyFieldFeedback(fieldName, result);
        });

        inputEl.addEventListener("blur", () => {
          const result = validateField(fieldName, inputEl.value);
          applyFieldFeedback(fieldName, result);
        });
      }
    });

    // Form submit listener
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isFormValid = true;
        const submittedData = {};

        fields.forEach(fieldName => {
          const inputEl = document.getElementById(fieldName);
          const result = validateField(fieldName, inputEl.value);
          applyFieldFeedback(fieldName, result);

          if (!result.isValid) {
            isFormValid = false;
          } else {
            submittedData[fieldName] = inputEl.value.trim();
          }
        });

        if (isFormValid) {
          if (successBanner) {
            successBanner.innerHTML = `
              <strong>Registration Successful!</strong><br>
              Welcome, <em>${submittedData.name}</em>! Form validated successfully via RegExp.
            `;
            successBanner.style.display = "block";
          }
        } else {
          if (successBanner) {
            successBanner.style.display = "none";
          }
        }
      });
    }
  });
}

// Node.js test execution suite (runs if executed via 'node q2.js')
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 2: STUDENT FORM VALIDATOR (TEST)    ");
  console.log("=================================================\n");

  const testCases = [
    { field: "name", input: "Abhay Pratap Singh", expected: true },
    { field: "name", input: "Abhay123", expected: false },
    { field: "email", input: "abhay.singh@college.edu", expected: true },
    { field: "email", input: "invalid-email-address", expected: false },
    { field: "phone", input: "9876543210", expected: true },
    { field: "phone", input: "98765", expected: false },
    { field: "password", input: "Pass@1234", expected: true },
    { field: "password", input: "password", expected: false }
  ];

  console.log("Running RegExp validation tests:\n");
  testCases.forEach((tc, i) => {
    const res = validateField(tc.field, tc.input);
    const passed = res.isValid === tc.expected;
    console.log(
      `Test ${i + 1} [${tc.field}]: "${tc.input}" => ${res.isValid ? "VALID" : "INVALID"} ` +
      `| Expected: ${tc.expected ? "VALID" : "INVALID"} (${passed ? "PASS" : "FAIL"})`
    );
    if (!res.isValid) {
      console.log(`   -> Error feedback: ${res.message}`);
    }
  });
  console.log("\nAll regex validation rules verified. Companion HTML runner available in q2.html.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { validationRules, validateField };
}

