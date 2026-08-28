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

Firebase Authentication is used for:

* Welcome screen
* Login and Signup flows
* Phone number authentication
* OTP verification
* Google Sign-In
* Authentication state handling

The product catalogue remains accessible without requiring authentication.

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
| **Firebase**     | Phone and Google authentication      |
| **Vitest**       | Automated testing                    |
| **ESLint**       | Code quality and linting             |

---

## 🏗️ Architecture

### State Management

The application uses **Zustand** for global state management.

State is separated by responsibility into independent stores:

* `cartStore` — cart items and quantities
* `favouriteStore` — favourite products
* `searchStore` — search request state and stale-response protection

Zustand's `persist` middleware is used where persistent browser state is required.

### Data Layer

Product access is isolated inside:

```text
src/api/
```

The application uses **typed product data** and a **mock API layer with variable request latency**.

This keeps product access separate from UI components and makes the data layer easier to replace with a real backend in the future.

### Routing

**React Router** handles client-side navigation.

The application does not use:

* Redux
* MobX
* Context API
* UI component libraries

### Authentication

Firebase Authentication handles:

* Phone number authentication with OTP
* Google Sign-In

Firebase configuration is provided through environment variables.

---

## 📂 Project Structure

```text
ahoum-grocery/
│
├── public/
│   └── images/
│
├── src/
│
│   ├── api/
│   │   ├── products.ts
│   │   └── types.ts
│
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   └── BottomNav.tsx
│   │   │
│   │   └── product/
│   │       ├── ProductCard.tsx
│   │       ├── ProductCarousel.tsx
│   │       ├── ProductGrid.tsx
│   │       └── QuantityControl.tsx
│
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Explore.tsx
│   │   ├── CategoryListing.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Search.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── CheckoutResult.tsx
│   │   ├── Favourite.tsx
│   │   ├── Account.tsx
│   │   ├── Welcome.tsx
│   │   ├── Auth.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── MobileNumber.tsx
│   │   ├── Otp.tsx
│   │   └── Location.tsx
│
│   ├── stores/
│   │   ├── cartStore.ts
│   │   ├── favouriteStore.ts
│   │   └── searchStore.ts
│
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── phoneAuth.ts
│   │   ├── mockLatency.ts
│   │   ├── reconcileCart.ts
│   │   └── ...
│
│   ├── router/
│   │   └── index.tsx
│   │
│   └── main.tsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
└── README.md
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

### 5. Configure Firebase Authentication

In the Firebase Console:

1. Open the Firebase project.
2. Go to **Authentication**.
3. Open **Sign-in method**.
4. Enable **Phone** authentication.
5. Enable **Google** sign-in.
6. Configure the required authorized domains.
7. Verify that the environment variables are correctly configured.

### 6. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🗺️ Application Routes

| Route                 | Page               |
| --------------------- | ------------------ |
| `/`                   | Home               |
| `/explore`            | Explore            |
| `/search`             | Search             |
| `/cart`               | Cart               |
| `/favourites`         | Favourites         |
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

## 🧪 Testing

The project uses **Vitest** for automated testing.

Current tests cover important application logic, including:

* Cart reconciliation
* Search state behaviour
* Promotion logic

The search implementation also includes **stale-response protection**, ensuring that an older request cannot overwrite the result of a newer search request.

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
* Firebase authentication requires valid project configuration
* Automated test coverage currently focuses on core application logic rather than full end-to-end coverage

---

## 🔮 Future Improvements

With additional development time, the application could be extended with:

* Real backend/API integration
* Live inventory management
* Real payment gateway integration
* Order history and tracking
* User profiles and saved addresses
* Product reviews
* Coupon and promotional systems
* End-to-end testing
* Image optimization and lazy loading
* Admin dashboard and order management

---

## 👩‍💻 Author

**Priyanka Das**

Computer Science & Business Engineering Student

---

## 📄 License

This project was created for **educational and portfolio purposes**.
