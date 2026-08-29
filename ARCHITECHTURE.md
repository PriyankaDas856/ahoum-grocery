#  Architecture Overview

This document describes the architecture of the **Ahoum Grocery** web application, including its project structure, routing, state management, product data flow, authentication, reusable components, supporting services, responsive design, and testing approach.

The application is built as a React web application using **Vite and TypeScript**. The architecture follows a modular structure where pages handle screen-level composition, reusable components handle UI behaviour, API modules handle product data access, Zustand manages shared application state, and supporting utilities handle application-specific logic.

---

# 1. Technology Stack

The project uses the following technologies:

| Technology       | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| **React**        | User interface and component-based application structure |
| **Vite**         | Development server and production build tooling          |
| **TypeScript**   | Type-safe application development                        |
| **Tailwind CSS** | Utility-based styling and responsive layouts             |
| **Zustand**      | Global state management                                  |
| **React Router** | Client-side routing                                      |
| **Firebase**     | Google authentication                                    |
| **Vitest**       | Automated testing                                        |
| **localStorage** | Client-side persistence for selected application data    |

Reusable UI is implemented using the application's own React components and Tailwind CSS.

---

# 2. High-Level Architecture

The application follows a layered frontend architecture:

```text id="c7f4h2"
                         ┌──────────────────────┐
                         │       React UI       │
                         │  Pages + Components  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Zustand Stores    │
                         │ Cart / Favourite /   │
                         │ Search State         │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    ▼               ▼                ▼
              ┌──────────┐   ┌────────────┐   ┌────────────┐
              │   API    │   │  Browser   │   │  Firebase  │
              │  Layer   │   │  Storage   │   │    Auth    │
              └────┬─────┘   └────────────┘   └────────────┘
                   │
                   ▼
            ┌─────────────────┐
            │ Mock Product    │
            │ Data            │
            │ products.json   │
            └─────────────────┘
```

The main responsibilities are separated as follows:

* **Pages** compose complete application screens.
* **Components** provide reusable UI functionality.
* **Zustand stores** manage state shared between multiple screens.
* **API modules** provide product-related data access.
* **`lib/`** contains supporting application services and utilities.
* **React Router** controls navigation.
* **Firebase** handles Google authentication.
* **localStorage** provides browser-side persistence where required.
* **Vitest** verifies important application behaviour.

---

# 3. Project Structure

The current project is organized as follows:

```text id="b4m7ax"
ahoum-grocery/
│
├── public/
│   ├── images/
│   │   ├── apple-grape-juice.png
│   │   ├── auth.png
│   │   ├── bell-pepper-red.png
│   │   ├── beverages.png
│   │   ├── biscuit.png
│   │   ├── black-mustard-seed.png
│   │   ├── bourbon-biscuit.png
│   │   ├── chickpeas.png
│   │   ├── chicken-meat.png
│   │   ├── choco-cookies.png
│   │   ├── chocolates.png
│   │   ├── coca-cola-can.png
│   │   ├── Cooking Oil & Ghee.png
│   │   ├── cream-biscuit.png
│   │   ├── dark-chocolate.png
│   │   ├── diet-coke.png
│   │   ├── duck-meat.png
│   │   ├── egg-noodles.png
│   │   ├── egg-chicken-red.png
│   │   ├── egg-chicken-white.png
│   │   ├── egg-pasta.png
│   │   ├── fresh-fruits-&-vegetables.png
│   │   ├── fresh-milk.png
│   │   ├── ginger.png
│   │   ├── goat-meat.png
│   │   ├── green-gram.png
│   │   ├── grocery-person.png
│   │   ├── M&M.png
│   │   ├── maggie.png
│   │   ├── mayonnaise.png
│   │   ├── Meat & Fish.png
│   │   ├── milk-chocolate.png
│   │   ├── mustard-oil.png
│   │   ├── mustard-pulses.png
│   │   ├── natural-red-apple.png
│   │   ├── oat-milk.png
│   │   ├── orange-juice.png
│   │   ├── organic-bananas.png
│   │   ├── pepsi-can.png
│   │   ├── potato.png
│   │   ├── pulses.png
│   │   ├── ramen.png
│   │   ├── red-kidney-beans.png
│   │   ├── sprite-can.png
│   │   ├── sunflower-oil-bottle.png
│   │   └── white-chocolate.png
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
│   │   ├── promotions.test.ts
│   │   ├── promotions.ts
│   │   ├── reconcileCart.test.ts
│   │   └── reconcileCart.ts
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
│   │   ├── searchStore.test.ts
│   │   └── searchStore.ts
│   │
│   ├── styles/
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── ARCHITECTURE.md
├── DEBUGGING.md
├── DECISIONS.md
├── DESIGN_NOTES.md
├── PROMPT_LOG.md
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
└── vite.config.ts
```

The project separates static assets, API functionality, reusable components, application pages, global state, supporting services, routing, and styling.

---

# 4. Application Entry Point

The application starts through:

```text id="d5m7pp"
src/main.tsx
```

The entry flow is:

```text id="x0ck1z"
main.tsx
    │
    ▼
 App.tsx
    │
    ▼
 AppRouter
```

`App.tsx` acts as the application-level entry point while routing is handled separately inside:

```text id="5m8z4a"
src/router/index.tsx
```

This keeps application bootstrapping separate from routing concerns.

---

# 5. Routing Architecture

The project uses **React Router** for client-side navigation.

The router is defined in:

```text id="s4c5hv"
src/router/index.tsx
```

The application is divided into two major routing areas:

```text id="u9r1kw"
                         AppRouter
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       Onboarding / Auth            Main Application
              │                           │
              ▼                           ▼
    Splash → Welcome                  AppShell
                  │                      │
                  ▼                      ▼
                 Auth              Bottom Navigation
                  │
          ┌───────┼───────┐
          ▼       ▼       ▼
        Phone   Login   Signup
          │
          ▼
         OTP
          │
          ▼
       Location
          │
          ▼
         Home
```

The main application routes include:

```text id="kw8l5r"
/home
/explore
/category/:category
/product/:id
/search
/favourites
/account
/checkout
/checkout/:result
```

The main shopping experience is wrapped by `AppShell`, which provides the shared application layout and navigation.

---

# 6. Authentication Architecture

The authentication experience follows the onboarding flow:

```text id="r0j9p2"
Splash
   │
   ▼
Welcome
   │
   ▼
Authentication
   │
   ├───────────────┐
   │               │
   ▼               ▼
Phone            Google
   │               │
   ▼               ▼
Demo OTP       Firebase
   │           Google Auth
   ▼               │
OTP                │
   │               │
   └───────┬───────┘
           ▼
        Location
           │
           ▼
          Home
```

## Google Authentication

Google authentication is implemented using Firebase Authentication.

Firebase configuration is located in:

```text id="qj9d3k"
src/lib/firebase.ts
```

The authentication page handles the Google sign-in interaction.

## Phone Authentication

The phone-number interface remains part of the authentication flow, including:

* Country selection
* Country calling codes
* Phone number validation
* OTP verification screen

The current phone flow uses a **demo OTP implementation** rather than paid SMS delivery. This allows the complete authentication journey to be demonstrated without requiring a paid Firebase SMS configuration.

---

# 7. Global State Management

The application uses **Zustand** for global state management.

The Zustand stores are located in:

```text id="i5c4fw"
src/stores/
```

Current stores include:

```text id="h8y3zt"
stores/
├── cartStore.ts
├── favouriteStore.ts
└── searchStore.ts
```

These stores are separated by responsibility so that cart, favourite, and search state can evolve independently.

---

## 7.1 Cart Store

The cart store manages shopping-cart state shared across the application.

The general flow is:

```text id="x4q6ab"
Product Detail
      │
      │ Add product
      ▼
  cartStore
      │
      ├───────────────┐
      ▼               ▼
     Cart          Checkout
      │
      ▼
 Bottom Navigation
```

The cart store is responsible for:

* Adding products
* Removing products
* Updating quantities
* Calculating cart-related values
* Accessing current cart state
* Reconciling cart data when necessary

Cart persistence is supported through:

```text id="8x2jvb"
src/stores/cartStorage.ts
```

---

## 7.2 Favourite Store

The Favourite store manages products marked as favourites.

```text id="6n3hfw"
Product Detail
      │
      │ Favourite toggle
      ▼
favouriteStore
      │
      ▼
Favourite Page
```

This allows favourite state to be accessed across different pages without passing the state through multiple component levels.

---

## 7.3 Search Store

Search state is managed separately through:

```text id="q7v2na"
src/stores/searchStore.ts
```

The search store keeps search-related state separate from cart and product concerns.

This allows the search interface and search results to coordinate without relying on deeply nested component state.

A corresponding test file is located at:

```text id="s0f3ky"
src/stores/searchStore.test.ts
```

---

# 8. Product Data Architecture

Product-related functionality is separated into an API layer:

```text id="8j4q2x"
src/api/
├── client.ts
├── products.ts
└── types.ts
```

### `types.ts`

Defines TypeScript types used by the product system.

This provides a consistent structure for product information throughout the application.

### `products.ts`

Provides product-related data operations.

Pages and components use the API layer instead of directly coupling their UI to the underlying product data source.

### `client.ts`

Provides shared client functionality used by the data layer.

---

# 9. Product Data Source

Mock product data is stored under:

```text id="x9c4qp"
public/mock-data/products.json
```

The catalogue contains information such as:

* Product ID
* Product name
* Category
* Subcategory
* Price
* Unit
* Stock
* Product image
* Rating

Product images are stored separately under:

```text id="n4y8vk"
public/images/
```

This keeps product data and product assets separate from the React component implementation.

---

# 10. Category Architecture

Products are organized into major grocery categories:

```text id="q6s9vm"
Fresh Fruits & Vegetables
Cooking Oil & Ghee
Meat & Fish
Bakery & Snacks
Dairy & Eggs
Beverages
Pulses
Chocolates
```

Categories can contain subcategories.

For example:

```text id="k3x7pa"
Fresh Fruits & Vegetables
├── Fruits
└── Vegetables

Cooking Oil & Ghee
├── Cooking Oil
└── Ghee

Meat & Fish
├── Meat
└── Fish

Bakery & Snacks
├── Biscuits
├── Cookies
├── Noodles
└── Instant Noodles

Dairy & Eggs
├── Eggs
└── Milk

Beverages
├── Juice
└── Soft Drinks
```

Category-specific product listings are handled through:

```text id="y8p3sc"
src/pages/CategoryListing.tsx
```

Filtering functionality is handled through:

```text id="e7n2ka"
src/pages/Filters.tsx
```

---

# 11. Component Architecture

Reusable interface elements are organized under:

```text id="w7r1cx"
src/components/
```

Components are divided according to responsibility.

---

## 11.1 Layout Components

```text id="m8v4qz"
components/layout/
├── AppShell.tsx
└── BottomNav.tsx
```

### `AppShell.tsx`

Provides the shared application layout around the main shopping experience.

### `BottomNav.tsx`

Provides navigation between major application sections:

* Home
* Explore
* Cart
* Favourite
* Account

---

# 12. Product Components

Product-specific reusable components are located under:

```text id="n5k8cy"
components/product/
```

```text id="j3w6pt"
ProductCard.tsx
ProductCarousel.tsx
ProductGrid.tsx
QuantityControl.tsx
```

### `ProductCard`

Displays an individual product and its primary information.

### `ProductGrid`

Displays multiple products in a responsive grid.

### `ProductCarousel`

Displays products in horizontally scrollable sections such as:

* Exclusive Offer
* Best Selling

### `QuantityControl`

Provides reusable quantity adjustment functionality for products and cart items.

---

# 13. Page Architecture

The `pages/` directory contains complete application screens.

```text id="b2q9hx"
src/pages/
```

Pages are responsible for composing reusable components and connecting them to routing, API functions, and global state.

### Onboarding

```text
Splash.tsx
Welcome.tsx
```

### Authentication

```text
Auth.tsx
MobileNumber.tsx
Otp.tsx
Login.tsx
Signup.tsx
```

### Shopping

```text
Home.tsx
Explore.tsx
CategoryListing.tsx
ProductDetail.tsx
Search.tsx
```

### Cart & Checkout

```text
Cart.tsx
Checkout.tsx
CheckoutResult.tsx
```

### User Features

```text
Favourite.tsx
Account.tsx
Location.tsx
```

---

# 14. Home Page Data Flow

The Home page combines multiple application features:

```text id="u5p8ds"
                     Home.tsx
                         │
            ┌────────────┼──────────────┐
            ▼            ▼              ▼
        Product API  ProductCarousel  Categories
            │            │              │
            ▼            ▼              ▼
         Products    ProductCard     Category
            │
            ▼
      Exclusive Offer
      Best Selling
```

The Home page uses reusable product components rather than duplicating product-card markup.

---

# 15. Cart Data Flow

The cart follows a global-state architecture:

```text id="t9m4qa"
                    ProductDetail
                         │
                     Add to Cart
                         │
                         ▼
                     cartStore
                         │
                ┌────────┼────────┐
                ▼        ▼        ▼
               Cart   BottomNav  Checkout
                │
                ▼
          QuantityControl
```

This prevents cart information from being limited to a single page.

Cart persistence and reconciliation logic are kept separate from the visual components.

---

# 16. Search Data Flow

Search functionality is separated into UI, state, and data concerns:

```text id="a8n3cf"
Search Page
    │
    ▼
searchStore
    │
    ▼
Product / API Layer
    │
    ▼
Search Results
    │
    ▼
ProductCard
```

The search state is maintained through Zustand rather than being passed through multiple unrelated components.

The project also includes dedicated tests for search-store behaviour.

---

# 17. Supporting Logic

The `src/lib/` directory contains application-specific supporting functionality:

```text id="r6v2wp"
src/lib/
├── firebase.ts
├── mockLatency.ts
├── phoneAuth.ts
├── promotions.ts
├── promotions.test.ts
├── reconcileCart.ts
└── reconcileCart.test.ts
```

### Firebase

`firebase.ts` contains Firebase configuration used by authentication functionality.

### Phone Authentication

`phoneAuth.ts` contains phone-authentication-related implementation and supporting functions used by the authentication flow.

### Promotions

`promotions.ts` contains promotion-related application logic.

Corresponding tests are located in:

```text
promotions.test.ts
```

### Cart Reconciliation

`reconcileCart.ts` contains logic for reconciling persisted cart information with current product information.

Corresponding tests are located in:

```text
reconcileCart.test.ts
```

### Mock Latency

`mockLatency.ts` provides simulated latency for development and testing scenarios where delayed product responses are useful.

---

# 18. Testing Architecture

The project uses **Vitest** for automated testing.

Testing focuses on important application logic rather than only visual components.

Current test files include:

```text id="w3n8ka"
src/lib/promotions.test.ts
src/lib/reconcileCart.test.ts
src/stores/searchStore.test.ts
```

The tests cover:

* Promotion behaviour
* Cart reconciliation
* Search-store behaviour

The test suite can be executed with:

```bash
npm run test
```

Keeping business logic in separate modules makes it possible to verify important behaviour independently from the UI.

---

# 19. TypeScript Architecture

The application uses TypeScript throughout the React source code.

Product-related types are centralized in:

```text id="c2p8vq"
src/api/types.ts
```

This allows product information to maintain a consistent type definition across:

* API functions
* Pages
* Product components
* Stores
* Cart functionality

The project is configured for strict TypeScript checking.

The production build also performs TypeScript checking before creating the Vite production bundle:

```bash
npm run build
```

which executes:

```text
tsc -b
```

before the Vite build.

The project avoids using `any` for application data and instead uses explicit TypeScript types.

---

# 20. Styling Architecture

The application uses **Tailwind CSS** for styling.

Styling is primarily applied directly to React components using Tailwind utility classes.

For example:

```tsx
className="rounded-xl bg-[#53B175] px-4 py-3 text-white"
```

This allows components to remain relatively self-contained without introducing an external UI component framework.

Global CSS is located in:

```text id="w2m6pt"
src/index.css
```

Additional styling-related files are organized under:

```text id="k8x3vz"
src/styles/
```

---

# 21. Responsive Design

The application is designed to work across:

* Mobile screens
* Tablet-sized screens
* Desktop screens

Tailwind responsive utilities are used to adapt layouts.

The general approach is:

```text id="n9c2fx"
Mobile
  ↓
Compact product/category layouts

Tablet
  ↓
Expanded grid layouts

Desktop
  ↓
Larger grids and wider content containers
```

The same React application provides the responsive experience without maintaining separate mobile and desktop implementations.

---

# 22. Separation of Responsibilities

The architecture intentionally separates responsibilities between layers.

| Layer               | Responsibility                            |
| ------------------- | ----------------------------------------- |
| `pages/`            | Complete application screens              |
| `components/`       | Reusable UI elements                      |
| `stores/`           | Global shared state using Zustand         |
| `api/`              | Product data access and types             |
| `lib/`              | Supporting application logic and services |
| `router/`           | Application navigation                    |
| `public/mock-data/` | Mock catalogue data                       |
| `public/images/`    | Product and application images            |
| `hooks/`            | Reusable React hooks                      |
| `styles/`           | Additional styling                        |
| Test files          | Automated logic verification              |

This separation makes individual parts of the application easier to understand, test, and modify.

---

# 23. Overall Data Flow

The overall application flow can be summarized as:

```text id="h4y7mv"
                         User
                          │
                          ▼
                     React Pages
                          │
               ┌──────────┼──────────┐
               │          │          │
               ▼          ▼          ▼
          Components    Router    Zustand
               │                     │
               │            ┌────────┼────────┐
               │            ▼        ▼        ▼
               │          Cart   Favourite  Search
               │
               ▼
           API Layer
               │
               ▼
        Mock Product Data
               │
               ▼
        Product Catalogue
```

Authentication follows a separate supporting flow:

```text id="s5d9zn"
User
 │
 ▼
Splash
 │
 ▼
Welcome
 │
 ▼
Authentication
 │
 ├── Google ──► Firebase
 │
 └── Phone ──► Demo OTP
                 │
                 ▼
              Location
                 │
                 ▼
                Home
```

---

# 24. Architectural Principles

The project follows these principles:

### 1. Component Reuse

Repeated UI behaviour is implemented through reusable components rather than duplicated across pages.

### 2. Global State with Zustand

State that needs to be shared across multiple screens is handled through dedicated Zustand stores.

### 3. Separation of Data and UI

Product data access is separated from presentation components through the API layer.

### 4. Type Safety

TypeScript types are used throughout the application to make data structures explicit and reduce type-related runtime errors.

### 5. Simple Frontend Architecture

The project avoids unnecessary architectural layers and dependencies beyond what is required for the application's scope.

### 6. Testable Business Logic

Important non-visual logic such as promotions, cart reconciliation, and search state is kept in separate modules so it can be tested independently.

### 7. Responsive Design

Tailwind CSS responsive utilities are used so that the same application adapts to different screen sizes.

---

# 25. Architecture Summary

Ahoum Grocery is a modular **React + Vite** web application structured around reusable pages and components, a dedicated API/data layer, Zustand-based global state management, Firebase Google authentication, and browser-based persistence.

The overall architecture is:

```text id="q8v5mn"
React + Vite
     │
     ├── React Router
     │
     ├── Pages
     │    ├── Onboarding
     │    ├── Authentication
     │    ├── Shopping
     │    ├── Cart
     │    └── Checkout
     │
     ├── Components
     │    ├── Layout
     │    ├── Product
     │    ├── Cart
     │    └── UI
     │
     ├── Zustand
     │    ├── Cart Store
     │    ├── Favourite Store
     │    └── Search Store
     │
     ├── API
     │    ├── Client
     │    ├── Products
     │    └── Types
     │
     ├── Supporting Logic
     │    ├── Firebase
     │    ├── Promotions
     │    ├── Cart Reconciliation
     │    └── Mock Latency
     │
     ├── Mock Product Data
     │
     └── Vitest Tests
```

The primary user journey is:

```text id="v2c7za"
Splash
  ↓
Welcome
  ↓
Authentication
  ↓
Phone / Google
  ↓
Location
  ↓
Home
  ↓
Explore
  ↓
Category
  ↓
Product Details
  ↓
Cart
  ↓
Checkout
  ↓
Checkout Result
```

The architecture is intentionally **modular, lightweight, and separated by responsibility**, while remaining appropriate for the project's scope.

The major architectural boundaries are:

* **React Router** → navigation
* **Pages** → screen-level composition
* **Reusable Components** → shared UI behaviour
* **Zustand** → shared application state
* **React state/hooks** → local component state
* **API layer** → product data access
* **Firebase** → Google authentication
* **Demo OTP** → phone-login demonstration
* **localStorage** → browser-side persistence
* **Tailwind CSS** → styling and responsive behaviour
* **Vitest** → automated logic verification

The architecture also provides clear extension points for future backend integration, live inventory, real payment processing, order management, additional authentication methods, and broader automated testing.
