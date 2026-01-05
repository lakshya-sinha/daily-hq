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

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      el.scrollBy({
        top: e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: "100%",
        overflow: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFix;
