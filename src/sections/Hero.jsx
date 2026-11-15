import React, { useEffect, useRef } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaLaptopCode,
  FaLayerGroup,
  FaServer,
  FaCode,
  FaFigma,
  FaDesktop,
} from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { gsap, SplitText, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';
import Magnetic from '../components/Magnetic';
import { scrollToSection } from '../lib/Scroll';
import profilePic from '../assets/profile-pic.jpg';


const roleCards = [
  { name: 'Software Engineer', icon: <FaLaptopCode />, className: 'inset-x-0 mx-auto w-max -top-6' },
  { name: 'Full-Stack Developer', icon: <FaLayerGroup />, className: '-right-6 top-[20%] lg:-right-16' },
  { name: 'Backend Engineer', icon: <FaServer />, className: '-left-8 top-[34%] lg:-left-20' },
  { name: 'Frontend Developer', icon: <FaCode />, className: '-right-4 top-[58%] lg:-right-10' },
  { name: 'Desktop App Developer', icon: <FaDesktop />, className: '-left-6 top-[72%] lg:-left-14' },
  { name: 'UI/UX Designer', icon: <FaFigma />, className: 'inset-x-0 mx-auto w-max -bottom-6' },
];


const Hero = ({ ready = true }) => {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const tlRef = useRef(null);

  useMM(
    heroRef,
    (mm) => {
      mm.add(MQ.motion, () => {
        const nameEl = heroRef.current.querySelector('.hero-name');
        const split = SplitText.create(nameEl, { type: 'words,chars', mask: 'chars' });

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
        tl.from('.hero-pill', { y: 20, opacity: 0, duration: 0.6 })
          .from('.hero-greet', { y: 20, opacity: 0, duration: 0.6 }, '<0.1')
          .from(split.chars, { yPercent: 110, duration: 0.9, stagger: 0.04 }, '<0.1')
          .from('.hero-copy', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .fromTo(
            '.hero-photo',
            { clipPath: 'circle(0% at 50% 50%)' },
            { clipPath: 'circle(75% at 50% 50%)', duration: 1.2, ease: 'power4.inOut', clearProps: 'clipPath' },
            0.2
          )
          .from('.hero-photo img', { scale: 1.4, duration: 1.4 }, 0.2)
          .from('.hero-ring', { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' }, 0.5)
          .from('.hero-badge', { scale: 0, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '-=0.6')
          .from('.hero-scroll', { opacity: 0, y: -10, duration: 0.6 }, '-=0.2');

        tlRef.current = tl;

        return () => {
          tlRef.current = null;
          split.revert();
          gsap.set(heroRef.current.querySelectorAll('.hero-badge'), { clearProps: 'transform,scale,opacity' });
        };
      });

      mm.add(MQ.motion, () => {
        gsap.to('.hero-float', { y: -14, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });

        gsap.utils.toArray('.hero-badge-float').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -12 : 12,
            duration: 2.4 + i * 0.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });

        gsap.to('.hero-blob-a', { x: 60, y: 40, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });
        gsap.to('.hero-blob-b', { x: -50, y: -30, duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true });

        gsap.to('.hero-scroll-dot', { y: 10, opacity: 0.2, duration: 1.1, ease: 'power1.inOut', repeat: -1, yoyo: true });
      });

      mm.add(MQ.motion, () => {
        const scrollTrigger = {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        };
        gsap.to('.hero-parallax', { y: 90, ease: 'none', scrollTrigger });
        gsap.to('.hero-text', { y: -40, opacity: 0.4, ease: 'none', scrollTrigger });
      });

      mm.add(MQ.fine, () => {
        const media = mediaRef.current;
        const tilt = media.querySelector('.hero-tilt');
        gsap.set(tilt, { transformPerspective: 900 });
        const rotX = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3' });
        const rotY = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3' });

        const onMove = (e) => {
          const rect = media.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotY(px * 14);
          rotX(-py * 14);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };
        media.addEventListener('mousemove', onMove);
        media.addEventListener('mouseleave', onLeave);
        return () => {
          media.removeEventListener('mousemove', onMove);
          media.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    []
  );

  useEffect(() => {
    if (ready && tlRef.current) tlRef.current.play();
  }, [ready]);

  return (
    <section ref={heroRef} id="home" className="relative min-h-[calc(100svh-80px)] flex items-center py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-blob-a absolute left-0 top-10 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="hero-blob-b absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        <div className="hero-text lg:w-3/5 text-center lg:text-left">
          <div className="hero-pill mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            Open to Junior / Associate Software Engineer roles
          </div>

          <h2 className="hero-greet text-2xl sm:text-3xl font-semibold text-ink mb-2">Hi, I'm</h2>
          <h1 className="hero-name whitespace-nowrap text-[length:clamp(1.9rem,8.5vw,3rem)] sm:text-5xl xl:text-6xl font-bold leading-[1.1] text-ink mb-6">
            Maheesha Nethmina
          </h1>

          <div className="hero-copy max-w-xl mx-auto lg:mx-0 mb-8">
            <p className="text-base sm:text-lg text-ink-soft mb-5">
              Computer Science &amp; Technology undergraduate at Uva Wellassa University with industry
              experience as a Software Engineer Intern. I build production-ready full-stack applications with FastAPI,
              Spring Boot, NodeJs, PostgreSQL, Next.js, React and TypeScript, ship them with Docker, GitHub Actions and AWS, and
              have hands-on experience in desktop application development.
            </p>

          </div>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <Magnetic>
              <a
                href={`${import.meta.env.BASE_URL}Maheesha%20Nethmina.pdf`}
                download="Maheesha_Nethmina_CV.pdf"
                className="inline-flex items-center gap-2 bg-cta text-white font-bold
                           text-lg px-8 py-4 rounded-lg shadow-lg shadow-indigo-500/25
                           hover:bg-cta-hover transition-colors duration-300"
              >
                <HiDownload className="h-5 w-5" />
                Download CV
              </a>
            </Magnetic>

            <div className="flex justify-center lg:justify-start space-x-6">
              <a
                href="https://github.com/Maheesha-Nethmina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft hover:text-brand transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://linkedin.com/in/maheesha-nethmina/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft hover:text-brand transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>

        <div ref={mediaRef} className="lg:w-2/5 flex flex-col items-center">
          <div className="hero-parallax">
            <div className="hero-float relative">
              <div className="hero-tilt relative">
                <div className="absolute -inset-6 -z-10 rounded-full bg-brand/20 blur-3xl"></div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 hidden rounded-full border border-dashed border-line sm:block animate-[spin_60s_linear_infinite] motion-reduce:animate-none"
                />

                <div
                  aria-hidden="true"
                  className="hero-ring pointer-events-none absolute -inset-2 rounded-full animate-[spin_6s_linear_infinite] motion-reduce:animate-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, transparent 55%, var(--brand) 80%, #38bdf8 100%)',
                  }}
                />

                <div
                  className="hero-photo relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden
                              border-4 border-page shadow-xl"
                >
                  <img src={profilePic} alt="Maheesha Nethmina" className="w-full h-full object-cover" />
                </div>

                {roleCards.map((card) => (
                  <div
                    key={card.name}
                    className={`hero-badge pointer-events-none absolute z-10 hidden sm:block ${card.className}`}
                  >
                    <div className="hero-badge-float">
                      <div className="flex items-center gap-2 whitespace-nowrap rounded-2xl border border-line bg-card/80 px-3 py-2 text-xs font-semibold text-ink shadow-lg backdrop-blur-md xl:text-sm">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-soft text-brand">
                          {card.icon}
                        </span>
                        {card.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:hidden">
            {roleCards.map((card) => (
              <li
                key={card.name}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink shadow-sm"
              >
                <span className="text-brand">{card.icon}</span>
                {card.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to About section"
        className="hero-scroll absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:flex"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink-soft/50 p-1.5">
          <span className="hero-scroll-dot h-2 w-1 rounded-full bg-brand" />
        </span>
      </button>
    </section>
  );
};

export default Hero;