# Dwak 3ndk — React MVP Plan (Graduation Project)

## Overview
**Dwak 3ndk** ("Your Medicine Is Available") is a medicine search & availability platform — "Google Maps for medicines." A user searches for a medicine and sees which nearby pharmacies stock it (price, area, availability), can add to cart, place a mock order, and buy chronic-disease bundles. Pharmacies get a dashboard to manage their inventory.

**This is a React JS course graduation project — frontend only, mock data, not for production.**

## Scope Decisions
- **Frontend only.** No backend, no real AI, no maps, no payments. Data lives in `src/data/*.js` mock files + `localStorage` for changing state (auth, cart, orders, inventory).
- **Two simulated roles** via fake login: **User** and **Pharmacy**. (No Admin dashboard.)
- **English UI only** (no RTL).
- **No AI features.**
- **Team: 5 developers**, timeline **< 1 week**.

## Tech Stack
- Vite + React (plain JavaScript)
- Tailwind CSS
- React Router (routing)
- Context API (`AuthContext`, `CartContext`) + localStorage (persistence)
- *(No TypeScript, no backend, no maps/payments/AI)*

## Mock Data (`src/data/`)
- `medicines.js` — id, name, description, category, image, basePrice
- `pharmacies.js` — id, name, area (Cairo districts), hours, phone
- `inventory.js` — medicineId <-> pharmacyId + price + quantity + available
- `bundles.js` — e.g. Diabetes Bundle = [medicine ids]
- `users.js` — seed: one user account, one pharmacy account

## Routes / Pages
| Route | Purpose |
|---|---|
| `/` | Home: hero + search bar + featured bundles |
| `/search?q=` | Results: medicine matches -> pharmacies that stock it (price, area, availability) |
| `/medicine/:id` | Medicine detail + pharmacy list + add to cart |
| `/bundles` | Bundle list |
| `/bundle/:id` | Bundle detail + add all to cart |
| `/cart` | Cart + place mock order |
| `/orders` | User's mock order history |
| `/login`, `/register` | Fake auth (localStorage) |
| `/pharmacy` | Protected pharmacy dashboard: CRUD inventory, view its orders |
| `*` | NotFound |

## Folder Structure
```
src/
  components/   Navbar, Footer, SearchBar, MedicineCard, PharmacyCard,
                BundleCard, CartItem, ProtectedRoute, Loader, EmptyState
  context/      AuthContext.jsx, CartContext.jsx
  data/         medicines.js, pharmacies.js, inventory.js, bundles.js, users.js
  hooks/        useLocalStorage.js
  pages/        Home, Search, MedicineDetail, Bundles, BundleDetail,
                Cart, Orders, Login, Register, PharmacyDashboard, NotFound
  utils/        search.js (matching helper)
  App.jsx, main.jsx, index.css
```

## Feature -> Implementation
1. **Search + results** — match over `medicines` (lowercase includes), join `inventory` to list pharmacies with price/area/availability.
2. **Auth** — Context + localStorage; role gates `/pharmacy` via `ProtectedRoute`.
3. **Cart + order** — `CartContext`; "place order" writes to localStorage `orders`.
4. **Pharmacy dashboard** — add/edit/remove inventory, toggle availability, view orders for that pharmacy.
5. **Bundles** — predefined medicine groups, add all to cart at once.

## Team Split (5 devs)
- **Dev 1 — Foundation & Auth:** Vite/Tailwind/Router setup, `AuthContext`, `useLocalStorage`, Login/Register, `ProtectedRoute`, Navbar/Footer.
- **Dev 2 — Search & Medicine:** Home, SearchBar, Search results, MedicineDetail, `utils/search.js`.
- **Dev 3 — Cart & Orders:** `CartContext`, Cart page, place-order flow, Orders history, CartItem.
- **Dev 4 — Pharmacy Dashboard:** inventory CRUD UI, availability toggle, orders-for-pharmacy view.
- **Dev 5 — Data, Bundles & Polish:** all mock data, Bundles + BundleDetail, shared components, responsive styling, README + demo seed.

> Dev 1 builds the shell + shared contexts/components **first (Day 1)**; others then branch into their own page folders to avoid merge conflicts.

## Schedule (< 1 week)
- **Day 1:** Dev 1 ships skeleton (routing, Tailwind, contexts, Navbar, mock-data stubs). Everyone pulls.
- **Day 2:** Search/medicine (Dev 2); cart/orders started (Dev 3); data finalized (Dev 5).
- **Day 3:** Pharmacy dashboard (Dev 4); bundles (Dev 5); auth done (Dev 1).
- **Day 4:** Integration — connect cart <-> orders <-> pharmacy, shared state, responsive.
- **Day 5:** Polish, empty/loading states, demo data, README, rehearse presentation.

## Theme
Clean medical **blue/white** theme via Tailwind.

## Future Roadmap (for presentation)
Real backend (Node + PostgreSQL), JWT auth, Google Maps availability, online payments + COD, delivery tracking, AI prescription OCR + smart guessing, admin dashboard, live stock updates.
