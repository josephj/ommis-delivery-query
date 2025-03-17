/**
 * OMMIS Delivery Query Embed Script
 *
 * This script allows website owners to embed the OMMIS delivery query tool
 * directly into their websites without redirecting users to a different page.
 *
 * Usage:
 * 1. Include this script in your HTML
 * 2. Add a container element with the ID "ommis-delivery-query"
 * 3. The tool will be embedded as an iframe in that container
 */

(function () {
  // Configuration
  const OMMIS_URL = "https://ommis.netlify.app/";
  const DEFAULT_HEIGHT = "600px";
  const DEFAULT_WIDTH = "100%";

  // Create and insert the iframe when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Find the container element
    const container = document.getElementById("ommis-delivery-query");
    if (!container) {
      console.error(
        "OMMIS Embed Error: No element with ID 'ommis-delivery-query' found"
      );
      return;
    }

    // Create the iframe
    const iframe = document.createElement("iframe");
    iframe.src = OMMIS_URL;
    iframe.style.width = DEFAULT_WIDTH;
    iframe.style.height = DEFAULT_HEIGHT;
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("title", "OMMIS Delivery Query");
    iframe.setAttribute("loading", "lazy");

    // Add the iframe to the container
    container.appendChild(iframe);

    // Listen for messages from the iframe to adjust height
    window.addEventListener("message", function (event) {
      // Verify the message origin for security
      if (event.origin !== new URL(OMMIS_URL).origin) return;

      // Check if the message is a height update
      if (event.data && event.data.type === "ommis-height-update") {
        iframe.style.height = event.data.height + "px";
      }
    });

    // Handle window resize events
    window.addEventListener("resize", function () {
      // Notify the iframe that the parent has been resized
      iframe.contentWindow.postMessage(
        { type: "ommis-parent-resize" },
        OMMIS_URL
      );
    });
  });
})();
