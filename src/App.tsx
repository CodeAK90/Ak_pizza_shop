import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Phone,
  Clock,
  MapPin,
  Check,
  Copy,
  Plus,
  Minus,
  Trash2,
  X,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Receipt,
  MessageCircle
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'veg-pizza' | 'non-veg-pizza' | 'burgers' | 'sides' | 'drinks' | 'desserts';
  isVeg: boolean;
  description: string;
  image: string;
  sizes?: {
    Small: number;
    Medium: number;
    Large: number;
  };
  price?: number;
  defaultSize?: 'Small' | 'Medium' | 'Large';
}

interface CartItem {
  id: string;
  cartItemId: string;
  name: string;
  size?: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "p1",
    name: "Classic Margherita",
    category: "veg-pizza",
    isVeg: true,
    description: "Classic golden crust loaded with 100% mozzarella cheese, fresh basil leaves & tangy Italian tomato herb sauce.",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 149, Medium: 269, Large: 429 },
    defaultSize: "Medium"
  },
  {
    id: "p2",
    name: "Farmhouse Delight",
    category: "veg-pizza",
    isVeg: true,
    description: "Overloaded with fresh crisp capsicum, juicy red tomatoes, tender mushrooms and sweet golden corn over mozzarella.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 199, Medium: 349, Large: 529 },
    defaultSize: "Medium"
  },
  {
    id: "p3",
    name: "Tandoori Paneer Tikka",
    category: "veg-pizza",
    isVeg: true,
    description: "Desi favorite! Spiced marinated paneer cubes, crunchy red onions, bell peppers with a smoky tandoori sauce swirl.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 229, Medium: 389, Large: 579 },
    defaultSize: "Medium"
  },
  {
    id: "p4",
    name: "Peppy Paneer Burst",
    category: "veg-pizza",
    isVeg: true,
    description: "Chunky paneer, spicy red paprika, crisp capsicum and extra molten cheese for a fiery spicy kick.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 219, Medium: 369, Large: 549 },
    defaultSize: "Medium"
  },
  {
    id: "p5",
    name: "Veggie Supreme",
    category: "veg-pizza",
    isVeg: true,
    description: "Black sliced olives, spicy jalapeños, sweet corn, mushrooms, red paprika and gooey mozzarella.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 239, Medium: 399, Large: 599 },
    defaultSize: "Medium"
  },
  {
    id: "p6",
    name: "Chicken Tikka Feast",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Succulent tandoori chicken tikka pieces, rings of red onions, green capsicum & zesty Indian spices.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 249, Medium: 419, Large: 629 },
    defaultSize: "Medium"
  },
  {
    id: "p7",
    name: "Smoky BBQ Chicken",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Tender chicken chunks tossed in hickory sweet barbecue sauce with caramelized red onions and cheddar-mozzarella blend.",
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 259, Medium: 439, Large: 649 },
    defaultSize: "Medium"
  },
  {
    id: "p8",
    name: "Classic Pepperoni",
    category: "non-veg-pizza",
    isVeg: false,
    description: "Authentic spicy cured meat slices layered generously on melted mozzarella cheese and herb-rich marinara.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
    sizes: { Small: 269, Medium: 459, Large: 679 },
    defaultSize: "Medium"
  },
  // Burgers
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
  // Sides
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
    description: "Hot crisp french fries tossed vigorously in our house peri-peri spice shaker.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    price: 99
  },
  // Drinks
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
    description: "Refreshing fizzy soda infused with fresh squeezed lemon juice, mint leaves and roasted cumin.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    price: 59
  },
  {
    id: "d3",
    name: "Thick Chocolate Milkshake",
    category: "drinks",
    isVeg: true,
    description: "Rich dark chocolate ganache whipped with rich milk and chocolate ice cream.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    price: 99
  },
  // Desserts
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
    name: "Hot Sizzling Brownie",
    category: "desserts",
    isVeg: true,
    description: "Rich fudge walnut brownie warmed to perfection, drizzled with thick Belgian chocolate sauce.",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=600&q=80",
    price: 119
  }
];

const SHOP_INFO = {
  name: "AK Pizza Shop",
  phone: "+91 9971434599",
  whatsappNumber: "919971434599",
  merchantUpiVpa: "9971434599@upi",
  merchantName: "AK Pizza Shop",
  address: "Meethapur, New Delhi - 110044",
  deliveryThresholdFree: 499,
  standardDeliveryFee: 30
};

const REVIEWS = [
  {
    id: 1,
    name: "Rahul Kumar",
    location: "Meethapur Extension, New Delhi",
    rating: 5,
    text: "Best pizza in Meethapur hands down! Paid via Google Pay UPI QR code right at checkout. Delivered in 25 minutes hot and cheesy!"
  },
  {
    id: 2,
    name: "Pooja Sharma",
    location: "Meethapur Chowk, New Delhi",
    rating: 5,
    text: "We ordered the Triple Treat combo for a family game night. The Chicken Tikka Pizza and loaded fries were top-notch. Seamless UPI payment!"
  },
  {
    id: 3,
    name: "Amit Mishra",
    location: "Badarpur Border / Meethapur",
    rating: 5,
    text: "AK Pizza Shop never disappoints! The Stuffed Garlic Bread with extra cheese dip is pure heaven. Super fast delivery and clean packaging."
  }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("ak_pizza_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'Small' | 'Medium' | 'Large'>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');

  // Customer Details
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custNotes, setCustNotes] = useState('');
  const [upiUtr, setUpiUtr] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Review Slider Index
  const [reviewIndex, setReviewIndex] = useState(0);

  // Completed Order Details for Receipt
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    try {
      localStorage.setItem("ak_pizza_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeDelivery = subtotal >= SHOP_INFO.deliveryThresholdFree;
  const deliveryFee = (subtotal === 0 || isFreeDelivery) ? 0 : SHOP_INFO.standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSizeChange = (itemId: string, size: 'Small' | 'Medium' | 'Large') => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const addToCart = (item: MenuItem) => {
    const isPizza = item.category === 'veg-pizza' || item.category === 'non-veg-pizza';
    const size = isPizza ? (selectedSizes[item.id] || item.defaultSize || 'Medium') : undefined;
    const unitPrice = isPizza && item.sizes && size ? item.sizes[size] : (item.price || 0);
    const cartItemId = isPizza && size ? `${item.id}-${size}` : item.id;

    setCart(prev => {
      const idx = prev.findIndex(c => c.cartItemId === cartItemId);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      } else {
        return [...prev, {
          id: item.id,
          cartItemId,
          name: item.name,
          size,
          unitPrice,
          quantity: 1,
          image: item.image
        }];
      }
    });

    showToast(`Added ${item.name} ${size ? `(${size})` : ''} to cart! 🍕`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(c => c.cartItemId !== cartItemId));
    showToast("Item removed from cart");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Coupon "${code}" copied!`);
    });
  };

  const handleCopyUpiVpa = () => {
    navigator.clipboard.writeText(SHOP_INFO.merchantUpiVpa).then(() => {
      showToast(`UPI ID "${SHOP_INFO.merchantUpiVpa}" copied!`);
    });
  };

  // UPI Link generation
  const upiNote = encodeURIComponent(`AK Pizza Shop Order`);
  const upiUri = `upi://pay?pa=${SHOP_INFO.merchantUpiVpa}&pn=${encodeURIComponent(SHOP_INFO.merchantName)}&am=${grandTotal}&cu=INR&tn=${upiNote}`;
  const upiQrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiUri)}&size=240&margin=1&ecLevel=M`;

  const handleProceedCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty! Add delicious items first.");
      return;
    }
    if (!custAddress.trim()) {
      showToast("Please enter your delivery address!");
      return;
    }

    if (paymentMethod === 'UPI') {
      setIsCartOpen(false);
      setIsUpiModalOpen(true);
    } else {
      // Cash on Delivery
      finishOrder({ paymentType: 'Cash on Delivery (COD)', utr: 'N/A' });
    }
  };

  const finishOrder = ({ paymentType, utr }: { paymentType: string; utr: string }) => {
    const orderNum = `AKP-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentOrder = {
      orderId: orderNum,
      customerName: custName || 'Valued Foodie',
      customerPhone: custPhone || 'Not provided',
      address: custAddress || 'Meethapur, New Delhi',
      notes: custNotes || 'None',
      items: [...cart],
      subtotal,
      deliveryFee,
      grandTotal,
      paymentType,
      utr,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLastOrder(currentOrder);

    // Format WhatsApp Message
    let msg = `🍕 *NEW ORDER - AK PIZZA SHOP*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🆔 *Order ID:* ${orderNum}\n`;
    msg += `👤 *Customer:* ${currentOrder.customerName}\n`;
    if (custPhone) msg += `📞 *Phone:* ${custPhone}\n`;
    msg += `📍 *Delivery Address:* ${currentOrder.address}\n`;
    if (custNotes.trim()) msg += `📝 *Notes:* ${custNotes}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🛒 *ORDER ITEMS:*\n\n`;

    cart.forEach((item, index) => {
      const sizeStr = item.size ? ` (${item.size})` : '';
      msg += `${index + 1}. *${item.name}${sizeStr}*\n   Qty: ${item.quantity} × ₹${item.unitPrice} = *₹${item.quantity * item.unitPrice}*\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *Subtotal:* ₹${subtotal}\n`;
    msg += `🛵 *Delivery:* ${isFreeDelivery ? 'FREE (Offer applied)' : `₹${deliveryFee}`}\n`;
    msg += `🔥 *GRAND TOTAL: ₹${grandTotal}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💳 *PAYMENT METHOD:* ${paymentType}\n`;
    if (utr && utr !== 'N/A') {
      msg += `🔢 *UPI Ref / UTR:* ${utr}\n`;
      msg += `✅ *Status:* Paid & Verified\n`;
    } else {
      msg += `💵 *Status:* To be paid in cash on arrival\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm my order and approximate delivery time. Thank you!`;

    const waURL = `https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp
    window.open(waURL, '_blank');

    setIsUpiModalOpen(false);
    setIsCartOpen(false);
    setIsReceiptModalOpen(true);
    setCart([]);
  };

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#191716] flex flex-col font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#191716] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl flex items-center gap-2 border border-white/10 animate-bounce">
          <span>🍕</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#191716] via-[#2d1810] to-[#191716] text-[#ffecd6] text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-600/30 text-red-300 px-2 py-0.5 rounded text-[11px] font-bold">OFFER</span>
            <span>🍕 Free delivery on orders above ₹499 in Meethapur (~5 km)</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-amber-200">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 8:00 AM – 10:00 PM (Everyday)</span>
            <a href={`tel:${SHOP_INFO.phone}`} className="flex items-center gap-1 text-amber-400 font-bold hover:underline">
              <Phone className="w-3.5 h-3.5" /> {SHOP_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#f1e5d8] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🍕
            </div>
            <div>
              <div className="font-display text-2xl font-black text-red-600 tracking-tight leading-none">
                AK PIZZA
              </div>
              <div className="text-[10px] font-extrabold text-amber-600 tracking-widest mt-0.5">
                SHOP • MEETHAPUR
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#home" className="hover:text-red-600 transition-colors">Home</a>
            <a href="#menu" className="hover:text-red-600 transition-colors">Menu</a>
            <a href="#offers" className="hover:text-red-600 transition-colors">Special Deals</a>
            <a href="#about" className="hover:text-red-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-red-600 transition-colors">Contact</a>
          </nav>

          {/* Actions: Cart & Order */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white border border-[#f1e5d8] hover:border-red-500 text-stone-800 hover:text-red-600 shadow-sm transition-all flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse-subtle">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Order Now 🍕
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="py-12 md:py-20 px-4 bg-gradient-to-b from-[#fff0e0] to-[#fffaf5]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                  🔥 Meethapur's #1 Pizza Spot
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant UPI & COD
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 leading-[1.1] tracking-tight">
                Hot, Fresh & <span className="text-red-600 underline decoration-amber-400 decoration-wavy">Cheesy,</span> Delivered Fast!
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
                Hand-tossed crusts, pure dairy mozzarella, and rich flavorful toppings. Order direct in Meethapur and pay securely via <strong className="text-stone-800">Google Pay, PhonePe, Paytm QR</strong> or cash on delivery!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#menu"
                  className="px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  Explore Menu 📜
                </a>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-[#f1e5d8] shadow-sm hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4 text-amber-600" /> View Cart ({totalItemsCount})
                </button>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#f1e5d8]">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-red-600">30-40m</div>
                  <div className="text-xs text-stone-500 font-medium">Lightning Delivery</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-600">₹499+</div>
                  <div className="text-xs text-stone-500 font-medium">FREE Delivery in 5km</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600">⚡ UPI</div>
                  <div className="text-xs text-stone-500 font-medium">Scan & Pay on Mobile</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
                  alt="Delicious Hot Pizza"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-white animate-pulse-subtle"
                />
                {/* Floating pill 1 */}
                <div className="absolute top-2 right-0 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-2 text-xs font-bold text-stone-800">
                  <span className="text-xl">🧀</span>
                  <div>
                    <div>100% Real Cheese</div>
                    <div className="text-[10px] text-stone-500 font-normal">Fresh Mozzarella</div>
                  </div>
                </div>
                {/* Floating pill 2 */}
                <div className="absolute bottom-4 left-0 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-2 text-xs font-bold text-stone-800">
                  <span className="text-xl">📲</span>
                  <div>
                    <div>Instant UPI Pay</div>
                    <div className="text-[10px] text-emerald-600 font-bold">GPay • PhonePe • Paytm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offers Section */}
        <section id="offers" className="py-16 px-4 bg-white border-y border-[#f1e5d8]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Pocket Friendly Bites</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">Irresistible Deals & Combos</h2>
              <p className="text-sm text-stone-500 mt-2">Apply promo codes during WhatsApp checkout or mention in instructions!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deal 1 */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-red-600 to-rose-700 text-white relative shadow-lg flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-black/25 px-3 py-1 rounded-full">Bestseller Deal</span>
                  <h3 className="font-display text-2xl font-bold mt-4">Buy 1 Get 1 at 50% Off</h3>
                  <p className="text-xs text-red-100 mt-2">Buy any Medium Pizza and get a second Medium Pizza at 50% discount! Valid all week.</p>
                </div>
                <div className="mt-6 flex items-center justify-between bg-white/15 p-2.5 rounded-xl border border-white/20">
                  <span className="text-xs font-mono font-bold tracking-wider">CODE: BOGO50</span>
                  <button
                    onClick={() => handleCopyCode('BOGO50')}
                    className="px-3 py-1 bg-white text-red-700 font-bold text-xs rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              {/* Deal 2 */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-600 to-orange-600 text-white relative shadow-lg flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-black/25 px-3 py-1 rounded-full">Mega Combo</span>
                  <h3 className="font-display text-2xl font-bold mt-4">Triple Treat Feast</h3>
                  <p className="text-xs text-amber-100 mt-2">1 Medium Pizza + 1 Loaded Fries + 1 Chilled Beverage starting at just ₹399!</p>
                </div>
                <div className="mt-6 flex items-center justify-between bg-white/15 p-2.5 rounded-xl border border-white/20">
                  <span className="text-xs font-mono font-bold tracking-wider">CODE: COMBO399</span>
                  <button
                    onClick={() => handleCopyCode('COMBO399')}
                    className="px-3 py-1 bg-white text-amber-700 font-bold text-xs rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              {/* Deal 3 */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-stone-900 to-stone-800 text-white relative shadow-lg flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full">Flat Discount</span>
                  <h3 className="font-display text-2xl font-bold mt-4">Flat 20% OFF</h3>
                  <p className="text-xs text-stone-300 mt-2">Enjoy flat 20% discount on all orders above ₹599. Perfect for family weekends!</p>
                </div>
                <div className="mt-6 flex items-center justify-between bg-white/15 p-2.5 rounded-xl border border-white/20">
                  <span className="text-xs font-mono font-bold tracking-wider">CODE: AKFEAST20</span>
                  <button
                    onClick={() => handleCopyCode('AKFEAST20')}
                    className="px-3 py-1 bg-white text-stone-900 font-bold text-xs rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Freshly Crafted Menu</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">Explore Our Delicious Bites</h2>
              <p className="text-sm text-stone-500 mt-2">Oven-fresh artisanal pizzas, gourmet burgers, crispy sides and drinks.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 justify-start md:justify-center no-scrollbar">
              {[
                { id: 'all', label: '🍽️ All Items' },
                { id: 'veg-pizza', label: '🌱 Veg Pizza' },
                { id: 'non-veg-pizza', label: '🍗 Non-Veg Pizza' },
                { id: 'burgers', label: '🍔 Burgers' },
                { id: 'sides', label: '🍟 Sides' },
                { id: 'drinks', label: '🥤 Drinks' },
                { id: 'desserts', label: '🍰 Desserts' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white text-stone-700 border-[#f1e5d8] hover:border-amber-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {filteredItems.map(item => {
                const isPizza = item.category === 'veg-pizza' || item.category === 'non-veg-pizza';
                const chosenSize = selectedSizes[item.id] || item.defaultSize || 'Medium';
                const currentPrice = isPizza && item.sizes ? item.sizes[chosenSize] : (item.price || 0);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#f1e5d8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  >
                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Veg / Non-Veg badge */}
                      <div className="absolute top-3 right-3 bg-white p-1 rounded-md shadow border">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Item Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg font-bold text-stone-900 leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Pizza Size Selectors */}
                        {isPizza && item.sizes && (
                          <div className="mt-4">
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                              Select Size:
                            </span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {(['Small', 'Medium', 'Large'] as const).map(sz => (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => handleSizeChange(item.id, sz)}
                                  className={`py-1 text-xs font-bold rounded-lg border transition-all ${
                                    chosenSize === sz
                                      ? 'bg-amber-50 border-amber-500 text-amber-700'
                                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                                  }`}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer: Price + Add Button */}
                      <div className="mt-5 pt-3 border-t border-dashed border-stone-200 flex items-center justify-between">
                        <span className="font-display text-xl font-extrabold text-red-600">
                          ₹{currentPrice}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-white border-t border-[#f1e5d8]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing pizza dough"
                className="rounded-3xl shadow-xl w-full object-cover max-h-96"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white p-4 rounded-2xl shadow-lg text-center font-display">
                <div className="text-2xl font-black">100%</div>
                <div className="text-[11px] font-bold">Handmade in Meethapur</div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Our Story & Promise</span>
              <h2 className="font-display text-3xl font-extrabold text-stone-900 leading-tight">
                Baking Happiness in Meethapur, One Slice at a Time
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Welcome to <strong>AK Pizza Shop</strong>! We proof our dough daily, use vine-ripened tomatoes simmered with aromatic herbs, and layer genuine dairy mozzarella. Whether it is an evening snack, movie marathon, or celebration — we ensure hot doorstep delivery across Meethapur!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8]">
                  <span className="text-2xl">🍅</span>
                  <h4 className="font-bold text-sm text-stone-900 mt-2">Farm Veggies</h4>
                  <p className="text-xs text-stone-500 mt-1">Freshly sliced daily for maximum crunch and nutrition.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8]">
                  <span className="text-2xl">🛵</span>
                  <h4 className="font-bold text-sm text-stone-900 mt-2">Hot Delivery</h4>
                  <p className="text-xs text-stone-500 mt-1">Thermal insulated boxes keeping pizzas oven-hot.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8]">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-sm text-stone-900 mt-2">Instant UPI</h4>
                  <p className="text-xs text-stone-500 mt-1">Pay smoothly via GPay, PhonePe, Paytm, or Cash.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section id="reviews" className="py-16 px-4 bg-[#fffaf5]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Foodie Love</span>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 mt-1">What Our Customers Say</h2>
            <p className="text-sm text-stone-500 mt-2">Real reviews from our neighbors in Meethapur & nearby areas.</p>

            <div className="mt-8 bg-white p-8 rounded-3xl border border-[#f1e5d8] shadow-md relative">
              <div className="flex justify-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-base sm:text-lg text-stone-800 italic leading-relaxed">
                "{REVIEWS[reviewIndex].text}"
              </blockquote>
              <div className="mt-6">
                <div className="font-display font-bold text-stone-900">{REVIEWS[reviewIndex].name}</div>
                <div className="text-xs text-stone-500">{REVIEWS[reviewIndex].location}</div>
              </div>

              {/* Slider controls */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setReviewIndex(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                  className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {REVIEWS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        reviewIndex === i ? 'w-6 bg-red-600' : 'w-2 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setReviewIndex(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section id="contact" className="py-16 px-4 bg-white border-t border-[#f1e5d8]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">Drop By or Call</span>
              <h2 className="font-display text-3xl font-extrabold text-stone-900 mt-1">Visit & Connect With Us</h2>
              <p className="text-sm text-stone-500 mt-2">Serving Meethapur, Badarpur, Jaitpur & surroundings (~5 km radius).</p>

              <div className="space-y-4 mt-6">
                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8] flex items-start gap-4">
                  <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Store Location</h4>
                    <p className="text-xs text-stone-600 mt-0.5">{SHOP_INFO.address}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8] flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Phone & Orders</h4>
                    <a href={`tel:${SHOP_INFO.phone}`} className="text-xs font-bold text-red-600 hover:underline block mt-0.5">
                      {SHOP_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fffaf5] border border-[#f1e5d8] flex items-start gap-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Payment Modes</h4>
                    <p className="text-xs text-stone-600 mt-0.5">UPI ID: <span className="font-mono font-bold text-stone-800">{SHOP_INFO.merchantUpiVpa}</span> • Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-[#f1e5d8] shadow-sm flex flex-col">
              <iframe
                title="AK Pizza Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14022.421455255395!2d77.30230678284988!3d28.521509378601444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6fe15555555%3A0x7d6f5f3e4c4c4c4c!2sMithapur%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-80 border-0 flex-1"
                loading="lazy"
              />
              <div className="p-3 bg-stone-50 text-center text-xs text-stone-500 font-medium">
                📍 Serving Meethapur, New Delhi & 5 km surroundings
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#191716] text-stone-300 py-12 px-4 border-t-4 border-red-600">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-xs">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍕</span>
              <span className="font-display text-xl font-black text-white">AK PIZZA SHOP</span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              Serving golden crusts, loaded burgers, and cheesy delights with fast delivery in Meethapur, New Delhi. Pay securely with GPay, PhonePe, Paytm, or COD!
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#home" className="hover:text-amber-400">Home</a></li>
              <li><a href="#menu" className="hover:text-amber-400">Menu Highlights</a></li>
              <li><a href="#offers" className="hover:text-amber-400">Combo Offers</a></li>
              <li><a href="#about" className="hover:text-amber-400">About Kitchen</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Contact Store</h4>
            <div className="space-y-2 text-stone-400">
              <p>📍 Meethapur, New Delhi - 110044</p>
              <p>⏰ 8:00 AM – 10:00 PM</p>
              <p className="text-amber-400 font-bold">📞 {SHOP_INFO.phone}</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 flex flex-wrap justify-between items-center text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} AK Pizza Shop. All rights reserved.</p>
          <p>Made with ❤️ for foodies in Meethapur, New Delhi.</p>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* CART DRAWER (SLIDE-IN MODAL) */}
      {/* ============================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-red-600" />
                  <h3 className="font-display font-bold text-stone-900 text-lg">Your Order Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Meter */}
              <div className="p-3 bg-amber-50 border-b border-amber-200/60 text-xs">
                <div className="flex justify-between font-bold text-amber-900 mb-1">
                  <span>
                    {isFreeDelivery
                      ? '🎉 Unlocked FREE Delivery!'
                      : `Add ₹${SHOP_INFO.deliveryThresholdFree - subtotal} more for FREE Delivery!`}
                  </span>
                  <span>₹{subtotal}/₹{SHOP_INFO.deliveryThresholdFree}</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / SHOP_INFO.deliveryThresholdFree) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-stone-400">
                    <span className="text-4xl block mb-2">🛒</span>
                    <p className="font-bold text-stone-600">Your cart is hungry!</p>
                    <p className="text-xs text-stone-400 mt-1">Add hot pizzas and loaded sides from the menu.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.cartItemId}
                      className="p-3 bg-[#fffaf5] border border-[#f1e5d8] rounded-2xl flex items-center gap-3"
                    >
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-stone-900 truncate">{item.name}</h4>
                        {item.size && <span className="text-xs text-amber-600 font-semibold">{item.size} • </span>}
                        <span className="text-xs font-bold text-red-600">₹{item.unitPrice} each</span>
                        <div className="text-xs font-black text-stone-800 mt-0.5">Total: ₹{item.unitPrice * item.quantity}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-stone-300 rounded-full bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[10px] text-stone-400 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Form & Payment Mode */}
              {cart.length > 0 && (
                <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ashutosh Kumar"
                      value={custName}
                      onChange={e => setCustName(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9971434599"
                      value={custPhone}
                      onChange={e => setCustPhone(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Delivery Address (Meethapur) *</label>
                    <input
                      type="text"
                      placeholder="e.g. House 42, Gali 4, Meethapur"
                      value={custAddress}
                      onChange={e => setCustAddress(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Special Instructions (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Extra oregano, less chili flakes"
                      value={custNotes}
                      onChange={e => setCustNotes(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-stone-300 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="font-extrabold text-stone-800 uppercase tracking-wider text-[11px] block mb-1.5">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'UPI'
                            ? 'bg-red-50 border-red-500 text-red-900 shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⚡</span>
                          <div>
                            <div className="font-bold text-xs">Pay via UPI</div>
                            <div className="text-[10px] text-stone-500">GPay, PhonePe, QR</div>
                          </div>
                        </div>
                        {paymentMethod === 'UPI' && <Check className="w-4 h-4 text-red-600" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'COD'
                            ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💵</span>
                          <div>
                            <div className="font-bold text-xs">Cash on Delivery</div>
                            <div className="text-[10px] text-stone-500">Pay cash on arrival</div>
                          </div>
                        </div>
                        {paymentMethod === 'COD' && <Check className="w-4 h-4 text-amber-600" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-2 border-t border-stone-200 space-y-1">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery Fee</span>
                      <span className={isFreeDelivery ? 'text-emerald-600 font-bold' : ''}>
                        {isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-display font-black text-stone-900 text-base pt-1 border-t border-dashed border-stone-300">
                      <span>Grand Total</span>
                      <span className="text-red-600">₹{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2"
                  >
                    {paymentMethod === 'UPI' ? (
                      <>
                        <QrCode className="w-4 h-4" /> Pay ₹{grandTotal} via UPI
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4" /> Confirm Cash Order on WhatsApp
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* UPI PAYMENT MODAL */}
      {/* ============================================================== */}
      {isUpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded">BHIM UPI</span>
                <h3 className="font-bold text-sm">Pay with UPI</h3>
              </div>
              <button
                onClick={() => setIsUpiModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              {/* Amount Banner */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500">Paying to AK Pizza Shop</div>
                  <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Merchant
                  </div>
                </div>
                <div className="font-display text-2xl font-black text-red-600">
                  ₹{grandTotal}
                </div>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center">
                <div className="relative p-3 bg-white rounded-2xl border-2 border-stone-200 shadow-md">
                  <img
                    src={upiQrUrl}
                    alt="Scan UPI QR Code"
                    className="w-44 h-44 object-contain"
                  />
                  {/* Scanner overlay corners */}
                  <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-red-600" />
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-red-600" />
                  <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-red-600" />
                  <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-red-600" />
                </div>
                <p className="text-[11px] text-stone-500 text-center mt-2 font-medium">
                  Scan with <strong>Google Pay, PhonePe, Paytm</strong>, or any UPI app
                </p>
              </div>

              {/* 1-Tap App Buttons */}
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1 text-center">
                  Or Tap to Open UPI App on Mobile:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href={upiUri}
                    className="p-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-center transition flex flex-col items-center gap-1"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs">G</span>
                    <span className="text-[10px] font-bold text-blue-900">GPay</span>
                  </a>
                  <a
                    href={upiUri}
                    className="p-2 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-center transition flex flex-col items-center gap-1"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs">Pe</span>
                    <span className="text-[10px] font-bold text-purple-900">PhonePe</span>
                  </a>
                  <a
                    href={upiUri}
                    className="p-2 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-center transition flex flex-col items-center gap-1"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#00b9f5] text-white flex items-center justify-center font-bold text-xs">₹</span>
                    <span className="text-[10px] font-bold text-sky-900">Paytm</span>
                  </a>
                  <a
                    href={upiUri}
                    className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-center transition flex flex-col items-center gap-1"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#00796b] text-white flex items-center justify-center font-bold text-xs">⚡</span>
                    <span className="text-[10px] font-bold text-emerald-900">Any UPI</span>
                  </a>
                </div>
              </div>

              {/* UPI ID copy */}
              <div className="p-2.5 bg-stone-100 rounded-xl flex items-center justify-between border border-stone-200">
                <div>
                  <div className="text-[10px] text-stone-500 font-medium">Merchant UPI VPA</div>
                  <div className="font-mono font-bold text-stone-900">{SHOP_INFO.merchantUpiVpa}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpiVpa}
                  className="px-2.5 py-1 bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 font-bold text-[11px] flex items-center gap-1 shadow-sm"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>

              {/* UTR Input & Confirm */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="font-bold text-stone-700 block">
                  Enter 12-digit UPI UTR / Ref No. (Optional):
                  <span className="text-[10px] text-stone-400 font-normal block">Shown in your UPI app receipt after payment</span>
                </label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. 423984712398"
                  value={upiUtr}
                  onChange={e => setUpiUtr(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-mono text-xs focus:outline-none focus:border-red-500"
                />

                <button
                  onClick={() => finishOrder({
                    paymentType: 'Paid via UPI (Online)',
                    utr: upiUtr.trim() || 'Paid & Confirmed'
                  })}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm Payment & Send to WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ORDER CONFIRMATION / RECEIPT MODAL */}
      {/* ============================================================== */}
      {isReceiptModalOpen && lastOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center bg-gradient-to-b from-emerald-50 to-white">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto shadow-sm">
                🎉
              </div>
              <h3 className="font-display text-2xl font-extrabold text-stone-900 mt-3">Order Received!</h3>
              <p className="text-xs text-stone-500 mt-1">Thank you! Your order details were dispatched to AK Pizza Shop.</p>
            </div>

            <div className="px-6 py-4 space-y-3 text-xs border-y border-dashed border-stone-200">
              <div className="flex justify-between font-mono text-stone-500">
                <span>Order ID:</span>
                <span className="font-bold text-stone-800">{lastOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Customer:</span>
                <span className="font-bold text-stone-800">{lastOrder.customerName}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Address:</span>
                <span className="font-bold text-stone-800 truncate max-w-[180px]">{lastOrder.address}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Payment Mode:</span>
                <span className="font-bold text-emerald-700">{lastOrder.paymentType}</span>
              </div>
              {lastOrder.utr && lastOrder.utr !== 'N/A' && (
                <div className="flex justify-between font-mono text-stone-600">
                  <span>UTR Ref:</span>
                  <span className="font-bold text-stone-800">{lastOrder.utr}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="text-red-600 font-extrabold">₹{lastOrder.grandTotal}</span>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-50 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call Store: {SHOP_INFO.phone}
              </a>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${SHOP_INFO.whatsappNumber}?text=${encodeURIComponent("Hi AK Pizza Shop! I would like to place an order.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all animate-bounce"
        aria-label="Direct WhatsApp Order"
      >
        <span className="text-lg">💬</span>
        <span className="font-bold text-xs hidden sm:inline">WhatsApp Order</span>
      </a>
    </div>
  );
}
