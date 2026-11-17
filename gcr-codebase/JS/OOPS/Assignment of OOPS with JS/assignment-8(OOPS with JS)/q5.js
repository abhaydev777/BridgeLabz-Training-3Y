/**
 * Assignment 8 - OOPS with JS
 * Question 5: Ride-Sharing Application
 * Author: Abhay Pratap Singh
 *
 * Concepts Demonstrated:
 * - Class inheritance with `extends` and `super()` (`Driver` inherits from `User`).
 * - Encapsulation of ride details and business logic within the `Trip` class.
 * - Defensive parameter validation with descriptive `Error` throwing and `try...catch` handling.
 */

// Base Class: User
class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating; // Rating out of 5
  }

  getProfile() {
    return `${this.name} (${this.rating.toFixed(1)} ★)`;
  }
}

// Subclass: Driver extending User with vehicle information
class Driver extends User {
  constructor(name, rating, vehicleDetails) {
    super(name, rating);
    this.vehicleDetails = vehicleDetails;
  }

  getDriverDetails() {
    return `Driver: ${this.name} | Rating: ${this.rating.toFixed(1)} ★ | Vehicle: ${this.vehicleDetails}`;
  }
}

// Class: Trip representing a journey booking
class Trip {
  constructor(fromLocation, toLocation, distance, passenger = null, driver = null) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance; // Distance in kilometers
    this.passenger = passenger;
    this.driver = driver;
  }

  // Calculates fare based on base fare and per-km rate with strict distance validation
  calculateFare(baseFare = 50, perKmRate = 14) {
    // Check for missing or null value
    if (this.distance === undefined || this.distance === null) {
      throw new Error("Trip distance cannot be empty or undefined.");
    }

    // Check for non-numeric type or NaN
    if (typeof this.distance !== "number" || Number.isNaN(this.distance)) {
      throw new Error(`Invalid distance type "${this.distance}". Distance must be a numeric value.`);
    }

    // Check for non-positive distance (<= 0)
    if (this.distance <= 0) {
      throw new Error(`Invalid distance (${this.distance} km). Distance must be greater than zero.`);
    }

    return baseFare + this.distance * perKmRate;
  }

  // Formatted summary of the trip
  getSummary() {
    const fare = this.calculateFare();
    let details = `Route      : ${this.fromLocation} -> ${this.toLocation}\n` +
                  `Distance   : ${this.distance} km\n` +
                  `Total Fare : Rs. ${fare.toFixed(2)}`;
    if (this.passenger) details += `\nPassenger  : ${this.passenger.getProfile()}`;
    if (this.driver) details += `\n${this.driver.getDriverDetails()}`;
    return details;
  }
}

console.log("========================================");
console.log("    QUESTION 5: RIDE-SHARING APP        ");
console.log("========================================\n");

// Instantiating users and drivers
const rider1 = new User("Aarav Mehta", 4.8);
const driver1 = new Driver("Suresh Kumar", 4.9, "Hyundai Aura (DL 01 AB 4321)");

// Helper to execute and safely handle trip fare calculations
function processTrip(label, trip) {
  console.log(`--- ${label} ---`);
  try {
    const fare = trip.calculateFare();
    console.log(trip.getSummary());
    console.log(`Status     : ✓ Fare calculated successfully (Rs. ${fare.toFixed(2)})\n`);
  } catch (error) {
    console.log(`Route      : ${trip.fromLocation} -> ${trip.toLocation}`);
    console.log(`Distance   : ${trip.distance}`);
    console.log(`Status     : ✗ Calculation Error - ${error.message}\n`);
  }
}

// 1. Valid Trips
const validTrip1 = new Trip("Connaught Place", "Indira Gandhi Airport (T3)", 18.5, rider1, driver1);
processTrip("Trip 1 (Valid Short Distance)", validTrip1);

const validTrip2 = new Trip("Sector 62, Noida", "Cyber City, Gurugram", 42.0);
processTrip("Trip 2 (Valid Long Distance)", validTrip2);

// 2. Invalid Trips (Testing defensive error validation branches)
const negativeDistanceTrip = new Trip("Hauz Khas", "Saket", -6.5);
processTrip("Trip 3 (Invalid: Negative Distance)", negativeDistanceTrip);

const zeroDistanceTrip = new Trip("Chandni Chowk", "Red Fort", 0);
processTrip("Trip 4 (Invalid: Zero Distance)", zeroDistanceTrip);

const stringDistanceTrip = new Trip("Karol Bagh", "Rajouri Garden", "twelve-km");
processTrip("Trip 5 (Invalid: Non-numeric Distance)", stringDistanceTrip);

const missingDistanceTrip = new Trip("Janakpuri", "Dwarka", null);
processTrip("Trip 6 (Invalid: Null Distance)", missingDistanceTrip);

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { User, Driver, Trip };
}

