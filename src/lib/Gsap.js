import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

// Register once, import everything from here.
gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

// Avoids layout jumps when the mobile address bar shows / hides.
ScrollTrigger.config({ ignoreMobileResize: true });

// Media queries used with gsap.matchMedia()
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  fine: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
};

export { gsap, ScrollTrigger, SplitText, Flip };