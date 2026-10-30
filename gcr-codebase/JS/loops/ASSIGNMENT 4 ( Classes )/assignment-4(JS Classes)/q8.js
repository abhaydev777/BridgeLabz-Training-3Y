/**
 * Assignment 4 - Question 8: Dynamic Object Updater
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Initialize object: const user = { name: "John", email: "john@mail.com", age: 21 };
 * - Form pre-populated with these initial values.
 * - On submit (event.preventDefault()), update the user object in real time with the new field values.
 * - Display updated object details below the form in the DOM (card / formatted <pre>).
 */

// Initial state object as specified in the assignment
const user = {
  name: "John",
  email: "john@mail.com",
  age: 21
};

// Function to update user object in-place
function updateUser(targetUser, updatedFields) {
  if (updatedFields.name !== undefined) {
    targetUser.name = updatedFields.name.trim();
  }
  if (updatedFields.email !== undefined) {
    targetUser.email = updatedFields.email.trim();
  }
  if (updatedFields.age !== undefined) {
    targetUser.age = Number(updatedFields.age);
  }
  return targetUser;
}

// Browser DOM Interaction Logic
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userUpdateForm");
    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");
    const ageInput = document.getElementById("userAge");

    const objectPre = document.getElementById("objectDisplay");
    const profileCard = document.getElementById("profileCard");
    const updateTimeEl = document.getElementById("updateTimestamp");

    // 1. Pre-populate the form inputs with initial user values
    function populateForm() {
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
      if (ageInput) ageInput.value = user.age;
    }

    // 2. Render the updated object on DOM (both JSON and card view)
    function renderDisplay() {
      if (objectPre) {
        objectPre.textContent = JSON.stringify(user, null, 2);
      }

      if (profileCard) {
        profileCard.innerHTML = `
          <div class="user-avatar">${user.name.charAt(0).toUpperCase()}</div>
          <div class="user-meta">
            <h4>${user.name}</h4>
            <p>${user.email}</p>
            <span class="age-badge">${user.age} years old</span>
          </div>
        `;
      }

      if (updateTimeEl) {
        updateTimeEl.textContent = `Last modified: ${new Date().toLocaleTimeString()}`;
      }
    }

    // Initial load
    populateForm();
    renderDisplay();

    // 3. Form submission event listener
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop page reload

        // Read updated input values
        const newValues = {
          name: nameInput.value,
          email: emailInput.value,
          age: parseInt(ageInput.value, 10)
        };

        // Mutate the original user object
        updateUser(user, newValues);

        console.log("[Object Updated in Real Time]:", user);

        // Update DOM display
        renderDisplay();

        // Visual flash feedback
        const feedbackAlert = document.getElementById("updateNotification");
        if (feedbackAlert) {
          feedbackAlert.style.display = "block";
          setTimeout(() => {
            feedbackAlert.style.display = "none";
          }, 3000);
        }
      });
    }
  });
}

// Node.js verification execution
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 8: DYNAMIC OBJECT UPDATER (TEST)   ");
  console.log("=================================================\n");

  console.log("1. Initial user object:");
  console.log(user);

  console.log("\n2. Updating user object with new data...");
  const updatePayload = {
    name: "Abhay Pratap Singh",
    email: "abhay.singh@college.edu",
    age: 22
  };

  updateUser(user, updatePayload);

  console.log("\n3. Mutated user object after update:");
  console.log(user);

  console.log("\nObject mutation verified in memory.");
  console.log("Pre-populated dynamic form companion available in q8.html.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { user, updateUser };
}

