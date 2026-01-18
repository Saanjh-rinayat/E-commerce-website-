// Product Data - Stored as static JSON in JavaScript
const productsData = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 2999,
    originalPrice: 4999,
    category: "Electronics",
    rating: 4.5,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500"
    ],
    inStock: true,
    stock: 45,
    description: "Premium wireless Bluetooth headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Noise Cancellation": "Active",
      "Weight": "250g",
      "Warranty": "1 year"
    },
    reviewsList: [
      { user: "John Doe", rating: 5, comment: "Amazing sound quality! Highly recommend.", date: "2024-01-15" },
      { user: "Jane Smith", rating: 4, comment: "Great headphones, comfortable for long use.", date: "2024-01-20" },
      { user: "Mike Johnson", rating: 5, comment: "Best purchase ever! Battery lasts forever.", date: "2024-02-01" }
    ],
    popularity: 95,
    dateAdded: "2024-01-01"
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    price: 15999,
    originalPrice: 19999,
    category: "Electronics",
    rating: 4.7,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"
    ],
    inStock: true,
    stock: 30,
    description: "Advanced smartwatch with health tracking, GPS, heart rate monitor, and 2-day battery life. Stay connected and healthy on the go.",
    specifications: {
      "Display": "1.9 inch AMOLED",
      "Battery": "2 days",
      "GPS": "Yes",
      "Heart Rate": "Continuous monitoring",
      "Water Resistance": "5ATM"
    },
    reviewsList: [
      { user: "Sarah Wilson", rating: 5, comment: "Love all the health features!", date: "2024-01-10" },
      { user: "Tom Brown", rating: 4, comment: "Great fitness tracker.", date: "2024-01-25" }
    ],
    popularity: 98,
    dateAdded: "2024-01-05"
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    price: 2499,
    originalPrice: 3999,
    category: "Accessories",
    rating: 4.3,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500"
    ],
    inStock: true,
    stock: 60,
    description: "Premium genuine leather laptop bag with multiple compartments, padded interior, and adjustable shoulder strap. Fits laptops up to 15.6 inches.",
    specifications: {
      "Material": "Genuine Leather",
      "Capacity": "Up to 15.6 inch laptop",
      "Compartments": "Multiple",
      "Warranty": "2 years"
    },
    reviewsList: [
      { user: "Alex Green", rating: 5, comment: "Beautiful and durable bag!", date: "2024-01-18" },
      { user: "Emma Davis", rating: 4, comment: "Perfect size for my laptop.", date: "2024-02-05" }
    ],
    popularity: 75,
    dateAdded: "2024-01-12"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 899,
    originalPrice: 1499,
    category: "Electronics",
    rating: 4.2,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
    ],
    inStock: true,
    stock: 150,
    description: "Ergonomic wireless mouse with 2.4GHz connection, 12-month battery life, and precision tracking. Perfect for work and gaming.",
    specifications: {
      "Connectivity": "2.4GHz wireless",
      "Battery": "12 months",
      "DPI": "1600",
      "Buttons": "3"
    },
    reviewsList: [
      { user: "Chris Lee", rating: 4, comment: "Good value for money.", date: "2024-01-22" }
    ],
    popularity: 88,
    dateAdded: "2024-01-08"
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    price: 599,
    originalPrice: 999,
    category: "Clothing",
    rating: 4.4,
    reviews: 3400,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500"
    ],
    inStock: true,
    stock: 200,
    description: "100% premium cotton t-shirt with modern fit. Available in multiple colors. Comfortable for everyday wear.",
    specifications: {
      "Material": "100% Cotton",
      "Care": "Machine washable",
      "Fit": "Regular",
      "Sizes": "S, M, L, XL"
    },
    reviewsList: [
      { user: "Lisa Anderson", rating: 5, comment: "Super comfortable!", date: "2024-01-14" },
      { user: "Robert Taylor", rating: 4, comment: "Great quality cotton.", date: "2024-01-28" }
    ],
    popularity: 92,
    dateAdded: "2024-01-03"
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 3999,
    originalPrice: 5999,
    category: "Clothing",
    rating: 4.6,
    reviews: 2800,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    ],
    inStock: true,
    stock: 55,
    description: "Premium running shoes with cushioned sole, breathable mesh upper, and excellent traction. Perfect for jogging and workouts.",
    specifications: {
      "Type": "Running shoes",
      "Cushioning": "High",
      "Breathability": "Mesh upper",
      "Sizes": "6-12"
    },
    reviewsList: [
      { user: "Mark White", rating: 5, comment: "Best running shoes I've owned!", date: "2024-01-16" },
      { user: "Anna Martinez", rating: 4, comment: "Very comfortable for long runs.", date: "2024-02-03" }
    ],
    popularity: 94,
    dateAdded: "2024-01-06"
  },
  {
    id: 7,
    name: "Portable Power Bank",
    price: 1299,
    originalPrice: 1999,
    category: "Electronics",
    rating: 4.3,
    reviews: 1800,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=500",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c8?w=500"
    ],
    inStock: true,
    stock: 100,
    description: "20000mAh power bank with fast charging, dual USB ports, and LED indicator. Charge your devices on the go.",
    specifications: {
      "Capacity": "20000mAh",
      "Ports": "Dual USB",
      "Fast Charging": "Yes",
      "Weight": "350g"
    },
    reviewsList: [
      { user: "David Clark", rating: 4, comment: "Charges fast and lasts long.", date: "2024-01-19" }
    ],
    popularity: 82,
    dateAdded: "2024-01-11"
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 799,
    originalPrice: 1299,
    category: "Accessories",
    rating: 4.5,
    reviews: 1650,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    ],
    inStock: true,
    stock: 120,
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    specifications: {
      "Capacity": "750ml",
      "Material": "Stainless Steel",
      "Insulation": "Double wall",
      "BPA Free": "Yes"
    },
    reviewsList: [
      { user: "Nancy Garcia", rating: 5, comment: "Keeps water cold all day!", date: "2024-01-21" }
    ],
    popularity: 79,
    dateAdded: "2024-01-09"
  },
  {
    id: 9,
    name: "Backpack - Day Pack",
    price: 1899,
    originalPrice: 2999,
    category: "Accessories",
    rating: 4.4,
    reviews: 1900,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    ],
    inStock: true,
    stock: 80,
    description: "Durable day pack with multiple compartments, water bottle holder, and padded straps. Perfect for hiking and travel.",
    specifications: {
      "Capacity": "30L",
      "Material": "Nylon",
      "Compartments": "Multiple",
      "Water Resistant": "Yes"
    },
    reviewsList: [
      { user: "Paul Harris", rating: 4, comment: "Great backpack for hiking!", date: "2024-01-17" }
    ],
    popularity: 85,
    dateAdded: "2024-01-07"
  },
  {
    id: 10,
    name: "Gaming Keyboard",
    price: 3499,
    originalPrice: 4999,
    category: "Electronics",
    rating: 4.6,
    reviews: 2400,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    ],
    inStock: false,
    stock: 0,
    description: "Mechanical gaming keyboard with RGB backlighting, programmable keys, and tactile switches. Built for gamers.",
    specifications: {
      "Type": "Mechanical",
      "Backlight": "RGB",
      "Keys": "104",
      "Switches": "Tactile"
    },
    reviewsList: [
      { user: "Kevin Moore", rating: 5, comment: "Amazing for gaming!", date: "2024-01-13" }
    ],
    popularity: 91,
    dateAdded: "2024-01-04"
  },
  {
    id: 11,
    name: "Sunglasses - Classic",
    price: 1499,
    originalPrice: 2499,
    category: "Accessories",
    rating: 4.3,
    reviews: 1100,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    ],
    inStock: true,
    stock: 70,
    description: "Classic aviator sunglasses with UV400 protection, polarized lenses, and lightweight frame. Style and protection combined.",
    specifications: {
      "UV Protection": "UV400",
      "Lens": "Polarized",
      "Material": "Plastic frame",
      "Warranty": "1 year"
    },
    reviewsList: [
      { user: "Michelle Young", rating: 4, comment: "Good quality sunglasses.", date: "2024-01-26" }
    ],
    popularity: 72,
    dateAdded: "2024-01-15"
  },
  {
    id: 12,
    name: "Jeans - Slim Fit",
    price: 1999,
    originalPrice: 3499,
    category: "Clothing",
    rating: 4.5,
    reviews: 2900,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    ],
    inStock: true,
    stock: 90,
    description: "Premium denim jeans with slim fit, stretch fabric, and modern wash. Perfect for casual and semi-formal occasions.",
    specifications: {
      "Fit": "Slim",
      "Material": "98% Cotton, 2% Elastane",
      "Wash": "Regular",
      "Sizes": "28-40"
    },
    reviewsList: [
      { user: "Steven King", rating: 5, comment: "Perfect fit and quality!", date: "2024-01-23" },
      { user: "Julia Lopez", rating: 4, comment: "Great jeans, very comfortable.", date: "2024-02-04" }
    ],
    popularity: 89,
    dateAdded: "2024-01-02"
  }
];

// Categories data
const categoriesData = [
  { id: "all", name: "All Products", icon: "📦" },
  { id: "Electronics", name: "Electronics", icon: "⚡" },
  { id: "Clothing", name: "Clothing", icon: "👕" },
  { id: "Accessories", name: "Accessories", icon: "👜" }
];
