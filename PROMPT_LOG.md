#  Prompt Log

This document records how AI assistance was used during the development of **Ahoum Grocery**.

AI was used selectively as a development-support tool for tasks such as debugging, understanding technical errors, evaluating implementation approaches, improving responsive behaviour, and reviewing technical decisions.

The application was designed, implemented, integrated, tested, and verified as part of the project development process. AI suggestions were treated as **supporting guidance rather than final implementations**. Suggestions were reviewed against the existing project structure and requirements, modified where necessary, implemented, and verified through testing.

---

# 1. Firebase Authentication Import Error

### Tool / Model

**ChatGPT**

### Problem

While working on the authentication implementation, the browser displayed:

```text
Uncaught SyntaxError: The requested module
'/node_modules/.vite/deps/firebase_auth.js'
does not provide an export named 'ConfirmationResult'
```

The application could not load the authentication flow correctly.

### Assistance Requested

I asked ChatGPT to help identify why the Firebase Authentication module was failing to import `ConfirmationResult`.

### What AI Helped With

AI helped identify that `ConfirmationResult` should be treated as a **TypeScript type** rather than as a runtime Firebase export.

### What I Did

I inspected the existing Firebase authentication implementation and changed the import to use the appropriate TypeScript type-import approach.

The existing authentication structure was retained rather than replacing the implementation entirely.

### Verification

I restarted the Vite development server and tested the authentication screens again.

The module import error was no longer present.

---

# 2. Firebase Phone Authentication Investigation

### Tool / Model

**ChatGPT**

### Problem

The original implementation attempted to use Firebase Phone Authentication to send real OTP messages.

During testing, Firebase returned:

```text
auth/billing-not-enabled
```

The browser console also showed the Firebase Phone Authentication request failing.

### Assistance Requested

I asked ChatGPT to help interpret the Firebase error and determine whether the problem was caused by the frontend implementation or Firebase configuration.

### What AI Helped With

AI helped explain that Firebase Phone Authentication requires the appropriate Firebase configuration and that real SMS authentication may require billing.

### What I Decided

Instead of introducing a paid SMS dependency, I decided to change the authentication flow to a **demo OTP implementation**.

The existing phone-number screen was retained because it is part of the intended application flow.

The following functionality was also retained:

* Country selector
* Country flags
* Country calling codes
* Phone-number validation

### Final Implementation

The phone authentication flow became:

```text
Phone Number
     ↓
Demo OTP
     ↓
123456
     ↓
Location
```

The demo verification code is:

```text
123456
```

If an incorrect code is entered, the application displays an appropriate validation message.

This allows the complete phone-authentication experience to be demonstrated without requiring paid SMS delivery.

### Verification

I tested:

* Country selection
* Country calling-code changes
* Phone-number validation
* Navigation to the OTP screen
* Correct demo code
* Incorrect OTP handling
* Navigation to Location after successful verification

The final implementation no longer depends on Firebase SMS delivery.

---

# 3. Google Authentication

### Tool / Model

**ChatGPT**

### Problem

Google Sign-In needed to be integrated into the authentication screen using the existing Firebase configuration.

### Assistance Requested

I asked for guidance on implementing Google Sign-In using the Firebase Authentication SDK while preserving the existing UI and navigation structure.

### What AI Helped With

AI provided guidance on:

* `GoogleAuthProvider`
* `signInWithPopup`
* Loading states
* Authentication error handling
* Redirecting the user after successful authentication

### What I Did

I integrated the Firebase Google authentication flow into the existing `Auth.tsx` screen.

The authentication UI, button styling, loading behaviour, error handling, and routing were adapted to the application's existing design rather than copied directly.

### Verification

I tested the Google Sign-In flow and verified that successful authentication navigates the user to the next stage of the application flow.

---

# 4. Favourite Route Mismatch

### Tool / Model

**ChatGPT**

### Problem

The Favourite page was not consistently reachable because different parts of the application used different route names:

```text
/favourite
```

and:

```text
/favourites
```

React Router treats these as separate routes.

### Assistance Requested

I asked ChatGPT to help identify why the Favourite page was not resolving correctly.

### What AI Helped With

AI helped identify that the two paths represented different React Router routes.

### What I Did

I inspected the router and navigation components and standardized the Favourite route throughout the application.

The router and navigation references were updated to use the same route.

### Verification

I tested:

* Direct navigation to the Favourite page
* Bottom navigation
* Product favourite toggling
* Adding a product to favourites
* Viewing the product from the Favourite page

The Favourite navigation then behaved consistently.

---

# 5. Responsive Layout Improvements

### Tool / Model

**ChatGPT**

### Problem

The initial implementation was primarily designed around the mobile layout.

When viewed on larger desktop screens, some sections did not use the available space effectively.

### Assistance Requested

I asked ChatGPT for suggestions on improving the responsive layout while maintaining the existing design direction and Figma reference.

### What AI Helped With

AI suggested approaches involving:

* Tailwind responsive breakpoints
* Desktop-specific spacing
* Responsive product grids
* Maximum content widths
* Responsive hero sizing
* Desktop adaptations of mobile layouts

### What I Did

I reviewed the suggestions and applied only the changes that fit the existing application.

I manually adjusted:

* Container widths
* Grid columns
* Spacing
* Product card sizing
* Hero dimensions
* Category layouts
* Authentication layout
* Desktop and mobile breakpoints

The original design direction was retained rather than replacing the interface with a new design.

### Verification

I tested the application at different viewport sizes and checked:

* Home
* Explore
* Categories
* Product sections
* Authentication
* Navigation
* Cart
* Checkout

The layouts were adjusted to behave appropriately across mobile and desktop screens.

---

# 6. Authentication UI and Hero Image

### Tool / Model

**ChatGPT**

### Problem

The authentication page needed to match the provided mobile reference while also maintaining a suitable desktop layout.

The original authentication hero used individual emoji elements instead of the intended grocery image.

### Assistance Requested

I asked ChatGPT to help adapt the authentication hero section so that the provided grocery image would appear correctly on mobile and desktop.

### What AI Helped With

AI provided suggestions for:

* Responsive hero height
* Image positioning
* `object-contain`
* Mobile and desktop breakpoints
* Keeping the image at the top of the page on desktop

### What I Did

I integrated the project asset:

```text
/public/images/auth.png
```

and adjusted its responsive styling to match the intended reference.

The authentication content remains below the image on both mobile and desktop rather than moving the image to the side on desktop.

### Verification

I tested the authentication screen at mobile and desktop viewport sizes and adjusted the image sizing and spacing accordingly.

---

# 7. Splash Screen and Application Entry Flow

### Tool / Model

**ChatGPT**

### Problem

The application needed a dedicated splash screen before the welcome and authentication experience.

### Assistance Requested

I asked for help implementing the splash screen as the first screen shown when the application starts.

### What I Did

I integrated the splash screen into the existing React Router structure and updated the application entry route.

The intended application flow became:

```text
Splash
   ↓
Welcome
   ↓
Authentication
   ↓
Phone Number / Google
   ↓
Location
   ↓
Home
```

### Verification

I started the application from the root route and verified that the splash screen appears before the welcome page.

I also tested navigation through the complete onboarding and authentication flow.

---

# 🔍 AI-Assisted Code Review

AI was also used selectively for code review and implementation checks.

Examples included:

* Checking TypeScript errors
* Reviewing React component structure
* Checking React Router navigation
* Reviewing asynchronous request handling
* Checking loading and error states
* Reviewing responsive Tailwind classes
* Understanding browser console errors
* Checking Firebase error messages
* Reviewing state-management implementation

These reviews were used as supporting feedback rather than as replacements for implementation or testing.

---

# 🧪 Manual Development and Verification

The project was developed through an iterative implementation and testing process.

The general workflow was:

```text
1. Understand the required feature or screen
          ↓
2. Implement the feature
          ↓
3. Run the development server
          ↓
4. Test the feature manually
          ↓
5. Inspect browser / terminal errors
          ↓
6. Identify the affected area
          ↓
7. Use AI assistance when useful
          ↓
8. Review the suggested solution
          ↓
9. Modify and integrate the solution
          ↓
10. Retest the affected feature
          ↓
11. Check related functionality
```

This process was repeated throughout development.

---

# 💬 Examples of Prompts Used

The following are representative examples of the type of assistance requested during development.

## Debugging

```text
Why is Firebase Authentication giving this module import error?
ConfirmationResult is not exported from firebase/auth.
Explain the correct TypeScript import and what needs to change.
```

## Firebase Error Investigation

```text
Firebase Phone Authentication is returning
auth/billing-not-enabled.
Explain what this error means and whether the problem
is in my frontend implementation or Firebase configuration.
```

## Responsive Design

```text
The mobile layout matches the reference, but the desktop
version does not use the available space properly.
Suggest Tailwind responsive changes without redesigning
the existing page.
```

## Routing

```text
My Favourite page works at one route but not another.
Help me identify why React Router is not resolving
the Favourite navigation consistently.
```

## Authentication UI

```text
I need the authentication hero image to remain at the top
on both mobile and desktop. Help me make the image responsive
without moving it to the side on desktop.
```

## Splash Screen

```text
I want the splash screen to appear before the welcome page
when the application starts. Show how to integrate it into
the existing React Router flow.
```

The prompts were used to obtain technical explanations and implementation guidance, after which the resulting suggestions were reviewed and adapted to the actual project.

---

# 🔧 What I Changed After AI Suggestions

AI suggestions were not always used exactly as provided.

Implementation decisions were made based on:

* Project requirements
* Existing code structure
* Figma reference
* Firebase limitations
* Browser and terminal errors
* Manual testing
* Responsive behaviour
* Required technology stack

For example, the original Firebase Phone Authentication approach was changed after testing showed that real SMS authentication would require billing.

Rather than forcing that implementation into the project, I replaced the SMS-dependent portion with a demo OTP flow while preserving the intended authentication experience.

Similarly, responsive layout suggestions were adapted to the existing UI instead of replacing the application's design.

---

# 🤝 AI Usage Approach

AI was used as a **development assistant**, not as the sole developer of the application.

The final implementation involved:

* Manual project setup
* React component development
* TypeScript implementation
* Tailwind styling
* React Router configuration
* Zustand state management
* Product and cart functionality
* Authentication integration
* Responsive layout implementation
* Testing and debugging
* Error investigation
* Manual verification

AI assistance was mainly used when a second technical perspective, debugging explanation, or implementation suggestion was useful.

All significant AI-assisted changes were reviewed, integrated into the existing project, and tested before being kept.

The final code reflects the project's requirements and implementation decisions rather than unreviewed AI-generated output.
