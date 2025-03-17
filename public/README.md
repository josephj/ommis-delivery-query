# OMMIS Delivery & Pickup Embed System

This directory contains the files for the OMMIS Delivery & Pickup embed system, which allows website owners to easily embed the OMMIS delivery and pickup widget into their websites.

## Files

- `config.js` - Configuration file containing all configurable parameters
- `embed.js` - Main embed script that creates and manages the iframe
- `embed.html` - Demo page showing the embed code and a preview

## How It Works

The embed system works by:

1. Creating a container div with the class `ommis-delivery-pickup-embed`
2. Loading the embed script which creates an iframe inside the container
3. The iframe loads the OMMIS application
4. The script handles communication between the iframe and the parent page for resizing

## Maintenance Guide

### Updating the Base URL

If you need to change the URL of the OMMIS application:

1. Edit the `BASE_URL` property in `config.js`
2. Update the script URL in the embed code in `embed.html`

### Changing the Container Class

If you need to change the container class:

1. Edit the `CONTAINER_CLASS` property in `config.js`
2. Update the div class in the embed code in `embed.html`

### Modifying the Embed Script

If you need to modify the embed script functionality:

1. Make changes to `embed.js`
2. Use the modular functions to keep the code organized
3. Add any new configuration parameters to `config.js`

### Testing Changes

After making changes:

1. Open `embed.html` in a browser to test the embed
2. Check that the preview works correctly
3. Copy the embed code and test it on a separate page

## Embed Code

The embed code is designed to be as simple as possible for website owners to implement:

```html
<!-- OMMIS Delivery & Pickup Widget Embed Code -->
<div
  class="ommis-delivery-pickup-embed"
  style="width: 100%; overflow: hidden;"
></div>
<script type="text/javascript">
  (function (d) {
    // Create script element
    var s = d.createElement("script");
    s.src = "https://ommis.netlify.app/embed.js";
    s.id = "ommis-delivery-pickup-embed-js";
    s.async = true;

    // Append to document
    (d.head || d.body).appendChild(s);
  })(document);
</script>
```

## Advanced Configuration

For advanced users who want to customize the embed, they can include their own `config.js` file before loading the embed script to override the default configuration.
