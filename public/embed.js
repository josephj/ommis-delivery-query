/**
 * OMMIS Delivery Query Embed Script
 *
 * This script allows website owners to embed the OMMIS delivery query tool
 * directly into their websites without redirecting users to a different page.
 *
 * Usage:
 * 1. Include the embed code in your HTML
 * 2. The tool will be embedded as an iframe in the specified container
 */

(function () {
  // Load configuration or use defaults if config.js is not included
  const config = window.OMMIS_CONFIG || {
    BASE_URL: "https://ommis.netlify.app/",
    DEFAULT_HEIGHT: "600px",
    DEFAULT_WIDTH: "100%",
    CONTAINER_CLASS: "ommis-delivery-pickup-embed",
    SCRIPT_ID: "ommis-delivery-pickup-embed-js",
    MESSAGES: {
      HEIGHT_UPDATE: "ommis-height-update",
      PARENT_RESIZE: "ommis-parent-resize",
    },
  };

  /**
   * Creates and configures the iframe element
   * @returns {HTMLIFrameElement} The configured iframe
   */
  function createIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = config.BASE_URL;
    iframe.style.width = config.DEFAULT_WIDTH;
    iframe.style.height = config.DEFAULT_HEIGHT;
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("title", "OMMIS Delivery Query");
    iframe.setAttribute("loading", "lazy");
    return iframe;
  }

  /**
   * Sets up message listeners for iframe resizing
   * @param {HTMLIFrameElement} iframe - The iframe element
   */
  function setupMessageListeners(iframe) {
    // Listen for height updates from the iframe
    window.addEventListener("message", function (event) {
      if (event.origin !== new URL(config.BASE_URL).origin) return;

      if (event.data && event.data.type === config.MESSAGES.HEIGHT_UPDATE) {
        iframe.style.height = event.data.height + "px";
      }
    });

    // Notify iframe when parent window resizes
    window.addEventListener("resize", function () {
      iframe.contentWindow.postMessage(
        { type: config.MESSAGES.PARENT_RESIZE },
        config.BASE_URL
      );
    });
  }

  /**
   * Initialize the embed
   */
  function init() {
    const container = document.querySelector("." + config.CONTAINER_CLASS);
    if (!container) {
      console.error(
        `OMMIS Embed Error: No element with class '${config.CONTAINER_CLASS}' found`
      );
      return;
    }

    const iframe = createIframe();
    container.appendChild(iframe);
    setupMessageListeners(iframe);
  }

  // Initialize when the page loads
  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();
