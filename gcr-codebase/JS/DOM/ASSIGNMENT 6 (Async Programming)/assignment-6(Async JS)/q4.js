/**
 * Assignment 6: Question 4
 * DevOps Delay: Async Timeout Race
 * Author: Abhay Pratap Singh
 */

/**
 * Simulates server deployment with a specified delay and random failure.
 * @param {string} serverName - Name of the server
 * @param {number} delayMs - Simulated response time in milliseconds
 * @returns {Promise<string>}
 */
function deployServer(serverName, delayMs) {
  return new Promise((resolve, reject) => {
    console.log(`[Deploying] ${serverName} initialized (latency: ${delayMs / 1000}s)...`);

    setTimeout(() => {
      // 15% probability of server deployment failure
      const isFailed = Math.random() < 0.15;

      if (isFailed) {
        reject(new Error(`Deployment failed on ${serverName}`));
      } else {
        resolve(serverName);
      }
    }, delayMs);
  });
}

console.log("=== Initiating DevOps Multi-Server Deployment ===");

// Server A takes 2 seconds; Server B takes 3 seconds
const serverA = deployServer("Server A", 2000);
const serverB = deployServer("Server B", 3000);

// Use Promise.race() to detect the fastest responding server
Promise.race([serverA, serverB])
  .then((fastest) => {
    console.log(`Fastest response: ${fastest}`);
  })
  .catch((err) => {
    console.error(`Promise.race caught failure: ${err.message}`);
  });

// Use Promise.all() to ensure all servers deploy successfully
Promise.all([serverA, serverB])
  .then((servers) => {
    console.log("Deployment completed for all servers");
    console.log(`Active server fleet: ${servers.join(", ")}`);
  })
  .catch((err) => {
    console.error(`Promise.all caught failure: ${err.message}`);
  });

