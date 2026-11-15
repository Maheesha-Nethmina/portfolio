import { useLayoutEffect } from 'react';
import { gsap } from '../lib/Gsap';

/**
 * Runs GSAP setup inside gsap.matchMedia(), scoped to a ref.
 * - selectors inside the setup are scoped to scopeRef
 * - everything (tweens, ScrollTriggers) is reverted on unmount / StrictMode re-run
 * - reduced-motion and mobile/desktop variants are declared with mm.add(...)
 */
export default function useMM(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef.current || undefined);
    setup(mm);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}