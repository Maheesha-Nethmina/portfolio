import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../lib/Gsap';
import {setLenis} from '../lib/Scroll';

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;