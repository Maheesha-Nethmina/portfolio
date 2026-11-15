import React, { useRef } from 'react';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';


const CursorGlow = () => {
  const glowRef = useRef(null);
  const ringRef = useRef(null);

  useMM(glowRef, (mm) => {
    mm.add(MQ.fine, () => {
      const glow = glowRef.current;
      const ring = ringRef.current;
      gsap.set([glow, ring], { xPercent: -50, yPercent: -50 });

      const glowX = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3' });
      const glowY = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.25, ease: 'power3' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.25, ease: 'power3' });

      let shown = false;

      const onMove = (e) => {
        glowX(e.clientX);
        glowY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
        if (!shown) {
          shown = true;
          gsap.to([glow, ring], { opacity: 1, duration: 0.5 });
        }
      };

      const onOver = (e) => {
        const interactive = e.target.closest && e.target.closest('a, button, [data-cursor]');
        gsap.to(ring, { scale: interactive ? 1.8 : 1, duration: 0.25, overwrite: 'auto' });
      };

      const onLeave = () => {
        shown = false;
        gsap.to([glow, ring], { opacity: 0, duration: 0.3 });
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseover', onOver);
      document.documentElement.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseover', onOver);
        document.documentElement.removeEventListener('mouseleave', onLeave);
        gsap.set([glow, ring], { opacity: 0 });
      };
    });
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[700px] w-[700px] rounded-full opacity-0"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--brand) 16%, transparent) 0%, rgba(56,189,248,0.07) 40%, transparent 65%)',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-brand/60 opacity-0"
      />
    </>
  );
};

export default CursorGlow;