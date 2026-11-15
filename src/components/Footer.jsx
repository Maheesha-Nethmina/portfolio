import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaHeart } from 'react-icons/fa';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About me', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Maheesha-Nethmina', icon: <FaGithub /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/maheesha-nethmina/', icon: <FaLinkedin /> },
  { label: 'WhatsApp', href: 'https://wa.me/94712918346', icon: <FaWhatsapp /> },
  { label: 'Email', href: 'mailto:maheeshanethmina@gmail.com', icon: <FaEnvelope /> },
];

const builtWith = ['React', 'Tailwind CSS', 'GSAP'];

const formatTime = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Colombo',
  }).format(new Date());

const Footer = () => {
  const ref = useRef(null);
  const [time, setTime] = useState(formatTime);

  // Keep the local-time label fresh
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 30000);
    return () => clearInterval(id);
  }, []);

  useMM(
    ref,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = ref.current;
        const trigger = { trigger: root, start: 'top 92%', once: true };

        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.from(root.querySelector('.ft-line'), {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'transform',
        })
          .from(
            root.querySelectorAll('.ft-col'),
            { y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.2
          )
          .from(
            root.querySelectorAll('.ft-social'),
            { scale: 0, rotate: -45, stagger: 0.08, duration: 0.5, ease: 'back.out(2)', clearProps: 'transform' },
            0.5
          )
          .from(
            root.querySelectorAll('.ft-bottom > *'),
            { y: 14, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.6
          );

        // Giant name drifts up into place as the footer scrolls into view
        gsap.fromTo(
          root.querySelector('.ft-watermark'),
          { yPercent: 35 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
          }
        );

        // Glowing dot travels along the top line
        gsap.to(root.querySelector('.ft-dot'), {
          left: '100%',
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    },
    []
  );

  return (
    <footer ref={ref} className="relative z-10 mt-16 overflow-hidden bg-card/60 backdrop-blur-sm">
      {/* animated top line */}
      <div className="relative h-px w-full" aria-hidden="true">
        <div className="ft-line absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
        <span className="ft-dot absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-sky-400 shadow-[0_0_12px_3px_rgba(56,189,248,0.7)]" />
      </div>

      {/* giant watermark name */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="ft-watermark translate-y-[8%] whitespace-nowrap text-[clamp(4rem,16vw,14rem)] font-extrabold leading-none tracking-tight text-ink opacity-[0.04]">
          MAHEESHA
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="ft-col md:col-span-5">
            <h3 className="text-2xl font-extrabold text-ink">
              Maheesha <span className="text-gradient">Nethmina</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              Software engineer building fast, scalable web and desktop applications, from database to interface.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="ft-social flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-lg text-ink-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav className="ft-col md:col-span-3" aria-label="Footer">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Explore</p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-sm text-ink-soft transition-colors duration-200 hover:text-ink sm:text-base"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Availability + stack */}
          <div className="ft-col md:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Let's talk</p>
            <span className="flex w-fit items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-xs text-ink-soft sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </span>
            <a
              href="#contact"
              className="mt-4 inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              Get in touch
            </a>

            <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">Built with</p>
            <div className="flex flex-wrap gap-2">
              {builtWith.map((t) => (
                <span key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Maheesha Nethmina. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Designed &amp; built with <FaHeart className="text-rose-500" aria-label="love" />
            <span className="hidden sm:inline">&middot;</span>
            <span className="tabular-nums">Sri Lanka {time}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;