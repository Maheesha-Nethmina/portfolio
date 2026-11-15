import React, { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { gsap, SplitText, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

const focus = [
  {
    title: 'Full-Stack Web Applications',
    text: 'Production apps with FastAPI + PostgreSQL backends and Next.js + TypeScript frontends, plus Spring Boot and the MERN stack.',
  },
  {
    title: 'Desktop Applications',
    text: 'Cross-platform desktop software built with Rust and Tauri: small, fast, and native-feeling.',
  },
  {
    title: 'Machine Learning Research',
    text: 'Completed a machine learning research project on wildfire detection.',
  },
  {
    title: 'Cloud & DevOps',
    text: 'Containerising with Docker, automating with GitHub Actions and deploying on AWS.',
  },
];


const roles = ['Software Engineering', 'Full-Stack Development', 'Front-End Engineering', 'DevOps'];

const About = () => {
  const ref = useRef(null);

  useMM(
    ref,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = ref.current;

        const splits = [...root.querySelectorAll('.about-text')].map((el) => {
          const split = SplitText.create(el, { type: 'words' });
          gsap.fromTo(
            split.words,
            { opacity: 0.15 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true },
            }
          );
          return split;
        });

        gsap.from(root.querySelector('.about-badge'), {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.about-badge'), start: 'top 90%', once: true },
        });

        gsap.from(root.querySelectorAll('.focus-row'), {
          y: 28,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.focus-list'), start: 'top 85%', once: true },
        });

        gsap.from(root.querySelectorAll('.draw-line'), {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
          clearProps: 'transform',
          scrollTrigger: { trigger: root.querySelector('.focus-list'), start: 'top 85%', once: true },
        });

        gsap.from(root.querySelectorAll('.stack-row'), {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.stack-list'), start: 'top 88%', once: true },
        });
        gsap.from(root.querySelectorAll('.stack-chip'), {
          scale: 0.85,
          opacity: 0,
          stagger: 0.03,
          duration: 0.4,
          ease: 'back.out(1.6)',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.stack-list'), start: 'top 88%', once: true },
        });

        gsap.from(root.querySelectorAll('.about-cta'), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.about-cta'), start: 'top 92%', once: true },
        });

        return () => {
          splits.forEach((s) => s.revert());
        };
      });
    },
    []
  );

  return (
    <section ref={ref} id="about" className="py-24">
      <SectionHeader title="About Me" kicker="01 / About" />

      <div className="mx-auto max-w-4xl text-center">
        <p className="about-text text-2xl font-semibold leading-snug text-ink sm:text-3xl md:text-4xl">
          I build fast, scalable software, from <span className="text-gradient">web platforms</span> to{' '}
          <span className="text-gradient">native desktop apps</span>.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl items-stretch gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="flex flex-col lg:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">My story</p>
          <div className="draw-line h-px w-full bg-line" />

          <div className="flex flex-1 flex-col justify-between gap-5 py-6">
            <p className="about-text text-base leading-relaxed text-ink-soft sm:text-lg">
              I'm a Computer Science &amp; Technology student with 6+ months of industry experience building
              production web applications. I'm passionate about developing scalable, efficient and modern
              software, from <b className="text-ink">FastAPI</b> and <b className="text-ink">PostgreSQL</b> backends to{' '}
              <b className="text-ink">Next.js</b> and <b className="text-ink">TypeScript</b> frontends, alongside
              hands-on work with <b className="text-ink">Spring Boot</b>, <b className="text-ink">React</b> and the{' '}
              <b className="text-ink">MERN stack</b>.
            </p>
            <p className="about-text text-base leading-relaxed text-ink-soft sm:text-lg">
              Beyond the browser, I've developed a desktop application with <b className="text-ink">Rust</b> and{' '}
              <b className="text-ink">Tauri</b>, which taught me how to pair a safe, high-performance systems
              language with a modern web UI. I've also completed a machine learning research project on{' '}
              <b className="text-ink">wildfire detection</b>.
            </p>
            <p className="about-text text-base leading-relaxed text-ink-soft sm:text-lg">
              My working knowledge of <b className="text-ink">AWS</b>, <b className="text-ink">GitHub Actions</b> and{' '}
              <b className="text-ink">Docker</b> also fuels a strong interest in <b className="text-ink">DevOps</b>,
              and I like owning a feature from the database all the way to the interface.
            </p>
          </div>

          <div className="draw-line h-px w-full bg-line" />
        </div>

        <div className="focus-list flex flex-col lg:col-span-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">What I do</p>
          <div className="draw-line h-px w-full bg-line" />
          {focus.map((item, i) => (
            <div key={item.title} className="flex flex-1 flex-col">
              <div className="focus-row flex flex-1 gap-4 py-5">
                <span className="text-gradient pt-0.5 text-sm font-bold tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </div>
              <div className="draw-line h-px w-full bg-line" />
            </div>
          ))}
        </div>
      </div>


      <div className="about-cta mx-auto mt-16 max-w-3xl text-center">
        <p className="text-base text-ink-soft sm:text-lg">
          I'm excited by roles in{' '}
          {roles.map((role, i) => (
            <React.Fragment key={role}>
              <b className="text-ink">{role}</b>
              {i < roles.length - 2 ? ', ' : i === roles.length - 2 ? ' and ' : ''}
            </React.Fragment>
          ))}
          , where I can contribute from day one and keep growing.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            View my projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-card"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;