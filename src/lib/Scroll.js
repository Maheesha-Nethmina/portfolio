// Small bridge so any component can scroll / lock scrolling,
// whether or not Lenis (smooth scroll) is active.

let lenis = null;
let locks = 0;

export const setLenis = (instance) => {
  lenis = instance;
  if (lenis && locks > 0) lenis.stop();
};

export const getLenis = () => lenis;

// Reference-counted so the preloader, mobile menu and modal never fight.
export const lockScroll = (lock) => {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  document.documentElement.style.overflow = locks > 0 ? 'hidden' : '';
  if (lenis) {
    if (locks > 0) lenis.stop();
    else lenis.start();
  }
};

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  if (lenis) {
    lenis.scrollTo(element, { offset: -80, duration: 1.2 });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};