# Animation Documentation - INNOIR Landing Page

This document provides complete information about all animation libraries, techniques, and implementations used in this project. Use this as a reference guide to apply similar animation patterns to other projects.

---

## 📚 Animation Libraries Used

### 1. **GSAP (GreenSock Animation Platform)**
- **Version**: `^3.14.2`
- **Package**: `gsap` + `@gsap/react` (^2.1.2)
- **Purpose**: Professional-grade animations, scroll-based animations, and complex timelines
- **License**: Free for most uses (check licensing for commercial projects)

### 2. **Framer Motion**
- **Version**: `^12.24.10`
- **Package**: `framer-motion`
- **Purpose**: React-specific animations, gestures, layout animations, and viewport-triggered animations
- **License**: MIT

### 3. **Lenis**
- **Version**: `^1.3.17`
- **Package**: `lenis`
- **Purpose**: Smooth scroll library for creating butter-smooth scrolling experiences
- **License**: MIT

### 4. **@use-gesture/react**
- **Version**: `^10.3.1`
- **Package**: `@use-gesture/react`
- **Purpose**: Advanced gesture recognition for drag, pinch, scroll interactions
- **License**: MIT

---

## 🎨 Animation Patterns & Components

### 1. **Smooth Scrolling (SmoothScroll Component)**

**File**: `src/components/SmoothScroll.tsx`

**Purpose**: Creates a smooth, inertial scrolling experience across the entire application.

**Implementation**:
```tsx
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <ScrollHandler />
            {children}
        </ReactLenis>
    );
}

function ScrollHandler() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true }); // Reset scroll on route change
        }
    }, [pathname, lenis]);

    return null;
}
```

**Key Configuration**:
- `lerp: 0.1` - Controls smoothing intensity (0-1, lower = smoother but slower)
- `duration: 1.5` - Scroll animation duration in seconds
- `smoothWheel: true` - Enables smooth wheel scrolling

**Usage in Layout**:
```tsx
// Wrap your entire app or page
<SmoothScroll>
    {children}
</SmoothScroll>
```

---

### 2. **Parallax Hero Section**

**File**: `src/components/Hero.tsx`

**Techniques Used**:
- GSAP ScrollTrigger for parallax effects
- Intro animations with timeline
- Blur effects and scaling

**Implementation**:
```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on scroll
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true, // Smooth scrubbing
        }
    });

    tl.to(textRef.current, { y: 100 }, 0);
    tl.to(imageRef.current, { y: -50 }, 0);

    // Intro animation timeline
    const introTl = gsap.timeline();
    
    // Set initial states
    gsap.set(textRef.current, { scale: 0.8, filter: "blur(10px)", opacity: 0 });
    gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });
    gsap.set(".hero-floating-text", { opacity: 0, y: 20 });

    // Animated sequence with stagger
    introTl.to(textRef.current, {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out"
    })
    .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.5") // Overlap by 0.5s
    .to(".hero-floating-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2 // Stagger each element
    }, "-=1");

    return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        introTl.kill();
    };
}, []);
```

**Key Concepts**:
- **ScrollTrigger**: Animate elements based on scroll position
- **Timeline (`gsap.timeline()`)**: Chain multiple animations
- **Stagger**: Animate multiple elements with delays
- **Easing**: `power3.out`, `power2.out` for smooth motion
- **Negative time values (`"-=0.5"`)**: Overlap animations

---

### 3. **Blur Text Animation**

**File**: `src/components/BlurText.tsx`

**Purpose**: Animated text that fades in from blur, word-by-word or letter-by-letter with viewport intersection observer.

**Features**:
- Animate by words or letters
- Direction control (top/bottom)
- Custom blur strength
- Intersection Observer for viewport triggering
- Customizable easing and timing

**Usage**:
```tsx
<BlurText
    text="Da Nang • Est. 2025"
    delay={150}                    // Delay between each element (ms)
    animateBy="letters"            // or "words"
    direction="bottom"             // or "top"
    threshold={0.1}                // Intersection threshold
    className="text-white"
/>
```

**Core Logic**:
```tsx
const defaultFrom = direction === 'top' 
    ? { filter: 'blur(10px)', opacity: 0, y: -50 } 
    : { filter: 'blur(10px)', opacity: 0, y: 50 };

const defaultTo = [
    {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
    },
    { filter: 'blur(0px)', opacity: 1, y: 0 }
];

return (
    <motion.span
        initial={fromSnapshot}
        animate={inView ? animateKeyframes : fromSnapshot}
        transition={{
            duration: totalDuration,
            delay: (index * delay) / 1000,
            ease: easing
        }}
    >
        {segment}
    </motion.span>
);
```

---

### 4. **Scroll Reveal Text**

**File**: `src/components/ScrollReveal.tsx`

**Purpose**: Text that reveals word-by-word as you scroll, with blur and rotation effects.

**Features**:
- Word-by-word reveal on scroll
- Rotation animation
- Blur effect option
- Scroll-scrubbed (tied to scroll position)

**Usage**:
```tsx
<ScrollReveal
    enableBlur={true}
    baseOpacity={0.1}
    baseRotation={3}
    blurStrength={4}
    rotationEnd="bottom bottom"
    wordAnimationEnd="bottom bottom"
>
    Your text content here
</ScrollReveal>
```

**Implementation Details**:
```tsx
// Rotation animation
gsap.fromTo(
    el,
    { transformOrigin: '0% 50%', rotate: baseRotation },
    {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: 1.5
        }
    }
);

// Word reveal with stagger
gsap.fromTo(
    wordElements,
    { opacity: baseOpacity, willChange: 'opacity' },
    {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: 1.5
        }
    }
);
```

---

### 5. **Typewriter Effect**

**File**: `src/components/TextType.tsx`

**Purpose**: Classic typewriter animation with advanced features.

**Features**:
- Character-by-character typing
- Deleting animation
- Multiple texts rotation
- Variable typing speed
- Blinking cursor
- Start on viewport intersection
- Loop control
- Color change per sentence

**Usage**:
```tsx
<TextType
    text={["First sentence", "Second sentence", "Third sentence"]}
    typingSpeed={50}              // ms per character
    deletingSpeed={30}
    pauseDuration={2000}          // Pause at end of sentence
    loop={true}
    showCursor={true}
    cursorCharacter="|"
    cursorBlinkDuration={0.5}
    startOnVisible={true}         // Start when in viewport
    variableSpeed={{ min: 40, max: 80 }}  // Random speed variation
    textColors={["#fff", "#f00"]} // Color per sentence
    onSentenceComplete={(sentence, index) => {
        console.log(`Completed: ${sentence}`);
    }}
/>
```

**Key Implementation**:
```tsx
// Cursor blink with GSAP
useEffect(() => {
    if (showCursor && cursorRef.current) {
        gsap.to(cursorRef.current, {
            opacity: 0,
            duration: cursorBlinkDuration,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
}, [showCursor, cursorBlinkDuration]);

// Typing logic
if (!isDeleting && currentCharIndex < processedText.length) {
    timeout = setTimeout(() => {
        setDisplayedText(prev => prev + processedText[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
    }, variableSpeed ? getRandomSpeed() : typingSpeed);
}
```

---

### 6. **Infinite Marquee**

**File**: `src/components/Marquee.tsx`

**Purpose**: Continuous horizontal scrolling text.

**Implementation**:
```tsx
import { motion } from "framer-motion";

export default function Marquee({ text = "DEFAULT TEXT" }) {
    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20, // Adjust for speed
                }}
            >
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </motion.div>
        </div>
    );
}
```

**Usage**:
```tsx
<Marquee text="INNOIR © — STREETWEAR — DA NANG —" />
```

---

### 7. **Framer Motion Viewport Animations**

**File**: `src/components/Location.tsx`

**Purpose**: Simple fade-in on scroll viewport detection.

**Implementation**:
```tsx
import { motion } from "framer-motion";

<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}  // Only animate once
    transition={{ duration: 0.6 }}
>
    Content here
</motion.div>
```

**Common Variants**:
```tsx
// Fade from left
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}

// Fade from right
initial={{ opacity: 0, x: 50 }}
whileInView={{ opacity: 1, x: 0 }}

// Scale up
initial={{ opacity: 0, scale: 0.8 }}
whileInView={{ opacity: 1, scale: 1 }}

// Slide and fade
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 1, y: 0 }}
```

---

### 8. **3D Dome Gallery with Gestures**

**File**: `src/components/DomeGallery.tsx`

**Purpose**: Interactive 3D image gallery with drag gestures and image enlargement.

**Key Technologies**:
- CSS 3D transforms
- `@use-gesture/react` for drag handling
- Request Animation Frame for smooth inertia
- Intersection and ResizeObserver APIs

**Features**:
- 360° rotatable sphere of images
- Drag to rotate
- Inertial scrolling
- Click to enlarge images
- Smooth transitions
- Touch and mouse support

**Core Concepts**:
```tsx
import { useGesture } from '@use-gesture/react';

// Drag gesture
useGesture(
    {
        onDragStart: ({ event }) => {
            // Initialize drag
        },
        onDrag: ({ event, velocity, direction, movement }) => {
            // Update rotation based on drag
            const nextX = clamp(
                startRotRef.current.x - dyTotal / dragSensitivity,
                -maxVerticalRotationDeg,
                maxVerticalRotationDeg
            );
            applyTransform(nextX, nextY);
        }
    },
    { target: mainRef, eventOptions: { passive: false } }
);

// Apply 3D transform
const applyTransform = (xDeg: number, yDeg: number) => {
    sphereRef.current.style.transform = 
        `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
};

// Inertia animation
const startInertia = (vx: number, vy: number) => {
    const step = () => {
        vX *= frictionMul; // Apply friction
        vY *= frictionMul;
        
        const nextX = clamp( rotationRef.current.x - vY / 200, -max, max);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        
        inertiaRAF.current = requestAnimationFrame(step);
    };
    inertiaRAF.current = requestAnimationFrame(step);
};
```

---

## 🎯 Animation Best Practices Used

### 1. **Performance Optimization**

```tsx
// Use will-change for animated properties
style={{ willChange: 'transform, filter, opacity' }}

// Use transform instead of top/left
transform: 'translateX(100px)' // ✅ GPU accelerated
left: '100px'                  // ❌ Causes layout recalc

// Clean up animations on unmount
useEffect(() => {
    const animation = gsap.to(...);
    return () => animation.kill();
}, []);

// Use requestAnimationFrame for smooth animations
const animate = () => {
    // Update logic
    rafRef.current = requestAnimationFrame(animate);
};
```

### 2. **Intersection Observer for Viewport Triggering**

```tsx
useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.unobserve(entry.target);
            }
        },
        { threshold: 0.1, rootMargin: '0px' }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
}, []);
```

### 3. **GSAP Timeline Pattern**

```tsx
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false // Set to true for debugging
    }
});

tl.to(element1, { y: 100 }, 0)      // Start at 0s
  .to(element2, { opacity: 0 }, 0.5) // Start at 0.5s
  .to(element3, { scale: 2 }, "-=0.2"); // Overlap by 0.2s
```

### 4. **Stagger Animations**

```tsx
// GSAP
gsap.to(".items", {
    opacity: 1,
    stagger: 0.2 // 0.2s delay between each element
});

// Framer Motion
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

<motion.div variants={container} initial="hidden" animate="show">
    {items.map((item, i) => (
        <motion.div key={i} variants={itemVariant}>
            {item}
        </motion.div>
    ))}
</motion.div>
```

---

## 🔧 Installation & Setup

### 1. **Install Dependencies**

```bash
npm install gsap @gsap/react framer-motion lenis @use-gesture/react
```

### 2. **Package.json Configuration**

```json
{
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@use-gesture/react": "^10.3.1",
    "framer-motion": "^12.24.10",
    "gsap": "^3.14.2",
    "lenis": "^1.3.17"
  }
}
```

### 3. **Tailwind CSS Setup** (for animations)

```typescript
// tailwind.config.ts
export default {
    theme: {
        extend: {
            animation: {
                'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            }
        }
    }
};
```

---

## 📖 Common Animation Recipes

### Recipe 1: Fade In On Scroll

```tsx
import { motion } from "framer-motion";

<motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
>
    Your content
</motion.div>
```

### Recipe 2: Scroll-Linked Parallax

```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(elementRef.current, {
        y: 200,
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1 // Smooth scrubbing
        }
    });
}, []);
```

### Recipe 3: Staggered List Animation

```tsx
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
    {items.map((item, i) => (
        <motion.li key={i} variants={itemVariants}>
            {item}
        </motion.li>
    ))}
</motion.ul>
```

### Recipe 4: Hover Animations

```tsx
<motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
    Hover me
</motion.div>
```

### Recipe 5: Page Transitions

```tsx
<motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.3 }}
>
    Page content
</motion.div>
```

---

## 🎬 GSAP Easing Reference

```typescript
// Common easing functions
"power1.out"    // Gentle deceleration
"power2.out"    // Medium deceleration
"power3.out"    // Strong deceleration
"power4.out"    // Very strong deceleration

"power1.in"     // Gentle acceleration
"power2.in"     // Medium acceleration

"power2.inOut"  // Ease in and out

"elastic.out"   // Bouncy effect
"back.out"      // Slight overshoot
"bounce.out"    // Bouncing effect

"none"          // Linear, no easing
```

---

## 🚀 Performance Tips

### 1. Use `transform` and `opacity` (GPU accelerated)
```tsx
// ✅ Good
gsap.to(element, { x: 100, opacity: 0.5 });

// ❌ Bad
gsap.to(element, { left: "100px", opacity: 0.5 });
```

### 2. Add `will-change` for complex animations
```tsx
<div style={{ willChange: 'transform' }}>...</div>
```

### 3. Use `scrub` for scroll animations
```tsx
scrollTrigger: {
    scrub: 1 // Smooth scrubbing (1 second catch-up)
}
```

### 4. Debounce resize handlers
```tsx
const handleResize = debounce(() => {
    // Expensive calculations
}, 100);
```

### 5. Clean up animations
```tsx
useEffect(() => {
    const tl = gsap.timeline(...);
    
    return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
}, []);
```

---

## 📚 Additional Resources

### GSAP
- [Official Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases/)

### Framer Motion
- [Official Docs](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

### Lenis
- [GitHub Repo](https://github.com/studio-freight/lenis)

### @use-gesture
- [Official Docs](https://use-gesture.netlify.app/)

---

## 🎨 CSS Animations Used

### Tailwind Utilities
```css
/* Spin animation */
.animate-spin

/* Ping animation (pulsing circle) */
.animate-ping

/* Bounce */
.animate-bounce

/* Transitions */
.transition-all
.transition-opacity
.transition-transform
.duration-300
.ease-in-out
```

### Custom CSS Animations
```css
/* Grayscale hover effect */
.grayscale.hover\:grayscale-0 {
    filter: grayscale(1);
    transition: all 700ms ease-in-out;
}

.grayscale.hover\:grayscale-0:hover {
    filter: grayscale(0);
}

/* Text stroke effect */
-webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
```

---

## ✅ Quick Reference Checklist

When applying these animations to a new project:

1. ✅ Install required packages (`gsap`, `framer-motion`, `lenis`, `@use-gesture/react`)
2. ✅ Wrap app with `<SmoothScroll>` for smooth scrolling
3. ✅ Import `gsap.registerPlugin(ScrollTrigger)` in components using GSAP
4. ✅ Use `useEffect` cleanup functions to kill animations
5. ✅ Add `willChange` CSS for animated properties
6. ✅ Use Intersection Observer for viewport-triggered animations
7. ✅ Prefer `transform` and `opacity` for GPU-accelerated performance
8. ✅ Test animations on mobile devices
9. ✅ Consider `prefers-reduced-motion` media query for accessibility

---

**Created**: 2026-02-02  
**Project**: INNOIR Landing Page  
**Version**: 1.0  

---

*Last Updated: 2026-02-02*
