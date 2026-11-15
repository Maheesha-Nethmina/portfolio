import React, { useRef } from 'react';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

const ScrollProgress = () => {
  const barRef = useRef(null);

  useMM(barRef, (mm) => {
    mm.add(MQ.motion, () => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });
    });
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-cta to-sky-400"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};

export default ScrollProgress;