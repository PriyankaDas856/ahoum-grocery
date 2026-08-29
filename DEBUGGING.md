#  Debugging Log

This document records significant issues encountered during the development and testing of **Ahoum Grocery**, including their symptoms, investigation, root causes, resolutions, and verification steps.

Issues were identified through development-server errors, browser console messages, manual testing, code inspection, network responses, and configuration checks. AI assistance was used selectively when additional technical clarification or a second perspective was required. All suggested fixes were independently verified through implementation and testing.

---

## 1. Firebase Authentication Import Error

### Symptom

While implementing Firebase authentication, the application failed to load and the browser console displayed:

```text
Uncaught SyntaxError: The requested module
'/node_modules/.vite/deps/firebase_auth.js'
does not provide an export named 'ConfirmationResult'
```

Because the module failed during initialization, the authentication screen could not be loaded.

### Diagnosis

I first inspected the browser console to identify the source of the module failure.

I then reviewed the Firebase authentication implementation and examined how `ConfirmationResult` was being imported.

The error indicated that `ConfirmationResult` was being interpreted as a runtime export when it should instead be treated as a TypeScript type.

The Firebase SDK documentation and TypeScript import behaviour were reviewed to confirm the correct approach.

### Root Cause

`ConfirmationResult` had been imported as a runtime value instead of being handled as a TypeScript type.

The issue was therefore caused by the import implementation rather than the Firebase project configuration.

### Fix

The authentication implementation was updated so that `ConfirmationResult` was imported using type-only syntax.

Runtime Firebase imports and TypeScript type imports were separated appropriately.

### Verification

The Vite development server was restarted and the application was loaded again.

The module import error no longer appeared in the browser console, and the authentication screen loaded successfully.

---

## 2. Firebase Phone Authentication Billing Error

### Symptom

During testing of the original Firebase Phone Authentication implementation, the application successfully displayed the reCAPTCHA verification step but failed when attempting to send the SMS verification code.

The browser console displayed:

```text
FirebaseError: Firebase: Error (auth/billing-not-enabled).
```

The Firebase request to the `sendVerificationCode` endpoint returned a `400` response.

### Diagnosis

I first inspected the browser console and confirmed that reCAPTCHA was completing successfully.

This established that the failure was occurring after reCAPTCHA and during Firebase's attempt to send the SMS verification code.

The Firebase error explicitly indicated that billing was not enabled for the project. Since the application was intended to be demonstrated without requiring paid SMS services, enabling paid Firebase Phone Authentication was not appropriate for the final implementation.

### Root Cause

The original phone authentication implementation depended on Firebase's SMS-based Phone Authentication service.

The Firebase project did not have billing enabled, preventing Firebase from completing the SMS verification request.

The issue was therefore related to the Firebase Phone Authentication service requirements rather than the phone-number input interface.

### Fix

Firebase Phone Authentication was removed from the final phone-login flow.

The application was changed to use a **local demo OTP system** instead.

The updated phone authentication flow:

* Keeps the country selector
* Keeps country flags and country codes
* Validates the expected number of digits for the selected country
* Accepts the entered phone number without sending an SMS
* Does not use Firebase Phone Authentication
* Does not initialize Firebase reCAPTCHA
* Uses the fixed demo verification code:

```text
123456
```

An incorrect six-digit code displays an appropriate validation message informing the user that the demo code is `123456`.

### Verification

The updated phone authentication flow was tested using the available country options.

A valid-length phone number successfully proceeded to the OTP screen without making a Firebase SMS authentication request.

The OTP screen was tested with both incorrect and correct codes:

* An incorrect code displayed the expected validation error.
* Entering `123456` successfully completed the demo authentication flow.
* The user was redirected to the Location page after successful verification.

This confirmed that the phone-login demonstration no longer depended on Firebase SMS billing.

---

## 3. Google Authentication Navigation Issue

### Symptom

Google authentication successfully opened the Google account-selection interface and completed authentication, but the application did not proceed through the intended onboarding flow.

During testing, the application could return to the authentication page instead of continuing to the next required step.

### Diagnosis

I inspected the Google authentication handler and the application's routing configuration.

The authentication implementation was navigating directly to the Home page after successful Google authentication.

However, the intended application flow requires both phone and Google users to complete the Location step before accessing Home.

I also inspected the router to confirm that `/auth/location` was registered as the Location page route.

### Root Cause

The post-authentication navigation target did not match the intended application flow.

The authentication handler was navigating to:

```text
/home
```

instead of:

```text
/auth/location
```

### Fix

The successful Google authentication handler was updated to navigate to:

```text
/auth/location
```

after Firebase confirmed that the Google user had been authenticated.

Google authentication itself continues to use Firebase Authentication.

### Verification

Google authentication was tested again on the deployed application.

After successfully selecting a Google account:

1. The user was redirected to the Location page.
2. The Location step was completed.
3. The user was then able to continue to Home.

The final Google authentication flow is:

```text
Google Authentication
        ↓
     Location
        ↓
       Home
```

---

## 4. Favourite Page Route Mismatch

### Symptom

The Favourite page did not behave consistently when accessed through different parts of the application.

Some parts of the application referenced:

```text
/favourites
```

while another part used:

```text
/favourite
```

React Router treated these as different routes.

### Diagnosis

I inspected the URL displayed in the browser and compared it with the routes defined in:

```text
src/router/index.tsx
```

I then inspected:

```text
src/components/layout/BottomNav.tsx
```

to determine which route was being used by the Favourite navigation item.

This showed that the Favourite component itself was not the primary issue. The problem was an inconsistent route name between the router and navigation components.

### Root Cause

The application contained inconsistent route naming:

```text
/favourite
```

and:

```text
/favourites
```

React Router does not treat these paths as equivalent.

### Fix

The Favourite route was standardized across the application.

The final application uses:

```text
/favourite
```

as the Favourite page route.

References in the relevant navigation and routing components were updated to use the same path.

### Verification

The Favourite functionality was tested by:

* Opening the Favourite route directly
* Navigating to Favourite through the bottom navigation
* Adding a product to favourites from the Product Details page
* Confirming that the selected product appeared on the Favourite page
* Navigating away from and back to the Favourite page

The Favourite page and navigation then behaved consistently.

---

## 5. Deployed Application Routing Issue

### Symptom

During testing of the deployed Vercel application, opening certain routes directly on a mobile device resulted in a `404` page, even though navigating to the same routes from within the application worked correctly.

### Diagnosis

I compared the application's behaviour when:

1. Navigating between pages using React Router
2. Refreshing a page after navigating to it
3. Opening a nested route directly from the browser

The application uses React Router with client-side routing. Routes such as:

```text
/home
/explore
/category/...
/product/...
```

are handled by the React application rather than by separate physical HTML files.

### Root Cause

The deployed application server needed to redirect unknown frontend routes to the application's main entry point so that React Router could resolve the requested route.

Without the appropriate SPA fallback behaviour, directly opening a nested route could result in a server-side `404`.

### Fix

The deployment configuration was reviewed and updated so that client-side routes were handled correctly by the deployed application.

### Verification

The deployed application was tested on both desktop and mobile devices.

The following scenarios were tested:

* Opening the application normally
* Navigating through application links
* Refreshing nested routes
* Opening deployed routes directly

The application was then able to resolve React Router routes correctly instead of returning a deployment-level `404`.

---

# Debugging Approach

For significant issues, I followed a structured debugging process:

### 1. Reproduce the Problem

I first reproduced the issue to confirm that it was consistent and identifiable.

### 2. Read the Error Carefully

Browser console errors, development-server messages, network responses, and visible application behaviour were examined before making changes.

### 3. Identify the Affected Layer

The issue was classified according to the part of the system involved:

* UI
* Routing
* Authentication
* State management
* Firebase configuration
* Deployment configuration

### 4. Inspect the Relevant Code

Only the files directly related to the problem were inspected before making changes.

### 5. Identify the Root Cause

The objective was to determine **why** the issue occurred rather than simply changing code until the visible error disappeared.

### 6. Check Configuration When Necessary

For authentication and deployment issues, relevant external configuration was checked separately from the frontend implementation.

### 7. Use Documentation or AI Assistance When Required

Technical documentation and AI assistance were used when additional clarification was necessary.

AI suggestions were treated as guidance and were verified through actual implementation and testing rather than being accepted automatically.

### 8. Apply the Smallest Appropriate Fix

Changes were limited to the affected functionality wherever possible to avoid introducing unrelated changes.

### 9. Restart and Retest

The application was restarted or rebuilt when necessary, and the affected feature was tested again.

### 10. Test From the User's Perspective

Final verification was performed through the actual application interface rather than relying only on the absence of console errors.

---

## Conclusion

The debugging process focused on identifying **root causes rather than symptoms**.

The issues encountered covered multiple layers of the application, including TypeScript imports, Firebase configuration, authentication flow, React Router navigation, and production deployment. Each fix was followed by targeted verification to ensure that the affected functionality worked as intended.
