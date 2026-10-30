/**
 * Assignment 6: Question 8
 * Order Processing Flow: Async Retry Mechanism
 * Author: Abhay Pratap Singh
 */

/**
 * Simulates submitting an order to a payment gateway with a 50% failure rate.
 * @param {number} orderId - Unique order identifier
 * @returns {Promise<object>}
 */
function submitOrder(orderId) {
  return new Promise((resolve, reject) => {
    // 500ms simulated processing delay
    setTimeout(() => {
      const isSuccess = Math.random() >= 0.5; // 50% chance of success / failure

      if (isSuccess) {
        resolve({ orderId, status: "Confirmed", authorizationCode: "AUTH-8921X" });
      } else {
        reject(new Error("Payment Gateway Timeout (504)"));
      }
    }, 500);
  });
}

/**
 * Retries order submission up to 3 times before throwing an exhaustion error.
 * @param {number} orderId
 */
async function processOrder(orderId) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await submitOrder(orderId);
      console.log(`Attempt ${attempt}: Success`);
      console.log(`-> Order #${response.orderId} processed successfully with auth: ${response.authorizationCode}`);
      return response;
    } catch (error) {
      console.log(`Attempt ${attempt}: Failed`);

      if (attempt === maxAttempts) {
        // All retry attempts exhausted
        throw new Error("Order could not be processed");
      }
    }
  }
}

/**
 * Top-level invocation wrapper demonstrating graceful error handling
 * without unhandled promise rejections.
 */
async function main() {
  const targetOrderId = 1042;
  console.log(`=== Starting Order Processing Workflow for Order #${targetOrderId} ===`);

  try {
    await processOrder(targetOrderId);
    console.log("=== Result: Transaction Successfully Settled ===");
  } catch (exhaustionError) {
    console.error(`\n[CRITICAL ERROR] ${exhaustionError.message}`);
    console.error("Action Taken: Alerted transaction monitoring team and refunded temporary holds.");
  }
}

main();

