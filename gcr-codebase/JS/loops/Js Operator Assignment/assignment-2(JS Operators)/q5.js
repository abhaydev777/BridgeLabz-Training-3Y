/**
 * Assignment 2 - JavaScript Operators
 * Student Name: Abhay Pratap Singh
 * 
 * Question 5: Boolean Logic Access System
 * Demonstrates logical operators (&&, ||, !) to evaluate system security state.
 */

// Function to evaluate security status using logical operators
function checkSystemStatus(scenarioName, isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Primary condition: Access/System is "Secure" only when all 4 conditions are met
  const isSecure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;

  // Demonstrating negation (!) and disjunction (||) to detect system vulnerabilities
  const hasVulnerability = !isAlarmOn || !isDoorLocked || !isWindowClosed || !isOwnerInside;

  // Final evaluation using ternary and boolean checks
  const systemStatus = (!hasVulnerability && isSecure) ? "Secure" : "Unsafe";

  console.log(`--- ${scenarioName} ---`);
  console.log(`Status Sensors:`);
  console.log(`  - Door Locked   : ${isDoorLocked}`);
  console.log(`  - Window Closed : ${isWindowClosed}`);
  console.log(`  - Alarm Armed   : ${isAlarmOn}`);
  console.log(`  - Owner Inside  : ${isOwnerInside}`);
  console.log(`Evaluation: [${systemStatus}]`);

  // Provide details on breach or safety
  if (systemStatus === "Secure") {
    console.log(`Detail: All safety checks passed. System is fully protected.\n`);
  } else {
    const issues = [];
    if (!isAlarmOn) issues.push("Alarm is OFF");
    if (!isDoorLocked) issues.push("Door is UNLOCKED");
    if (!isWindowClosed) issues.push("Window is OPEN");
    if (!isOwnerInside) issues.push("Owner is NOT inside");
    console.log(`Detail: Security breach detected -> ${issues.join(", ")}\n`);
  }

  return systemStatus;
}

console.log("==========================================");
console.log("    BOOLEAN LOGIC ACCESS CONTROL SYSTEM   ");
console.log("==========================================\n");

// Scenario 1: All conditions met (Secure)
checkSystemStatus("Scenario 1: All Secure", true, true, true, true);

// Scenario 2: Door left open (Unsafe)
checkSystemStatus("Scenario 2: Door Open", false, true, true, true);

// Scenario 3: Alarm disabled (Unsafe)
checkSystemStatus("Scenario 3: Alarm Disabled", true, true, false, true);

// Scenario 4: Owner is outside (Unsafe)
checkSystemStatus("Scenario 4: Owner Outside", true, true, true, false);

console.log("==========================================\n");

