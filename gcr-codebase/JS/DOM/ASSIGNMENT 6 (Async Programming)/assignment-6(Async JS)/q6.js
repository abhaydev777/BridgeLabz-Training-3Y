/**
 * Assignment 6: Question 6
 * E-Commerce Dashboard: Product Card Fetcher
 * Author: Abhay Pratap Singh
 */

const API_URL = "https://fakestoreapi.com/products";

/**
 * Fetches products from the Fake Store API using async/await,
 * logs their details to the console, and dynamically creates
 * UI cards if running in a browser environment.
 */
async function fetchAndDisplayProducts() {
  const isBrowser = typeof document !== "undefined";
  const gridContainer = isBrowser ? document.getElementById("productGrid") : null;
  const statusMessage = isBrowser ? document.getElementById("statusMessage") : null;

  try {
    if (isBrowser && statusMessage) {
      statusMessage.textContent = "Loading products...";
      statusMessage.className = "status loading";
    }

    console.log("Fetching products from Fake Store API...");
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const products = await response.json();

    console.log(`\nSuccessfully fetched ${products.length} products:\n`);

    // Log each product to console as specified
    products.forEach((product, index) => {
      console.log(`--- [Product #${index + 1}] ---`);
      console.log(`Product: ${product.title}`);
      console.log(`Price: $${Number(product.price).toFixed(2)}`);
      console.log(`Image: ${product.image}\n`);
    });

    // Bonus DOM Rendering (if running in a browser)
    if (isBrowser && gridContainer) {
      gridContainer.innerHTML = ""; // Clear existing cards or placeholder

      if (statusMessage) {
        statusMessage.style.display = "none";
      }

      products.forEach((product) => {
        // Create product card element
        const card = document.createElement("div");
        card.className = "product-card";

        // Image container with image element
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "card-image-wrap";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.loading = "lazy";
        imgWrapper.appendChild(img);

        // Product category badge
        const categoryBadge = document.createElement("span");
        categoryBadge.className = "product-category";
        categoryBadge.textContent = product.category || "General";

        // Product title
        const title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = product.title;
        title.title = product.title;

        // Product price
        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = `$${Number(product.price).toFixed(2)}`;

        // Assemble card
        card.appendChild(imgWrapper);
        card.appendChild(categoryBadge);
        card.appendChild(title);
        card.appendChild(price);

        // Append to dashboard grid
        gridContainer.appendChild(card);
      });
    }

    return products;
  } catch (error) {
    // Explicit error message requirement
    console.error("Failed to load products. Please try again.");
    console.error(`Reason: ${error.message}`);

    if (isBrowser && statusMessage) {
      statusMessage.textContent = "Failed to load products. Please try again.";
      statusMessage.className = "status error";
      statusMessage.style.display = "block";
    }
  }
}

// Automatically execute fetch
fetchAndDisplayProducts();

// Export for module/test environments if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { fetchAndDisplayProducts };
}

