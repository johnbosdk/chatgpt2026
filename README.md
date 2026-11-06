# Luxaura-style storefront

A responsive static storefront starter. This repository now includes a build step that obfuscates the browser JavaScript before deployment.

## Files

- `index.html`, `styles.css`, `script.js`: readable source files
- `build.js`: creates the deployable `dist/` directory
- `package.json`: installs `javascript-obfuscator`
- `dist/script.obfuscated.js`: generated during build; not committed

## Build locally

Use Node.js 18 or newer:

```bash
npm install
npm run build
```

The generated static website is in `dist/`. Test it locally by serving that folder, for example:

```bash
npx serve dist
```

The generated `index.html` loads `script.obfuscated.js` instead of the readable `script.js`.

## DigitalOcean App Platform

Do not point the production app at this branch until it has been tested. For a separate staging app, connect this repository and select the `javascript-protection` branch, then configure:

- **Component type:** Static Site
- **Build command:** `npm install && npm run build`
- **Output directory:** `dist`
- **Source directory:** repository root

Deploy the staging app and test navigation, product filters, wishlist, shopping bag, quantity controls, newsletter form and mobile layout. Keep the existing production app on its current branch until staging passes.

## Important security limitation

JavaScript running in a browser can always be downloaded and inspected by visitors. Obfuscation makes the code harder to read, but it does not make it secret or provide strong source-code protection. Never put API keys, passwords, private credentials, payment secrets or sensitive business rules in browser JavaScript. Move those to a server-side service.

## Storefront limitations

This is a demo storefront. The cart and wishlist run in the browser; checkout does not process payments, and the newsletter form does not send or store email addresses. Connect trusted backend services before accepting real orders or customer data.
