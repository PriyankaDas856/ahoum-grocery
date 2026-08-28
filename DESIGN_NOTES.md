# DESIGN NOTES

This document records the main decisions made to adapt Ahoum Grocery from
the mobile-oriented interface to a desktop layout while keeping the same
application and component structure.

---

## 1. Desktop Content Width

### Decision

I used a centered maximum content width for larger screens instead of
allowing the grocery interface to stretch across the entire desktop
viewport.

### Adaptation

On mobile, content uses the available screen width with consistent side
padding. On desktop, the main content is centered and constrained using
maximum-width containers.

### Reason

A full-width grocery interface on a large monitor would create excessive
horizontal space and make product sections feel disconnected.

### Trade-off

The desktop layout does not use every pixel of the viewport, but the
content remains easier to scan and visually balanced.

---

## 2. Product Layout Changes on Desktop

### Decision

I changed product layouts at desktop breakpoints instead of keeping the
mobile two-column layout at every screen size.

### Adaptation

Mobile screens use smaller product cards and fewer columns, while larger
screens use wider product cards and additional grid columns where
appropriate.

Product carousels also use larger card widths on desktop.

### Reason

Keeping mobile-sized cards on a large screen would make products appear too
small and leave unnecessary empty space.

### Trade-off

Additional responsive classes and sizing rules are required, but the same
ProductCard and product components can still be reused across screen sizes.

---

## 3. Desktop Navigation and Spacing

### Decision

I kept navigation consistently visible while adapting the surrounding
layout and spacing for desktop screens.

### Adaptation

The application maintains the navigation structure across screen sizes,
while desktop layouts receive increased spacing, larger touch targets,
and more generous section margins.

The main content is also given enough bottom spacing so that navigation does
not overlap important content.

### Reason

Navigation should remain accessible regardless of the device being used,
while desktop users need more breathing room than users on smaller screens.

### Trade-off

The desktop interface requires more vertical and horizontal spacing, but
this improves readability and prevents the mobile layout from looking
stretched on larger screens.

---

## Summary

The desktop version was implemented as a responsive adaptation of the
existing application rather than as a separate desktop application.

The main principles were:

- Constrain content on large screens.
- Increase product and grid sizes appropriately.
- Preserve consistent navigation.
- Reuse existing components wherever possible.
- Use responsive breakpoints instead of duplicating entire pages.