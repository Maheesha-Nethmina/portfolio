import React, { useRef } from 'react';
import { gsap, SplitText, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

const SectionHeader = ({ title, kicker }) => {
  const ref = useRef(null);

  useMM(ref, (mm) => {
    mm.add(MQ.motion, () => {
      const el = ref.current;
      const titleEl = el.querySelector('.sh-title');
      const kickerEl = el.querySelector('.sh-kicker');
      const bar = el.querySelector('.sh-bar');
      const split = SplitText.create(titleEl, { type: 'words', mask: 'words' });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });

      if (kickerEl) tl.from(kickerEl, { opacity: 0, y: 10, duration: 0.5 });
      tl.from(split.words, { yPercent: 110, duration: 0.8, stagger: 0.08, ease: 'power4.out' }, kickerEl ? '<0.1' : 0).from(
        bar,
        { scaleX: 0, duration: 0.7 },
        '-=0.4'
      );

      return () => split.revert();
    });
  }, []);

  return (
    <div ref={ref} className="mb-12 text-center">
      {kicker && (
        <p className="sh-kicker mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{kicker}</p>
      )}
      <h2 className="sh-title mb-4 text-4xl font-bold leading-[1.2] text-ink md:text-5xl">{title}</h2>
      <div className="sh-bar mx-auto h-1 w-20 rounded-full bg-brand"></div>
    </div>
  );
};

export default SectionHeader;