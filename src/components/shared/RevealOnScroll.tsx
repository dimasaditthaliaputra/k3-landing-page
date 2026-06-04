'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * RevealOnScroll — Wrapper that animates children into view on scroll.
 * Uses Framer Motion whileInView with once: true.
 * Respects prefers-reduced-motion.
 */
export function RevealOnScroll({ children, delay = 0, className }: RevealOnScrollProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
