# 🛒 Ahoum Grocery

A modern, responsive grocery shopping web application built with **React, TypeScript, Vite, Tailwind CSS, Zustand, and Firebase**.

Ahoum Grocery is designed around a **mobile-first shopping experience** that scales seamlessly to tablet and desktop. Users can discover products, browse categories, search and filter items, manage favourites and their cart, authenticate using Firebase Phone Authentication, select a delivery location, and complete a simulated checkout flow.

---

## ✨ Features

### 🏠 Home & Product Discovery

* Grocery store landing page with promotional content
* Exclusive offers and best-selling products
* Grocery category browsing
* Location-aware home experience
* Responsive product grids and carousels
* Live product search and filtering

### 🛍️ Shopping Cart

* Add and remove products
* Increase or decrease product quantities
* Stock-aware quantity controls
* Persistent cart state across page refreshes
* Dedicated cart and checkout flow
* Checkout success and failure states

### ❤️ Favourites

* Add or remove products from favourites
* Persistent favourites using local storage
* Dedicated Favourites page
* Favourite products remain available after refreshing the page

### 📦 Product Details

* Product images and pricing
* Quantity controls
* Product descriptions
* Nutrition information
* Ratings and reviews
* Favourite and Add to Basket actions

### 🔐 Authentication

* Welcome, Login, and Signup flows
* Mobile number authentication
* Country code selection
* OTP verification using **Firebase Phone Authentication**
* Authentication state management
* Browsing remains accessible without authentication

### 📍 Location

* City and area selection
* Saved delivery location
* Selected location displayed across the shopping experience

### 📱 Responsive Design

* Mobile-first UI
* Responsive layouts for mobile, tablet, and desktop
* Mobile bottom navigation
* Desktop-friendly product grids and checkout layouts
* Keyboard-accessible interactive controls with visible focus states

---

## 🛠️ Tech Stack

| Technology       | Purpose                                   |
| ---------------- | ----------------------------------------- |
| **React**        | UI development                            |
| **TypeScript**   | Type-safe application development         |
| **Vite**         | Development server and build tooling      |
| **Tailwind CSS** | Styling and responsive design             |
| **React Router** | Client-side routing                       |
| **Zustand**      | Global state management                   |
| **Firebase**     | Phone authentication and OTP verification |
| **Vitest**       | Unit testing                              |
| **ESLint**       | Code quality and linting                  |

---

## 🏗️ Architecture

### State Management

The application uses **Zustand** for global state management.

State is separated by responsibility into independent stores:

* `cartStore` — shopping cart items and quantities
* `favouriteStore` — favourite products

This avoids a monolithic global store and keeps each state domain easier to maintain and reason about.

Both stores use Zustand's `persist` middleware to maintain state across browser refreshes.

### Data Layer

Product access is isolated inside `src/api/`.

Instead of allowing components to access product data directly, typed API functions provide a consistent data layer. This makes it easier to replace the current mock data with a real backend or API in the future.

### Routing

**React Router** handles application navigation and route management.

The application does not use Context API, Redux, MobX, or other global state solutions outside the assignment requirements.

### Authentication

**Firebase Phone Authentication** provides OTP-based authentication.

Authentication is used for the `/auth/*` flow while the product catalogue remains accessible without requiring users to sign in.

---

## 📂 Project Structure

```text
src/
├── api/
│   ├── products.ts
│   └── types.ts
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   └── BottomNav.tsx
│   │
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductCarousel.tsx
│       ├── ProductGrid.tsx
│       └── QuantityControl.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Explore.tsx
│   ├── CategoryListing.tsx
│   ├── ProductDetail.tsx
│   ├── Search.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── CheckoutResult.tsx
│   ├── Favourite.tsx
│   ├── Account.tsx
│   ├── Welcome.tsx
│   ├── Auth.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── MobileNumber.tsx
│   ├── Otp.tsx
│   └── Location.tsx
│
├── stores/
│   ├── cartStore.ts
│   └── favouriteStore.ts
│
├── router/
│   └── index.tsx
│
├── firebase/
│   └── ...
│
└── main.tsx
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PriyankaDas856/ahoum-grocery.git
```

### 2. Navigate to the project

```bash
cd ahoum-grocery
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Never commit your `.env` file or Firebase credentials to GitHub.**

Make sure your `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
```

### 5. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🔥 Firebase Setup

Ahoum Grocery uses **Firebase Phone Authentication** for OTP-based login.

To enable authentication:

1. Open your Firebase project.
2. Navigate to **Authentication**.
3. Open **Sign-in method**.
4. Enable **Phone** authentication.
5. Configure the required authorized domains.
6. Add your Firebase configuration values to `.env`.
7. Start the application.

Without valid Firebase configuration, the phone authentication flow will not function.

---

## 📜 Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint                   |
| `npm run test`    | Run the Vitest test suite    |

---

## 🗺️ Application Routes

| Route                 | Page               |
| --------------------- | ------------------ |
| `/`                   | Home               |
| `/explore`            | Explore            |
| `/search`             | Search             |
| `/cart`               | Cart               |
| `/favourite`          | Favourites         |
| `/account`            | Account            |
| `/category/:category` | Category Listing   |
| `/product/:id`        | Product Details    |
| `/checkout`           | Checkout           |
| `/checkout/:result`   | Checkout Result    |
| `/welcome`            | Welcome            |
| `/auth`               | Authentication     |
| `/auth/phone`         | Mobile Number      |
| `/auth/otp`           | OTP Verification   |
| `/auth/location`      | Location Selection |
| `/login`              | Login              |
| `/signup`             | Signup             |

---

## 🎨 Design & UX

Ahoum Grocery follows a **product-first, mobile-first design approach**.

Key design decisions include:

* Green-based visual identity
* Clean product-focused cards
* Responsive layouts across screen sizes
* Mobile bottom navigation
* Desktop grid-based browsing
* Clear cart and checkout interactions
* Visible keyboard focus states
* Consistent quantity and product controls
* Simple navigation designed around common grocery-shopping flows

---

## 🧪 Testing

The project uses **Vitest** for automated testing.

Current coverage focuses primarily on:

* Cart state and logic
* Search and filtering behaviour

Component, integration, and end-to-end coverage can be expanded as the application grows.

---

## ⚠️ Known Limitations

Ahoum Grocery is currently a frontend-focused portfolio project, so some production features are intentionally simulated.

* Product data currently comes from mock/local data
* No live inventory management
* No real payment gateway
* Checkout success/failure states are simulated
* Firebase Phone Authentication requires project configuration
* Automated test coverage is currently limited
* Cart reconciliation with live product prices and stock is not yet implemented
* No order history or order management backend

---

## 🔮 Future Improvements

With additional development time, the application could be extended with:

* **Real backend/API integration**
* Live inventory and stock management
* Cart reconciliation with real-time prices and availability
* Visible notifications when cart items or prices change
* Order history and order tracking
* Real payment gateway integration
* User profiles and saved addresses
* Expanded component and integration testing
* End-to-end testing
* Image optimization and lazy loading
* Improved desktop performance for large product catalogues

---

## 👩‍💻 Author

**Priyanka Das**
Computer Science & Business Engineering Student

---

## 📄 License

This project was created for **educational and portfolio purposes**.

