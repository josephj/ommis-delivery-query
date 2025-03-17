/**
 * OMMIS Delivery Query Embed Configuration
 *
 * This file contains all configurable parameters for the OMMIS embed script.
 * Centralizing these values makes maintenance easier.
 */

const OMMIS_CONFIG = {
  // Base URL for the OMMIS application
  BASE_URL: "https://ommis.netlify.app/",

  // Default iframe dimensions
  DEFAULT_HEIGHT: "600px",
  DEFAULT_WIDTH: "100%",

  // CSS class for the container element
  CONTAINER_CLASS: "ommis-delivery-pickup-embed",

  // ID for the embed script
  SCRIPT_ID: "ommis-delivery-pickup-embed-js",

  // Messages for communication between iframe and parent
  MESSAGES: {
    HEIGHT_UPDATE: "ommis-height-update",
    PARENT_RESIZE: "ommis-parent-resize",
  },
};

// Make configuration available globally if this script is loaded directly
if (typeof window !== "undefined") {
  window.OMMIS_CONFIG = OMMIS_CONFIG;
}

// Support CommonJS and ES modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = OMMIS_CONFIG;
}
