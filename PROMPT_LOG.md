# PROMPT LOG

AI assistance was used selectively during development, primarily for
debugging, troubleshooting, implementation verification, and resolving
issues encountered during testing.

The application architecture, features, UI implementation, and integration
were developed and assembled as part of the project. AI-generated
suggestions were reviewed, modified where necessary, and tested before
being accepted.

---

## 1. Firebase Authentication Import Error

**Tool/Model:** ChatGPT

**Problem/Prompt:**

The application produced the following error while implementing Firebase
Phone Authentication:

`Uncaught SyntaxError: The requested module ... firebase_auth.js does not
provide an export named 'ConfirmationResult'`

I asked ChatGPT to identify the cause of the error and suggest the correct
Firebase implementation.

**What I used:**

- Diagnosis of the Firebase import issue
- Guidance on the correct Firebase Authentication API usage

**What I changed/rejected:**

I reviewed the suggested solution and corrected the Firebase authentication
implementation in the project rather than directly relying on the generated
code.

**Verification:**

Restarted the development server and tested the authentication flow again.
The import error was resolved.

---

## 2. Firebase Phone Authentication Configuration

**Tool/Model:** ChatGPT

**Problem/Prompt:**

Firebase Phone Authentication was not working correctly even though the
frontend authentication flow had been implemented.

I asked for help identifying what needed to be configured in Firebase.

**What I used:**

- Guidance on enabling Phone Authentication
- Guidance on checking Firebase Authentication settings
- Guidance on authorized domains and Firebase configuration

**What I changed/rejected:**

I configured the Firebase project manually and verified the authentication
settings instead of treating the frontend implementation as sufficient.

**Verification:**

Tested the phone authentication flow and confirmed that Firebase proceeded
with sending the verification code.

---

## 3. Favourite Navigation Issue

**Tool/Model:** ChatGPT

**Problem/Prompt:**

The Favourite page was not opening correctly when navigating to it.

The project had inconsistent route names:

- `/favourite`
- `/favourites`

I asked ChatGPT to help identify why the route was not resolving correctly.

**What I used:**

- Identification of the route mismatch
- Guidance on keeping the route consistent between the router and navigation

**What I changed/rejected:**

I standardized the Favourite route across the application and updated the
navigation accordingly.

**Verification:**

Opened the Favourite page directly and tested navigation through the
application's bottom navigation.

---

## 4. Responsive Layout Issue

**Tool/Model:** ChatGPT

**Problem/Prompt:**

The application was initially designed with a strong mobile-first layout.
When viewed on a desktop screen, some sections did not use the available
space effectively and the interface did not look balanced.

I asked for suggestions on improving the responsive layout.

**What I used:**

- Suggestions for responsive Tailwind breakpoints
- Guidance on desktop spacing and sizing
- Suggestions for responsive product grids and hero sections

**What I changed/rejected:**

I adapted the suggestions to the existing application rather than replacing
the original layout. Desktop-specific sizing, spacing, and grid behaviour
were added where necessary.

**Verification:**

Tested the application at mobile and desktop viewport sizes and checked the
home page, product sections, category layout, and navigation.

---

# What AI Got Wrong / What I Corrected

## 1. Hardcoded Country Code

An earlier implementation of the mobile authentication screen used a
hardcoded Bangladesh country code (`+880`).

This did not match the intended user experience because users should be able
to select their country code.

**Correction:**

I changed the implementation to provide a country selector with flags,
calling codes, and country-specific phone-number validation.

**Verification:**

Tested changing countries and verified that the selected country code and
phone-number validation changed accordingly.

---

## 2. Favourite Route Inconsistency

The Favourite functionality initially used inconsistent route names,
resulting in the Favourite page not opening correctly from every location.

**Correction:**

I standardized the route and updated the router and navigation to use the
same path.

**Verification:**

Tested the Favourite page directly and through the bottom navigation.

---

## AI Usage Approach

AI was not used as a replacement for the development process.

The development workflow was:

1. Build the required feature.
2. Run and test the application.
3. Identify errors or unexpected behaviour.
4. Use AI when additional debugging or technical clarification was needed.
5. Review the suggested solution.
6. Implement the appropriate fix manually.
7. Retest the affected feature.

The final implementation was reviewed and tested as part of the project
rather than being accepted solely because it was AI-generated.