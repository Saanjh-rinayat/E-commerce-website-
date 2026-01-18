# E-Commerce Website (Frontend Only)

A complete frontend-only e-commerce website built with HTML, CSS, and vanilla JavaScript. All product data is stored as static JSON in JavaScript files, and data persistence is handled using localStorage.

## Features

### 🏠 Homepage
- Featured products display
- Category navigation
- Hero banner
- Search functionality

### 📦 Product Listing
- Grid layout with product cards
- Product image, name, price, rating, discount badges
- "Add to Cart" button
- Advanced filtering:
  - Price range
  - Category
  - Rating
  - Availability (in stock/out of stock)
- Sorting options:
  - Price (low to high, high to low)
  - Popularity
  - Rating
  - Newest

### 🔍 Search & Filter
- Search products by name or category
- Real-time filtering
- Multiple filter combinations

### 🛒 Shopping Cart
- Add/remove items
- Increase/decrease quantity
- Real-time price calculation:
  - Subtotal
  - Tax (18% GST)
  - Discount (10%)
  - Total
- Cart data persists in localStorage

### ❤️ Wishlist
- Save favorite products
- Add/remove from wishlist
- Wishlist persists in localStorage

### 📋 Product Details
- Modal popup with full product information
- Multiple product images with thumbnail gallery
- Full description
- Specifications table
- Customer reviews
- Stock status
- Quick add to cart/wishlist

### 💳 Checkout
- Form validation (name, address, phone, email, ZIP)
- Payment method selection (COD, UPI, Card)
- Order summary display
- Real-time total calculation

### ✅ Order Management
- Order summary page after checkout
- Order ID generation
- Order history saved in localStorage
- View past orders
- Order details with delivery info

### 👤 User Account
- Login/Signup forms (frontend validation only)
- Profile page with statistics
- Logout functionality
- User data stored in localStorage

### 🎨 UI/UX Features
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Loading Animations**: Spinner for loading states
- **Toast Notifications**: Success, error, and info messages
- **Error Messages**: Form validation feedback
- **Smooth Animations**: Hover effects and transitions

## Project Structure

```
E-commerce/
├── index.html              # Homepage
├── product-listing.html    # Product listing page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── order-summary.html     # Order confirmation page
├── orders.html            # Order history page
├── login.html             # Login/Signup page
├── profile.html           # User profile page
├── wishlist.html          # Wishlist page
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── app.js            # Main application logic
│   └── pages.js          # Page-specific functions
└── data/
    └── products.js       # Product data (JSON)
```

## Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in a web browser
3. No build process or dependencies required!

## How to Use

### Adding Products
Edit `data/products.js` to add or modify products. Each product should have:
- `id`: Unique identifier
- `name`: Product name
- `price`: Current price
- `originalPrice`: Original price (for discount calculation)
- `category`: Product category
- `rating`: Rating (0-5)
- `reviews`: Number of reviews
- `image`: Main product image URL
- `images`: Array of product image URLs
- `inStock`: Boolean for stock status
- `stock`: Number of items in stock
- `description`: Product description
- `specifications`: Object with key-value pairs
- `reviewsList`: Array of review objects
- `popularity`: Popularity score (0-100)
- `dateAdded`: Date added (YYYY-MM-DD)

### Modifying Categories
Edit the `categoriesData` array in `data/products.js`.

## Browser Support

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- localStorage API

## Technical Details

- **No Backend**: All logic runs in the browser
- **No Database**: Data stored in JavaScript files and localStorage
- **No Frameworks**: Pure HTML, CSS, and JavaScript
- **No External Dependencies**: Only Font Awesome for icons (CDN)

## Data Persistence

All user data persists using localStorage:
- Shopping cart
- Wishlist
- Order history
- User account info
- Theme preference

## Notes

- This is a frontend-only demo project
- No actual payments are processed
- No backend validation (client-side only)
- Product images use Unsplash placeholder URLs
- Order IDs are generated using timestamps

## License

This project is open source and available for educational purposes.
