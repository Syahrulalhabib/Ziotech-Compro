import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `target` when the ref element enters viewport.
 * Runs only once (on first intersection).
 * @param {number} target   - final number to count up to
 * @param {number} duration - animation duration in ms (default 1800)
 */
export function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId;
    const runAnimation = () => {
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) {
          animId = requestAnimationFrame(tick);
        }
      };
      animId = requestAnimationFrame(tick);
    };

    if (isVisible.current) {
      runAnimation();
      return () => {
        if (animId) cancelAnimationFrame(animId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.current = true;
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [target, duration]);

  return { count, ref };
}
