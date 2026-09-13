# Section 2 Design Plan: "The Canvas" (Map Cutout Scroll-Reveal)

This document details the visual and technical design approach for **Section 2**, specifically focusing on the highly immersive "Kerala Map Cutout" scroll-reveal and the horizontal scroll journey that follows.

---

## 1. Visual Architecture & Layout

The section is broken down into two distinct visual phases that are triggered by the user's scroll position.

### Phase 1: The Map Cutout (The Portal)
*   **Background:** A solid, premium color (e.g., deep earthy green or warm off-white) takes over the screen as the user scrolls down from the Hero section.
*   **The Mask:** In the center of the screen is an SVG mask (or CSS `clip-path`) in the exact geographic silhouette of the Kerala map.
*   **The Content Inside the Mask (The 3-Split):** Inside the map cutout, the view is vertically split into 3 distinct sections side-by-side: The Blue (Backwaters), The Green (Munnar), and The Gold (Nattika Beach). 
*   **The Vibe:** It feels like looking through a keyhole into three different magical worlds simultaneously.

### Phase 2: The Expansion (Glassmorphism Carousel)
Once the map has fully scaled up and the mask is no longer visible, the layout dynamically shifts. The center landscape expands to take over the entire full-screen background. The other two landscapes elegantly shrink and dock at the bottom of the screen inside a sleek, frosted **glassmorphism carousel**.

---

## 2. Animation & Interaction Choreography

The magic of this section relies entirely on scroll-linked animations (likely powered by a library like **GSAP ScrollTrigger**).

### Step 1: The Approach
*   **Trigger:** When the top of Section 2 enters the viewport.
*   **Action:** The section pins to the screen. The Kerala map cutout is centered, displaying the 3-split layout inside.

### Step 2: The Dive (Scale-Up & Focus)
*   **Trigger:** User scrolls down while the section is pinned.
*   **Action:** The SVG mask of the Kerala map begins to scale up exponentially (`transform: scale()`). Simultaneously, the 3-split layout shifts: the center panel begins to expand outwards, taking over the width of the cutout, while the side panels begin to scale down and shift downwards.
*   **Effect:** The solid background is pushed entirely out of the viewport.

### Step 3: The UI Reveal (Glassmorphism Carousel)
*   **Trigger:** The scale-up animation completes (mask is gone).
*   **Action:** The center landscape is now full screen. A beautiful, frosted-glass UI container fades in at the bottom of the screen. Inside this glass carousel are the thumbnails/previews of the other two landscapes.
*   **Interaction:** 
    *   The user can click or slide the items in the glass carousel.
    *   Clicking a carousel item swaps the full-screen background to that landscape, updating the descriptive text overlay (e.g., "Float through the veins of the earth in Alleppey").

### Step 4: The Exit
*   **Trigger:** The user scrolls past the pinned duration.
*   **Action:** The section unpins, and the user naturally scrolls vertically down into **Section 3 (The Rhythm - Monsoons)**.

---

## 3. Technical Implementation Guidelines

*   **Animation Engine:** GSAP (GreenSock) with the ScrollTrigger plugin is highly recommended for smooth, scrubbable scroll animations.
*   **The Mask:** Use a high-quality SVG of the Kerala map. It can be applied using CSS `clip-path: url(#kerala-map)` or through a WebGL masking technique if using a canvas-based approach (like Three.js) for better performance with video.
*   **Responsiveness:** On mobile, the scale-up effect needs careful tuning so the map doesn't distort. The horizontal scroll is still effective on mobile, often translating to a swipeable carousel if scroll-jacking feels too heavy.
*   **Performance:** The videos inside the horizontal scroll must be highly compressed/optimized (mp4 or WebM) and set to lazy-load to prevent the page from lagging during the heavy scale-up animation.
