/**
 * lib/hooks/useCountUp.ts
 * Animasi counter statistik K3 menggunakan requestAnimationFrame.
 * Gunakan bersama IntersectionObserver (lihat StatCounter.tsx).
 */
import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;    // ms, default 2200
  startOnMount?: boolean;
}

export function useCountUp({
  target,
  duration = 2200,
  startOnMount = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}
