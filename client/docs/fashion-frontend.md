# ChikanCraft OS Frontend — Product Requirements Document

**Version:** 1.0  
**Status:** Active  
**Vertical:** ChikanCraft OS (Lucknow Chikankari Luxury Fashion)  
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
9. [Pages — ChikanCraft OS](#9-pages--chikancraft-os)
10. [Homepage Animation Guidelines](#10-homepage-animation-guidelines)
11. [Lead Capture & CRM Integration](#11-lead-capture--crm-integration)
12. [E-Commerce & Custom Stitching Modules](#12-e-commerce--custom-stitching-modules)
13. [Customer Account](#13-customer-account)
14. [Admin Dashboard](#14-admin-dashboard)
15. [SEO Traffic Tools & Calculators](#15-seo-traffic-tools--calculators)
16. [AI Chat Widget](#16-ai-chat-widget)
17. [SEO Architecture](#17-seo-architecture)
18. [Performance Requirements](#18-performance-requirements)
19. [Analytics & Tracking](#19-analytics--tracking)
20. [Pricing & Monetization Strategy](#20-pricing--monetization-strategy)
21. [Definition of Done](#21-definition-of-done)

---

## 1. Vision & Strategy

### 1.1 What We Are Building

**ChikanCraft OS** is a premium, heritage-focused, conversion-first frontend platform tailored specifically for the **Lucknow Chikankari (Hand Embroidery) fashion industry**. 

Lucknow's famous Chikankari industry comprises thousands of local stores, wholesalers, exporters, boutiques, and designer labels that still rely heavily on offline exhibitions, WhatsApp, and Instagram to capture leads and close sales. Rather than forcing these businesses onto a generic, complex e-commerce flow, ChikanCraft OS acts as a luxury digital storefront that bridges modern e-commerce convenience with high-touch conversational sales channels (WhatsApp, custom stitching requests, and export inquiry forms).

This is **not** a CMS-editable page-builder website. It is a **highly optimized, deployable software product** where:
- The codebase is structured as a reusable OS template.
- Theme configs and vertical attributes drive customization.
- Visual storytelling sections are standard to build trust in handcrafted luxury goods.
- High-intent calculators and interactive modules act as organic search (SEO) capture nets.

### 1.2 Target Audience

ChikanCraft OS is designed to meet the business needs of:
* Chikankari Retail Stores & Wholesalers
* Luxury Fashion Boutiques & Designer Labels
* Handcrafted Ethnic Wear Brands
* Export Houses & Handloom Cooperatives

### 1.3 Brand Positioning & Inspiration

The design aesthetic communicates **heritage, authenticity, human craftsmanship, and premium luxury**. 
* **Visual Inspiration:** Sabyasachi, FabIndia, House of Anita Dongre, Aachho, Okhai.
* **Core Philosophy:** Breathing layouts, high-definition multimedia showcase of artisan loops, delicate typography, and warm, premium color schemes.

---

## 2. Product Goals

### Goal 1 — Luxury Heritage Experience
Chikankari is a premium handcrafted art. The storefront must reflect the meticulous labor of the artisans.
* **Do:** Use rich HSL tailored warm tones, elegant serif headers (Cormorant Garamond), breathing white space, and slow-motion video zoom overlays capturing the embroidery process.
* **Do Not:** Use loud flash-sale countdown timers, neon color palettes, intrusive overlays, or cheap low-resolution stock layouts.

### Goal 2 — Multi-Channel Lead Generation
Because luxury garments often require custom measurements, scaling options, or bulk queries, every page features contextual call-to-actions (CTAs).

| Page Type | Primary CTA | Supporting Secondary CTA |
|---|---|---|
| **Homepage** | Shop Collection | Custom Orders / Export Inquiry |
| **Product Detail Page (PDP)** | WhatsApp Order / Add to Cart | Custom Stitching Measurements / Bulk Inquiry |
| **Lookbook Module** | Shop the Look | Book a Designer Appointment |
| **SEO Calculator Hub** | Estimate Requirement / Size | Submit Measurements & Subscribe |

### Goal 3 — Component Reusability & Vertical Adaptability
While JewelleryOS and FashionOS have different custom attributes, **90% of the CommerceOS platform architecture remains identical**.

| Layer | Shared Core | ChikanCraft OS Customization |
|---|---|---|
| **Auth & Customer Portal** | ✅ Core JWT & Sessions | Portal stores custom stitch measurements |
| **E-Commerce & Checkout** | ✅ Core Cart & Checkout | Integrates custom stitching options |
| **CRM / Lead Forms** | ✅ Lead processing logic | Captures Custom Stitching, Bulk, & Export leads |
| **Theme Engine** | ✅ Configuration engine | Primary warm tones, Cormorant Garamond font |
| **Product Attributes** | ❌ Base structures | Adds `fabric`, `embroideryType`, `workType`, `color` |

---

## 3. Tech Stack

### 3.1 Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Next.js (App Router)** | 14+ | Standard framework with Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR) |
| **TypeScript** | 5+ | Static typing across products, carts, and inquiries |
| **Tailwind CSS** | v4 | Utility-first styling with custom styling variables |
| **Shadcn UI** | Latest | Underlying accessible component primitives |

### 3.2 State Management & API

| Technology | Purpose |
|---|---|
| **Zustand** | Lightweight client-side stores (cart, customer measurements, wishlist) |
| **TanStack Query** | Server-side API state, automatic cache revalidation, query prefetching |
| **Axios** | HTTP requests with request/response interceptors for JWT tokens |

### 3.3 Animation & Media

| Technology | Purpose |
|---|---|
| **Framer Motion** | Primary layout transitions, hover animations, scroll-triggered page fades |
| **GSAP (ScrollTrigger)** | Smooth cinematic hero section parallax and fabric texture depth reveals |
| **Embla Carousel** | Responsive touch-friendly custom carousels |
| **Next Image** | Dynamic WebP image compression and lazy loading |

---

## 4. Architecture Overview

```
ChikanCraft OS Frontend
│
├── Core Platform (90% Shared Codebase)
│   ├── Auth System (OTP / Password)
│   ├── E-Commerce Core (Cart, Standard Checkout, Orders)
│   ├── Core Blog Engine
│   ├── Appointment Management
│   ├── Media Library
│   ├── Base Analytics System
│   └── Shared Theme & Animation Infrastructure
│
└── Fashion/Chikan Business Layer (10% Custom Configs)
    ├── ChikanCraft OS Theme (Cormorant Garamond + Warm Neutrals)
    ├── Product Entity Enhancements (Fabric, Color Pickers, Embroidery Types)
    ├── Custom Stitching Module (Measurements & Requirements)
    ├── Lookbook Module (Cinematic Collections & Look Galleries)
    ├── Export & Bulk Inquiry Forms
    └── Traffic Tools (Size Calculator, Fabric Estimator, Budget Planner)
```

---

## 5. Theme Engine

The Theme Engine controls styling dynamically from configuration files. No styling rule or color token is hardcoded into individual reusable components.

### 5.1 Theme Configuration File

```ts
// src/config/theme/theme.ts

export const theme = {
  businessType: "fashion",
  niche: "chikankari",
  brandName: "Noor Chikan",
  tagline: "Authentic Lucknowi Handcrafted Chikankari",
  
  colors: {
    primary: "#8B6B4A",       // Warm Luxury Sand / Earth Brown
    primaryLight: "#D8C3A5",  // Cream Accent
    secondary: "#F7F3EE",     // Linen Surface Ivory
    text: {
      primary: "#2C2520",     // Deep Espresso
      secondary: "#6A5D54",   // Soft Taupe
      muted: "#9E8E83",       // Light Clay
      inverse: "#FFFFFF"
    },
    border: "#EADFD3",
    success: "#16A34A",
    error: "#DC2626"
  },

  typography: {
    heading: "Cormorant Garamond", // Classic Luxury Serif
    body: "Inter",                 // Ultra-readable Sans-Serif
    accent: "Playfair Display"     // Styled editorial sub-headers
  },

  contact: {
    phone: "+91-XXXXXXXXXX",
    whatsapp: "+91-XXXXXXXXXX",
    whatsappMessage: "Hello Noor Chikan, I am interested in exploring your handmade Chikankari collection.",
    email: "inquiries@noorchikan.com",
    address: "Chikankari Artisan Market, Chowk, Lucknow, UP 226003"
  },

  features: {
    enableCart: true,
    enableWishlist: true,
    enableCustomStitching: true,
    enableLookbook: true,
    enableCalculators: true,
    enableExportInquiry: true,
    enableBlog: true
  }
};
```

---

## 6. Template System

The homepage and niche landing pages are decoupled into a layout template. A template can be completely hot-swapped by modifying the active configuration.

```
src/templates/
├── chikancraft/
│   ├── HomePage.tsx               ← Main landing experience
│   ├── HeroSection.tsx            ← Cinematic parallax video intro
│   ├── HeritageStory.tsx          ← Timeline craftsman reveal
│   ├── CollectionSlider.tsx       ← Editorial layout category slider
│   ├── ArtisanSpotlight.tsx       ← Video/Photo showcase of artisans
│   └── ExportEnquiry.tsx          ← Bulk buyer inquiry interface
```

---

## 7. Folder Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Main homepage
│   │   ├── products/
│   │   │   ├── page.tsx                # Product Listing (PLP)
│   │   │   └── [slug]/page.tsx         # Product Detail (PDP)
│   │   ├── collections/
│   │   │   ├── page.tsx                # Lookbook collections page
│   │   │   └── [slug]/page.tsx         # Specific campaign page
│   │   ├── custom-stitching/
│   │   │   └── page.tsx                # Measurement & custom submission
│   │   ├── occasion/
│   │   │   └── [slug]/page.tsx         # SEO occasion-targeted page
│   │   ├── calculators/
│   │   │   ├── size-calculator/page.tsx
│   │   │   ├── fabric-calculator/page.tsx
│   │   │   └── budget-planner/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                # Blog Hub
│   │   │   └── [slug]/page.tsx         # Post view
│   │   ├── cart/page.tsx
│   │   └── checkout/page.tsx
│   ├── (portal)/
│   │   ├── dashboard/page.tsx          # Account overview
│   │   ├── measurements/page.tsx       # Saved stitching records
│   │   └── orders/page.tsx             # Past orders & tracking
```

---

## 8. Shared Layout Components

### 8.1 Header
* **Behavior:** Translucent glassmorphism at the top (`backdrop-blur-md bg-white/80 border-b border-border/40`), shifting to opaque ivory (`theme.colors.secondary`) on scroll down.
* **Layout:**
  - **Left:** Brand Logo ("Noor Chikan" in serif style)
  - **Center Navigation:** Shop, Lookbook, Custom Stitching, Export, Heritage, Blog
  - **Right Action Tray:** Search bar, Saved measurements indicator, Wishlist count, Cart drawer trigger

### 8.2 Announcement Bar
* **Action:** Auto-scroll rotation showing custom shipping offers, artisan verify notes, or export notices.
* **Examples:**
  * "✨ Handcrafted in Lucknow — 100% Authentic Chikankari Work"
  * "✈️ Free Worldwide Shipping on orders above ₹25,000 / $300"
  * "🧵 Custom Stitching & Tailoring available on all Suits & Kurtas"

---

## 9. Pages — ChikanCraft OS

### 9.1 Homepage

#### Hero Section
A full-screen cinematic experience telling the brand story in seconds.
* **Background:** Autoplay, loop-muted background video showing slow-motion closeups of local artisans stitching fabrics, thread loops pulling, and model silhouettes wearing flowy Chikankari.
* **Copy Overlay:**
  ```
  Handcrafted Chikankari
  Timeless Elegance
  Made in Lucknow
  ```
* **CTAs:**
  - `Shop Collection` (Solid brand brown button)
  - `Custom Orders` (Outlined ivory button)

#### Heritage Section
An interactive scrolling horizontal timeline that details the history of Chikankari, from its origins in the Mughal era to the detailed block printing (Chhape) and hand embroidery process (Tanka) done today.
* **Animation:** Reveal text block sequences and sketch overlays as the user scrolls horizontally.

#### Featured Collections
Luxury editorial-style grids highlighting major categories:
* Kurtis
* Sarees
* Suits
* Dupattas
* Co-ord Sets
* Menswear
* Bridal Collection
* **Layout:** Alternating sizes of grid items (large imagery offset by smaller vertical detail boxes).

#### Shop By Occasion
Curated image banners targeting customer search intent:
* **Wedding Wear** (Exquisite heavy work georgette and silk)
* **Casual Wear** (Breathable cotton kurtas for daily wear)
* **Office Wear** (Subtle pastels on crisp mulmul)
* **Festive Wear** (Bright mustard, pastel pink with mirror work details)

#### Shop By Color
Interactive row of premium color swatches. When hovered, the background of the section subtly shifts to match the mood of the color card.
* **Featured Swatches:** Ivory White, Jet Black, Pastel Pink, Sky Blue, Mustard Gold.

#### Shop By Fabric
An interactive, high-contrast fabric showcase. Users click on a fabric texture card to filter products:
* **Cotton:** Lightweight and classic
* **Mulmul:** Soft, premium muslin
* **Georgette:** Flowy, perfect for wedding wear
* **Rayon:** Modern, durable daily wear
* **Silk:** Rich luxury styling

#### Artisan Story Section
A dedicated horizontal card deck presenting individual artisans, their location in Lucknow (e.g., Chowk, Kakori), and a link to watch their embroidery journey. This builds visual trust and authenticity.

#### Export & Wholesalers Section
A high-converting bottom layout block specifically aimed at international boutiques, boutique buyers, and export houses.
* **Copy:** "Bulk Orders, Corporate Gifting & Export Inquiries"
* **CTA:** `Request Export Catalog` (Triggers Bulk Inquiry modal)

---

### 9.2 Product Listing Page (PLP)

The product grid includes fashion-specific attributes and multi-select filtering structures.

```
+-------------------------------------------------------------+
| Filter Sidebar                     Product Catalog          |
|                                    Sort: Popularity v       |
|  Category                          +---------------------+  |
|  [x] Kurti   [ ] Saree             | Image (hover swap)  |  |
|  [ ] Suit    [ ] Co-ord            |                     |  |
|                                    | Noor White Kurta    |  |
|  Fabric                            | Rs. 3,499           |  |
|  [ ] Cotton  [ ] Georgette         | Size: XS S M L XL   |  |
|                                    | [Quick Inquire]     |  |
|  Size                              +---------------------+  |
|  [ ] XS  [x] S  [x] M [ ] L        +---------------------+  |
|                                    | Image               |  |
|  Embroidery Type                   |                     |  |
|  [ ] Bakhiya [ ] Phanda            | Georgette Saree     |  |
|  [ ] Keel Kangan                   | Rs. 12,990          |  |
|                                    | Size: Free Size     |  |
|  Color                             | [Quick Inquire]     |  |
|  ( ) White ( ) Pink ( ) Blue       +---------------------+  |
+-------------------------------------------------------------+
```

#### Filters
* **Category:** Kurti, Saree, Suit, Dupatta, Co-ord Set, Menswear, Bridal
* **Price Range:** Dual-handle slider input
* **Size:** XS, S, M, L, XL, XXL, Free Size
* **Color:** Visual color circle pickers
* **Fabric:** Cotton, Mulmul, Georgette, Rayon, Silk, Organza
* **Embroidery Type:** Bakhiya (shadow work), Phanda (millet seed stitch), Keel Kangan, Jali, Tepchi
* **Occasion:** Casual, Party, Wedding, Festive
* **Availability:** In Stock, Out of Stock

---

### 9.3 Product Detail Page (PDP)

The PDP is optimized to convey handcraft values and capture buyer queries.

#### 1. Visual Gallery
* A grid of high-resolution images showing the front drape, back print, and a **micro macro zoom shot** showing the individual thread knots.
* Loop video of model movement to showcase fabric drape weight.
* Optional 360° product turntable interface.

#### 2. Size Picker & Custom Stitching Option
* Direct size selection (XS - XXL) with a floating `Size Guide` popup trigger.
* **Toggle:** "Stitch to my fit (+ ₹800)" checkbox. Clicking this expands the custom measurement fields inline.

#### 3. WhatsApp Direct Order CTA
* A primary sticky action button: "Order via WhatsApp". Clicking this opens a WhatsApp chat pre-filled with: 
  `"Hi Noor Chikan, I want to order [Product Name] (SKU: [SKU-ID]) in Size [Selected Size]. Please confirm availability."`

#### 4. Craftsmanship Details Drawer
* An accordion panel detailing:
  - **Embellishment Type:** Hand-embroidered in Lucknow.
  - **Stitch Count Rating:** High density hand-done tankas.
  - **Wash Care:** Dry clean only / Mild hand wash.

---

## 10. Homepage Animation Guidelines

To project a luxury brand image, animations must feel smooth, organic, and premium:

* **Hero Scroll Zoom:** As the user scrolls down from the Hero section, the background video container scale expands smoothly from width `90vw` to `100vw`, creating a cinematic entrance.
* **Product Card Hover Swap:** On hovering over a product listing card, the listing image fades out to display a secondary detail shot showing a closeup of the embroidery work, while the card lifts by `4px` with a soft drop shadow.
* **Fade-Up Stagger:** Category cards and collections fade in from an opacity of `0` and a displacement of `y: 30px` in a staggered interval of `0.08s` per card as they enter the browser viewport.
* **Count-Up Stats:** Interactive counter animation in the artisan story section for numbers like `"5000+ Artisans Supported"`, `"50+ Countries Exported"`, and `"100% Handloom Fabrics"`.

---

## 11. Lead Capture & CRM Integration

ChikanCraft OS integrates specialized lead capture forms. These leads flow directly into the backend CRM, tagged with appropriate categories.

### 11.1 Inquiry Classifications

Leads are categorized at capture time to route them to the correct sales representatives:

```
                  [ Lead Ingest API ]
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  [Retail Inquiry]  [Custom Stitching]  [Export Inquiry]
  WhatsApp Orders    Garment Measures   Bulk / Wholesalers
```

* **Retail Inquiry:** Product detail requests and stock inquiries.
* **Custom Stitching:** Submitted measurements linked to client profile accounts.
* **Export Inquiry:** Corporate buyers, international boutiques, and custom order bids.
* **Wholesale Inquiry:** Local boutique buyers wanting bulk discounts.

### 11.2 Export & Bulk Inquiry Form Entity

Located in the Export Section of the homepage and catalog, this form collects details from international bulk buyers:

```json
{
  "companyName": "string",
  "contactPerson": "string",
  "country": "string",
  "quantityNeeded": "number",
  "productCategoryInterest": "string[]",
  "message": "string",
  "leadSource": "export_portal"
}
```

---

## 12. E-Commerce & Custom Stitching Modules

### 12.1 Product Entity Schema

To capture Chikankari attributes, the core product entity is extended with the following types:

```ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  
  category: "kurti" | "saree" | "suit" | "dupatta" | "coord" | "menswear" | "bridal";
  collection: string;     // e.g. "Mughal Craft Collection"
  
  fabric: "cotton" | "mulmul" | "georgette" | "rayon" | "silk" | "organza";
  color: string;          // Hex code or color name
  size: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "FreeSize")[];
  
  embroideryType: string; // e.g. "shadow-work", "phanda", "jali"
  workType: "heavy" | "light" | "medium";
  occasion: ("casual" | "wedding" | "festive" | "office")[];
  
  description: string;
  images: string[];       // Array of URLs
  videos: string[];
  
  price: number;
  salePrice?: number;
  stock: number;
}
```

### 12.2 Custom Stitching Configuration

If the customer selects "Stitch to my fit" on a product detail page or accesses it via their portal, they can fill in the stitching entity form:

```ts
export interface CustomStitchingRequest {
  productId: string;
  measurements: {
    bustSize: number;      // Inches
    waistSize: number;
    hipSize: number;
    shoulderWidth: number;
    kurtaLength: number;
    sleeveLength: number;
    neckDepthFront: number;
  };
  customRequirements?: string; // Special fit messages
}
```

These measurements can be saved directly to the customer's account preferences for future orders.

---

## 13. Customer Account

The customer profile area includes the following key features:
* **Wishlist:** Saved items synchronized across guest and logged-in states.
* **Order Tracking:** Real-time logistics progress (Placed, Shipped, Delivered) with direct links to request delivery help via WhatsApp.
* **My Measurements:** A secure tab allowing users to edit and save multiple measurement profiles (e.g., "My Kurta Size", "Mother's Saree Fit").
* **Saved Preferences:** Preferred colors, fabrics, and sizes to auto-apply filters when browsing the shop catalog.

---

## 14. Admin Dashboard

A secure, internal portal for store operators to manage products and incoming inquiries.

### 14.1 Leads Hub
* A kanban-style lead management board.
* **Columns:** New, In Discussion, Measuring, Awaiting Payment, Order Placed, Closed.
* Each lead card has a quick link to trigger a direct WhatsApp chat window containing pre-saved message templates.

### 14.2 Custom Customizer Panel
* Allows store administrators to update:
  - Global announcement messages.
  - Active color tokens (e.g. changing the accent color from warm beige to terracotta).
  - Export catalog downloads (.pdf files).

---

## 15. SEO Traffic Tools & Calculators

High-intent tools drive organic search visibility and act as the top of the customer acquisition funnel.

### 15.1 Kurti Size Calculator
* **Inputs:** Height, Weight, Bust Size, Preferred Fit Type (Relaxed, Regular, Slim Fit).
* **Output:** Recommended size (e.g. "Medium - Size 38").
* **Lead Capture:** Option to email recommendations or save to profile details.

### 15.2 Fabric Requirement Calculator
* A tool for custom suit or saree tailoring.
* **Inputs:** Selected style (Anarkali, Straight Fit, A-Line), Customer Height.
* **Output:** Recommended fabric length in meters (e.g., "3.5 meters of Georgette needed").

### 15.3 Outfit Budget Planner
* **Inputs:** Occasion Type (Festive, Wedding Trouseau, Casual wear), Total Budget constraint.
* **Output:** A curated checklist suggest package combinations (e.g., Kurti + Matching Dupatta + Pants) matching the cost profile, with direct links to pre-filtered collections.

---

## 16. AI Chat Widget

The AI assistant offers personalized, automated product guidance:
* **Knowledge Base:** Handled fabrics, sizing differences, wash care guidelines, custom tailoring capabilities, and store locations.
* **Conversational Assistance:** Suggests products matching specific tags:
  * Customer: *"Show me pastel blue georgette kurtis for a summer wedding."*
  * AI: *Suggests 3 matching product cards with image previews and "Inquire on WhatsApp" buttons.*
* **Human Hand-off:** If the query is complex or involves a bulk/export order, the widget routes the customer details to a live sales representative via WhatsApp.

---

## 17. SEO Architecture

### 17.1 URL Schema

```
/                                  # Homepage (Optimized for "Lucknow Chikankari Store")
/products                          # Catalog Page (All products)
/products/[slug]                   # Product Detail page
/custom-stitching                  # Custom Stitching Landing Page
/lookbook                          # Lookbook Collections
/wedding-chikankari                # SEO Occasion Landing Page
/festive-collection                # SEO Occasion Landing Page
/summer-cotton-kurtis              # SEO Occasion Landing Page
/blog                              # Blog Hub (Targeting "Handmade vs Machine Embroidery")
/blog/[slug]                       # Individual Article page
/calculators/size-calculator       # Size Calculator Tool
```

### 17.2 Structured Data (JSON-LD)
* **Product Pages:** Includes `Product` and `Offer` schema containing colors, fabric type, and stock availability metrics.
* **Homepage:** Uses `LocalBusiness` and `Organization` schemas targeting geographical keywords (Lucknow, Uttar Pradesh).
* **Occasion landing pages:** Uses `CollectionPage` schema with an `ItemList` wrapper.

---

## 18. Performance Requirements

ChikanCraft OS targets premium performance scores to prevent conversion drops:

* **Lighthouse Scores:**
  - Performance: **≥ 95**
  - SEO: **100**
  - Accessibility: **≥ 95**
* **Core Web Vitals:**
  - Largest Contentful Paint (LCP): **< 2.2 seconds**
  - Interaction to Next Paint (INP): **< 100 milliseconds**
  - Cumulative Layout Shift (CLS): **< 0.08**

---

## 19. Analytics & Tracking

The analytics layer tracks conversion metrics across conversational and traditional purchase funnels.

### 19.1 Event Trigger List

| Event Name | Trigger Context |
|---|---|
| `view_item` | Product Detail Page (PDP) viewed |
| `whatsapp_order_click` | Sticky or inline WhatsApp CTA clicked |
| `stitching_measure_submit` | Custom stitching measurements submitted |
| `export_lead_submit` | Bulk Export form inquiry completed |
| `calculator_run` | Sizing or fabric calculation tool utilized |

---

## 20. Pricing & Monetization Strategy

To support local Lucknowi businesses, ChikanCraft OS is packaged into three tiers based on software usage:

### 20.1 Starter Website
* **Price Range:** ₹25,000 – ₹40,000
* **Features:** 
  - Premium Responsive Website Layout
  - Product Catalog (up to 150 items)
  - Sticky WhatsApp Order System
  - Heritage blog hub

### 20.2 Growth Package
* **Price Range:** ₹50,000 – ₹75,000
* **Features:** 
  - All Starter Features
  - Complete Core E-Commerce Checkout (Integrated Payment Gateway)
  - Lead Management CRM System
  - Customer Accounts (Saved Wishlist & Order History)

### 20.3 Premium Package
* **Price Range:** ₹1,00,000+
* **Features:**
  - All Growth Features
  - Custom Stitching Measurement Portal
  - Lookbook Module & Campaigns pages
  - Export & Wholesale Inquiry System
  - Advanced Sales & Analytics Reports

---

## 21. Definition of Done

Features are considered **Done** when they satisfy the following criteria:
- [ ] **Accessibility:** Keyboard accessibility verified and semantic HTML elements utilized.
- [ ] **Responsiveness:** Visual checks completed at viewport widths of 375px, 768px, 1280px, and 1440px.
- [ ] **TypeScript Safety:** Complete type safety achieved, with no `any` fallback definitions.
- [ ] **Theme Isolation:** Zero hardcoded brand styles; all tokens are retrieved from `theme.ts`.
- [ ] **SEO Compliance:** Correct metadata structures and relevant JSON-LD schemas verified.
- [ ] **Performance Targets:** Lighthouse performance metric verified at 90+ score.

---
*End of Document — ChikanCraft OS Frontend PRD v1.0*