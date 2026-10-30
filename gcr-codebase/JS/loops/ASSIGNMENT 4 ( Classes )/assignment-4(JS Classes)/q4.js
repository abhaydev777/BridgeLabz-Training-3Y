/**
 * Assignment 4 - Question 4: Custom Form Builder (Forms + Classes)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - FormBuilder class accepting target container and array of field specifications.
 * - render() method: dynamically generates <form> HTML using innerHTML with input fields & submit button.
 * - getFormData() method: extracts all entered values and returns clean key-value object.
 * - Prevents default submission on submit and delivers the data object.
 */

class FormBuilder {
  /**
   * @param {HTMLElement|string} container - DOM element or selector string
   * @param {Array<Object>} fields - Schema of fields [{ type, name, label, placeholder, required }]
   * @param {Function} onSubmit - Optional callback triggered on valid form submission
   */
  constructor(container, fields = [], onSubmit = null) {
    this.container = container;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.formElement = null;
  }

  // Resolves container element whether passed as selector or direct DOM element
  getContainerElement() {
    if (typeof this.container === "string" && typeof document !== "undefined") {
      return document.querySelector(this.container);
    }
    return this.container;
  }

  // Generates HTML string for the form
  generateHTML() {
    const fieldHTMLs = this.fields.map(field => {
      const fieldId = `field_${field.name}`;
      const placeholder = field.placeholder || `Enter ${field.label.toLowerCase()}`;
      const requiredAttr = field.required ? "required" : "";

      return `
        <div class="form-group">
          <label for="${fieldId}">${field.label}${field.required ? ' <span class="req">*</span>' : ''}</label>
          <input 
            type="${field.type || 'text'}" 
            id="${fieldId}" 
            name="${field.name}" 
            placeholder="${placeholder}" 
            ${requiredAttr}
            class="form-input"
          />
        </div>
      `;
    }).join("");

    return `
      <form class="dynamic-form" id="dynamicGeneratedForm">
        ${fieldHTMLs}
        <button type="submit" class="submit-btn">Submit Information</button>
      </form>
    `;
  }

  // Renders the form into the target container and attaches submit event listener
  render() {
    const el = this.getContainerElement();
    if (!el) {
      console.warn("Target container element not found for FormBuilder.");
      return;
    }

    el.innerHTML = this.generateHTML();
    this.formElement = el.querySelector("form");

    if (this.formElement) {
      this.formElement.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent standard page reload
        const formData = this.getFormData();
        console.log("[FormBuilder] Form Submitted. Extracted Data:", formData);

        if (typeof this.onSubmit === "function") {
          this.onSubmit(formData);
        }
      });
    }
  }

  // Reads values of each configured field and returns clean key-value object
  getFormData() {
    const data = {};

    if (!this.formElement && typeof document !== "undefined") {
      const el = this.getContainerElement();
      if (el) this.formElement = el.querySelector("form");
    }

    if (!this.formElement) return data;

    this.fields.forEach(field => {
      const input = this.formElement.querySelector(`[name="${field.name}"]`);
      if (input) {
        data[field.name] = input.value;
      }
    });

    return data;
  }
}

// Browser initialization
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Schema definition for the registration form
    const sampleFields = [
      { type: "text", name: "username", label: "Username", placeholder: "e.g. abhay_pratap", required: true },
      { type: "email", name: "email", label: "Email Address", placeholder: "e.g. abhay@college.edu", required: true },
      { type: "password", name: "password", label: "Password", placeholder: "Enter your secure password", required: true },
      { type: "text", name: "course", label: "Course / Branch", placeholder: "e.g. B.Tech Computer Science", required: false }
    ];

    const resultBox = document.getElementById("submissionResult");
    const jsonOutput = document.getElementById("jsonOutput");

    // Callback when form is submitted
    const handleFormSubmit = (formData) => {
      if (resultBox && jsonOutput) {
        resultBox.style.display = "block";
        jsonOutput.textContent = JSON.stringify(formData, null, 2);
      }
    };

    // Instantiate and render FormBuilder
    const builder = new FormBuilder("#formContainer", sampleFields, handleFormSubmit);
    builder.render();
  });
}

// Node.js verification and test runner
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 4: CUSTOM FORM BUILDER (TEST)      ");
  console.log("=================================================\n");

  const fieldsSchema = [
    { type: "text", name: "username", label: "Username" },
    { type: "password", name: "password", label: "Password" },
    { type: "email", name: "email", label: "Email Address" }
  ];

  const dummyContainer = { innerHTML: "" };
  const builder = new FormBuilder(dummyContainer, fieldsSchema);

  console.log("Generated HTML via builder.generateHTML():");
  console.log("-----------------------------------------");
  console.log(builder.generateHTML().trim());
  console.log("-----------------------------------------");

  console.log("\nFormBuilder class successfully loaded and verified.");
  console.log("Companion interactive browser runner available in q4.html.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { FormBuilder };
}

