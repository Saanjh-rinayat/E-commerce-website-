// Page-specific JavaScript functions

// Home page initialization
function initHomePage() {
  renderFeaturedProducts();
  renderCategories();
  setupSearch();
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  
  const featured = productsData.filter(p => p.popularity >= 90).slice(0, 8);
  container.innerHTML = '';
  featured.forEach(product => renderProductCard(product, container));
}

function renderCategories() {
  const container = document.getElementById('categories');
  if (!container) return;
  
  container.innerHTML = '';
  categoriesData.forEach(category => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'category-card';
    categoryEl.innerHTML = `
      <div class="category-icon">${category.icon}</div>
      <h3>${category.name}</h3>
    `;
    categoryEl.onclick = () => {
      window.location.href = `product-listing.html?category=${category.id}`;
    };
    container.appendChild(categoryEl);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  const performSearch = () => {
    const query = searchInput ? searchInput.value.trim() : '';
    if (query) {
      window.location.href = `product-listing.html?search=${encodeURIComponent(query)}`;
    }
  };
  
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
}

// Product listing page initialization
function initProductListing() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'all';
  const searchQuery = urlParams.get('search') || '';
  
  setupFilters();
  setupSorting();
  setupSearchOnListing();
  
  if (searchQuery) {
    document.getElementById('search-input-listing')?.setAttribute('value', searchQuery);
  }
  
  filterAndRenderProducts(category, searchQuery);
}

function filterAndRenderProducts(category = 'all', searchQuery = '') {
  let filtered = [...productsData];
  
  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
  
  // Apply filters
  const priceMin = parseFloat(document.getElementById('price-min')?.value) || 0;
  const priceMax = parseFloat(document.getElementById('price-max')?.value) || 999999;
  filtered = filtered.filter(p => p.price >= priceMin && p.price <= priceMax);
  
  const ratingFilter = document.getElementById('rating-filter')?.value;
  if (ratingFilter) {
    filtered = filtered.filter(p => p.rating >= parseFloat(ratingFilter));
  }
  
  const availabilityFilter = document.getElementById('availability-filter')?.value;
  if (availabilityFilter === 'in-stock') {
    filtered = filtered.filter(p => p.inStock);
  } else if (availabilityFilter === 'out-of-stock') {
    filtered = filtered.filter(p => !p.inStock);
  }
  
  const categoryFilter = document.getElementById('category-filter')?.value;
  if (categoryFilter && categoryFilter !== 'all') {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }
  
  // Apply sorting
  const sortBy = document.getElementById('sort-by')?.value || 'popularity';
  sortProducts(filtered, sortBy);
  
  // Render products
  renderProductList(filtered);
  
  // Update results count
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) {
    resultsCount.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;
  }
}

function sortProducts(products, sortBy) {
  switch (sortBy) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      products.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'newest':
      products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
  }
}

function renderProductList(products) {
  const container = document.getElementById('products-grid');
  if (!container) return;
  
  if (products.length === 0) {
    container.innerHTML = '<div class="no-products"><p>No products found matching your criteria.</p></div>';
    return;
  }
  
  container.innerHTML = '';
  products.forEach(product => renderProductCard(product, container));
}

function setupFilters() {
  const filterInputs = ['price-min', 'price-max', 'rating-filter', 'availability-filter', 'category-filter'];
  
  filterInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', () => {
        const urlParams = new URLSearchParams(window.location.search);
        filterAndRenderProducts(urlParams.get('category') || 'all', urlParams.get('search') || '');
      });
    }
  });
}

function setupSorting() {
  const sortSelect = document.getElementById('sort-by');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const urlParams = new URLSearchParams(window.location.search);
      filterAndRenderProducts(urlParams.get('category') || 'all', urlParams.get('search') || '');
    });
  }
}

function setupSearchOnListing() {
  const searchInput = document.getElementById('search-input-listing');
  const searchBtn = document.getElementById('search-btn-listing');
  
  const performSearch = () => {
    const query = searchInput ? searchInput.value.trim() : '';
    const urlParams = new URLSearchParams(window.location.search);
    if (query) {
      urlParams.set('search', query);
    } else {
      urlParams.delete('search');
    }
    window.location.search = urlParams.toString();
  };
  
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
}

// Cart page initialization
function initCartPage() {
  renderCart();
  setupCartActions();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  
  if (!container) return;
  
  if (App.cart.length === 0) {
    container.innerHTML = '<div class="empty-cart"><p>Your cart is empty!</p><a href="product-listing.html" class="btn btn-primary">Continue Shopping</a></div>';
    if (summary) summary.innerHTML = '';
    return;
  }
  
  container.innerHTML = '';
  App.cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-info">
        <h3 onclick="openProductDetails(${item.id})">${item.name}</h3>
        <p class="cart-item-category">${item.category}</p>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1}); renderCart();">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1}); renderCart();">+</button>
      </div>
      <div class="cart-item-total">
        ${formatCurrency(item.price * item.quantity)}
      </div>
      <div class="cart-item-actions">
        <button class="btn-icon" onclick="removeFromCart(${item.id}); renderCart();" title="Remove">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
    container.appendChild(cartItem);
  });
  
  // Render summary
  if (summary) {
    const totals = getCartTotal();
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatCurrency(totals.subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Tax (18%)</span>
        <span>${formatCurrency(totals.tax)}</span>
      </div>
      <div class="summary-row">
        <span>Discount (10%)</span>
        <span class="discount">-${formatCurrency(totals.discount)}</span>
      </div>
      <div class="summary-row total-row">
        <span>Total</span>
        <span>${formatCurrency(totals.total)}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>
    `;
  }
}

function setupCartActions() {
  window.updateCartQuantity = updateCartQuantity;
  window.removeFromCart = removeFromCart;
}

// Checkout page initialization
function initCheckoutPage() {
  if (App.cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }
  
  renderCheckoutSummary();
  setupCheckoutForm();
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-summary');
  if (!container) return;
  
  container.innerHTML = `
    <h3>Order Summary</h3>
    <div class="checkout-items">
      ${App.cart.map(item => `
        <div class="checkout-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>Qty: ${item.quantity} × ${formatCurrency(item.price)}</p>
          </div>
          <span>${formatCurrency(item.price * item.quantity)}</span>
        </div>
      `).join('')}
    </div>
    ${(() => {
      const totals = getCartTotal();
      return `
        <div class="checkout-totals">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatCurrency(totals.subtotal)}</span>
          </div>
          <div class="summary-row">
            <span>Tax (18%)</span>
            <span>${formatCurrency(totals.tax)}</span>
          </div>
          <div class="summary-row">
            <span>Discount (10%)</span>
            <span class="discount">-${formatCurrency(totals.discount)}</span>
          </div>
          <div class="summary-row total-row">
            <span>Total</span>
            <span>${formatCurrency(totals.total)}</span>
          </div>
        </div>
      `;
    })()}
  `;
}

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateCheckoutForm()) {
      return;
    }
    
    // Process order
    const formData = new FormData(form);
    const totals = getCartTotal();
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toISOString(),
      items: [...App.cart],
      shipping: {
        name: formData.get('name'),
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        phone: formData.get('phone'),
        email: formData.get('email')
      },
      payment: {
        method: formData.get('payment-method'),
        status: 'confirmed'
      },
      total: totals.total
    };
    
    App.orders.push(order);
    App.cart = [];
    saveToStorage();
    updateCartCount();
    
    // Redirect to order summary
    window.location.href = `order-summary.html?id=${order.id}`;
  });
}

function validateCheckoutForm() {
  const form = document.getElementById('checkout-form');
  const fields = ['name', 'address', 'city', 'zip', 'phone', 'email'];
  let isValid = true;
  
  fields.forEach(field => {
    const input = form.querySelector(`[name="${field}"]`);
    const value = input.value.trim();
    const errorEl = input.parentElement.querySelector('.error-message');
    
    if (errorEl) errorEl.remove();
    
    if (!value) {
      showFieldError(input, 'This field is required');
      isValid = false;
    } else if (field === 'email' && !isValidEmail(value)) {
      showFieldError(input, 'Please enter a valid email');
      isValid = false;
    } else if (field === 'phone' && !isValidPhone(value)) {
      showFieldError(input, 'Please enter a valid phone number');
      isValid = false;
    } else if (field === 'zip' && !isValidZip(value)) {
      showFieldError(input, 'Please enter a valid ZIP code');
      isValid = false;
    }
  });
  
  const paymentMethod = form.querySelector('[name="payment-method"]:checked');
  if (!paymentMethod) {
    showToast('Please select a payment method', 'error');
    isValid = false;
  }
  
  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function isValidZip(zip) {
  return /^[0-9]{6}$/.test(zip);
}

function showFieldError(input, message) {
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  input.parentElement.appendChild(error);
  input.classList.add('error');
}

// Order summary page
function initOrderSummary() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('id');
  
  if (!orderId) {
    window.location.href = 'orders.html';
    return;
  }
  
  const order = App.orders.find(o => o.id === orderId);
  if (!order) {
    window.location.href = 'orders.html';
    return;
  }
  
  renderOrderSummary(order);
}

function renderOrderSummary(order) {
  const container = document.getElementById('order-summary-content');
  if (!container) return;
  
  const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  container.innerHTML = `
    <div class="order-success">
      <i class="fa fa-check-circle"></i>
      <h2>Order Placed Successfully!</h2>
      <p>Your order ID: <strong>${order.id}</strong></p>
      <p>Order Date: ${orderDate}</p>
    </div>
    
    <div class="order-details-section">
      <h3>Order Items</h3>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h4>${item.name}</h4>
              <p>Qty: ${item.quantity} × ${formatCurrency(item.price)}</p>
            </div>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="order-details-section">
      <h3>Delivery Address</h3>
      <div class="address-details">
        <p><strong>${order.shipping.name}</strong></p>
        <p>${order.shipping.address}</p>
        <p>${order.shipping.city} - ${order.shipping.zip}</p>
        <p>Phone: ${order.shipping.phone}</p>
        <p>Email: ${order.shipping.email}</p>
      </div>
    </div>
    
    <div class="order-details-section">
      <h3>Payment Information</h3>
      <div class="payment-details">
        <p><strong>Payment Method:</strong> ${order.payment.method}</p>
        <p><strong>Status:</strong> <span class="status-confirmed">${order.payment.status}</span></p>
      </div>
    </div>
    
    <div class="order-total">
      <h3>Total Amount</h3>
      <p class="total-price">${formatCurrency(order.total)}</p>
    </div>
    
    <div class="order-actions">
      <a href="orders.html" class="btn btn-secondary">View All Orders</a>
      <a href="product-listing.html" class="btn btn-primary">Continue Shopping</a>
    </div>
  `;
}

// Orders page initialization
function initOrdersPage() {
  renderOrders();
}

function renderOrders() {
  const container = document.getElementById('orders-list');
  if (!container) return;
  
  if (App.orders.length === 0) {
    container.innerHTML = '<div class="empty-orders"><p>You have no orders yet.</p><a href="product-listing.html" class="btn btn-primary">Start Shopping</a></div>';
    return;
  }
  
  // Sort orders by date (newest first)
  const sortedOrders = [...App.orders].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  container.innerHTML = '';
  sortedOrders.forEach(order => {
    const orderEl = document.createElement('div');
    orderEl.className = 'order-card';
    
    const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    orderEl.innerHTML = `
      <div class="order-header">
        <div>
          <h3>Order #${order.id}</h3>
          <p class="order-date">${orderDate}</p>
        </div>
        <div class="order-total-amount">
          ${formatCurrency(order.total)}
        </div>
      </div>
      <div class="order-items-preview">
        ${order.items.slice(0, 3).map(item => `
          <img src="${item.image}" alt="${item.name}" title="${item.name}">
        `).join('')}
        ${order.items.length > 3 ? `<span class="more-items">+${order.items.length - 3} more</span>` : ''}
      </div>
      <div class="order-footer">
        <span class="order-status">${order.payment.status}</span>
        <a href="order-summary.html?id=${order.id}" class="btn btn-secondary btn-sm">View Details</a>
      </div>
    `;
    
    container.appendChild(orderEl);
  });
}

// Auth page initialization
function initAuthPage() {
  setupAuthForms();
}

function setupAuthForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Simple validation
  if (!email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email', 'error');
    return;
  }
  
  // Simulate login (in real app, this would check with backend)
  App.currentUser = {
    name: email.split('@')[0],
    email: email
  };
  
  saveToStorage();
  showToast('Login successful!', 'success');
  
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
}

function handleSignup(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  
  // Validation
  if (!name || !email || !password || !confirmPassword) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email', 'error');
    return;
  }
  
  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  // Simulate signup
  App.currentUser = {
    name: name,
    email: email
  };
  
  saveToStorage();
  showToast('Account created successfully!', 'success');
  
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 1000);
}

function logout() {
  App.currentUser = null;
  localStorage.removeItem('currentUser');
  showToast('Logged out successfully', 'info');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Profile page
function initProfilePage() {
  if (!App.currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  renderProfile();
}

function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container) return;
  
  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">
        <i class="fa fa-user"></i>
      </div>
      <h2>${App.currentUser.name}</h2>
      <p>${App.currentUser.email}</p>
    </div>
    
    <div class="profile-stats">
      <div class="stat-card">
        <i class="fa fa-shopping-cart"></i>
        <h3>${App.orders.length}</h3>
        <p>Total Orders</p>
      </div>
      <div class="stat-card">
        <i class="fa fa-heart"></i>
        <h3>${App.wishlist.length}</h3>
        <p>Wishlist Items</p>
      </div>
    </div>
    
    <div class="profile-actions">
      <a href="orders.html" class="btn btn-secondary">My Orders</a>
      <a href="wishlist.html" class="btn btn-secondary">My Wishlist</a>
      <button onclick="logout()" class="btn btn-danger">Logout</button>
    </div>
  `;
  
  window.logout = logout;
}

// Wishlist page
function initWishlistPage() {
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlist-grid');
  if (!container) return;
  
  if (App.wishlist.length === 0) {
    container.innerHTML = '<div class="empty-wishlist"><p>Your wishlist is empty!</p><a href="product-listing.html" class="btn btn-primary">Start Shopping</a></div>';
    return;
  }
  
  container.innerHTML = '';
  App.wishlist.forEach(product => renderProductCard(product, container));
}

// Export functions for inline handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.logout = logout;
