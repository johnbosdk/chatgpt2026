# Luxaura-style storefront starter

A responsive static storefront inspired by the visual structure of the referenced public page. It is a fresh implementation, not the original site's source code.

## Included
- Responsive navigation and editorial hero
- Collections, product cards, journal, newsletter and footer
- Working demo filters, wishlist counter, shopping bag and quantity controls
- No backend, customer database, email collection or payment processing

## Run locally
Open `index.html` in a browser. For a local web server, run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy to DigitalOcean App Platform
1. Create a GitHub repository and upload `index.html`, `styles.css`, `script.js`, and this README.
2. In DigitalOcean, choose **Create → App Platform**.
3. Connect the repository and select its `main` branch.
4. Select **Static Site**. Leave the output directory empty if the files are at the repository root.
5. Deploy and open the generated `ondigitalocean.app` URL.
6. Add a custom domain in App Platform settings if desired.

Official guide: https://docs.digitalocean.com/products/app-platform/getting-started/quickstart/

## DigitalOcean Spaces
You can upload image assets to Spaces and change the image URLs in `index.html` to your own public asset URLs. Keep API keys and private credentials out of frontend files.

## Before production
- Replace demo product copy and ensure you have permission to use all product imagery.
- Connect a real backend for inventory, accounts, order management and email subscriptions.
- Use a reputable payment provider's hosted checkout or server-side integration.
- Add privacy policy, terms, shipping/returns policies, accessibility checks and security headers.
- Never treat the demo cart as a secure order or payment system.
