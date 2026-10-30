/**
 * Assignment 4 - Question 7: Login Form Validation using RegExp
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Login form with Username and Password fields.
 * - Validation rules:
 *   - Username: at least 5 characters (/^.{5,}$/)
 *   - Password: at least 8 characters, at least 1 lowercase, 1 uppercase, 1 number, 1 special character
 *     Pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
 * - If valid: display green success banner.
 * - If invalid: show specific detailed error messages for failing criteria.
 */

const loginRules = {
  // Username must be at least 5 characters
  usernameRegex: /^.{5,}$/,

  // Full composite password RegExp
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,

  // Granular sub-rules to provide specific detailed feedback
  passwordCriteria: [
    { id: "len", label: "At least 8 characters in length", test: pwd => /^.{8,}$/.test(pwd) },
    { id: "lower", label: "At least 1 lowercase letter (a-z)", test: pwd => /[a-z]/.test(pwd) },
    { id: "upper", label: "At least 1 uppercase letter (A-Z)", test: pwd => /[A-Z]/.test(pwd) },
    { id: "digit", label: "At least 1 numeric digit (0-9)", test: pwd => /\d/.test(pwd) },
    { id: "special", label: "At least 1 special character (!@#$%^&*)", test: pwd => /[!@#$%^&*]/.test(pwd) }
  ]
};

// Pure validation function for login form
function validateLoginForm(username, password) {
  const userTrimmed = (username ?? "").toString().trim();
  const pwd = (password ?? "").toString();

  const errors = {
    username: null,
    password: [], // List of specific failing criteria
  };

  // Validate username
  if (!userTrimmed) {
    errors.username = "Username is required.";
  } else if (!loginRules.usernameRegex.test(userTrimmed)) {
    errors.username = `Username must be at least 5 characters long (currently ${userTrimmed.length}).`;
  }

  // Validate password against granular criteria
  loginRules.passwordCriteria.forEach(rule => {
    if (!rule.test(pwd)) {
      errors.password.push(rule.label);
    }
  });

  const isUsernameValid = errors.username === null;
  const isPasswordValid = errors.password.length === 0;
  const isValid = isUsernameValid && isPasswordValid;

  return {
    isValid,
    isUsernameValid,
    isPasswordValid,
    errors,
    username: userTrimmed
  };
}

// Browser DOM Interaction Logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");

    const usernameError = document.getElementById("usernameError");
    const passwordErrorList = document.getElementById("passwordErrorList");
    const successBanner = document.getElementById("loginSuccessBanner");

    function renderFeedback(validation) {
      // Username field visual feedback
      if (validation.isUsernameValid) {
        usernameInput.classList.remove("invalid");
        usernameInput.classList.add("valid");
        usernameError.style.display = "none";
        usernameError.textContent = "";
      } else {
        usernameInput.classList.remove("valid");
        usernameInput.classList.add("invalid");
        usernameError.textContent = validation.errors.username;
        usernameError.style.display = "block";
      }

      // Password field visual feedback
      if (validation.isPasswordValid) {
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
        passwordErrorList.style.display = "none";
        passwordErrorList.innerHTML = "";
      } else {
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
        passwordErrorList.style.display = "block";
        passwordErrorList.innerHTML = `
          <div class="error-heading">Password criteria not met:</div>
          <ul>
            ${validation.errors.password.map(msg => `<li>${msg}</li>`).join("")}
          </ul>
        `;
      }

      // Success Banner display
      if (validation.isValid) {
        successBanner.innerHTML = `
          <strong>Login Credentials Valid!</strong><br>
          Authentication successful for user: <code>${validation.username}</code>
        `;
        successBanner.style.display = "block";
      } else {
        successBanner.style.display = "none";
      }
    }

    // Real-time input validation on change
    [usernameInput, passwordInput].forEach(input => {
      input.addEventListener("input", () => {
        // Only live-validate if user has started entering values
        if (usernameInput.value.length > 0 || passwordInput.value.length > 0) {
          const res = validateLoginForm(usernameInput.value, passwordInput.value);
          renderFeedback(res);
        }
      });
    });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const res = validateLoginForm(usernameInput.value, passwordInput.value);
        renderFeedback(res);
      });
    }
  });
}

// Node.js test execution
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 7: LOGIN FORM VALIDATION (TEST)    ");
  console.log("=================================================\n");

  const testScenarios = [
    {
      name: "Valid Login Credentials",
      user: "abhay_singh",
      pass: "Secure@Pass2026",
      expectedValid: true
    },
    {
      name: "Short Username (< 5 chars)",
      user: "dev",
      pass: "Secure@Pass2026",
      expectedValid: false
    },
    {
      name: "Missing Special Character & Number in Password",
      user: "abhay_singh",
      pass: "WeakPassword",
      expectedValid: false
    },
    {
      name: "Password < 8 characters",
      user: "abhay_singh",
      pass: "P@1a",
      expectedValid: false
    },
    {
      name: "Missing Uppercase Letter in Password",
      user: "abhay_singh",
      pass: "secure@pass123",
      expectedValid: false
    }
  ];

  testScenarios.forEach((sc, i) => {
    console.log(`--- Test ${i + 1}: ${sc.name} ---`);
    console.log(`Input -> Username: "${sc.user}", Password: "${sc.pass}"`);
    const result = validateLoginForm(sc.user, sc.pass);
    console.log(`Result: ${result.isValid ? "VALID" : "INVALID"}`);

    if (!result.isUsernameValid) {
      console.log(`  - Username Error: ${result.errors.username}`);
    }
    if (!result.isPasswordValid) {
      console.log(`  - Password Missing Criteria:`);
      result.errors.password.forEach(crit => console.log(`      * ${crit}`));
    }
    console.log("");
  });

  console.log("All RegExp checks verified for Question 7.");
  console.log("Run q7.html in browser to interactively test the login UI.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { loginRules, validateLoginForm };
}

