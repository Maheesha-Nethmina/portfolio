import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from '../lib/Gsap';
import { scrollToSection, lockScroll } from '../lib/Scroll';
import useTheme from '../hook/UseTheme';

const links = [
  { name: 'Home', sectionId: 'home' },
  { name: 'About me', sectionId: 'about' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Skills', sectionId: 'skills' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'Certificate', sectionId: 'certifications' },
  { name: 'Contact', sectionId: 'contact' },
];

const panelVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24, staggerChildren: 0.04, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  const activeName = links.find((l) => l.sectionId === active)?.name ?? 'Home';

  // Highlight the link of the section currently in view
  useLayoutEffect(() => {
    const triggers = links
      .map(({ sectionId }) => {
        const el = document.getElementById(sectionId);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) setActive(sectionId);
          },
        });
      })
      .filter(Boolean);
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Make the pill a little more solid once the page has scrolled (state only changes at the threshold)
  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 20,
      end: 'max',
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => trigger.kill();
  }, []);

  // Lock page scroll while the mobile menu is open; close on Escape / when resizing to desktop
  useEffect(() => {
    if (!isOpen) return undefined;
    lockScroll(true);
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  const themeToggle = (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  return (
    <>
      {/* Sticky wrapper: always stays at the top of the screen while scrolling.
          It keeps the same 80px of space the old navbar used, so nothing below shifts. */}
      <div className="pointer-events-none sticky top-0 z-50 flex h-20 w-full items-center justify-center px-4">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-line p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl transition-colors duration-300 lg:max-w-5xl lg:px-3 ${
            scrolled ? 'bg-card/90' : 'bg-card/60'
          }`}
        >
          {/* Desktop links (spread across the full width of the pill) */}
          <div className="hidden flex-1 items-center justify-between lg:flex">
            <div className="flex flex-1 items-center justify-evenly">
              {links.map((link) => {
                const isActive = active === link.sectionId;
                return (
                  <button
                    key={link.sectionId}
                    type="button"
                    onClick={() => scrollToSection(link.sectionId)}
                    className={`relative isolate rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                      isActive ? 'text-brand' : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <>
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-brand/20 bg-brand-soft"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute inset-x-0 bottom-1 mx-auto h-1 w-1 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      </>
                    )}
                    {link.name}
                  </button>
                );
              })}
            </div>
            <span aria-hidden="true" className="mx-3 h-5 w-px bg-line" />
            {themeToggle}
          </div>

          {/* Mobile bar: current section + theme + menu */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <span className="px-4 text-sm font-semibold text-brand">{activeName}</span>
            <div className="flex items-center gap-1">
              <span aria-hidden="true" className="h-5 w-px bg-line" />
              {themeToggle}
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft hover:text-brand focus:outline-none"
                aria-label="Main menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Rendered outside the sticky wrapper so `fixed` positioning isn't affected by it */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="panel"
              className="fixed inset-x-4 top-24 z-50 mx-auto max-w-sm rounded-3xl border border-line bg-card/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-1">
                {links.map((link) => {
                  const isActive = active === link.sectionId;
                  return (
                    <motion.button
                      key={link.sectionId}
                      type="button"
                      variants={itemVariants}
                      onClick={() => {
                        scrollToSection(link.sectionId);
                        setIsOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-lg font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-soft text-brand'
                          : 'text-ink hover:bg-brand-soft hover:text-brand'
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;