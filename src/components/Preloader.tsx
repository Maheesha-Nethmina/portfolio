import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/Gsap';
import { lockScroll } from '../lib/scroll';

const SEEN_KEY = 'portfolio-preloader-seen';

const shouldShow = () => {
  try {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reduce && !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
};

// Counter + curtain. Plays once per session; skipped for reduced motion.
const Preloader = ({ onDone }) => {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (!visible) {
      onDone();
      return undefined;
    }

    let released = false;
    const release = () => {
      if (!released) {
        released = true;
        lockScroll(false);
      }
    };
    lockScroll(true);

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        release();
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          /* ignore */
        }
        setVisible(false);
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(counter.value);
      },
    })
      .to(barRef.current, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(contentRef.current, { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' })
      // start the hero intro as the curtain begins to lift
      .add(() => onDone())
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' });

    return () => {
      tl.kill();
      release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-page text-ink"
      aria-hidden="true"
    >
      <div ref={contentRef} className="w-64 text-center">
        <div className="text-6xl font-extrabold tracking-tight text-gradient">MN</div>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-cta"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <div className="mt-3 text-sm font-medium tabular-nums text-ink-soft">
          <span ref={countRef}>0</span>%
        </div>
      </div>
    </div>
  );
};

export default Preloader;