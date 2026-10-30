/**
 * Assignment 6: Question 1
 * The Startup Morning: Async Coffee Maker
 * Author: Abhay Pratap Singh
 */

// Step 1: Boiling water (takes 1-2 seconds)
function boilWater() {
  return new Promise((resolve, reject) => {
    console.log("Step 1: Boiling water...");
    const delay = Math.floor(Math.random() * 1000) + 1000; // 1000ms - 2000ms
    setTimeout(() => {
      // 15% chance of simulation failure (e.g., kettle malfunction)
      if (Math.random() < 0.15) {
        reject(new Error("Kettle failed! Water could not be boiled."));
      } else {
        console.log("-> Water boiled successfully.");
        resolve("Boiled Water");
      }
    }, delay);
  });
}

// Step 2: Brewing coffee (takes 1-2 seconds)
function brewCoffee(water) {
  return new Promise((resolve, reject) => {
    console.log(`Step 2: Brewing coffee with ${water}...`);
    const delay = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(() => {
      // 15% chance of simulation failure (e.g., grinder jam)
      if (Math.random() < 0.15) {
        reject(new Error("Coffee grinder jammed! Brewing interrupted."));
      } else {
        console.log("-> Coffee brewed rich and dark.");
        resolve("Freshly Brewed Coffee");
      }
    }, delay);
  });
}

// Step 3: Pouring coffee into a cup (takes 1-2 seconds)
function pourInCup(coffee) {
  return new Promise((resolve, reject) => {
    console.log(`Step 3: Pouring ${coffee} into a cup...`);
    const delay = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(() => {
      // 15% chance of simulation failure (e.g., cup knocked over)
      if (Math.random() < 0.15) {
        reject(new Error("Cup slipped! Coffee spilled."));
      } else {
        console.log("-> Coffee poured neatly into mug.");
        resolve("Hot Mug of Coffee");
      }
    }, delay);
  });
}

// Chaining the coffee preparation steps with .then() and .catch()
console.log("=== Starting Coffee Maker Pipeline ===");

boilWater()
  .then((water) => {
    return brewCoffee(water);
  })
  .then((coffee) => {
    return pourInCup(coffee);
  })
  .then((cup) => {
    console.log(`Result: ${cup}`);
    console.log("Coffee ready for the team!");
  })
  .catch((error) => {
    console.error(`Pipeline Error: ${error.message}`);
    console.log("Failed to make coffee. Please reset the machine and try again.");
  });

