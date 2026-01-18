// Main Application JavaScript

// Global state
const App = {
  cart: [],
  wishlist: [],
  orders: [],
  currentUser: null,
  theme: 'light'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  initializeTheme();
  initializeNavigation();
  
  // Initialize page-specific functionality
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    initHomePage();
  } else if (page === 'product-listing.html') {
    initProductListing();
  } else if (page === 'cart.html') {
    initCartPage();
  } else if (page === 'checkout.html') {
    initCheckoutPage();
  } else if (page === 'order-summary.html') {
    initOrderSummary();
  } else if (page === 'orders.html') {
    initOrdersPage();
  } else if (page === 'wishlist.html') {
    initWishlistPage();
  } else if (page === 'profile.html') {
    initProfilePage();
  } else if (page === 'login.html') {
    initAuthPage();
  }
  
  updateCartCount();
  updateWishlistCount();
});

// Load data from localStorage
function loadFromStorage() {
  const savedCart = localStorage.getItem('cart');
  const savedWishlist = localStorage.getItem('wishlist');
  const savedOrders = localStorage.getItem('orders');
  const savedUser = localStorage.getItem('currentUser');
  const savedTheme = localStorage.getItem('theme');
  
  App.cart = savedCart ? JSON.parse(savedCart) : [];
  App.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  App.orders = savedOrders ? JSON.parse(savedOrders) : [];
  App.currentUser = savedUser ? JSON.parse(savedUser) : null;
  App.theme = savedTheme || 'light';
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(App.cart));
  localStorage.setItem('wishlist', JSON.stringify(App.wishlist));
  localStorage.setItem('orders', JSON.stringify(App.orders));
  if (App.currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(App.currentUser));
  }
  localStorage.setItem('theme', App.theme);
}

// Theme management
function initializeTheme() {
  document.documentElement.setAttribute('data-theme', App.theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  App.theme = App.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', App.theme);
  localStorage.setItem('theme', App.theme);
}

// Navigation
function initializeNavigation() {
  const currentUser = App.currentUser;
  const userMenu = document.getElementById('user-menu');
  const loginBtn = document.getElementById('login-btn');
  
  if (currentUser && userMenu) {
    userMenu.style.display = 'block';
    if (loginBtn) loginBtn.style.display = 'none';
    const userName = userMenu.querySelector('.user-name');
    if (userName) userName.textContent = currentUser.name;
  } else if (userMenu && loginBtn) {
    userMenu.style.display = 'none';
    loginBtn.style.display = 'block';
  }
}

// Show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Loading animation
function showLoading() {
  const loader = document.createElement('div');
  loader.id = 'loading-overlay';
  loader.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loader);
}

function hideLoading() {
  const loader = document.getElementById('loading-overlay');
  if (loader) loader.remove();
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Cart functions
function addToCart(product, quantity = 1) {
  const existingItem = App.cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    App.cart.push({ ...product, quantity });
  }
  
  saveToStorage();
  updateCartCount();
  showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
  App.cart = App.cart.filter(item => item.id !== productId);
  saveToStorage();
  updateCartCount();
  showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
  const item = App.cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveToStorage();
    }
  }
}

function getCartTotal() {
  let subtotal = App.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const discount = subtotal * 0.1; // 10% discount
  const total = subtotal + tax - discount;
  
  return { subtotal, tax, discount, total };
}

function updateCartCount() {
  const count = App.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'block' : 'none';
  });
}

// Wishlist functions
function addToWishlist(product) {
  if (!App.wishlist.find(item => item.id === product.id)) {
    App.wishlist.push(product);
    saveToStorage();
    updateWishlistCount();
    showToast(`${product.name} added to wishlist!`, 'success');
    return true;
  }
  return false;
}

function removeFromWishlist(productId) {
  App.wishlist = App.wishlist.filter(item => item.id !== productId);
  saveToStorage();
  updateWishlistCount();
  showToast('Removed from wishlist', 'info');
}

function isInWishlist(productId) {
  return App.wishlist.some(item => item.id === productId);
}

function updateWishlistCount() {
  const count = App.wishlist.length;
  const wishlistCountElements = document.querySelectorAll('.wishlist-count');
  wishlistCountElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'block' : 'none';
  });
}

// Product card renderer
function renderProductCard(product, container) {
  const card = document.createElement('div');
  card.className = 'product-card';
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const inWishlist = isInWishlist(product.id);
  
  card.innerHTML = `
    <div class="product-image-container">
      ${!product.inStock ? '<span class="out-of-stock-badge">Out of Stock</span>' : ''}
      ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
      <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)">
        <i class="fa fa-heart"></i>
      </button>
      <img src="${product.image}" alt="${product.name}" onclick="openProductDetails(${product.id})">
    </div>
    <div class="product-info">
      <h3 class="product-name" onclick="openProductDetails(${product.id})">${product.name}</h3>
      <div class="product-rating">
        ${generateStars(product.rating)}
        <span>(${product.reviews})</span>
      </div>
      <div class="product-price">
        <span class="current-price">${formatCurrency(product.price)}</span>
        ${product.originalPrice > product.price ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
      </div>
      <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" onclick="handleAddToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  `;
  
  container.appendChild(card);
}

function generateStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fa fa-star-half-o"></i>';
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    stars += '<i class="fa fa-star-o"></i>';
  }
  
  return stars;
}

function toggleWishlist(productId, event) {
  event.stopPropagation();
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    if (event.target.closest('.wishlist-btn')) {
      event.target.closest('.wishlist-btn').classList.remove('active');
    }
  } else {
    addToWishlist(product);
    if (event.target.closest('.wishlist-btn')) {
      event.target.closest('.wishlist-btn').classList.add('active');
    }
  }
}

function openProductDetails(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  const modal = document.createElement('div');
  modal.className = 'modal product-details-modal';
  modal.innerHTML = `
    <div class="modal-content product-details-content">
      <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
      <div class="product-details-container">
        <div class="product-details-images">
          <img id="main-product-image" src="${product.images[0]}" alt="${product.name}">
          <div class="product-thumbnails">
            ${product.images.map((img, idx) => 
              `<img src="${img}" alt="Thumbnail ${idx + 1}" onclick="changeMainImage('${img}')" class="${idx === 0 ? 'active' : ''}">`
            ).join('')}
          </div>
        </div>
        <div class="product-details-info">
          <h1>${product.name}</h1>
          <div class="product-rating">
            ${generateStars(product.rating)}
            <span>${product.rating} (${product.reviews} reviews)</span>
          </div>
          <div class="product-price">
            <span class="current-price">${formatCurrency(product.price)}</span>
            ${product.originalPrice > product.price ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
          </div>
          <p class="product-description">${product.description}</p>
          <div class="stock-status">
            ${product.inStock ? `<span class="in-stock">✓ In Stock (${product.stock} available)</span>` : '<span class="out-of-stock">✗ Out of Stock</span>'}
          </div>
          <div class="product-specifications">
            <h3>Specifications</h3>
            <table>
              ${Object.entries(product.specifications).map(([key, value]) => 
                `<tr><td>${key}</td><td>${value}</td></tr>`
              ).join('')}
            </table>
          </div>
          <div class="product-actions">
            <button class="btn btn-secondary" onclick="toggleWishlistInModal(${product.id})">
              <i class="fa fa-heart${isInWishlist(product.id) ? '' : '-o'}"></i> 
              ${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button class="btn btn-primary" onclick="handleAddToCart(${product.id}); this.closest('.modal').remove();" ${!product.inStock ? 'disabled' : ''}>
              ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          <div class="product-reviews-section">
            <h3>Customer Reviews</h3>
            ${product.reviewsList.map(review => `
              <div class="review-item">
                <div class="review-header">
                  <strong>${review.user}</strong>
                  <div class="review-rating">${generateStars(review.rating)}</div>
                  <span class="review-date">${review.date}</span>
                </div>
                <p>${review.comment}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'flex';
}

function changeMainImage(src) {
  const mainImg = document.getElementById('main-product-image');
  if (mainImg) {
    mainImg.src = src;
    document.querySelectorAll('.product-thumbnails img').forEach(img => {
      img.classList.remove('active');
      if (img.src === src || img.getAttribute('src') === src) {
        img.classList.add('active');
      }
    });
  }
}

function toggleWishlistInModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
  } else {
    addToWishlist(product);
  }
  
  // Reload modal
  const modal = document.querySelector('.product-details-modal');
  if (modal) {
    const productIdNum = parseInt(productId);
    modal.remove();
    openProductDetails(productIdNum);
  }
}

// Helper function for add to cart button
function handleAddToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (product) {
    addToCart(product);
  }
}

// Export functions for inline handlers
window.addToCart = addToCart;
window.handleAddToCart = handleAddToCart;
window.openProductDetails = openProductDetails;
window.toggleWishlist = toggleWishlist;
window.changeMainImage = changeMainImage;
window.toggleWishlistInModal = toggleWishlistInModal;
