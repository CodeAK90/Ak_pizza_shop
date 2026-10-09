# 🍕 AK Pizza Shop 

A modern, fast-food ordering web application designed for **AK Pizza Shop** located in Meethapur, New Delhi. Features hand-tossed artisanal pizzas, burgers, sides, drinks, interactive cart with free delivery progress meter, and direct **UPI payment gateway (GPay, PhonePe, Paytm, QR, UTR verification)** with WhatsApp order integration.

---

## 🚀 Features

- **Cheesy Menu**: 8 Hand-tossed pizzas (Small, Medium, Large sizes), 5 loaded burgers, sides, chilled drinks, and desserts.
- **⚡ Instant UPI Payments**:
  - Auto-generated dynamic **UPI QR Code** pre-filled with the exact grand total and merchant VPA (`9971434599@upi`).
  - 1-Tap Mobile Intent buttons for **Google Pay**, **PhonePe**, **Paytm**, and any UPI app.
  - Merchant UPI ID copy button.
  - 12-digit **UTR / Transaction Reference Number** verification field.
- **Cash on Delivery (COD)** toggle.
- **WhatsApp Direct Dispatch**: Automatically generates an itemized order receipt sent directly to **+91 9971434599** with customer address, payment method, and UTR status.
- **Delivery Calculation**: Free delivery in Meethapur on orders above ₹499 with visual progress bar.
- **Promo Codes**: Interactive coupon buttons (e.g. `BOGO50`, `COMBO399`, `AKFEAST20`).
- **Responsive Design**: Fast and mobile-first experience built with React 19, TypeScript, and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Vite
- **Icons**: Lucide React
- **Payments**: Unified Payments Interface (UPI Intent / QR)
- **Deployment**: Vite SPA / Cloud Run

---

## 📦 Local Setup & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/ak-pizza-shop.git
   cd ak-pizza-shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📍 Store Information

- **Store Name**: AK Pizza Shop
- **Location**: Meethapur, New Delhi - 110044
- **Phone / WhatsApp**: +91 9971434599
- **UPI VPA**: `9971434599@upi`
- **Hours**: 8:00 AM – 10:00 PM (All 7 Days)
