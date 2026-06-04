'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * app/template.tsx — Page Transition Wrapper
 *
 * Next.js re-mounts <template> on every route change, triggering
 * AnimatePresence exit/enter animations on page navigation.
 *
 * Duration: 300ms as per PRD animation spec.
 * Easing: [0.22, 1, 0.36, 1] (spring-like, feels natural)
 *
 * Respects prefers-reduced-motion: if user has reduced motion enabled,
 * animations are replaced with simple opacity fade only.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15 } },
        exit:    { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        initial: { opacity: 0, y: 16 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
        exit: {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
        },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
