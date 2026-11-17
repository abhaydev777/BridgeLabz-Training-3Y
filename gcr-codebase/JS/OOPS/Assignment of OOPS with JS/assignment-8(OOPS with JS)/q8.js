/**
 * Assignment 8 - OOPS with JS
 * Question 8: Movie Ticket Booking System (Inheritance + Prototype Chain)
 * Author: Abhay Pratap Singh
 *
 * Prototype Chain Method Resolution:
 * When a method like `printTicket()` is called on an `OnlineTicket` instance:
 * 1. JavaScript searches own properties of the instance object (`onlineTicket`).
 * 2. It then inspects `OnlineTicket.prototype` (where subclass methods like `getTotalAmount` reside).
 * 3. Not finding it there, it moves up the chain to `MovieTicket.prototype` (parent class prototype),
 *    where `printTicket` is located, and executes it with `this` bound to the calling instance.
 * 4. This chain delegation (`OnlineTicket` -> `MovieTicket` -> `Object` -> `null`) is the foundation
 *    of prototypal inheritance in JavaScript classes.
 */

// Base Class: MovieTicket
class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

// Subclass: OnlineTicket extending MovieTicket
class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  // Method to calculate total price inclusive of platform booking fee
  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// Explicitly attaching printTicket() to the base class prototype
MovieTicket.prototype.printTicket = function () {
  console.log("----------------------------------------");
  console.log(`🎬 MOVIE TICKET: ${this.movieName}`);
  console.log(`Seat Number     : ${this.seatNo}`);
  console.log(`Base Price      : Rs. ${this.price.toFixed(2)}`);

  // Polymorphically checking if convenience fee exists on this instance
  if (typeof this.convenienceFee === "number") {
    console.log(`Convenience Fee : Rs. ${this.convenienceFee.toFixed(2)}`);
    console.log(`Total Payable   : Rs. ${this.getTotalAmount().toFixed(2)}`);
    console.log(`Ticket Type     : Online Digital Pass`);
  } else {
    console.log(`Total Payable   : Rs. ${this.price.toFixed(2)}`);
    console.log(`Ticket Type     : Counter Physical Ticket`);
  }
  console.log("----------------------------------------");
};

console.log("==================================================");
console.log("    QUESTION 8: MOVIE TICKET BOOKING SYSTEM       ");
console.log("==================================================\n");

// Instantiating online tickets (subclass objects)
const ticket1 = new OnlineTicket("Interstellar (IMAX)", "H-14", 450, 45);
const ticket2 = new OnlineTicket("Oppenheimer", "D-08", 320, 35);

// Instantiating a regular box-office ticket (base class object)
const regularTicket = new MovieTicket("Inception", "F-12", 250);

console.log("--- 1. Invoking printTicket() on OnlineTicket Instances ---");
// printTicket() is resolved through the prototype chain:
// ticket1 -> OnlineTicket.prototype -> MovieTicket.prototype
ticket1.printTicket();
console.log();
ticket2.printTicket();

console.log("\n--- 2. Invoking printTicket() on Base MovieTicket Instance ---");
regularTicket.printTicket();

// Demonstrating Prototype Chain Inspection
console.log("\n--- 3. Prototype Chain Diagnostics ---");
console.log("ticket1 has own property 'printTicket' :", ticket1.hasOwnProperty("printTicket")); // false
console.log("OnlineTicket.prototype has 'printTicket':", OnlineTicket.prototype.hasOwnProperty("printTicket")); // false
console.log("MovieTicket.prototype has 'printTicket' :", MovieTicket.prototype.hasOwnProperty("printTicket")); // true
console.log("ticket1 instanceof OnlineTicket         :", ticket1 instanceof OnlineTicket); // true
console.log("ticket1 instanceof MovieTicket          :", ticket1 instanceof MovieTicket); // true

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MovieTicket, OnlineTicket };
}

