/**
 * Assignment 4 - Question 5: Movie Ticket Booking (Objects + RegExp)
 * Student: Abhay Pratap Singh
 * 
 * Objectives:
 * - Form fields: Name, Email, Seats.
 * - Validate using regular expressions:
 *   - Name: Alphabets and spaces only (/^[A-Za-z\s]+$/)
 *   - Email: Valid email format (/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 *   - Seats: Integer from 1 to 10 only (/^([1-9]|10)$/)
 * - On valid submission: Create booking object { name, email, seats } and render a formatted ticket summary card.
 */

// RegExp validation patterns
const patterns = {
  name: /^[A-Za-z\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  seats: /^([1-9]|10)$/ // strictly 1 to 9, or 10
};

// Pure booking validator function
function validateBookingInput(name, email, seats) {
  const errors = {};
  const trimmedName = (name ?? "").toString().trim();
  const trimmedEmail = (email ?? "").toString().trim();
  const trimmedSeats = (seats ?? "").toString().trim();

  // Validate Name
  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (!patterns.name.test(trimmedName)) {
    errors.name = "Name must contain alphabets and spaces only.";
  }

  // Validate Email
  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!patterns.email.test(trimmedEmail)) {
    errors.email = "Please provide a valid email address.";
  }

  // Validate Seats
  if (!trimmedSeats) {
    errors.seats = "Number of seats is required.";
  } else if (!patterns.seats.test(trimmedSeats)) {
    errors.seats = "You can book between 1 and 10 seats only.";
  }

  const isValid = Object.keys(errors).length === 0;

  let booking = null;
  if (isValid) {
    const seatCount = parseInt(trimmedSeats, 10);
    const pricePerSeat = 15; // $15 per ticket
    booking = {
      bookingId: "TKT-" + Math.floor(100000 + Math.random() * 900000),
      name: trimmedName,
      email: trimmedEmail,
      seats: seatCount,
      pricePerSeat: pricePerSeat,
      totalAmount: seatCount * pricePerSeat,
      bookingTime: new Date().toLocaleString()
    };
  }

  return { isValid, errors, booking };
}

// Browser DOM Interaction
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("movieBookingForm");
    const ticketCard = document.getElementById("ticketSummaryCard");

    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");
    const seatsInput = document.getElementById("seatCount");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const seatsError = document.getElementById("seatsError");

    function clearErrors() {
      [nameError, emailError, seatsError].forEach(el => {
        el.textContent = "";
        el.style.display = "none";
      });
      [nameInput, emailInput, seatsInput].forEach(el => {
        el.classList.remove("invalid");
        el.classList.remove("valid");
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        const nameVal = nameInput.value;
        const emailVal = emailInput.value;
        const seatsVal = seatsInput.value;

        const result = validateBookingInput(nameVal, emailVal, seatsVal);

        if (!result.isValid) {
          // Display specific inline errors
          if (result.errors.name) {
            nameInput.classList.add("invalid");
            nameError.textContent = result.errors.name;
            nameError.style.display = "block";
          } else {
            nameInput.classList.add("valid");
          }

          if (result.errors.email) {
            emailInput.classList.add("invalid");
            emailError.textContent = result.errors.email;
            emailError.style.display = "block";
          } else {
            emailInput.classList.add("valid");
          }

          if (result.errors.seats) {
            seatsInput.classList.add("invalid");
            seatsError.textContent = result.errors.seats;
            seatsError.style.display = "block";
          } else {
            seatsInput.classList.add("valid");
          }

          if (ticketCard) ticketCard.style.display = "none";
          return;
        }

        // Mark all fields valid
        [nameInput, emailInput, seatsInput].forEach(el => el.classList.add("valid"));

        // Render formatted ticket summary card on DOM
        const b = result.booking;
        if (ticketCard) {
          ticketCard.innerHTML = `
            <div class="ticket-header">
              <span class="cinema-name">CINESTAR CINEMAS</span>
              <span class="booking-tag">CONFIRMED</span>
            </div>
            <div class="ticket-body">
              <h3 class="movie-title">Interstellar (IMAX 70mm Special)</h3>
              <div class="ticket-grid">
                <div>
                  <span class="label">Booking ID:</span>
                  <span class="value">${b.bookingId}</span>
                </div>
                <div>
                  <span class="label">Date & Time:</span>
                  <span class="value">${b.bookingTime}</span>
                </div>
                <div>
                  <span class="label">Guest Name:</span>
                  <span class="value">${b.name}</span>
                </div>
                <div>
                  <span class="label">Registered Email:</span>
                  <span class="value">${b.email}</span>
                </div>
                <div>
                  <span class="label">Seats Reserved:</span>
                  <span class="value">${b.seats} Seat(s)</span>
                </div>
                <div>
                  <span class="label">Total Amount:</span>
                  <span class="value total-price">$${b.totalAmount}.00 ($${b.pricePerSeat} / seat)</span>
                </div>
              </div>
            </div>
            <div class="ticket-footer">
              <div class="barcode">|||| | ||||| |||| || | |||| |||||| |||| |</div>
              <p>Please present this digital pass at the entrance counter.</p>
            </div>
          `;
          ticketCard.style.display = "block";
          ticketCard.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
}

// Node.js test execution
if (typeof window === "undefined") {
  console.log("=================================================");
  console.log("     QUESTION 5: MOVIE TICKET BOOKING (TEST)     ");
  console.log("=================================================\n");

  const testSubmissions = [
    { label: "Valid submission (3 seats)", name: "Abhay Pratap", email: "abhay@cinema.com", seats: 3 },
    { label: "Invalid Name with numbers", name: "Abhay123", email: "abhay@cinema.com", seats: 2 },
    { label: "Invalid Email format", name: "Abhay Pratap", email: "not-an-email", seats: 2 },
    { label: "Seats out of range (15 seats)", name: "Abhay Pratap", email: "abhay@cinema.com", seats: 15 },
    { label: "Seats zero (0 seats)", name: "Abhay Pratap", email: "abhay@cinema.com", seats: 0 },
    { label: "Valid boundary (10 seats)", name: "Abhay Pratap Singh", email: "abhay.singh@gmail.com", seats: 10 }
  ];

  testSubmissions.forEach((test, index) => {
    console.log(`--- Test Case ${index + 1}: ${test.label} ---`);
    const res = validateBookingInput(test.name, test.email, test.seats);
    if (res.isValid) {
      console.log("Validation: SUCCESS");
      console.log("Generated Ticket Object:", res.booking);
    } else {
      console.log("Validation: REJECTED with errors:", res.errors);
    }
    console.log("");
  });

  console.log("Movie Ticket Booking logic successfully tested.");
  console.log("Open q5.html in your browser to test the interactive ticket card.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { patterns, validateBookingInput };
}
