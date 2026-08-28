🛒 Ahoum Grocery

A responsive grocery shopping web app built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

Ahoum Grocery delivers a mobile-first grocery shopping experience that adapts cleanly to desktop, covering product browsing, categories, favourites, cart management, authentication, location selection, and checkout.

✨ Features
🏠 Home
Grocery store landing page
Promotional banner
Exclusive Offers section
Best Selling products
Grocery categories
Location-based display
🔎 Product Discovery
Browse all products / by category
Search with live filtering
Responsive product grids and carousels
🛍️ Shopping Cart
Add products to cart
Increase/decrease quantities, stock-aware controls
Cart item management
Checkout flow with success/failure result states
❤️ Favourites
Add/remove products from favourites
Persists across refresh
Dedicated Favourites page
📦 Product Details
Images, price, quantity controls, description
Nutrition information, ratings and reviews
Favourite + Add to Basket actions
🔐 Authentication
Welcome / Login / Signup
Mobile number entry with country code selection
OTP verification via Firebase Phone Authentication
📍 Location
City and area selection
Saved delivery location shown on Home
📱 Responsive Design

Layouts and navigation adapt across mobile, tablet, and desktop breakpoints.

🛠️ Tech Stack
Technology	Purpose
React	UI development
TypeScript	Type safety (strict mode)
Vite	Dev server and build tooling
Tailwind CSS	Styling and responsive layout
React Router	Routing
Zustand	Cart and favourites state management
Firebase	Phone authentication
Vitest	Testing
ESLint	Code quality
📂 Project Structure
text
src/
├── api/
│   ├── products.ts
│   └── types.ts
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   └── BottomNav.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductCarousel.tsx
│       ├── ProductGrid.tsx
│       └── QuantityControl.tsx
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
├── stores/
│   ├── cartStore.ts
│   └── favouriteStore.ts
├── router/
│   └── index.tsx
├── firebase/
│   └── ...
└── main.tsx
🏗️ Architecture Summary
State: Zustand is used exclusively for global state, split into separate stores by concern — cartStore and favouriteStore — rather than one monolithic store, so each slice can be persisted and reasoned about independently.
Persistence: cart and favourites are written to localStorage via Zustand's persist middleware, so both survive a refresh. On load, persisted cart items are checked against the current product data before being trusted (see Known Limitations for what's not yet covered here).
Data layer: src/api/ wraps all product access behind typed functions rather than components calling fetch/mock data directly, so the data source can change without touching UI code.
Routing: React Router owns all navigation; there is no use of Context API or Redux/MobX for global state, per the assignment constraints.
Auth: Firebase Phone Authentication handles OTP-based login; auth state gates the /auth/* flow but does not block browsing the catalog.
🚀 Getting Started
1. Clone the repository
bash
git clone https://github.com/PriyankaDas856/ahoum-grocery.git
2. Navigate into the project
bash
cd ahoum-grocery
3. Install dependencies
bash
npm install
4. Configure environment variables

Create a .env file in the project root:

env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

⚠️ Do not commit your .env file to GitHub. Confirm .gitignore includes:

gitignore
.env
.env.local
.env.*.local
5. Start the development server
bash
npm run dev

The app will be available at the local Vite dev URL shown in your terminal.

🔥 Firebase Setup

Phone authentication uses Firebase Authentication.

Open your Firebase project → Authentication.
Go to Sign-in method and enable Phone.
Configure the required authorized domains.
Add your Firebase config values to .env.
📜 Available Scripts
Command	Description
npm run dev	Start the Vite development server
npm run build	Create a production build
npm run preview	Preview the production build locally
npm run lint	Run ESLint
npm run test	Run the Vitest test suite
🧠 State Management

Zustand manages client-side state for:

Shopping cart (items, quantities)
Favourites

Favourites and cart both persist locally, so saved state survives a page refresh.

🗺️ Application Routes
Route	Page
/	Home
/explore	Explore
/search	Search
/cart	Cart
/favourite	Favourites
/account	Account
/category/:category	Category Listing
/product/:id	Product Details
/checkout	Checkout
/checkout/:result	Checkout Result
/welcome	Welcome
/auth	Authentication
/auth/phone	Mobile Number
/auth/otp	OTP Verification
/auth/location	Location Selection
/login	Login
/signup	Signup
🎨 Design
Green primary branding
Product-focused cards
Responsive layouts, mobile bottom navigation
Desktop-friendly grid and cart/checkout layout
Interactive product controls with visible focus states for keyboard use
⚠️ Known Limitations
Uses mock/local product data — no real backend or live inventory.
Firebase phone auth requires a configured Firebase project; it will not work out of the box without .env values filled in.
No automated end-to-end test coverage beyond the search/cart logic tests included.
No payment integration — checkout success/failure states are simulated.
🔮 What I'd Improve With Another Day
Real backend/API integration in place of mock JSON data.
Persisted-cart reconciliation against live stock/price on every load, with a visible "items updated" notice rather than a silent adjustment.
Broader automated test coverage (component + integration, not just store logic).
Order history and a real payment flow.
Performance pass on product image loading for the desktop grid.
👩‍💻 Author

Priyanka Das Computer Science & Business Engineering Student

📄 License

This project is intended for educational and portfolio purposes.
