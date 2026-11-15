import { useCallback, useEffect, useState } from 'react';

const readIsDark = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

export default function useTheme() {
  const [isDark, setIsDark] = useState(readIsDark);

  const apply = useCallback((dark) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.classList.toggle('dark', dark);
    window.setTimeout(() => root.classList.remove('theme-transition'), 400);
    setIsDark(dark);
  }, []);

  const toggle = useCallback(() => {
    const next = !readIsDark();
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
    apply(next);
  }, [apply]);

  // Follow the OS setting until the visitor picks a theme manually
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {
        /* ignore */
      }
      apply(e.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [apply]);

  return { isDark, toggle };
}