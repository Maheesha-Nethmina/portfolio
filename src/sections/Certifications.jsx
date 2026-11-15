import React, { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { gsap, ScrollTrigger, Flip, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';
import { FaAws, FaDocker, FaReact, FaAward, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { SiSpring } from 'react-icons/si';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Backend', label: 'Backend' },
  { id: 'Frontend', label: 'Frontend' },
  { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
];

const certifications = [
  {
    name: 'Spring 6: Spring Security',
    platform: 'LinkedIn',
    topic: 'Backend',
    icon: <SiSpring />,
    url: 'https://www.linkedin.com/learning/certificates/925dc1bf75f7a5fa908b9324712e2bea65b309e25fe04781e1ddf20c01d50918',
  },
  {
    name: 'Spring Boot 3 Essential Training',
    platform: 'LinkedIn',
    topic: 'Backend',
    icon: <SiSpring />,
    url: 'https://www.linkedin.com/learning/certificates/1acc841964aec30558d68e91d2731346f23438be226a4b49027217a1eae17987',
  },
  {
    name: 'Advanced React',
    platform: 'Meta (Coursera)',
    topic: 'Frontend',
    icon: <FaReact />,
    url: 'https://www.coursera.org/account/accomplishments/verify/141L0ZZTHZHX',
  },
  {
    name: 'AWS Cloud Practitioner Essentials',
    platform: 'Amazon (Coursera)',
    topic: 'Cloud & DevOps',
    icon: <FaAws />,
    url: 'https://www.coursera.org/account/accomplishments/verify/2IKIIQTS27FB',
  },
  {
    name: 'Docker Foundations Professional Certificate',
    platform: 'LinkedIn',
    topic: 'Cloud & DevOps',
    icon: <FaDocker />,
    url: 'https://www.linkedin.com/learning/certificates/a3057ebb2e9543441777ae891e9d52dce528883e2ea9644f9c3b603bad344183',
  },
  {
    name: 'Introduction to DevOps',
    platform: 'IBM (Coursera)',
    topic: 'Cloud & DevOps',
    icon: <FaAward />,
    url: 'https://www.coursera.org/account/accomplishments/verify/W8OTV9G0RYSS',
  },
];

const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Certifications = () => {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const flipState = useRef(null);
  const [filter] = useState('all');

  useMM(
    ref,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = ref.current;

        const nums = [...root.querySelectorAll('.cert-num')];
        nums.forEach((el) => {
          const end = Number(el.dataset.value);
          const obj = { v: 0 };
          el.textContent = '0';
          gsap.to(obj, {
            v: end,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.v);
            },
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });

        gsap.from(root.querySelectorAll('.cert-intro > *'), {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.cert-intro'), start: 'top 90%', once: true },
        });

        const cards = gsap.utils.toArray('.cert-card', gridRef.current);
        gsap.set(cards, { opacity: 0, y: 50, rotationX: -12, transformPerspective: 900 });
        ScrollTrigger.batch(cards, {
          start: 'top 90%',
          once: true,
          interval: 0.1,
          batchMax: 3,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              rotationX: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              overwrite: true,
              clearProps: 'transform,opacity',
            });
            gsap.from(
              batch.map((c) => c.querySelector('.cert-icon')),
              { scale: 0, rotate: -90, stagger: 0.1, delay: 0.25, duration: 0.6, ease: 'back.out(2)' }
            );
          },
        });

        return () => {
          nums.forEach((el) => {
            el.textContent = el.dataset.value;
          });
        };
      });

      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const cards = [...ref.current.querySelectorAll('.cert-card')];
        const cleanups = cards.map((card) => {
          const move = (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, {
              rotationY: px * 8,
              rotationX: -py * 8,
              transformPerspective: 900,
              duration: 0.4,
              ease: 'power2.out',
            });
          };
          const leave = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
          card.addEventListener('mousemove', move);
          card.addEventListener('mouseleave', leave);
          return () => {
            card.removeEventListener('mousemove', move);
            card.removeEventListener('mouseleave', leave);
            gsap.set(card, { clearProps: 'transform' });
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    []
  );



  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.refresh();
      return;
    }

    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.05,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, delay: 0.15 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  return (
    <section ref={ref} id="certifications" className="py-24">
      <SectionHeader title="Certifications" kicker="05 / Learning" />

      {/* Cards */}
      <div ref={gridRef} className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <div
            key={cert.name}
            className={`cert-item ${filter === 'all' || cert.topic === filter ? '' : 'hidden'}`}
          >
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify certificate: ${cert.name}`}
              onMouseMove={handleSpotlight}
              className="cert-card spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {/* top accent line that draws on hover */}
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />

              {/* watermark number */}
              <span
                className="pointer-events-none absolute right-5 top-3 select-none text-6xl font-extrabold text-ink opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative mb-5 flex items-center justify-between">
                <span className="cert-icon flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-2xl text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                  {cert.icon}
                </span>
                <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">
                  {cert.topic}
                </span>
              </div>

              <h4 className="relative text-lg font-bold leading-snug text-ink">{cert.name}</h4>
              <p className="relative mt-1 text-sm text-ink-soft">{cert.platform}</p>

              <div className="relative mt-auto flex items-center justify-between pt-6 text-sm">
                <span className="flex items-center gap-2 text-ink-soft">
                  <FaCheckCircle className="text-emerald-500" /> Verified credential
                </span>
                <span className="flex items-center gap-2 font-semibold text-brand">
                  Verify
                  <FaExternalLinkAlt className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;