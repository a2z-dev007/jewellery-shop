# CommerceOS Frontend — Product Requirements Document

**Version:** 2.0  
**Status:** Active  
**First Vertical:** JewelleryOS  
**Author:** Product Team  
**Last Updated:** June 2026

---

## Table of Contents

1. [Vision & Strategy](#1-vision--strategy)
2. [Product Goals](#2-product-goals)
3. [Tech Stack](#3-tech-stack)
4. [Architecture Overview](#4-architecture-overview)
5. [Theme Engine](#5-theme-engine)
6. [Template System](#6-template-system)
7. [Folder Structure](#7-folder-structure)
8. [Shared Layout Components](#8-shared-layout-components)
9. [Pages — JewelleryOS](#9-pages--jewelleryos)
10. [Animation System](#10-animation-system)
11. [Lead Capture System](#11-lead-capture-system)
12. [E-Commerce Module](#12-e-commerce-module)
13. [Customer Portal](#13-customer-portal)
14. [Admin Dashboard](#14-admin-dashboard)
15. [Calculator Hub](#15-calculator-hub)
16. [AI Chat Widget](#16-ai-chat-widget)
17. [SEO Architecture](#17-seo-architecture)
18. [Performance Requirements](#18-performance-requirements)
19. [Analytics & Tracking](#19-analytics--tracking)
20. [Reusable Business Architecture](#20-reusable-business-architecture)
21. [Development Phases](#21-development-phases)
22. [Definition of Done](#22-definition-of-done)

---

## 1. Vision & Strategy

### 1.1 What We Are Building

**CommerceOS Frontend** is a premium, conversion-first, template-driven frontend platform for local and regional businesses — starting with jewellery retailers.

This is **not** a CMS-editable frontend. It is a **deployable product** where:

- The codebase is the product.
- Theme configs drive customization — not drag-and-drop editors.
- Landing page templates are swapped per business vertical.
- Everything else (e-commerce, portal, blog, appointments) remains shared and battle-hardened.

### 1.2 Why Not CMS-Driven

CMS-driven frontends for important pages lead to:

- Poor performance (Lighthouse scores suffer)
- Inconsistent UI — store owners break layouts
- Difficult to maintain premium animations and interactions
- SEO suffers from unstructured content

**Store owners should never edit homepage sections.** They manage products, orders, leads, and appointments — not pixels.

### 1.3 Business Verticals

| Vertical | Status | Notes |
|---|---|---|
| JewelleryOS | **Active — V1** | First launch |
| SalonOS | Planned | Appointment-heavy |
| GymOS | Planned | Membership + class bookings |
| FashionOS | Planned | Product catalog heavy |
| FurnitureOS | Planned | High-value, lead-gen focused |

---

## 2. Product Goals

### Goal 1 — Luxury Premium Experience

The design language must communicate **trust, elegance, and premium quality**.

Reference brands:
- Tanishq, Kalyan Jewellers (Indian market trust)
- Cartier, Tiffany & Co. (global luxury feel)
- Apple (minimalism, micro-interactions)
- Rolex (scroll-based storytelling)

**Do:**
- Gold accents used purposefully
- Large, breathing white space
- Cinematic hero sections
- Smooth, deliberate animations

**Do Not:**
- Flash sales banners everywhere
- Cluttered product grids
- Popups that fire immediately on load
- Flashy or distracting animations

---

### Goal 2 — Lead Generation First

Every page has a primary conversion goal. No page is purely informational.

| Page | Primary CTA |
|---|---|
| Homepage | Book Consultation / Explore Collection |
| Product Detail | WhatsApp Inquiry / Add to Cart |
| Category / Collection | Filter + Explore → Product page |
| About | Book Appointment / Visit Store |
| Contact | WhatsApp / Call / Form |
| Blog | Inquiry Modal / Related Product |
| Calculator Hub | Capture Lead via Form |

Lead capture channels (always visible):
- Sticky WhatsApp button
- Click-to-call button
- Inquiry modal (context-aware)
- Exit intent popup (desktop)
- Scroll-triggered offer banner

---

### Goal 3 — Reusable Across Verticals

**90% of the codebase is shared.** Only the business layer changes.

| Layer | Shared | Changes Per Vertical |
|---|---|---|
| Auth & Customer Portal | ✅ | — |
| E-Commerce (Cart, Checkout, Orders) | ✅ | — |
| Blog | ✅ | — |
| Appointments | ✅ | — |
| CRM / Lead Forms | ✅ | — |
| Admin Dashboard | ✅ | Module config only |
| Theme Engine | ✅ | Config values only |
| Animation System | ✅ | — |
| Homepage Template | ❌ | Full swap per vertical |
| Product Attributes | ❌ | Purity/Weight vs Size/Color etc. |
| Business Modules | ❌ | Calculators vs Class Schedule etc. |

---

## 3. Tech Stack

### 3.1 Core Framework

| Technology | Version | Purpose |
|---|---|---|
| Next.js (App Router) | 14+ | Framework, SSR, SSG, routing |
| TypeScript | 5+ | Type safety throughout |
| Tailwind CSS | v4 | Utility-first styling |
| Shadcn UI | Latest | Accessible component primitives |

### 3.2 State Management

| Technology | Purpose |
|---|---|
| Zustand | Global state (cart, wishlist, user, UI) |
| TanStack Query | Server state, caching, background sync |

### 3.3 API Layer

| Technology | Purpose |
|---|---|
| Axios | HTTP client with interceptors |
| TanStack Query | Query caching, loading/error states |

### 3.4 Forms & Validation

| Technology | Purpose |
|---|---|
| React Hook Form | Form state, performance |
| Zod | Schema validation, type-safe forms |

### 3.5 Animation

| Technology | When to Use |
|---|---|
| Framer Motion | Primary engine — all standard animations |
| GSAP | Only for hero cinematic sequences |

> **Rule:** GSAP is powerful but heavy. Limit it to 1–2 hero sections per template. Default to Framer Motion everywhere else.

### 3.6 Media & UI

| Technology | Purpose |
|---|---|
| Embla Carousel | Product sliders, testimonials, gallery |
| Lucide React | Icon system |
| Next Image | Optimized image delivery |

### 3.7 SEO

| Technology | Purpose |
|---|---|
| Next.js Metadata API | Dynamic metadata per page |
| JSON-LD (structured data) | Product, Organization, FAQPage, BreadcrumbList schema |
| next-sitemap | Auto-generated XML sitemap |

### 3.8 Analytics

| Technology | Purpose |
|---|---|
| Google Analytics 4 | Traffic, conversions, user behavior |
| Microsoft Clarity | Heatmaps, session recordings |

---

## 4. Architecture Overview

```
CommerceOS Frontend
│
├── Core Platform (90%)
│   ├── Auth System
│   ├── E-Commerce Engine (Cart → Checkout → Orders)
│   ├── Product Catalog
│   ├── Blog Engine
│   ├── Appointment System
│   ├── CRM Forms & Lead Capture
│   ├── Customer Portal
│   ├── Admin Dashboard
│   ├── Theme Engine
│   └── Animation System
│
└── Business Layer (10%)
    ├── JewelleryOS Template
    │   ├── Luxury homepage
    │   ├── Gold/Diamond/Bridal categories
    │   ├── Calculator Hub
    │   └── Jewellery-specific attributes
    ├── SalonOS Template (future)
    ├── GymOS Template (future)
    └── FashionOS Template (future)
```

### 4.1 Rendering Strategy

| Page Type | Strategy | Reason |
|---|---|---|
| Homepage | SSG | Maximum performance |
| Category / Collection | SSG + ISR | SEO, periodic revalidation |
| Product Detail | SSR or ISR | Live price/stock |
| Blog Listing | SSG + ISR | SEO |
| Blog Detail | SSG + ISR | SEO |
| Cart / Checkout | CSR | User-specific |
| Customer Portal | CSR | Auth-gated |
| Admin Dashboard | CSR | Auth-gated |
| Calculator Pages | SSG | Traffic + SEO |

---

## 5. Theme Engine

The theme engine is the **most critical architectural decision.** Every component reads from a central config — nothing is hardcoded.

### 5.1 File Location

```
src/config/theme/
├── theme.ts          ← Main config
├── typography.ts     ← Font definitions
├── animations.ts     ← Animation constants
└── index.ts          ← Barrel export
```

### 5.2 Full Theme Config

```ts
// src/config/theme/theme.ts

export const theme = {
  // Business Identity
  businessType: "jewellery",
  brandName: "ABC Jewellers",
  tagline: "Crafting Memories Since 1985",
  logo: {
    light: "/assets/logo-light.svg",
    dark: "/assets/logo-dark.svg",
    favicon: "/favicon.ico",
  },

  // Colors
  colors: {
    primary: "#D4AF37",       // Gold
    primaryLight: "#F5E6C8",  // Champagne
    primaryDark: "#B8960C",   // Deep gold
    secondary: "#111111",     // Near black
    surface: "#FAFAF8",       // Off-white
    accent: "#F5E6C8",        // Accent warm
    text: {
      primary: "#111111",
      secondary: "#4A4A4A",
      muted: "#9A9A9A",
      inverse: "#FFFFFF",
    },
    border: "#E8E0D0",
    error: "#DC2626",
    success: "#16A34A",
  },

  // Typography
  fonts: {
    heading: "Cormorant Garamond",  // Luxury serif
    body: "Inter",                   // Clean sans-serif
    accent: "Playfair Display",      // Decorative
  },

  // Contact
  contact: {
    phone: "+91-XXXXXXXXXX",
    whatsapp: "+91-XXXXXXXXXX",
    whatsappMessage: "Hi, I'm interested in your jewellery collection.",
    email: "info@abcjewellers.com",
    address: "123 Jewellery Street, Lucknow, UP 226001",
    mapUrl: "",
  },

  // Business Hours
  hours: {
    weekdays: "10:00 AM – 8:00 PM",
    weekends: "10:00 AM – 9:00 PM",
    holidays: "Closed",
  },

  // Social Media
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    pinterest: "",
  },

  // SEO Defaults
  seo: {
    defaultTitle: "ABC Jewellers | Fine Gold & Diamond Jewellery in Lucknow",
    titleTemplate: "%s | ABC Jewellers",
    description: "Explore exquisite gold, diamond, and bridal jewellery at ABC Jewellers. Trusted since 1985.",
    keywords: ["gold jewellery", "diamond jewellery", "bridal jewellery", "Lucknow jewellers"],
    ogImage: "/assets/og-default.jpg",
  },

  // Feature Flags
  features: {
    enableCart: true,
    enableWishlist: true,
    enableAppointments: true,
    enableCalculators: true,
    enableBlog: true,
    enableOrders: true,
    enableAIChat: false,       // Phase 2
    enableGoldRate: true,
    enableEMICalculator: true,
  },

  // Active Template
  activeTemplate: "luxury",   // "luxury" | "bridal" | "modern" | "minimal"

  // Announcement Bar
  announcement: {
    enabled: true,
    messages: [
      "Today's Gold Rate: ₹6,450/gram (22K)",
      "Bridal Season Special — 20% off on Diamond Sets",
      "Free home delivery on orders above ₹50,000",
    ],
    rotationInterval: 4000,
  },
};
```

### 5.3 Usage Rule

**No component ever hardcodes a brand value.** Always import from theme:

```ts
import { theme } from "@/config/theme";

// ✅ Correct
<a href={`https://wa.me/${theme.contact.whatsapp}`}>

// ❌ Never do this
<a href="https://wa.me/919876543210">
```

---

## 6. Template System

Templates control **only the homepage and business-specific landing pages.** Everything else is shared.

### 6.1 Template Directory

```
src/templates/
├── luxury/
│   ├── HomePage.tsx
│   ├── HeroSection.tsx
│   ├── CollectionShowcase.tsx
│   └── index.ts
├── bridal/
│   ├── HomePage.tsx
│   └── index.ts
├── modern/
│   ├── HomePage.tsx
│   └── index.ts
└── minimal/
    ├── HomePage.tsx
    └── index.ts
```

### 6.2 Template Loader

```ts
// src/templates/index.ts

import { theme } from "@/config/theme";

const templates = {
  luxury: () => import("./luxury"),
  bridal: () => import("./bridal"),
  modern: () => import("./modern"),
  minimal: () => import("./minimal"),
};

export const getActiveTemplate = () => templates[theme.activeTemplate];
```

### 6.3 Switching Templates

Change one line in `theme.ts`:

```ts
activeTemplate: "bridal"  // Was "luxury"
```

Rebuild. Done.

---

## 7. Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes
│   │   ├── page.tsx              # Homepage
│   │   ├── [category]/page.tsx   # Category pages
│   │   ├── products/
│   │   │   ├── page.tsx          # PLP
│   │   │   └── [slug]/page.tsx   # PDP
│   │   ├── collections/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── appointments/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── calculators/
│   │   │   ├── page.tsx
│   │   │   ├── gold-price/page.tsx
│   │   │   ├── emi/page.tsx
│   │   │   ├── investment/page.tsx
│   │   │   └── budget/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── checkout/page.tsx
│   ├── (auth)/                   # Auth routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (portal)/                 # Customer portal
│   │   ├── profile/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── appointments/page.tsx
│   │   └── wishlist/page.tsx
│   ├── (admin)/                  # Admin dashboard
│   │   └── dashboard/...
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/                       # Shadcn primitives
│   ├── common/                   # Shared components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── AnnouncementBar/
│   │   ├── Breadcrumb/
│   │   └── PageWrapper/
│   └── widgets/                  # Floating widgets
│       ├── WhatsAppButton/
│       ├── CallButton/
│       ├── AIChat/
│       └── GoldRateTicker/
│
├── features/                     # Feature modules
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── blog/
│   ├── appointments/
│   ├── calculators/
│   ├── auth/
│   └── lead-capture/
│
├── shared/                       # Cross-feature shared UI
│   ├── InquiryModal/
│   ├── ProductCard/
│   ├── ReviewCard/
│   └── SectionHeader/
│
├── hooks/                        # Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useIntersectionObserver.ts
│   ├── useGoldRate.ts
│   └── useCart.ts
│
├── services/                     # API service layer
│   ├── api.ts                    # Axios instance
│   ├── products.service.ts
│   ├── orders.service.ts
│   ├── appointments.service.ts
│   └── blog.service.ts
│
├── store/                        # Zustand stores
│   ├── cart.store.ts
│   ├── wishlist.store.ts
│   ├── ui.store.ts
│   └── user.store.ts
│
├── templates/                    # Homepage templates
│   ├── luxury/
│   ├── bridal/
│   ├── modern/
│   └── minimal/
│
├── config/
│   ├── theme/
│   └── business.config.ts
│
├── types/                        # TypeScript type definitions
│   ├── product.types.ts
│   ├── order.types.ts
│   ├── blog.types.ts
│   └── api.types.ts
│
├── lib/                          # Utilities
│   ├── utils.ts
│   ├── validators.ts
│   └── formatters.ts
│
└── constants/                    # App-wide constants
    ├── routes.ts
    ├── api-endpoints.ts
    └── metadata.ts
```

---

## 8. Shared Layout Components

### 8.1 Header

**Behavior:**
- Transparent at top of page, solid on scroll
- Sticky — always visible
- Height: 72px (desktop), 60px (mobile)
- Transition: `backdrop-blur` + `bg-opacity` animation on scroll threshold (20px)

**Desktop Nav:**
- Logo (left)
- Navigation links (center): Collections, Products, Bridal, Blog, About
- Actions (right): Search, Wishlist, Cart, Book Appointment CTA

**Mobile Nav:**
- Hamburger → full-screen overlay menu
- Slide-in from left
- Show contact quick-actions at bottom of mobile menu

**Visual:**
- Glassmorphism effect on scroll: `backdrop-blur-md bg-white/80 border-b border-white/20`
- Logo transitions from white (transparent state) to brand color (solid state)

---

### 8.2 Announcement Bar

- Positioned above header
- Rotates 3–5 messages (auto-scroll, 4s interval)
- Config-driven via `theme.announcement`
- Dismiss button (session-persisted)
- Background: `theme.colors.primary` (gold)
- Text: white, centered, 13px

**Example messages:**
- "Today's Gold Rate: ₹6,450/gram (22K) | ₹5,920/gram (18K)"
- "🎉 Bridal Season Sale — Extra 5% off on sets above ₹1L"

---

### 8.3 Footer

**Columns (desktop 4-col, mobile stacked):**
- Column 1: Brand logo, tagline, short about text, social icons
- Column 2: Quick links (collections, products, about, careers, blog)
- Column 3: Customer links (orders, appointments, wishlist, FAQ, returns)
- Column 4: Contact info + embedded Google Map thumbnail + hours

**Bottom bar:**
- Copyright text
- Privacy Policy / Terms links
- GST number (India-specific compliance)

---

## 9. Pages — JewelleryOS

### 9.1 Homepage

The highest-converting page. Every section has a purpose.

#### Hero Section

**Goal:** Instant luxury impression + first conversion action.

**Specs:**
- Fullscreen (100vh), no scroll cue needed — let the user scroll
- Background: autoplay muted looped video (desktop) / high-res image (mobile)
- Video quality: 1080p, compressed to <5MB using WebM
- Gold gradient overlay for text legibility

**Content:**
```
[Eyebrow] — CRAFTED WITH LOVE SINCE 1985
[Headline] — Jewellery That Tells Your Story
[Subhead] — Explore our curated collection of gold, diamond, and bridal jewellery.
[CTA 1] — Explore Collection  (primary, gold button)
[CTA 2] — Book Consultation   (secondary, ghost button)
```

**Animation (GSAP):**
- Entrance: staggered fade-up on each text element
- Background: slow Ken Burns zoom (scale 1.0 → 1.05 over 8s)
- Parallax: hero image moves at 0.3x scroll speed

---

#### Announcement Strip
- Trust signals: "BIS Hallmarked", "30 Day Returns", "Free Delivery ₹50K+"
- Animated horizontal scroll on mobile
- Static 3-column on desktop

---

#### Collection Showcase

**Goal:** Guide users into the right product category.

**Layout:** 2x2 grid (desktop), vertical scroll (mobile)

**Categories:**
- Gold Jewellery
- Diamond Jewellery
- Bridal Collection
- Silver Jewellery

Each card:
- Full-bleed category image
- Category name + item count
- Hover: scale image + reveal CTA overlay
- Click: → Category page

**Animation:** Staggered fade-up with Intersection Observer trigger

---

#### Live Gold Rate Widget

**Goal:** Drive organic traffic + establish authority.

**Display:**
- 22K, 18K, 14K prices per gram (live API)
- "Last updated: X minutes ago"
- Trend arrow (up/down from yesterday)
- "Calculate your gold value →" CTA → links to Calculator Hub

---

#### Featured Products

**Goal:** Showcase bestsellers / curated products.

**Layout:** Horizontal carousel (Embla) on mobile, 4-col grid on desktop

Each product card:
- Image (hover: show second image)
- Product name
- Weight, purity badge
- Price (with making charges breakdown on hover)
- Wishlist icon (top right)
- "Inquire" button → opens WhatsApp or Inquiry Modal

**Animation:** Stagger reveal cards on scroll entry

---

#### Why Choose Us

**4 cards:**

| Icon | Heading | Description |
|---|---|---|
| 🏅 | BIS Hallmarked | All gold certified |
| 🔁 | Easy Returns | 30-day hassle-free |
| 💎 | Genuine Stones | Certified diamonds & gemstones |
| 🚚 | Free Delivery | On orders above ₹50,000 |

---

#### Bridal Jewellery Section

**Goal:** Highest-value conversion block.

**Layout:** Full-width, cinematic split — image left, content right

**Content:**
- Section heading: "Your Bridal Journey Starts Here"
- Sub-copy about bridal expertise
- 3–4 bridal collection thumbnails
- CTA: "Book Bridal Consultation" → Appointment page

---

#### Testimonials

- Auto-sliding carousel (Embla, 5s interval)
- 5-star rating display
- Customer name, city, occasion (e.g., "Wedding, 2024")
- Optional: photo avatar

---

#### Store Gallery

- Masonry grid layout
- Mix of product photos + in-store lifestyle imagery
- Lightbox on click (no external library — custom Framer Modal)
- "Visit Our Store" CTA below

---

#### Blog Preview

- 3 latest articles in horizontal card layout
- Title, excerpt, read time, date
- "View All Articles →" link

---

#### Appointment CTA Section

**Full-width conversion block at page bottom (above footer)**

- High-contrast background (dark/gold)
- Strong copy: "Visit Us. Experience the Difference."
- Sub-copy: Book a private consultation session
- CTA: "Book Appointment" (prominent)
- Secondary: WhatsApp us

---

### 9.2 Product Listing Page (PLP)

**URL pattern:** `/products` (all), `/gold-jewellery`, `/diamond-jewellery`, etc.

**Layout:** Filter sidebar (desktop left) + product grid

**Filters:**
- Category (multi-select)
- Price range (dual-handle slider)
- Weight (gram ranges)
- Purity (22K, 18K, 14K, 925 Silver)
- Occasion (Wedding, Daily, Festive, Gift)
- Gender (Women, Men, Kids)

**Sorting:**
- Newest First
- Price: Low to High / High to Low
- Weight: Low to High
- Popularity

**Product Card:**
- Image (with secondary image on hover)
- Name, purity, weight
- Price
- Wishlist toggle
- Quick Inquiry (opens modal, no page nav required)

**Pagination:** Infinite scroll with a "Load More" trigger (not traditional numbered pagination)

**SEO:** Each category URL has unique H1, meta description, breadcrumb, and JSON-LD `ItemList` schema.

---

### 9.3 Product Detail Page (PDP)

The most important conversion page in the entire app.

**Layout (desktop):** 60/40 split — Gallery left, Details right

#### Gallery
- Primary image + thumbnail strip
- Pinch-to-zoom (mobile), hover-zoom lens (desktop)
- Video support (360° or lifestyle video)
- Badge overlays: "New", "Bestseller", "Limited Stock"

#### Product Info Block
- Product name (H1)
- SKU / Product code
- Purity + Weight
- Price (with making charges tooltip)
- "Check EMI Options" expandable section
- Wishlist toggle
- Share button (copy link, WhatsApp share)

#### CTAs (sticky on mobile, fixed in sidebar on desktop)
1. **Add to Cart** (primary, gold)
2. **WhatsApp Inquiry** (secondary)
3. **Book Appointment to View** (tertiary, text link)

#### Tabs Below Gallery (Framer animated tab transitions)
- **Description** — rich text, materials, craftsmanship notes
- **Specifications** — weight, dimensions, stone details table
- **Reviews** — rating breakdown, individual reviews, "Write a Review"
- **FAQs** — accordion, product-specific questions

#### Related Products
- Horizontal carousel: "You May Also Like"
- Curated via API (same category + price band)

---

### 9.4 Category Pages

- Unique SEO page per category
- H1, intro paragraph (SEO content), breadcrumb
- Renders PLP with pre-applied category filter
- JSON-LD: `BreadcrumbList` + `ItemList`

---

### 9.5 Collections Page

- Grid of all collection tiles (Bridal, Antique, Temple, etc.)
- Each collection → filtered PLP

---

### 9.6 About Page

**Sections:**
1. Brand hero — founding story, year, founders
2. Timeline — key milestones (animated horizontal scroll)
3. Craftsmanship section — artisan imagery + copy
4. Certifications — BIS, ISO, awards
5. Team section (optional)
6. Visit Us CTA

---

### 9.7 Contact Page

- Google Map embed (full width)
- Store details: address, phone, email, hours
- Contact form (React Hook Form + Zod)
- Floating WhatsApp + Call buttons

---

### 9.8 Appointment Page

**Booking Form Fields:**
- Full name
- Phone number
- Email (optional)
- Occasion (Wedding, Birthday, Anniversary, Just Browsing)
- Preferred date (date picker)
- Preferred time slot (dynamic based on business hours)
- Message / Special request

**Post-submit:** Confirmation screen + WhatsApp confirmation message

---

### 9.9 Blog Listing

- SEO-first layout
- Category filter (Gold Care, Buying Guides, Trends, Investment)
- Featured article (large, top)
- Grid of articles below
- Sidebar: popular posts, gold rate widget, newsletter signup

---

### 9.10 Blog Detail

- Rich typography (large body text, 1.8 line height)
- Author bio
- Estimated read time
- Table of Contents (sticky, desktop)
- Related articles
- Share buttons (WhatsApp, copy link)
- JSON-LD: `Article` schema

---

### 9.11 FAQ Page

- Accordion layout
- Grouped by category: Products, Pricing, Delivery, Returns, Care
- JSON-LD: `FAQPage` schema (key for Google FAQ rich results)

---

## 10. Animation System

### 10.1 Principles

| Principle | Rule |
|---|---|
| Purpose | Every animation must serve UX, not just look good |
| Performance | Prefer `transform` and `opacity`. Never animate `height`, `width`, or `top/left` |
| Timing | Standard easing: `[0.22, 1, 0.36, 1]` (ease-out-expo) |
| Duration | Content reveals: 0.5–0.7s. Micro-interactions: 0.15–0.25s |
| Respect | Honor `prefers-reduced-motion` — wrap all animations |

### 10.2 Framer Motion — Standard Variants

```ts
// src/config/theme/animations.ts

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
```

### 10.3 Scroll-Based Animations

| Effect | Applied To | Implementation |
|---|---|---|
| Parallax | Hero background | GSAP ScrollTrigger |
| Fade Up | Section cards, headings | Framer + Intersection Observer |
| Scale on scroll | Product images | Framer `useScroll` |
| Count up | Statistics (years, customers) | Custom hook + Framer `useInView` |
| Reveal | Section entries | Framer `whileInView` |

### 10.4 Micro-Interactions

| Interaction | Component | Effect |
|---|---|---|
| Product card hover | PLP Card | Scale 1.02, shadow lift, image scale 1.05 |
| CTA button hover | All CTAs | Subtle scale + gold shimmer |
| Wishlist toggle | Heart icon | Spring bounce + color fill |
| Tab switch | PDP tabs | Smooth underline slide |
| Image zoom | PDP gallery | Lens magnification |
| Cart add | Add to Cart | Button → success checkmark → revert |

### 10.5 Page Transitions

- Route changes: fade-out current → fade-in new (Framer `AnimatePresence`)
- Duration: 0.3s
- Exception: homepage → product page can use a subtle slide transition

---

## 11. Lead Capture System

### 11.1 Sticky WhatsApp Button

- Fixed bottom-right on all pages (mobile + desktop)
- Opens WhatsApp with `theme.contact.whatsappMessage` pre-filled
- Pulse animation (subtle, 3s loop) to draw attention
- Hide when: Checkout, Order Success pages

### 11.2 Sticky Call Button

- Fixed bottom-left on all pages (mobile only)
- Direct `tel:` link
- Same hide rules as WhatsApp button

### 11.3 Inquiry Modal

- Triggered by: "Inquire" on product cards, PDP inquiry CTA
- Fields: Name, Phone, Message (pre-filled with product name)
- On submit: API call to CRM + WhatsApp deeplink as confirmation
- Framer `AnimatePresence` enter/exit

### 11.4 Exit Intent Popup (Desktop Only)

- Triggers when cursor moves above viewport (toward browser chrome)
- Shows: Special offer or "Book a consultation before you leave"
- Session-storage flag: shown max once per session
- Dismiss: X button or click outside

### 11.5 Scroll-Triggered Offer Banner

- Appears after 60% scroll depth (homepage only)
- Fixed bottom bar (above WhatsApp button)
- Config-driven offer text
- Dismiss: stored in session

### 11.6 Newsletter / Lead Capture

- In footer
- Fields: Name, Phone, Email
- Incentive copy: "Get gold rate alerts + exclusive offers"
- API: subscribes to CRM leads list

---

## 12. E-Commerce Module

### 12.1 Cart

- Slide-in drawer (right side) — not a separate page
- Item list: image, name, weight, purity, price
- Quantity adjustment (min 1)
- Remove item
- Cart subtotal
- "Making charges applied at checkout" note
- CTAs: Continue Shopping / Proceed to Checkout

### 12.2 Checkout

**Step 1 — Delivery Details**
- Full name, phone, email
- Address (line 1, line 2, city, state, PIN)
- Delivery option: Home Delivery / Pick Up from Store

**Step 2 — Payment**
- Payment methods: UPI, Net Banking, Card, COD (if enabled), EMI
- Order summary sidebar (sticky desktop)

**Step 3 — Confirmation**
- Order ID + details
- Expected delivery date
- "Track Order" CTA
- WhatsApp order confirmation deeplink

### 12.3 Wishlist

- Auth-gated (prompt login if not authenticated)
- Grid of saved products
- "Move to Cart" per item
- "Share Wishlist" (copy link)

### 12.4 Order Tracking

- Enter Order ID or auto-load from portal
- Visual timeline: Placed → Confirmed → Packed → Shipped → Delivered
- WhatsApp support CTA

---

## 13. Customer Portal

**Auth:** JWT-based, Next.js middleware route protection

### 13.1 Auth Pages

**Login:**
- Phone OTP (primary, India-first)
- Email + password (secondary)
- Forgot password flow

**Register:**
- Name, phone, email, password
- OTP verification

### 13.2 Portal Pages

| Page | Key Features |
|---|---|
| Profile | Edit name, email, address book, DOB for birthday offers |
| My Orders | List, detail view, re-order, return initiation |
| My Appointments | Upcoming, past, cancel/reschedule |
| My Wishlist | Same as public wishlist but auth-synced |
| Notifications | Order updates, gold rate alerts, offers |

---

## 14. Admin Dashboard

> Separate Next.js app or route group: `(admin)`. Auth-protected. No public access.

### 14.1 Dashboard Home

- KPI cards: Today's Orders, Revenue, New Leads, Appointments
- Charts: Revenue trend (7/30/90 days), Top products, Traffic sources
- Quick actions: Add Product, View Leads, Respond to Inquiry

### 14.2 Modules

| Module | Key Actions |
|---|---|
| Products | Add, edit, delete, bulk import, image management |
| Categories | CRUD, ordering, SEO fields |
| Orders | View, update status, invoice download |
| Customers | List, profile view, order history |
| Appointments | Calendar view, status management, reminders |
| Leads | Inbox view, assign, mark resolved, WhatsApp link |
| Blog | Rich text editor (Tiptap), SEO fields, publish |
| Media | Image upload, compression, tagging |
| Calculators | Update gold rates, configure EMI rates |
| Settings | Theme config, announcement bar, feature flags |
| Chatbot | Train responses, view chat logs (Phase 2) |
| Analytics | Embedded GA4 + Clarity dashboards |

---

## 15. Calculator Hub

Primary **SEO and organic traffic** driver. High-intent visitors who use calculators are warmer leads.

### 15.1 Gold Price Calculator

- Input: weight (grams), purity (22K/18K/14K)
- Output: Metal value (live rate), making charges estimate, total
- Show: "This is an estimate. Visit us for exact pricing."
- Lead CTA: "Get a Free Valuation" → Inquiry Modal

### 15.2 Gold Investment Calculator

- Input: monthly investment amount, duration (years), expected return %
- Output: Maturity value, total invested, total returns
- Comparison chart: Gold vs FD vs Equity (rough)
- Lead CTA: "Talk to Our Investment Expert"

### 15.3 EMI Calculator

- Input: loan amount, tenure, interest rate
- Output: monthly EMI, total interest, total payment
- Pre-fill with common jewellery EMI rates

### 15.4 Jewellery Budget Calculator

- Input: occasion (wedding, birthday, daily), budget
- Output: Suggested categories, approximate weight ranges
- Dynamic: changes suggestions based on purity preferences
- Lead CTA: "Show me products in my budget" → filtered PLP

### 15.5 Gold Loan Calculator

- Input: jewellery weight, purity
- Output: estimated loan value (based on LTV ratios)
- Informational disclaimer

---

## 16. AI Chat Widget

### Phase 1 (Current) — UI Only

**States:**

| State | Description |
|---|---|
| Collapsed | Floating button (bottom right, offset from WhatsApp) |
| Open | Modal chat window: 380×520px |
| Loading | Typing indicator animation (3 dots) |
| Minimized | Reduced pill form with unread count badge |

**UI Details:**
- Header: "ABC Jewellers Assistant" + brand logo
- Placeholder messages: simulate a product Q&A flow
- Input: text field + send button
- No real backend in Phase 1 — show canned responses

### Phase 2 — Live Integration

- Connect to backend AI (Claude API or custom LLM)
- Knowledge base: product catalog, FAQs, gold rates, store info
- Hand-off: "Connect to human" → routes to WhatsApp

---

## 17. SEO Architecture

### 17.1 Metadata Strategy

Every page has unique:
- `<title>` (55–60 chars)
- `<meta name="description">` (150–160 chars)
- `<meta property="og:title">` + `og:description` + `og:image`
- Canonical URL
- Language (`<html lang="en-IN">`)

### 17.2 Structured Data (JSON-LD)

| Page | Schema Types |
|---|---|
| Homepage | `Organization`, `LocalBusiness`, `WebSite` |
| Product Detail | `Product`, `Offer`, `AggregateRating` |
| Category / PLP | `BreadcrumbList`, `ItemList` |
| Blog | `Article`, `BreadcrumbList` |
| FAQ | `FAQPage` |
| Contact | `LocalBusiness` |
| Appointment | `LocalBusiness` + `Event` |

### 17.3 URL Structure

```
/                              Homepage
/products                      All products
/gold-jewellery                Category (SEO)
/diamond-jewellery             Category (SEO)
/bridal-collection             Category (SEO)
/products/[slug]               Product detail
/collections                   Collections hub
/collections/[slug]            Collection detail
/blog                          Blog listing
/blog/[slug]                   Blog article
/calculators                   Calculator hub
/calculators/gold-price        Gold calculator
/calculators/emi               EMI calculator
/appointments                  Booking
/about                         About
/contact                       Contact
/faq                           FAQ
```

### 17.4 Sitemap & Robots

- `next-sitemap` generates `/sitemap.xml` on build
- `/robots.txt`: allow all public, disallow `/admin`, `/portal`, `/api`
- Revalidation: ISR pages regenerate sitemap on product/blog changes

---

## 18. Performance Requirements

### 18.1 Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |

### 18.2 Core Web Vitals

| Metric | Target | Description |
|---|---|---|
| LCP | < 2.5s | Largest Contentful Paint |
| FID / INP | < 100ms | Input responsiveness |
| CLS | < 0.1 | Layout shift |
| TTFB | < 600ms | Time to First Byte |
| FCP | < 1.8s | First Contentful Paint |

### 18.3 Optimization Techniques

- **Images:** Next.js `<Image>` with WebP, lazy loading, blur placeholder, correct `sizes` attribute
- **Fonts:** `next/font` with `font-display: swap`, subset only Latin + Devanagari
- **Video:** WebM format, lazy load below-fold videos
- **Code splitting:** Route-based, dynamic imports for heavy components (GSAP, charts)
- **CSS:** Tailwind purge, critical CSS inlined
- **Third party:** Load GA4 + Clarity with `next/script` `afterInteractive`
- **Animations:** `will-change: transform` only on animating elements; remove after animation

---

## 19. Analytics & Tracking

### 19.1 Google Analytics 4

**Custom Events:**

| Event | Trigger |
|---|---|
| `view_item` | PDP load |
| `add_to_cart` | Cart add |
| `begin_checkout` | Checkout start |
| `purchase` | Order success |
| `whatsapp_click` | WhatsApp CTA |
| `appointment_booked` | Appointment form success |
| `inquiry_submitted` | Inquiry modal submit |
| `calculator_used` | Any calculator result |
| `lead_captured` | Any lead form submit |

### 19.2 Microsoft Clarity

- Session recordings: understand UX drop-off
- Heatmaps: identify dead zones, rage clicks
- Focus areas: Homepage hero, PDP CTAs, Checkout funnel

---

## 20. Reusable Business Architecture

### 20.1 Business Config

```ts
// src/config/business.config.ts

export const businessConfig = {
  businessType: "jewellery",

  enabledModules: [
    "products",
    "categories",
    "appointments",
    "blog",
    "calculators",
    "orders",
    "wishlist",
    "goldRate",
  ],

  productAttributes: {
    purity: ["22K", "18K", "14K", "925 Silver"],
    weightUnit: "grams",
    priceDisplay: "perGram",
    showMakingCharges: true,
  },

  calculators: [
    "goldPrice",
    "goldInvestment",
    "emi",
    "budget",
    "goldLoan",
  ],
};
```

### 20.2 What Changes Per Vertical

| Layer | JewelleryOS | SalonOS | GymOS |
|---|---|---|---|
| Homepage template | Luxury jewellery | Salon ambience | Energy/fitness |
| Product label | "Jewellery" | "Services" | "Memberships / Classes" |
| Product attributes | Weight, purity | Duration, stylist | Duration, trainer |
| Calculators | Gold, EMI, Investment | Pricing estimator | Membership ROI |
| Appointment type | Bridal consultation | Hair/beauty booking | Class booking |
| Category pages | Gold, Diamond, Bridal | Hair, Skin, Nails | Strength, Cardio, Yoga |
| Brand colors | Gold `#D4AF37` | Rose / Blush | Bold, high-contrast |

### 20.3 Future Vertical Launch Checklist

To launch a new vertical on this platform:

- [ ] Create `src/templates/[vertical]/HomePage.tsx`
- [ ] Create `src/config/theme/[vertical].theme.ts`
- [ ] Update `businessConfig` for module flags
- [ ] Define product attribute schema
- [ ] Set `ACTIVE_TEMPLATE` env variable
- [ ] Configure announcement bar messages
- [ ] Update JSON-LD `LocalBusiness` type
- [ ] Done — everything else is shared

---

## 21. Development Phases

### Phase 1 — JewelleryOS Launch (MVP)

**Timeline: 8–10 weeks**

| Week | Deliverable |
|---|---|
| 1 | Project setup, theme engine, folder structure, Tailwind config |
| 2 | Header, Footer, Announcement Bar, shared layout |
| 3 | Homepage (luxury template) — Hero, Collections, Featured Products |
| 4 | Homepage completion — Gold Rate, Testimonials, Gallery, Appointment CTA |
| 5 | PLP — Filters, Sorting, Product Grid, Pagination |
| 6 | PDP — Gallery, Info, Tabs, CTAs, Related Products |
| 7 | Cart, Wishlist, Lead Capture components |
| 8 | Auth, Customer Portal (Profile, Orders) |
| 9 | Checkout flow, Order Success, Order Tracking |
| 10 | Blog, FAQ, Calculator Hub, SEO audit, Performance optimization |

### Phase 2 — Expansion (Post-Launch)

- Admin Dashboard (full)
- AI Chat Widget (live backend)
- Remaining calculators
- A/B testing on homepage sections
- PWA support

### Phase 3 — Multi-Vertical

- SalonOS template
- Multi-tenant deployment pipeline
- White-label admin customization

---

## 22. Definition of Done

A feature is **Done** when:

- [ ] TypeScript: zero `any` types in production code
- [ ] Responsive: tested at 375px, 768px, 1280px, 1440px
- [ ] Animation: `prefers-reduced-motion` handled
- [ ] SEO: unique title, description, canonical set
- [ ] Performance: no Lighthouse regression below 90 on any metric
- [ ] Accessibility: keyboard navigable, ARIA labels on interactive elements
- [ ] Theme: zero hardcoded brand values — all from `theme` config
- [ ] API errors: loading + error states handled (no blank screens)
- [ ] Analytics: relevant events firing correctly
- [ ] Code review: reviewed + approved

---

*End of Document — CommerceOS Frontend PRD v2.0*