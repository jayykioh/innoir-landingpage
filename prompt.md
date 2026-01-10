**ACT AS:**
A Lead Creative Developer & UI/UX Expert specializing in Awwwards-winning Fashion E-commerce sites. You are an expert in **Next.js 15**, **GSAP (ScrollTrigger)**, **Framer Motion**, **WebGL performance**, and **Mobile-First Design**.

**PROJECT CONTEXT:**
Build a high-end landing page for **"INNOIR"** (Innoir.streetwear), a local luxury streetwear brand based in Da Nang, Vietnam.
* **Owner:** Phu Nguyen.
* **Location:** Night Market (Chợ đêm), An Thượng, Sơn Trà, Da Nang 50000.
* **Socials:** Instagram (@innoir.streetwear).
* **Vibe:** Modern Editorial, "Swiss Style", Underground, Authentic, Monochrome.
* **Visual Reference:** Inspired by the "Moden" Framer Template (Magazine cover aesthetic, massive typography, depth effects, visible grid lines).

**TECH STACK:**
* **Framework:** Next.js 15 (App Router).
* **Styling:** Tailwind CSS (Strict usage for layout/typography).
* **Animation:** GSAP (for complex scroll parallax) + Framer Motion (for micro-interactions).
* **Smooth Scroll:** React Lenis (optimized for touch).
* **Icons:** Lucide-react.

---

### **1. VISUAL DIRECTION & STYLE SYSTEM**
* **Palette:** Strictly Monochrome (#050505 Black, #FFFFFF White). High contrast.
* **Typography:**
    * **Headings:** Huge Display Fonts (e.g., Syne, Inter Black).
    * **Fluid Sizing:** Use `clamp(3rem, 10vw, 15rem)` to prevent breakage on mobile.
    * **Body:** Small, Monospaced or Uppercase Sans (Inter), high tracking.
* **Layout:** Visible thin borders (`border-white/20`), Asymmetric Grids, High usage of negative space.

### **2. COMPONENT SPECIFICATIONS**

#### **A. HERO SECTION (The "Magazine Cover" Effect)**
* **Structure:**
    * **Layer 1 (Back):** Massive "INNOIR" text centered.
    * **Layer 2 (Middle):** Cutout image of Owner/Model overlapping the text (Parallax: Moves faster than text).
    * **Layer 3 (Front):** Floating small text: "EST. 2024 — DANANG".
* **Mobile Layout:** Use `h-[100dvh]` (Dynamic Viewport Height). Stack elements vertically or reduce parallax depth to ensure text readability.

#### **B. INFINITE MARQUEE**
* **Content:** "INNOIR © — STREETWEAR — CHỢ ĐÊM AN THƯỢNG — PHU NGUYEN — "
* **Style:** Large outlined text scrolling continuously. Use `react-fast-marquee` or GSAP loop.

#### **C. COLLECTIONS (Interactive Index)**
* **Design:** A vertical list of items (TEES, HOODIES, ACCESSORIES) separated by thin borders.
* **Desktop Interaction:**
    * **Default:** Text is **Outline** (Transparent fill, White stroke).
    * **Hover:** Text becomes **Solid White** + A high-res Lookbook Image **floats and follows the cursor** (Physics-based movement via `useMotionValue`).
    * **Metadata:** Show small details like "(01)", "SS24", "12 ITEMS".
* **Mobile Interaction:**
    * **State:** Text is **Always Solid White**.
    * **Behavior:** Convert to an **Accordion**. Tapping a row expands it to show the image and a "SHOP NOW" button.

#### **D. COMMUNITY PAGE (The "Archive")**
* **Concept:** A "Street Snap" / Lookbook Wall of Fame.
* **Desktop:** 3-Column Masonry Grid with **Parallax Scrolling** (Columns scroll at different speeds).
    * **Effect:** Images are **Grayscale** by default → **Full Color** on Hover.
* **Mobile:** Convert to a **Horizontal Swiper/Slider** (Snap scroll). Images are always Full Color.

#### **E. LOCATION (Footer)**
* **Layout:** 2-Column Grid.
* **Left:** Address info ("Night Market, An Thuong...").
* **Right:** **Custom Google Map**.
    * **Style:** MUST be **Grayscale/Dark Mode**. Remove default UI colors to match the site theme.
    * **UX:** Add `cooperative-gesture-handling` to prevent scroll trapping on mobile.

---

### **3. PERFORMANCE GUIDELINES (MANDATORY)**
* **Animation Loop:** NEVER use `useState` for mouse tracking. Use `useRef` or `useMotionValue` to update the DOM directly (Bypass React Render Cycle).
* **Optimization:**
    * Wrap GSAP animations in `gsap.context()` for proper cleanup.
    * Only animate `transform` and `opacity` to avoid Layout Thrashing.
    * Use `will-change: transform` sparingly on animating elements.
* **Loading:** Use `next/image` with `priority` for Hero and `lazy` + `sizes` for grids.

### **4. RESPONSIVE STRATEGY (MOBILE FIRST)**
* **Navigation:** Hide inline links on mobile. Use a "Hamburger" icon triggering a **Full-Screen Overlay Menu** (locks body scroll).
* **Touch Targets:** Ensure all buttons/links have a minimum hit area of **44x44px**.
* **Animation Logic:** Use `ScrollTrigger.matchMedia` to **DISABLE** heavy parallax scrubbers on mobile (< 768px). Replace with simple Fade-in (`whileInView`) animations.
* **Typography:** Ensure `break-words` is applied to massive headings to prevent horizontal overflow on small screens.

**OUTPUT INSTRUCTIONS:**
1.  Initialize the project with the specified Tech Stack.
2.  Implement the `layout.tsx` (Fonts/Lenis), `Hero.tsx`, `Services.tsx` (Collections), and `Community.tsx` components.
3.  Ensure strict adherence to the **Performance** and **Mobile-First** rules above.