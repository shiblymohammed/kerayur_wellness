"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollingProps {
  children: ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {/* @ts-expect-error - Bypass React 19 ReactNode type mismatch with react-lenis */}
      {children}
    </ReactLenis>
  );
}
