import React, { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { gsap, ScrollTrigger, Flip, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

import { FaEye, FaBolt, FaShieldAlt, FaCode, FaBoxOpen, FaBell, FaGithub, FaLinkedin } from 'react-icons/fa';

import imgWildfire from '../assets/research.jpg';
import imgFurniQ from '../assets/FurniQ.png';
import imgCoralStay from '../assets/Coralstay.png';
import imgLifeLine from '../assets/Lifeline.png';
import imgExploreX from '../assets/ExpolreX.png';
import imgTravelGuide from '../assets/Travelguide.png';
// Tip: rename this file to AiBuildGuard.png (no spaces) and update the path, it is safer for builds.
import imgBuildGuard from '../assets/Ai build gard.png';

/* ------------------------------------------------------------------ */
/*  Latest project spotlight: AI BuildGuard                            */
/* ------------------------------------------------------------------ */
const buildGuard = {
  name: 'AI BuildGuard',
  tagline:
    'A high-performance background desktop utility that watches your project and gives continuous, frictionless TypeScript and ESLint feedback, quietly from your system tray.',
  problem: 'Constantly switching back to the terminal just to check build errors breaks your focus.',
  solution: 'BuildGuard monitors your project in real time and shows every problem in one clean dashboard.',
  // TODO: replace with the full GitHub URL if you want to avoid the short link
  github: 'https://lnkd.in/gBATFMSw',
  linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7523466918213713920/',
  features: [
    {
      icon: <FaEye />,
      title: 'Background file watching',
      text: "Powered by Rust's notify crate. Tracks source changes while ignoring generated folders like node_modules and dist, for a minimal memory footprint.",
    },
    {
      icon: <FaBolt />,
      title: 'Smart debouncing & concurrency',
      text: 'Coalesces rapid saves, and revision tracking stops slow, older checks from overwriting newer results.',
    },
    {
      icon: <FaShieldAlt />,
      title: 'Isolated process execution',
      text: 'Invokes the local TypeScript compiler and ESLint directly as child processes, avoiding vulnerable shell-string concatenation.',
    },
    {
      icon: <FaCode />,
      title: 'One-click VS Code navigation',
      text: 'Click any error to jump straight to the exact file, line and column in your editor.',
    },
    {
      icon: <FaBoxOpen />,
      title: 'Independent production builds',
      text: 'Run a full production build on demand, kept cleanly separate from the fast-check diagnostics.',
    },
    {
      icon: <FaBell />,
      title: 'Native OS integration',
      text: 'Dynamic system-tray indicator and Windows toast notifications that bring the app into focus when clicked.',
    },
  ],
  stack: [
    { label: 'Backend', items: ['Rust', 'Tauri 2'] },
    { label: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
    { label: 'Tooling', items: ['Node.js child processes', 'TypeScript compiler (tsc)', 'ESLint'] },
  ],
};

// Updates CSS variables used by the .spotlight hover effect (no React state / re-render)
const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const projectsData = [
  {
    title: 'Multivariate Anomaly Detection For Wildfire Detection',
    description: 'Completed research using LSTM and Vision Transformers for early wildfire detection and stage classification.',
    imageUrl: imgWildfire,
    tags: ['Machine Learning', 'LSTM', 'Vision Transformer', 'Python'],
    github: '',
    live: '',
    categories: ['ml'],
  },
  {
    title: 'FurniQ - Online Furniture Store',
    description: 'Full-stack online furniture store with responsive interfaces and backend services.',
    imageUrl: imgFurniQ,
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Full-Stack', 'Web Design'],
    github: 'https://github.com/Maheesha-Nethmina/FurniQ_forntend',
    figma: 'https://www.figma.com/proto/NoQpT0VO8o6Nlepjo9N6j4/FurniQ?t=odw3fn2qT126SF7n-1',
    categories: ['fullstack', 'frontend'],
  },
  {
    title: 'CoralStay - Booking Platform',
    description: 'MERN stack web app for booking hotel rooms and coral reef tours, featuring a virtual reef and admin panel.',
    imageUrl: imgCoralStay,
    tags: ['MERN', 'React', 'Node.js', 'MongoDB', 'Full-Stack', 'Web Design'],
    github: 'https://github.com/Maheesha-Nethmina/Coral-Stay_Frontend',
    figma: 'https://www.figma.com/proto/AeMoXvvEQHoqYgQEOlX7qO/CoralStay?node-id=2-2&t=QNA71x9XLDJq2AAb-1',
    categories: ['fullstack', 'frontend'],
  },
  {
    title: 'ExploreX - Frontend Web App',
    description: 'Responsive, mobile-friendly frontend project with component-based architecture and smooth navigation.',
    imageUrl: imgExploreX,
    tags: ['React', 'CSS', 'Frontend', 'Figma', 'Web Design'],
    github: 'https://github.com/Maheesha-Nethmina/Explore-X',
    figma: 'https://www.figma.com/proto/F73O7FgxQRQ2BRIbe66inf/ExploreX?node-id=0-1&t=odw3fn2qT126SF7n-1',
    categories: ['frontend'],
  },
  {
    title: 'LifeLine - Donation System',
    description: 'A full-stack system for verified medical donations, ensuring transparency and volunteer engagement.',
    imageUrl: imgLifeLine,
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'Full-Stack'],
    github: 'https://github.com/Maheesha-Nethmina/Life-Line',
    categories: ['fullstack'],
  },
  {
    title: 'TravelGuide - Booking System',
    description: 'Team project for a RAD module. Implemented booking, auth, and admin features.',
    imageUrl: imgTravelGuide,
    tags: ['Java', 'JSP', 'Servlets', 'MySQL', 'Full-Stack'],
    // TODO: verify this URL. The old one contained a space ("Travel Guide"), which is not a valid GitHub repo name.
    github: 'https://github.com/Maheesha-Nethmina/Travel-Guide',
    categories: ['fullstack'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'ml', label: 'ML & Research' },
  { id: 'frontend', label: 'Frontend' },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const flipState = useRef(null);
  const [filter, setFilter] = useState('all');

  // Scroll entrance (opacity / y on the inner .card-reveal layer, so it never fights Flip)
  useMM(
    sectionRef,
    (mm) => {
      mm.add(MQ.motion, () => {
        const reveals = gsap.utils.toArray('.card-reveal', gridRef.current);
        gsap.set(reveals, { opacity: 0, y: 50 });
        ScrollTrigger.batch(reveals, {
          start: 'top 88%',
          once: true,
          interval: 0.1,
          batchMax: 3,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: 'power3.out',
              overwrite: true,
              clearProps: 'transform,opacity',
            }),
        });
      });
    },
    []
  );

  // AI BuildGuard spotlight animations
  useMM(
    sectionRef,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = sectionRef.current;
        const spot = root.querySelector('.bg-spot');
        if (!spot) return;

        // Main entrance timeline
        const tl = gsap.timeline({ scrollTrigger: { trigger: spot, start: 'top 80%', once: true } });
        tl.from(spot, { y: 70, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity' })
          .from(
            root.querySelectorAll('.bg-badge'),
            { y: 12, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.3
          )
          .from(root.querySelector('.bg-title-inner'), { yPercent: 110, duration: 0.9, ease: 'power4.out' }, 0.35)
          .from(
            root.querySelectorAll('.bg-fade'),
            { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.55
          )
          .from(
            root.querySelector('.bg-shot'),
            { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.45
          );

        // Features + tech stack
        gsap.from(root.querySelectorAll('.bg-feature'), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.bg-features'), start: 'top 88%', once: true },
        });
        gsap.from(root.querySelectorAll('.bg-chip'), {
          scale: 0.8,
          opacity: 0,
          stagger: 0.04,
          duration: 0.45,
          ease: 'back.out(1.8)',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.bg-stack'), start: 'top 90%', once: true },
        });

        // Screenshot parallax inside its frame
        gsap.fromTo(
          root.querySelector('.bg-img'),
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: root.querySelector('.bg-shot'), start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );

        // Ambient motion: rotating gradient border and floating tags
        gsap.to(root.querySelector('.bg-spin'), { rotation: 360, duration: 8, ease: 'none', repeat: -1 });
        gsap.to(root.querySelectorAll('.bg-float'), {
          y: -8,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.5,
        });
      });

      // Subtle 3D tilt on the screenshot (mouse devices only)
      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const shot = sectionRef.current.querySelector('.bg-shot');
        if (!shot) return;
        const move = (e) => {
          const r = shot.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(shot, {
            rotationY: px * 8,
            rotationX: -py * 8,
            transformPerspective: 1000,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        const leave = () => gsap.to(shot, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
        shot.addEventListener('mousemove', move);
        shot.addEventListener('mouseleave', leave);
        return () => {
          shot.removeEventListener('mousemove', move);
          shot.removeEventListener('mouseleave', leave);
          gsap.set(shot, { clearProps: 'transform' });
        };
      });
    },
    []
  );

  const handleFilter = (id) => {
    if (id === filter) return;
    // 1. record where every card is now, 2. let React toggle visibility, 3. Flip animates the difference
    flipState.current = Flip.getState(gridRef.current.querySelectorAll('.project-item'));
    setFilter(id);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.refresh();
      return;
    }

    Flip.from(state, {
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.05,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 }),
      // returning the tween makes Flip wait before hiding the elements again
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.35 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  return (
    <section ref={sectionRef} id="projects" className="py-24">
      <SectionHeader title="Projects" kicker="04 / Work" />

      {/* ---------------- Latest project spotlight: AI BuildGuard ---------------- */}
      <div className="bg-spot relative mx-auto mb-20 max-w-6xl overflow-hidden rounded-3xl p-px">
        {/* rotating gradient border */}
        <div
          className="bg-spin pointer-events-none absolute -inset-[100%]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #6366f1 300deg, #22d3ee 330deg, transparent 360deg)',
          }}
          aria-hidden="true"
        />

        <div className="relative rounded-[calc(1.5rem-1px)] bg-page">
          <div
            onMouseMove={handleSpotlight}
            className="spotlight relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-card p-6 sm:p-10"
          >
            {/* top badges */}
            <div className="relative mb-8 flex flex-wrap items-center gap-3">
              <span className="bg-badge flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Latest project
              </span>
              <span className="bg-badge rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">
                Desktop App
              </span>
              <span className="bg-badge rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft">
                Rust + Tauri 2
              </span>
            </div>

            {/* title / screenshot */}
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="overflow-hidden pb-1">
                  <h3 className="bg-title-inner text-gradient text-4xl font-extrabold leading-tight sm:text-5xl">
                    {buildGuard.name}
                  </h3>
                </div>
                <p className="bg-fade mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{buildGuard.tagline}</p>

                <div className="bg-fade mt-6 space-y-3 border-l-2 border-brand/50 pl-4 text-sm sm:text-base">
                  <p className="text-ink-soft">
                    <b className="text-ink">The problem: </b>
                    {buildGuard.problem}
                  </p>
                  <p className="text-ink-soft">
                    <b className="text-ink">The fix: </b>
                    {buildGuard.solution}
                  </p>
                </div>

                <div className="bg-fade mt-8 flex flex-wrap gap-4">
                  <a
                    href={buildGuard.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                  <a
                    href={buildGuard.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-page"
                  >
                    <FaLinkedin /> Read the post
                  </a>
                </div>
              </div>

              {/* screenshot */}
              <div className="lg:col-span-7">
                <div className="relative">
                  {/* glow */}
                  <div
                    className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/30 via-sky-400/20 to-transparent blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="bg-shot relative">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-page shadow-2xl">
                      <img
                        src={imgBuildGuard}
                        alt="AI BuildGuard dashboard showing live TypeScript and ESLint problems"
                        className="bg-img absolute -top-[6%] left-0 h-[112%] w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>

                    {/* floating tags */}
                    <span className="bg-float absolute -left-3 top-8 hidden rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink shadow-lg sm:block">
                      Real-time diagnostics
                    </span>
                    <span className="bg-float absolute -right-3 bottom-10 hidden rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink shadow-lg sm:block">
                      Lives in your system tray
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* features */}
            <div className="relative mt-14 border-t border-line pt-10">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Core features</p>
              <div className="bg-features grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {buildGuard.features.map((f) => (
                  <div key={f.title} className="bg-feature group flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                      {f.icon}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-ink">{f.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tech stack */}
            <div className="bg-stack relative mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {buildGuard.stack.map((group) => (
                <div key={group.label}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="bg-chip rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- More projects ---------------- */}
      <div className="mb-10 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filter projects">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => handleFilter(item.id)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              filter === item.id
                ? 'border-cta bg-cta text-white shadow-lg shadow-indigo-500/25'
                : 'border-line bg-card text-ink-soft hover:border-brand/40 hover:text-brand'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            visible={filter === 'all' || project.categories.includes(filter)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;