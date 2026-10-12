# Trust Aid — Verified Help Near Me

> **Digital Prototype · College Startup Pitch**  
> A hyper-local assistance platform connecting people with verified nearby helpers for hospital visits, medicine collection, groceries, transport, documentation, and companionship.

---

## 👥 Dual-Role & Multi-Login Architecture

1. **Customer / User Portal (`Ananya Sen`)**:
   - Discover nearby helpers and filter by category.
   - Transparent pricing displayed for all 6 service categories.
   - Customize or offer fair honorarium/price for the service.
   - Place booking orders and track real-time acceptance from the helper.
2. **Helper / Partner Portal (`Rahul Sharma`)**:
   - Separate helper login with online/offline availability toggle.
   - Real-time incoming booking notifications (*"Someone booked!"*).
   - Helper reviews customer details, location, distance, and **offered price**.
   - Helper decides to **Accept Order** or **Decline Order** based on price and rate.
   - Helper updates execution status (*"Start Navigation"* → *"Mark Done"*).

---

## 💰 Transparent Service Pricing Directory

| Service Category | Standard Base Price | Pricing Unit |
|---|---|---|
| **Hospital Visit** | **₹350** | per visit |
| **Medicine Collection** | **₹150** | per pickup |
| **Grocery Help** | **₹200** | per visit |
| **Transport** | **₹300** | per trip |
| **Documentation** | **₹250** | per session |
| **Companionship** | **₹200** | per hour |

---

## 📱 Wireframe Implementation Overview

This prototype faithfully replicates all 10 screens and interactions from the startup pitch wireframes:

| Screen # | Screen Name | Key Features & Interactions |
|---|---|---|
| **1** | **Login / Register** | Brand identity, email & password authentication, show/hide password, Terms & Privacy links, direct sign-in flow. |
| **2** | **Home Dashboard** | Header with hamburger menu & notifications, "Hello, Ananya!" greeting, location badge ("Whitefield, Bengaluru"), primary **Request Help** CTA, 6 **Quick Services** grid, and **Nearby Verified Helpers** preview (🟢 12 Online). |
| **3** | **Request Help** | Service category selector modal, current location with GPS detector, 3-level urgency toggle (`Low`, `Normal`, `High`), and additional notes input. |
| **4** | **Service Categories** | Vertical list of 6 categories with custom icons, helper counts, and click-through navigation to filtered helper listings. |
| **5** | **Nearby Verified Helpers** | Helper cards with verified badges, live distance (km), star ratings, reviews, online status (🟢 Online), service filter modal, search bar, and "View more helpers" toggle. |
| **6** | **Provider Profile** | Detailed profile for helper (e.g. Rahul Sharma), verified & background checked seal, rating stats (128 reviews · 156 helps completed), bio, verification badges (ID Verified, Background Checked, Trained in First Aid), and sticky **Book Helper** CTA. |
| **7** | **Booking Confirmation** | Comprehensive breakdown of Service, Helper, Date & Time (editable), Location, and Community Support model ("You pay what you can"), cancellation policy, and **Confirm Booking** CTA. |
| **8** | **Service Tracking** | Booking ID (`TA125678`), 4-step real-time progress timeline (Accepted, On the way, In progress, Completed), interactive simulated route map with live moving markers and estimated arrival banner (`8 mins`). |
| **9** | **Feedback** | Heart illustration, interactive 5-star rating system with hover effects, feedback comment textarea, and **Submit Feedback** CTA. |
| **10** | **Thank You!** | Success checkmark, community appreciation message, complete request summary recap, and **Back to Home** button. |

---

## 🚀 Presentation & Pitch Mode Features

- **Mobile Frame Mode 📱**: Replicates authentic iPhone hardware frame with status bar (9:41, WiFi, battery), dynamic island, and touch interactions just like the pitch slides.
- **Desktop View Mode 💻**: Switch between device simulation and full-width responsive desktop/tablet presentation.
- **Screen Flow Navigator ⚡**: Direct jump buttons (1 to 10) in the top presentation bar to jump to any screen instantly during demos or presentations.

---

## 🛠️ Tech Stack

- **React 18** with **TypeScript**
- **Tailwind CSS v4** (Modern utilities & fluid styling)
- **Vite** (Instant hot module reloading)
- **Lucide Icons** (Consistent, modern iconography)

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
