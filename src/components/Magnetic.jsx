import React, { useRef } from 'react';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

// Wrap a button/link to make it gently follow the cursor (mouse devices only).
const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);

  useMM(ref, (mm) => {
    mm.add(MQ.fine, () => {
      const el = ref.current;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.45)' });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.set(el, { x: 0, y: 0 });
      };
    });
  }, []);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default Magnetic;