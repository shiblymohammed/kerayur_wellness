"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Track mouse position
    const mouse = { x: 0, y: 0 };
    // Track follower position with easing
    const pos = { x: 0, y: 0 };
    
    // QuickSetters for extreme performance
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");
    const setFollowerX = gsap.quickSetter(follower, "x", "px");
    const setFollowerY = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Instant set for center dot
      setCursorX(mouse.x);
      setCursorY(mouse.y);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Ticker for smooth follower interpolation
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      setFollowerX(pos.x);
      setFollowerY(pos.y);
    });

    // Hover states
    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { 
        scale: 2.5, 
        backgroundColor: "rgba(217, 119, 6, 0.2)", 
        borderColor: "rgba(217, 119, 6, 0.8)",
        duration: 0.3, 
        ease: "power2.out" 
      });
    };
    
    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "rgba(255, 255, 255, 0.4)",
        duration: 0.3, 
        ease: "power2.out" 
      });
    };

    // Attach to all links and buttons
    const attachHoverEvents = () => {
      const interactables = document.querySelectorAll("a, button, .interactive");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    attachHoverEvents();

    // Re-attach if DOM changes (optional, but good for react)
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const interactables = document.querySelectorAll("a, button, .interactive");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      ></div>
    </>
  );
}
