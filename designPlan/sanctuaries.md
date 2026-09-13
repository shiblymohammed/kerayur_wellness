# Section 7 Design Plan: "The Sanctuaries" (Partnering Properties)

This document details the visual, interaction, and technical design approach for **Section 7: The Sanctuaries**. This section serves as the gateway to the two distinct retreat experiences offered by Kerayur Wellness.

---

## 1. Visual Architecture & Layout

The previous split-screen approach is replaced with a more unified, immersive cutout layout using a custom background image.

*   **The Background (The Mask):** The section uses `sancturiesCutout.jpg` as a full-screen, fixed (or sticky) background cover. This image features a specific cutout shape filled with a solid black color.
*   **The Content Area (Inside the Cutout):** The content for the sanctuaries (images, videos, text) is rendered *behind* or *blended with* the main background, so that it is only visible through the black cutout area of the background image.
*   **The Properties Layout:** Inside this visible cutout space, the two properties (Greens Ayurveda and Ayur on the Beach) are displayed. This could be achieved via:
    1.  A horizontal scroll or slider within the cutout area.
    2.  A side-by-side flex layout that fits perfectly within the bounds of the cutout.
    3.  A fade transition: showing one property at a time inside the cutout, automatically fading to the other, or toggled via user interaction (buttons/hover outside the cutout).

---

## 2. Animation & Interaction Choreography

The interaction leverages the cutout as a viewport into the properties.

*   **The Approach:** As the user scrolls to Section 7, the `sancturiesCutout.jpg` background pins to the screen. 
*   **The Reveal:** The properties inside the black cutout fade in or slide into view.
*   **Property Navigation (If single-view):** 
    *   Hovering over the left or right side of the screen (or using subtle arrows) transitions the content inside the cutout between Greens Ayurveda (North) and Ayur on the Beach (South).
*   **Sensory Engagement:** When a property is actively shown inside the cutout, its corresponding ambient sound subtly fades in (temple bells for Greens Ayurveda, ocean waves for Nattika) on user interaction.
*   **The Dive (Zoom):** When the user clicks the CTA or scrolls further, the image *inside* the cutout zooms in, acting as a portal transition to the dedicated hotel page.

---

## 3. Content Strategy

The copy should be evocative but brief, acting as a teaser for the dedicated property pages.

**Property 1 (Greens Ayurveda - Azhiyur):**
*   **Visual:** Deep greens, traditional architecture.
*   **Headline:** Greens Ayurveda
*   **Subtext:** "Where Tradition Meets Learning. Dive deep into classical Ayurveda and immersive study programs in the historic, serene heart of Malabar."
*   **CTA:** [ Explore Greens Ayurveda ] -> Routes to `/HOTEL-1`.

**Property 2 (Ayur on the Beach - Nattika):**
*   **Visual:** Golden sands, ocean waves, airy aesthetics.
*   **Headline:** Ayur on the Beach
*   **Subtext:** "Where the Ocean Heals. A luxury coastal haven combining the rhythm of the waves with premium Ayurvedic rejuvenation."
*   **CTA:** [ Explore Nattika Beach ] -> Routes to `/HOTEL-2`.

---

## 4. Technical Implementation Guidelines

*   **The Cutout Effect (Masking vs. Blending):**
    *   *Option A (CSS Blending):* Place the property content (images/text) in a `div` behind the `sancturiesCutout.jpg` image. Apply `mix-blend-mode: screen` or `lighten` to the background image if the cutout is pure black, allowing the content underneath to show through only the black areas.
    *   *Option B (CSS Masking):* If the black area can be extracted into an SVG or transparent PNG, use CSS `mask-image` on the content container to clip the property details precisely to the cutout shape. This is often cleaner for rendering text and buttons than blending modes.
*   **Positioning:** Use `position: relative` for the section and `position: absolute; top: 0; left: 0; w-full h-full` for both the background image layer and the content container layer to stack them correctly.
*   **Animation:** Use GSAP ScrollTrigger to pin the section (`pin: true`) while the user interacts with or scrolls through the properties inside the cutout.
*   **Mobile Responsiveness:** Ensure the cutout image scales correctly using `background-size: cover` or `contain` depending on the image aspect ratio. The content inside must use responsive units (percentages, `vw`, `vh`) to scale synchronously with the mask.
