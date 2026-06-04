/**
 * lib/animations.ts — Framer Motion variant presets
 * Portal K3 PT Freeport Indonesia
 *
 * Import only what you need to keep bundles small.
 * All easing follows the PRD animation duration table.
 */
import type { Variants } from 'framer-motion';

// ─── Easing Functions ───────────────────────────────────────────────────────

/** Smooth spring ease — page transitions, section entries */
const EASE_SPRING = [0.22, 1, 0.36, 1] as const;

/** Smooth in-out — modals, accordions */
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

// ─── Core Variants ──────────────────────────────────────────────────────────

/**
 * fadeUp — Standard section/card entry animation.
 * 500ms, ease-spring. Use with whileInView + viewport={{ once: true }}.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SPRING },
  },
};

/**
 * fadeDown — For dropdowns and menus entering from top.
 */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_SPRING },
  },
};

/**
 * fadeIn — Simple opacity fade. Use for overlays, backgrounds.
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/**
 * scaleUp — Scale from 0.92 to 1. Use for cards, modals.
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_SPRING },
  },
};

/**
 * slideInRight — Info panels, drawers entering from the right.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_SPRING },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.25, ease: EASE_IN_OUT },
  },
};

/**
 * slideInLeft — Sidebars entering from the left.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_SPRING },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.25, ease: EASE_IN_OUT },
  },
};

// ─── Container / Stagger Variants ───────────────────────────────────────────

/**
 * staggerContainer — Parent wrapper for staggered children.
 * Children should use fadeUp or scaleUp variants.
 * @example
 * <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
 *   {items.map(i => <motion.div variants={fadeUp} key={i.id}>...</motion.div>)}
 * </motion.div>
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * staggerContainerFast — Faster stagger for dense grids.
 */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// ─── Page Transition Variants ────────────────────────────────────────────────

/**
 * pageTransition — Full-page enter/exit transition.
 * Used in app/template.tsx.
 * Duration: 300ms as per PRD spec.
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_SPRING },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

// ─── Modal Variants ──────────────────────────────────────────────────────────

/**
 * modalOverlay — Backdrop fade for modals/lightboxes.
 */
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

/**
 * modalContent — Modal panel scale entry.
 * Duration: 250–300ms as per PRD spec.
 */
export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE_SPRING },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

// ─── Hero Stagger Variant ────────────────────────────────────────────────────

/**
 * heroItem — Custom variant for hero elements with delay index.
 * Use with `custom={index}` prop.
 * @example <motion.h1 custom={1} variants={heroItem} initial="hidden" animate="visible" />
 */
export const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: EASE_SPRING,
    },
  }),
};

// ─── Accordion Variant ───────────────────────────────────────────────────────

/**
 * accordionContent — Height expand/collapse.
 * Used with AnimatePresence. Duration: 250ms per PRD spec.
 */
export const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.25, ease: EASE_IN_OUT },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};
