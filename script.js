/**
 * ===================================================================
 * AK PIZZA SHOP - COMPLETE JAVASCRIPT LOGIC WITH FULL UPI PAYMENT
 * Location: Meethapur, New Delhi - 110044
 * Phone / WhatsApp: +91 9971434599
 * Merchant UPI VPA: 9971434599@upi
 * ===================================================================
 */

// -------------------------------------------------------------------
// 1. MENU ITEMS DATA
// -------------------------------------------------------------------
const MENU_ITEMS = [
  // --- 8 PIZZAS ---
  {
    id: "p1",
    name: "Classic Margherita",
    category: "veg-pizza",
    isVeg: true,
    description: "Classic golden crust loaded with 100% mozzarella cheese, fresh basil leaves & tangy Italian tomato herb sauce.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 149,
      Medium: 269,
      Large: 429
    },
    defaultSize: "Medium"
  },
  {
    id: "p2",
    name: "Farmhouse Delight",
    category: "veg-pizza",
    isVeg: true,
    description: "Overloaded with fresh crisp capsicum, juicy red tomatoes, tender mushrooms and sweet golden corn over mozzarella.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 199,
      Medium: 349,
      Large: 529
    },
    defaultSize: "Medium"
  },
  {
    id: "p3",
    name: "Tandoori Paneer Tikka",
    category: "veg-pizza",
    isVeg: true,
    description: "Desi favorite! Spiced marinated paneer cubes, crunchy red onions, bell peppers with a smoky tandoori sauce swirl.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 229,
      Medium: 389,
      Large: 579
    },
    defaultSize: "Medium"
  },
  {
    id: "p4",
    name: "Peppy Paneer Burst",
    category: "veg-pizza",
    isVeg: true,
    description: "Chunky paneer, spicy red paprika, crisp capsicum and extra molten cheese for a fiery spicy kick.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 219,
      Medium: 369,
      Large: 549
    },
    defaultSize: "Medium"
  },
  {
    id: "p5",
    name: "Veggie Supreme",
    category: "veg-pizza",
    isVeg: true,
    description: "Black sliced olives, spicy jalapeños, sweet corn, mushrooms, red paprika and gooey mozzarella.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 239,
      Medium: 399,
      Large: 599
    },
    defaultSize: "Medium"
  },
  {
    id: "p6",
    name: "Chicken Tikka Feast",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Succulent tandoori chicken tikka pieces, rings of red onions, green capsicum & zesty Indian spices.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 249,
      Medium: 419,
      Large: 629
    },
    defaultSize: "Medium"
  },
  {
    id: "p7",
    name: "Smoky BBQ Chicken",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Tender chicken chunks tossed in hickory sweet barbecue sauce with caramelized red onions and cheddar-mozzarella blend.",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 259,
      Medium: 439,
      Large: 649
    },
    defaultSize: "Medium"
  },
  {
    id: "p8",
    name: "Classic Pepperoni",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Authentic spicy cured meat slices layered generously on melted mozzarella cheese and herb-rich marinara.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
    sizes: {
      Small: 269,
      Medium: 459,
      Large: 679
    },
    defaultSize: "Medium"
  },

  // --- 5 BURGERS ---
  {
    id: "b1",
    name: "Crispy Veggie Burger",
    category: "burgers",
    isVeg: true,
    description: "Golden crispy vegetable patty with creamy garlic mayo, fresh lettuce and sliced tomatoes in a toasted sesame bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    price: 89
  },
  {
    id: "b2",
    name: "Aloo Tikki Supreme",
    category: "burgers",
    isVeg: true,
    description: "Delhi's favorite spiced crunchy potato patty layered with sweet-tangy sauce, onion rings and melted cheese slice.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    price: 69
  },
  {
    id: "b3",
    name: "Paneer Makhani Burger",
    category: "burgers",
    isVeg: true,
    description: "Thick grilled paneer steak slathered with rich buttery makhani gravy and pickled red onion shreds.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    price: 139
  },
  {
    id: "b4",
    name: "Crispy Fried Chicken Burger",
    category: "burgers",
    isVeg: false,
    description: "Juicy buttermilk fried chicken fillet, spicy sriracha mayonnaise, pickles and crunchy iceberg lettuce.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80",
    price: 159
  },
  {
    id: "b5",
    name: "Double Cheese Chicken Burger",
    category: "burgers",
    isVeg: false,
    description: "Twin grilled chicken patties with double cheddar cheese slices, smoky sauce and caramelized onions.",
    image: "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?auto=format&fit=crop&w=600&q=80",
    price: 199
  },

  // --- 4 SIDES ---
  {
    id: "s1",
    name: "Stuffed Garlic Bread",
    category: "sides",
    isVeg: true,
    description: "Freshly baked artisan bread brushed with herb butter, stuffed with sweet corn, jalapeños and stringy mozzarella.",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=600&q=80",
    price: 139
  },
  {
    id: "s2",
    name: "Cheesy Loaded French Fries",
    category: "sides",
    isVeg: true,
    description: "Golden crispy potato fries generously smothered in hot cheddar cheese sauce and seasoned with herbs.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80",
    price: 119
  },
  {
    id: "s3",
    name: "Spicy Peri-Peri Fries",
    category: "sides",
    isVeg: true,
    description: "Hot crisp french fries tossed vigorously in our house peri-peri spice shaker. Pure crunchy addiction!",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    price: 99
  },
  {
    id: "s4",
    name: "Cheese Garlic Toast",
    category: "sides",
    isVeg: true,
    description: "Toasted crunchy baguette slices topped with roasted garlic butter, oregano flakes and golden melted cheese.",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80",
    price: 89
  },

  // --- 4 DRINKS ---
  {
    id: "d1",
    name: "Chilled Cold Coffee",
    category: "drinks",
    isVeg: true,
    description: "Creamy brewed espresso blended with chilled milk, vanilla syrup and topped with rich cocoa powder.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    price: 89
  },
  {
    id: "d2",
    name: "Masala Lemonade Soda",
    category: "drinks",
    isVeg: true,
    description: "Refreshing fizzy soda infused with fresh squeezed lemon juice, mint leaves, roasted cumin and black salt.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    price: 59
  },
  {
    id: "d3",
    name: "Thick Chocolate Milkshake",
    category: "drinks",
    isVeg: true,
    description: "Rich dark chocolate ganache whipped with rich milk and chocolate ice cream. Pure decadence.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    price: 99
  },
  {
    id: "d4",
    name: "Fresh Mint Mojito Cooler",
    category: "drinks",
    isVeg: true,
    description: "Muddled garden mint, tangy lime wedges, chilled soda and crushed ice. The ultimate pizza refresher.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    price: 79
  },

  // --- 3 DESSERTS ---
  {
    id: "ds1",
    name: "Choco Lava Cake",
    category: "desserts",
    isVeg: true,
    description: "Moist warm chocolate cake with a molten center of silky liquid chocolate that bursts with every spoon.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    price: 99
  },
  {
    id: "ds2",
    name: "Red Velvet Pastry",
    category: "desserts",
    isVeg: true,
    description: "Velvety sponge layered with cream cheese frosting and dusted with red velvet crumbs.",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80",
    price: 89
  },
  {
    id: "ds3",
    name: "Hot Sizzling Brownie",
    category: "desserts",
    isVeg: true,
    description: "Rich fudge walnut brownie warmed to perfection, drizzled with thick Belgian chocolate sauce.",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=600&q=80",
    price: 119
  }
];

// -------------------------------------------------------------------
// 2. STORE CONFIGURATION (UPI & CONTACT)
// -------------------------------------------------------------------
const SHOP_INFO = {
  name: "AK Pizza Shop",
  phone: "+91 9971434599",
  whatsappNumber: "919971434599",
  merchantUpiVpa: "9971434599@upi", // Official Merchant UPI ID
  merchantName: "AK Pizza Shop",
  address: "Meethapur, New Delhi - 110044",
  deliveryThresholdFree: 499,
  standardDeliveryFee: 30
};

// Selected pizza size memory (item id -> chosen size)
const selectedPizzaSizes = {};

// Cart state: array of { id, cartItemId, name, size, unitPrice, quantity, image }
let cart = [];

// Selected payment mode ('UPI' or 'COD')
let selectedPaymentMethod = "UPI";

// -------------------------------------------------------------------
// 3. INITIALIZATION ON DOM READY
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  initNavbar();
  initMobileDrawer();
  renderMenuItems("all");
  initCategoryFilters();
  initCartDrawer();
  initPaymentMethodSelector();
  initUpiModal();
  initReviewsSlider();
  initContactForm();
  initOfferCoupons();
});

// -------------------------------------------------------------------
// 4. NAVBAR & SCROLL BEHAVIOR
// -------------------------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  });
}

function initMobileDrawer() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openDrawer() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeDrawer() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener("click", (e) => {
      if (e.target === mobileNavOverlay) closeDrawer();
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

// -------------------------------------------------------------------
// 5. MENU RENDERING & FILTERING
// -------------------------------------------------------------------
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const category = btn.getAttribute("data-category");
      renderMenuItems(category);
    });
  });

  const footerLinks = document.querySelectorAll(".footer-links a[data-filter]");
  footerLinks.forEach((fLink) => {
    fLink.addEventListener("click", () => {
      const cat = fLink.getAttribute("data-filter");
      const targetBtn = document.querySelector(`.filter-btn[data-category="${cat}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });
}

function renderMenuItems(category = "all") {
  const menuGrid = document.getElementById("menu-grid");
  if (!menuGrid) return;

  const filteredItems = category === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter((item) => item.category === category);

  menuGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No items found in this category.</p>
      </div>
    `;
    return;
  }

  filteredItems.forEach((item) => {
    const isPizza = item.category === "veg-pizza" || item.category === "non-veg-pizza";
    const selectedSize = selectedPizzaSizes[item.id] || item.defaultSize || "Medium";
    const currentPrice = isPizza ? item.sizes[selectedSize] : item.price;

    const card = document.createElement("article");
    card.className = "menu-card";
    card.setAttribute("data-item-id", item.id);

    let sizeSelectorHTML = "";
    if (isPizza && item.sizes) {
      sizeSelectorHTML = `
        <div class="size-selector">
          <span class="size-label">Select Size:</span>
          <div class="size-options">
            ${Object.keys(item.sizes).map((size) => `
              <button 
                type="button" 
                class="size-btn ${size === selectedSize ? 'active' : ''}" 
                data-size="${size}" 
                data-item-id="${item.id}"
              >
                ${size}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="menu-card-img-wrap">
        <img 
          src="${item.image}" 
          alt="${item.name} at AK Pizza Shop Meethapur" 
          class="menu-card-img" 
          loading="lazy"
        >
        <div class="food-type-icon ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}"></div>
        <span class="menu-category-tag">${formatCategoryTag(item.category)}</span>
      </div>

      <div class="menu-card-body">
        <h3 class="menu-card-title">${item.name}</h3>
        <p class="menu-card-desc">${item.description}</p>
        
        ${sizeSelectorHTML}

        <div class="menu-card-footer">
          <span class="menu-price" id="price-${item.id}">₹${currentPrice}</span>
          <button class="btn add-cart-btn" data-item-id="${item.id}">
            + Add to Cart
          </button>
        </div>
      </div>
    `;

    menuGrid.appendChild(card);
  });

  // Attach size selector listeners
  menuGrid.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const size = btn.getAttribute("data-size");
      selectedPizzaSizes[itemId] = size;

      const siblingButtons = btn.parentElement.querySelectorAll(".size-btn");
      siblingButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const item = MENU_ITEMS.find((i) => i.id === itemId);
      if (item && item.sizes) {
        const priceEl = document.getElementById(`price-${itemId}`);
        if (priceEl) {
          priceEl.textContent = `₹${item.sizes[size]}`;
        }
      }
    });
  });

  // Attach Add to Cart listeners
  menuGrid.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      addToCart(itemId);
    });
  });
}

function formatCategoryTag(cat) {
  switch (cat) {
    case "veg-pizza": return "Veg Pizza";
    case "non-veg-pizza": return "Non-Veg Pizza";
    case "burgers": return "Burger";
    case "sides": return "Side Dish";
    case "drinks": return "Chilled Beverage";
    case "desserts": return "Sweet Dessert";
    default: return "Fast Food";
  }
}

// -------------------------------------------------------------------
// 6. CART MANAGEMENT & TOTAL CALCULATIONS
// -------------------------------------------------------------------
function initCartDrawer() {
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const cartDrawer = document.getElementById("cart-drawer");
  const checkoutBtn = document.getElementById("checkout-btn");

  function openCart() {
    cartBackdrop?.classList.add("open");
    cartDrawer?.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartBackdrop?.classList.remove("open");
    cartDrawer?.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleProceedCheckout);
  }
}

function addToCart(itemId) {
  const item = MENU_ITEMS.find((i) => i.id === itemId);
  if (!item) return;

  const isPizza = item.category === "veg-pizza" || item.category === "non-veg-pizza";
  const size = isPizza ? (selectedPizzaSizes[item.id] || item.defaultSize || "Medium") : null;
  const unitPrice = isPizza ? item.sizes[size] : item.price;
  const cartItemId = isPizza ? `${item.id}-${size}` : item.id;

  const existingIndex = cart.findIndex((c) => c.cartItemId === cartItemId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: item.id,
      cartItemId: cartItemId,
      name: item.name,
      size: size,
      unitPrice: unitPrice,
      quantity: 1,
      image: item.image
    });
  }

  saveCartToStorage();
  renderCartUI();
  bumpCartBadge();
  showToast(`Added ${item.name} ${size ? `(${size})` : ''} to cart! 🍕`);
}

function updateCartQuantity(cartItemId, delta) {
  const index = cart.findIndex((c) => c.cartItemId === cartItemId);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCartToStorage();
  renderCartUI();
}

function removeFromCart(cartItemId) {
  cart = cart.filter((c) => c.cartItemId !== cartItemId);
  saveCartToStorage();
  renderCartUI();
  showToast("Item removed from cart");
}

function saveCartToStorage() {
  try {
    localStorage.setItem("ak_pizza_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("ak_pizza_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
  renderCartUI();
}

function getOrderTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const isFreeDelivery = subtotal >= SHOP_INFO.deliveryThresholdFree;
  const deliveryFee = (subtotal === 0 || isFreeDelivery) ? 0 : SHOP_INFO.standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;
  return { subtotal, deliveryFee, grandTotal, isFreeDelivery };
}

function renderCartUI() {
  const badge = document.getElementById("cart-badge");
  const wrapper = document.getElementById("cart-items-wrapper");
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryFeeEl = document.getElementById("cart-delivery-fee");
  const grandTotalEl = document.getElementById("cart-grand-total");
  const progressFill = document.getElementById("delivery-progress-fill");
  const statusText = document.getElementById("delivery-status-text");
  const cartFooter = document.getElementById("cart-footer");
  const orderInputs = document.getElementById("cart-order-inputs");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { subtotal, deliveryFee, grandTotal, isFreeDelivery } = getOrderTotals();

  if (badge) badge.textContent = totalCount;

  if (cart.length === 0) {
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="empty-cart-state">
          <span class="empty-cart-icon">🛒</span>
          <h4>Your cart is hungry!</h4>
          <p>Add some cheesy pizzas and crispy bites from our menu.</p>
        </div>
      `;
    }
    if (subtotalEl) subtotalEl.textContent = "₹0";
    if (deliveryFeeEl) deliveryFeeEl.textContent = "₹0";
    if (grandTotalEl) grandTotalEl.textContent = "₹0";
    if (progressFill) progressFill.style.width = "0%";
    if (statusText) statusText.textContent = "Add ₹499 more for FREE delivery in Meethapur!";
    if (cartFooter) cartFooter.style.opacity = "0.7";
    if (orderInputs) orderInputs.style.display = "none";
    return;
  }

  if (cartFooter) cartFooter.style.opacity = "1";
  if (orderInputs) orderInputs.style.display = "flex";

  const progressPercent = Math.min(100, Math.round((subtotal / SHOP_INFO.deliveryThresholdFree) * 100));
  if (progressFill) progressFill.style.width = `${progressPercent}%`;

  if (statusText) {
    if (isFreeDelivery) {
      statusText.innerHTML = "🎉 Congratulations! You unlocked <strong>FREE Delivery!</strong>";
    } else {
      const remaining = SHOP_INFO.deliveryThresholdFree - subtotal;
      statusText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Delivery!</strong>`;
    }
  }

  if (wrapper) {
    wrapper.innerHTML = cart.map((item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          ${item.size ? `<span class="cart-item-size">Size: ${item.size}</span>` : ''}
          <div class="cart-item-price">₹${item.unitPrice} each</div>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateCartQuantity('${item.cartItemId}', -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-count">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity('${item.cartItemId}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.cartItemId}')">Remove</button>
        </div>
      </div>
    `).join("");
  }

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (deliveryFeeEl) {
    if (isFreeDelivery) {
      deliveryFeeEl.textContent = "FREE";
      deliveryFeeEl.className = "text-success";
    } else {
      deliveryFeeEl.textContent = `₹${deliveryFee}`;
      deliveryFeeEl.className = "";
    }
  }
  if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal}`;
}

function bumpCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 300);
  }
}

// -------------------------------------------------------------------
// 7. PAYMENT METHOD SELECTOR (UPI vs COD)
// -------------------------------------------------------------------
function initPaymentMethodSelector() {
  const upiOpt = document.getElementById("pay-opt-upi");
  const codOpt = document.getElementById("pay-opt-cod");

  if (!upiOpt || !codOpt) return;

  upiOpt.addEventListener("click", () => {
    selectedPaymentMethod = "UPI";
    upiOpt.classList.add("active");
    codOpt.classList.remove("active");
  });

  codOpt.addEventListener("click", () => {
    selectedPaymentMethod = "COD";
    codOpt.classList.add("active");
    upiOpt.classList.remove("active");
  });
}

// -------------------------------------------------------------------
// 8. CHECKOUT ROUTING & UPI PAYMENT MODAL
// -------------------------------------------------------------------
function handleProceedCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add pizzas first. 🍕");
    return;
  }

  const custAddress = document.getElementById("cust-address")?.value.trim();
  if (!custAddress) {
    showToast("Please enter your delivery address!");
    document.getElementById("cust-address")?.focus();
    return;
  }

  if (selectedPaymentMethod === "UPI") {
    openUpiModal();
  } else {
    // Direct Cash on Delivery
    dispatchOrderWhatsApp({
      paymentType: "Cash on Delivery (COD)",
      utr: "N/A"
    });
  }
}

function openUpiModal() {
  const modalBackdrop = document.getElementById("upi-modal-backdrop");
  const upiAmountDisplay = document.getElementById("upi-amount-display");
  const upiQrImg = document.getElementById("upi-qr-image");
  const merchantVpaText = document.getElementById("merchant-vpa-text");

  const { grandTotal } = getOrderTotals();

  if (upiAmountDisplay) upiAmountDisplay.textContent = `₹${grandTotal}`;
  if (merchantVpaText) merchantVpaText.textContent = SHOP_INFO.merchantUpiVpa;

  // Standard UPI URI format
  const note = encodeURIComponent(`AK Pizza Order ₹${grandTotal}`);
  const upiURI = `upi://pay?pa=${SHOP_INFO.merchantUpiVpa}&pn=${encodeURIComponent(SHOP_INFO.merchantName)}&am=${grandTotal}&cu=INR&tn=${note}`;

  // Generate dynamic QR Code image via QuickChart API
  if (upiQrImg) {
    upiQrImg.src = `https://quickchart.io/qr?text=${encodeURIComponent(upiURI)}&size=240&margin=1&ecLevel=M`;
  }

  // 1-Tap Mobile Intent links
  const gpayBtn = document.getElementById("upi-intent-gpay");
  const phonepeBtn = document.getElementById("upi-intent-phonepe");
  const paytmBtn = document.getElementById("upi-intent-paytm");
  const genericBtn = document.getElementById("upi-intent-generic");

  if (gpayBtn) gpayBtn.href = upiURI;
  if (phonepeBtn) phonepeBtn.href = upiURI;
  if (paytmBtn) paytmBtn.href = upiURI;
  if (genericBtn) genericBtn.href = upiURI;

  if (modalBackdrop) modalBackdrop.classList.add("open");
}

function closeUpiModal() {
  const modalBackdrop = document.getElementById("upi-modal-backdrop");
  if (modalBackdrop) modalBackdrop.classList.remove("open");
}

function initUpiModal() {
  const closeBtn = document.getElementById("upi-modal-close");
  const modalBackdrop = document.getElementById("upi-modal-backdrop");
  const copyUpiBtn = document.getElementById("copy-upi-btn");
  const finishOrderBtn = document.getElementById("upi-finish-order-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeUpiModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeUpiModal();
    });
  }

  if (copyUpiBtn) {
    copyUpiBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(SHOP_INFO.merchantUpiVpa).then(() => {
        showToast("UPI ID copied! Paste in your UPI app. ✓");
      }).catch(() => {
        showToast(`UPI ID: ${SHOP_INFO.merchantUpiVpa}`);
      });
    });
  }

  if (finishOrderBtn) {
    finishOrderBtn.addEventListener("click", () => {
      const utrInput = document.getElementById("upi-utr-input");
      const utrValue = utrInput?.value.trim() || "Confirmed via UPI";

      closeUpiModal();
      dispatchOrderWhatsApp({
        paymentType: "Paid via UPI (Online)",
        utr: utrValue
      });
    });
  }
}

// -------------------------------------------------------------------
// 9. DISPATCH ORDER TO WHATSAPP WITH PAYMENT BREAKDOWN
// -------------------------------------------------------------------
function dispatchOrderWhatsApp({ paymentType, utr }) {
  const custName = document.getElementById("cust-name")?.value.trim() || "Valued Customer";
  const custAddress = document.getElementById("cust-address")?.value.trim() || "Meethapur, New Delhi";
  const custNotes = document.getElementById("cust-notes")?.value.trim() || "None";

  const { subtotal, deliveryFee, grandTotal, isFreeDelivery } = getOrderTotals();

  let msg = `🍕 *NEW ORDER - AK PIZZA SHOP*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Customer:* ${custName}\n`;
  msg += `📍 *Delivery Address:* ${custAddress}\n`;
  if (custNotes !== "None") {
    msg += `📝 *Notes/Requests:* ${custNotes}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *ORDERED ITEMS:*\n\n`;

  cart.forEach((item, index) => {
    const sizeStr = item.size ? ` (${item.size})` : "";
    const itemTotal = item.unitPrice * item.quantity;
    msg += `${index + 1}. *${item.name}${sizeStr}*\n   Qty: ${item.quantity} × ₹${item.unitPrice} = *₹${itemTotal}*\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *Subtotal:* ₹${subtotal}\n`;
  msg += `🛵 *Delivery:* ${isFreeDelivery ? "FREE (Offer applied)" : `₹${deliveryFee}`}\n`;
  msg += `🔥 *GRAND TOTAL: ₹${grandTotal}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💳 *PAYMENT METHOD:* ${paymentType}\n`;
  if (utr && utr !== "N/A") {
    msg += `🔢 *UTR / Transaction Ref:* ${utr}\n`;
    msg += `✅ *Payment Status:* Paid & Confirmed\n`;
  } else {
    msg += `💵 *Payment Status:* To be paid in cash on arrival\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🕒 *Store Timing:* 8:00 AM - 10:00 PM\n`;
  msg += `Please confirm my order and approximate delivery time. Thank you!`;

  const waURL = `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  
  window.open(waURL, "_blank");
  showToast("Opening WhatsApp with order & payment details! 📲");

  // Optional: clear cart after checkout
  // cart = [];
  // saveCartToStorage();
  // renderCartUI();
}

// -------------------------------------------------------------------
// 10. TESTIMONIALS SLIDER
// -------------------------------------------------------------------
function initReviewsSlider() {
  const cards = document.querySelectorAll(".review-card");
  const dots = document.querySelectorAll(".carousel-dots .dot");
  const prevBtn = document.getElementById("prev-review-btn");
  const nextBtn = document.getElementById("next-review-btn");

  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  function showSlide(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;

    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  function startTimer() {
    stopTimer();
    autoSlideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  function stopTimer() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentIndex - 1);
      startTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentIndex + 1);
      startTimer();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(idx);
      startTimer();
    });
  });

  const slider = document.getElementById("reviews-slider");
  if (slider) {
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);
  }

  startTimer();
}

// -------------------------------------------------------------------
// 11. OFFERS & COUPONS
// -------------------------------------------------------------------
function initOfferCoupons() {
  const copyButtons = document.querySelectorAll(".copy-code-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied! ✓";
        showToast(`Promo code "${code}" copied! Mention on WhatsApp order.`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(() => {
        showToast(`Code: ${code}`);
      });
    });
  });
}

// -------------------------------------------------------------------
// 12. CONTACT FORM TO WHATSAPP
// -------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name")?.value.trim();
    const phone = document.getElementById("contact-phone")?.value.trim();
    const message = document.getElementById("contact-message")?.value.trim();

    if (!name || !message) {
      showToast("Please fill in your name and message.");
      return;
    }

    let text = `👋 *MESSAGE TO AK PIZZA SHOP*\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone || "Not provided"}\n`;
    text += `💬 *Inquiry / Requirement:*\n${message}\n\n`;
    text += `(Sent via AK Pizza Shop Website)`;

    const waURL = `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waURL, "_blank");

    form.reset();
    showToast("Opening WhatsApp to send your inquiry! 📨");
  });
}

// -------------------------------------------------------------------
// 13. TOAST NOTIFICATION UTILITY
// -------------------------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// -------------------------------------------------------------------
// 14. GLOBAL EXPORTS FOR INLINE HTML HANDLERS
// -------------------------------------------------------------------
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.handleProceedCheckout = handleProceedCheckout;
window.addToCart = addToCart;
window.showToast = showToast;
window.SHOP_INFO = SHOP_INFO;
window.MENU_ITEMS = MENU_ITEMS;
