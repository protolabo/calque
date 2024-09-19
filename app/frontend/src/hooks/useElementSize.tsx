import { useState, useEffect, useRef, RefObject } from "react";
import { breakpoints } from "../utils/breakpoints";

export type SizeCategory = "small" | "medium" | "large";

export function useResponsiveElement(): {
  ref: RefObject<HTMLDivElement>;
  size: SizeCategory;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<SizeCategory>("small");

  useEffect(() => {
    const observeTarget = ref.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      // @ts-ignore
      if (width < breakpoints.small) {
        setSize("small");
      } else {
        // @ts-ignore
        if (width < breakpoints.medium) {
          setSize("medium");
        } else {
          setSize("large");
        }
      }
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  return { ref, size };
}
