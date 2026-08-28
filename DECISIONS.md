# DESIGN & TECHNICAL DECISIONS

This document records important technical and design decisions made during
the development of Ahoum Grocery. Each decision was made based on the
requirements of the application, usability, maintainability, and the
limitations of the current implementation.

---

## 1. Responsive Mobile and Desktop Design

### Problem

The application needed to provide a good experience on both mobile and
desktop screens. A layout designed only for mobile would leave excessive
empty space on larger screens, while maintaining completely separate mobile
and desktop interfaces would increase implementation and maintenance effort.

### Options Considered

1. Build separate layouts for mobile and desktop.
2. Use a single responsive layout with Tailwind CSS breakpoints.

### Decision

I chose to use a single responsive implementation with Tailwind CSS
breakpoints.

The same components are used across screen sizes, while spacing, sizing,
grids, typography, and layout behaviour change at larger breakpoints.

### Trade-off

This reduces duplicated code and keeps the application easier to maintain,
but requires additional responsive styling and testing to ensure that the
interface works correctly at different viewport sizes.

---

## 2. Zustand for Cart and Favourite State

### Problem

Cart and Favourite data need to be accessed by multiple components and
pages. For example, a product can be added to the cart from a Product Card
or Product Detail page and then viewed from the Cart page.

### Options Considered

1. Keep state inside individual components.
2. Use React Context.
3. Use Zustand for shared application state.

### Decision

I chose Zustand for managing the cart and favourite state.

Separate stores are used for cart and favourite functionality:

- `cartStore.ts`
- `favouriteStore.ts`

This allows product cards, product details, the cart, and favourites page
to access the same state without passing data through multiple component
levels.

### Trade-off

Zustand introduces an additional state-management dependency, but it keeps
shared state simple and avoids unnecessary prop drilling as the application
grows.

---

## 3. Selectable Country Code for Phone Authentication

### Problem

The initial phone authentication interface used a fixed country code.
This limited the authentication flow to one country and did not provide a
good user experience for users from different countries.

### Options Considered

1. Keep a fixed country code.
2. Allow users to select their country and calling code.

### Decision

I chose to provide a country-code selector.

The phone number screen allows the user to select a country, displays its
flag and calling code, and validates the expected phone-number length.

### Trade-off

A country selector adds additional UI and validation logic, but makes the
authentication flow more flexible and better suited to a wider range of
users.

---

## 4. Local Persistence for Location and Favourites

### Problem

Some user selections should remain available after refreshing the browser.
Losing the selected delivery location or favourite products on every refresh
would make the shopping experience inconvenient.

### Options Considered

1. Store the data only in React component state.
2. Store the data in `localStorage`.
3. Implement a backend database for persistent user data.

### Decision

For the current project, I chose local browser persistence.

The selected delivery location is stored in `localStorage`, while the
Favourite store uses persistent client-side state.

### Trade-off

This provides persistence without requiring a backend database, but the
data is tied to the user's browser and is not synchronized across devices.

A production version would move user-specific data to a backend.

---

## 5. Product Data and Client-Side Filtering

### Problem

The application needs product browsing, category filtering, search, and
product details, but the current project does not have a production backend
or database.

### Options Considered

1. Build a backend and database immediately.
2. Use a local/static product data source and handle filtering on the client.
3. Use a third-party grocery API.

### Decision

I chose to use the existing product API/data layer and perform the required
product filtering and presentation on the client side.

This keeps the current project focused on the frontend shopping experience
while keeping the product access logic separated inside the `api` layer.

### Trade-off

The approach is simpler and faster to develop, but it does not provide
real-time inventory or server-side filtering. A production application
would require a proper backend and database.

---

## Conclusion

These decisions were made to balance usability, responsive design,
maintainability, and the scope of the current project.

The architecture also leaves room for future improvements such as a
production backend, real-time inventory, payment processing, and
server-side user data persistence.