import { useEffect, useRef } from 'react';

/**
 * Adds .fade-in class immediately and toggles .visible when the
 * element scrolls into the viewport. Mirrors the IntersectionObserver
 * setup from the original static HTML.
 */
export function useFadeIn(delay = 0, threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('fade-in');
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return ref;
}
