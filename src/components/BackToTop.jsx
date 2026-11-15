import React, { useLayoutEffect, useRef } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { gsap, ScrollTrigger } from '../lib/Gsap';
import { scrollToTop } from '../lib/Scroll';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Floating button with a ring that fills as you scroll.
const BackToTop = () => {
  const btnRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const show = (visible) =>
        gsap.to(btnRef.current, {
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 16,
          pointerEvents: visible ? 'auto' : 'none',
          duration: reduce ? 0 : 0.3,
          overwrite: 'auto',
        });

      gsap.set(btnRef.current, { opacity: 0, y: 16, pointerEvents: 'none' });

      ScrollTrigger.create({
        start: 400,
        end: 'max',
        onToggle: (self) => show(self.isActive),
      });

      gsap.to('.bt-ring', {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, btnRef);

    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-card text-brand shadow-lg sm:bottom-8 sm:right-8"
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle
          className="bt-ring"
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <HiArrowUp className="relative h-5 w-5" />
    </button>
  );
};

export default BackToTop;