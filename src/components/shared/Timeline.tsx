'use client';
import { motion, Variants } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: Milestone[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const nodeVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 15,
    },
  },
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative py-8">
      {/* Horizontal Line for Desktop with Drawing Animation */}
      <div className="hidden md:block absolute top-[11px] left-0 right-0 h-1 bg-neutral-200 dark:bg-primary-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-safety-gold"
        />
      </div>

      {/* Vertical Line for Mobile with Drawing Animation */}
      <div className="md:hidden absolute top-0 bottom-0 left-3 w-1 bg-neutral-200 dark:bg-primary-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-safety-gold"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-8"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={stepVariants}
            className="relative flex flex-col items-start md:items-center text-left md:text-center pl-10 md:pl-0"
          >
            {/* Node with Scale-Up Animation */}
            <motion.div
              variants={nodeVariants}
              className="absolute left-3 md:left-1/2 top-0 md:top-0 w-6 h-6 -translate-x-1/2 rounded-full bg-safety-gold border-4 border-primary-700 shadow-md z-10"
            />

            {/* Content Container */}
            <div className="pt-0 md:pt-8 w-full">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-800/60 text-white text-xs font-bold mb-3">
                {item.year}
              </span>
              <h4 className="text-lg font-bold text-primary-900 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-neutral-600  leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
