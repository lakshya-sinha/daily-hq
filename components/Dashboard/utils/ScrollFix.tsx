'use client';

import { useEffect, useRef, ReactNode } from "react";

interface ScrollFixProps {
  children: ReactNode;
}

const ScrollFix: React.FC<ScrollFixProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on mobile / touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollBy({
        top: e.deltaY,
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: "100%",
        overflow: "auto", // IMPORTANT: never block mobile scroll
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFix;
