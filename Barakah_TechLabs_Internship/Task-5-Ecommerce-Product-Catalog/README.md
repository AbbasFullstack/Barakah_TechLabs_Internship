# Task 5 — Frontend E-commerce Product Catalog

Responsive frontend e-commerce product catalog built for the Barakah TechLabs Frontend Web Developer internship.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- LocalStorage

## Features
- Responsive product catalog
- Product search
- Category filtering
- Sort by price: low to high
- Sort by price: high to low
- Add products to shopping cart
- Increase/decrease cart quantity
- Remove individual products
- Clear the entire cart
- View live cart total
- Cart persistence with browser LocalStorage
- Responsive slide-out shopping cart
- Empty states and user feedback
- Clean semantic HTML and accessible labels

## Folder
Barakah_TechLabs_Internship/Task-5-Ecommerce-Product-Catalog/

## Run locally
No build step is required. Open index.html in a browser, or serve the repository with a local development server:

~~~bash
python -m http.server 5500
~~~

Then open:
http://localhost:5500/Barakah_TechLabs_Internship/Task-5-Ecommerce-Product-Catalog/

## How the cart works
The cart is stored as JSON in LocalStorage under the key barakah_techlabs_task5_cart. Each cart entry contains a product ID and quantity. On page reload, the app restores the saved cart and recalculates the item count and total.

## Requirement mapping
| Requirement | Implementation |
|---|---|
| HTML, CSS, JavaScript | index.html, style.css, script.js |
| Product catalog | Responsive dynamic product grid |
| Filters | Product search + category filter |
| Sort by price | Low-to-high and high-to-low |
| Shopping Cart | Slide-out cart drawer |
| LocalStorage | Persistent cart state |
| Add to cart | Add button on every product |
| Remove from cart | Remove action in cart |
| View cart total | Live calculated total |
| Responsive design | Desktop, tablet, and mobile layouts |
| Clean UI | Modern responsive visual system |

## Notes
This is a frontend internship project. The checkout button is intentionally a demo action and does not process real payments. Product data is local JavaScript data and image URLs are used for presentation.
