#  Debugging Log

This document records significant issues encountered during the development and testing of **Ahoum Grocery**, along with the investigation, root cause, fix, and verification process for each issue.

Issues were identified through a combination of development-server errors, browser console messages, manual testing, code inspection, and configuration checks. AI assistance was used when additional technical clarification or a second perspective was useful, rather than as a substitute for debugging and verification.

---

## 1. Firebase Authentication Import Error

### Symptom

While implementing Firebase Phone Authentication, the application failed to load and the browser console displayed:

```text
Uncaught SyntaxError: The requested module
'/node_modules/.vite/deps/firebase_auth.js'
does not provide an export named 'ConfirmationResult'
```

Because the module failed during initialization, the application could not proceed to the authentication screen.

### Diagnosis

I first inspected the browser console to determine whether the issue originated from Firebase configuration or the authentication implementation.

I then reviewed the Firebase authentication file and the imports being used. The error indicated that `ConfirmationResult` was being treated as a runtime module export when it should instead be handled as a TypeScript type.

I compared the implementation with the Firebase SDK API and TypeScript import behaviour to confirm how the type should be referenced.

### Root Cause

`ConfirmationResult` had been imported as a runtime value instead of being treated as a type.

The problem was therefore related to the Firebase SDK import rather than the Firebase project configuration.

### Fix

I corrected the authentication implementation and changed the `ConfirmationResult` import/usage so that it was handled correctly by the TypeScript and Firebase setup.

### Verification

I restarted the Vite development server and loaded the application again.

The module import error no longer appeared in the browser console, and the authentication flow loaded successfully.

---

## 2. Phone Authentication OTP Not Arriving

### Symptom

The phone authentication flow appeared to work from the application's perspective. Firebase indicated that a verification code was being sent, but the OTP did not arrive on the test phone.

At this point, it was unclear whether the problem was caused by the React implementation or Firebase configuration.

### Diagnosis

I first verified the frontend authentication flow and confirmed that the phone number was being passed correctly to Firebase.

Instead of repeatedly modifying the frontend code, I checked the Firebase Console and reviewed the authentication configuration separately.

The Phone sign-in provider and related Firebase authentication settings were then checked.

### Root Cause

The issue was related to the Firebase Phone Authentication configuration rather than the phone-number input component.

The frontend was successfully initiating the authentication request, but the Firebase project still required the appropriate authentication configuration for the OTP flow to function correctly.

### Fix

I enabled and configured **Phone Authentication** in the Firebase project and verified the authentication settings.

I also checked that the Firebase configuration values used by the application matched the configured Firebase project.

### Verification

I tested the phone authentication flow again.

The authentication request proceeded through the expected phone verification process instead of failing at the configuration stage, confirming that the Firebase setup was being recognized correctly.

---

## 3. Favourite Page Route Mismatch

### Symptom

After implementing the Favourite page, navigation to the page did not behave consistently.

One part of the application was using:

```text
/favourites
```

while the application router defined:

```text
/favourite
```

Because these are different paths, React Router could not resolve them as the same route.

### Diagnosis

I checked the URL in the browser and compared it with the routes defined in:

```text
src/router/index.tsx
```

I then inspected:

```text
src/components/layout/BottomNav.tsx
```

to determine which path was being used by the Favourite navigation item.

This showed that the Favourite component itself was not the problem. Different parts of the application were simply using different route names.

### Root Cause

A route naming inconsistency existed between:

```text
/favourite
```

and:

```text
/favourites
```

React Router treats these as separate routes, so the mismatch prevented consistent navigation.

### Fix

I standardized the Favourite route and updated the relevant router and navigation references to use the same path.

The final application uses:

```text
/favourite
```

as the Favourite page route.

### Verification

I tested the Favourite page by:

* Opening the route directly
* Navigating through the bottom navigation
* Adding a product to favourites from the Product Details page
* Confirming that the selected product appeared on the Favourite page

The navigation and Favourite functionality then behaved consistently.

---

#  Debugging Approach

For significant issues, I followed a structured debugging process:

1. **Reproduce the problem** to confirm the issue consistently occurs.
2. **Read the error carefully**, using browser console or terminal output where applicable.
3. **Identify the affected layer**, such as UI, routing, state management, authentication, or configuration.
4. **Inspect the relevant code** rather than modifying unrelated parts of the application.
5. **Isolate the root cause** before applying a fix.
6. **Consult documentation or use AI assistance** when additional technical clarification was required.
7. **Apply the smallest appropriate fix** instead of introducing unnecessary changes.
8. **Restart and retest the application** to verify that the issue was actually resolved.
9. **Test the affected feature from the user's perspective** to ensure the fix did not only remove the error but also restored the intended behaviour.

This approach helped keep debugging focused on **finding and verifying the actual root cause**, rather than simply changing code until the error disappeared.
