# 🛒 Ahoum Grocery

A modern, responsive grocery shopping web application built with **React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, and Firebase**.

Ahoum Grocery provides a complete grocery-shopping experience covering **product discovery, category browsing, search and filtering, product details, favourites, cart management, authentication, location selection, and checkout**.

The application follows a **mobile-first design approach** based on the provided Figma reference, with a dedicated desktop adaptation rather than simply stretching the mobile layout.

---

## ✨ Features

### 🏠 Home & Product Discovery

* Grocery store landing page
* Promotional grocery banner
* Exclusive offers
* Best-selling products
* Grocery categories
* Location-aware home experience
* Responsive product carousels
* Live product search and filtering
* Loading skeleton states
* Empty states
* Request failure and retry states

### 🥦 Product Details

Each product has a dedicated product page with:

* Product image
* Product name
* Unit and price
* Quantity controls
* Product description
* Nutrition information
* Ratings and reviews
* Favourite functionality
* Add to Basket functionality
* Stock availability

### 🛒 Shopping Cart

* Add products to cart
* Increase and decrease quantities
* Stock-aware quantity limits
* Remove products
* Persistent cart across browser refreshes
* Cart subtotal and total calculation
* Checkout flow
* Checkout success and failure states

The application also reconciles persisted cart data against the latest product dataset to handle:

* Products that no longer exist
* Changed product prices
* Invalid quantities
* Quantities exceeding available stock

### ❤️ Favourites

* Add or remove products from favourites
* Favourite state displayed on product pages
* Dedicated Favourites page
* Persistent favourites using local storage
* Favourite products remain available after refreshing the browser

### 🔐 Authentication

The application provides an onboarding and authentication flow:

```text
Splash
   ↓
Welcome
   ↓
Authentication
   ↓
Phone Number / Google Sign-In
   ↓
Location
   ↓
Home
```

Authentication features include:

* Splash screen
* Welcome screen
* Authentication screen
* Phone number entry
* Country selection and calling codes
* Demo OTP verification
* Google Sign-In
* Location selection

#### Google Sign-In

Google Sign-In is implemented using **Firebase Authentication**.

After successful Google authentication, users continue to the location-selection stage before entering the main shopping experience.

#### Demo Phone Authentication

The phone-number interface remains part of the authentication experience.

Users can:

* Select a country
* Select a country calling code
* Enter a mobile number
* Continue to OTP verification

To avoid requiring paid SMS delivery or Firebase Phone Authentication billing, the project uses a **demo OTP flow** instead of sending a real SMS.

**Demo verification code:**

```text
123456
```

Entering an incorrect code displays a validation message explaining that the demo code is `123456`.

This allows the complete phone-authentication journey to be demonstrated without requiring real SMS delivery.

### 📍 Location

Users can select their delivery location by choosing:

* City
* Local area

The selected location is stored locally and displayed throughout the shopping experience.

### 📱 Responsive Design

The application supports:

* Mobile
* Tablet
* Desktop

The mobile experience follows the hierarchy, spacing, navigation patterns, and visual language of the Figma reference.

Desktop uses a dedicated layout adaptation with:

* Max-width content containers
* Multi-column product grids
* Expanded category layouts
* Desktop-friendly navigation
* Adapted cart and checkout layouts

---

## 🛠️ Tech Stack

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| **React**        | UI development                       |
| **TypeScript**   | Type-safe application development    |
| **Vite**         | Development server and build tooling |
| **Tailwind CSS** | Styling and responsive design        |
| **React Router** | Client-side navigation               |
| **Zustand**      | Global state management              |
| **Firebase**     | Google authentication                |
| **Vitest**       | Automated testing                    |
| **ESLint**       | Code quality and linting             |

The project does not use:

* Redux
* MobX
* Context API for global state
* External UI component libraries

---

## 🏗️ Architecture

### State Management

The application uses **Zustand** for global state management.

State is separated by responsibility into independent stores:

* `cartStore` — cart items and quantities
* `favouriteStore` — favourite products
* `searchStore` — search request state and stale-response protection

Zustand persistence is used where persistent browser state is required.

### Data Layer

Product access is isolated inside:

```text
src/api/
```

The application uses:

* Typed product data
* A mock product catalogue
* A dedicated product API layer
* Simulated request latency where required

This keeps product access separate from UI components and makes the data layer easier to replace with a real backend in the future.

### Routing

**React Router** handles client-side navigation.

The router is located at:

```text
src/router/index.tsx
```

The application is divided into onboarding/authentication routes and the main shopping application.

The main application uses `AppShell` and shared navigation components.

### Authentication

Firebase Authentication is used for:

* Google Sign-In

The phone-number authentication interface is implemented as a **demo OTP flow** and does not send real SMS messages.

Firebase configuration is provided through environment variables.

---

## 📂 Project Structure

```text
ahoum-grocery/
│
├── public/
│   ├── images/
│   │   ├── product images
│   │   ├── auth.png
│   │   └── other application images
│   │
│   └── mock-data/
│       └── products.json
│
├── src/
│   │
│   ├── api/
│   │   ├── client.ts
│   │   ├── products.ts
│   │   └── types.ts
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── cart/
│   │   │
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   └── BottomNav.tsx
│   │   │
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCarousel.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── QuantityControl.tsx
│   │   │
│   │   ├── ui/
│   │   │
│   │   └── Hero.tsx
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── mockLatency.ts
│   │   ├── phoneAuth.ts
│   │   ├── promotions.ts
│   │   ├── promotions.test.ts
│   │   ├── reconcileCart.ts
│   │   └── reconcileCart.test.ts
│   │
│   ├── pages/
│   │   ├── Account.tsx
│   │   ├── Auth.tsx
│   │   ├── Cart.tsx
│   │   ├── CategoryListing.tsx
│   │   ├── Checkout.tsx
│   │   ├── CheckoutResult.tsx
│   │   ├── Explore.tsx
│   │   ├── Favourite.tsx
│   │   ├── Filters.tsx
│   │   ├── Home.tsx
│   │   ├── Location.tsx
│   │   ├── Login.tsx
│   │   ├── MobileNumber.tsx
│   │   ├── Otp.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Search.tsx
│   │   ├── Signup.tsx
│   │   ├── Splash.tsx
│   │   └── Welcome.tsx
│   │
│   ├── router/
│   │   └── index.tsx
│   │
│   ├── stores/
│   │   ├── cartStorage.ts
│   │   ├── cartStore.ts
│   │   ├── favouriteStore.ts
│   │   └── searchStore.ts
│   │
│   ├── styles/
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.node.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

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

> ⚠️ **Never commit `.env` or files containing private credentials to GitHub.**

### 5. Configure Firebase Google Authentication

In the Firebase Console:

1. Open the Firebase project.
2. Go to **Authentication**.
3. Open **Sign-in method**.
4. Enable **Google** sign-in.
5. Configure the required authorized domains.
6. Verify that the environment variables are correctly configured.

> **Phone Authentication does not need to be enabled in Firebase.** The phone-number flow uses the project's demo OTP implementation and does not send real SMS messages.

### 6. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🗺️ Application Routes

| Route                 | Page                  |
| --------------------- | --------------------- |
| `/`                   | Redirects to Splash   |
| `/splash`             | Splash Screen         |
| `/welcome`            | Welcome               |
| `/auth`               | Authentication        |
| `/auth/phone`         | Mobile Number         |
| `/auth/otp`           | Demo OTP Verification |
| `/auth/location`      | Location Selection    |
| `/login`              | Login                 |
| `/signup`             | Signup                |
| `/home`               | Home                  |
| `/explore`            | Explore               |
| `/search`             | Search                |
| `/cart`               | Cart                  |
| `/favourites`         | Favourites            |
| `/account`            | Account               |
| `/category/:category` | Category Listing      |
| `/product/:id`        | Product Details       |
| `/checkout`           | Checkout              |
| `/checkout/:result`   | Checkout Result       |

### Authentication Route Flow

```text
/splash
   ↓
/welcome
   ↓
/auth
   ├── /auth/phone
   │       ↓
   │   /auth/otp
   │
   └── Google Sign-In
           ↓
       /auth/location
           ↓
         /home
```

The phone route uses the demo OTP code `123456`.

---

## 🧪 Testing

The project uses **Vitest** for automated testing.

Current tests cover important application logic, including:

* Cart reconciliation
* Search state behaviour
* Promotion logic

The search implementation includes **stale-response protection**, ensuring that an older request cannot overwrite the result of a newer search request.

Cart reconciliation tests cover scenarios such as:

* Removed products
* Changed prices
* Invalid quantities
* Stock changes

Run the test suite with:

```bash
npm run test
```

---

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |
| `npm run test`    | Run Vitest tests         |

---

## 🎨 Design & UX

The application follows a **mobile-first, product-focused design approach** based on the provided Figma reference.

Key design characteristics include:

* Green grocery-focused visual identity
* Clean white interface
* Product-focused cards
* Rounded UI elements
* Mobile bottom navigation
* Responsive desktop navigation
* Multi-column desktop product grids
* Adapted desktop cart and checkout layouts
* Consistent spacing and typography
* Visible keyboard focus states
* Clear loading, empty, and error states
* Dedicated splash screen
* Responsive authentication screens
* Responsive onboarding flow

Desktop adaptations and their design reasoning are documented separately in `DESIGN_NOTES.md`.

---

## ⚠️ Known Limitations

Ahoum Grocery is currently a **frontend-focused project using mock product data**.

Current limitations include:

* Product data is not connected to a production backend
* Inventory is simulated
* Checkout and payment processing are simulated
* No real payment gateway
* No order history backend
* No live delivery tracking
* Phone OTP delivery is simulated rather than sent through SMS
* Firebase is used for Google Sign-In
* Automated test coverage currently focuses on core application logic rather than full end-to-end coverage

The demo phone authentication flow does not require Firebase billing or paid SMS services.

---

## 🔮 Future Improvements

With additional development time, the application could be extended with:

* Real backend/API integration
* Live inventory management
* Real payment gateway integration
* Real SMS authentication
* Order history and tracking
* User profiles and saved addresses
* Product reviews
* Coupon and promotional systems
* End-to-end testing
* Image optimization and lazy loading
* Admin dashboard and order management

---

## 📚 Project Documentation

Additional project documentation is available in the repository:

| Document          | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md` | Application architecture, data flow, routing, state management, and project structure |
| `DEBUGGING.md`    | Significant development issues, root causes, fixes, and verification                  |
| `DESIGN_NOTES.md` | Responsive design decisions and Figma implementation notes                            |
| `DECISIONS.md`    | Important technical and architectural decisions                                       |
| `PROMPT_LOG.md`   | Record of AI-assisted development and prompting                                       |

---

## 👩‍💻 Author

**Priyanka Das**

Computer Science & Business Engineering Student

---

## 📄 License

This project was created for **educational and portfolio purposes**.
