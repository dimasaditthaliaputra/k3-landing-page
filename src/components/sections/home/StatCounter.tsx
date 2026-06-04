'use client';
import { useEffect, useRef } from 'react';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { ShieldCheck, Calendar, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import statsData from '@/data/stats.json';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Calendar: Calendar,
  Users: Users,
  CheckCircle: CheckCircle,
};

interface StatItemProps {
  icon: keyof typeof iconMap;
  target: number;
  suffix?: string;
  label: string;
}

function StatItem({ icon, target, suffix = '', label }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, start } = useCountUp({ target, duration: 2200 });
  const IconComponent = iconMap[icon];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) { 
          start(); 
          observer.disconnect(); 
        } 
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  const displayValue = count.toLocaleString('id-ID') + suffix;
  const fontClampClass = 'text-[clamp(1.75rem,2.5vw,2.75rem)]';

  return (
    <div ref={ref} className='flex flex-col items-center justify-center p-6 dark:bg-primary-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-primary-800 hover:shadow-md transition-shadow duration-300'>
      <div className={`p-4 rounded-full bg-primary-800/50 text-safety-gold mb-4`}>
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      <span className={`${fontClampClass} font-bold text-white tabular-nums tracking-tight`}>
        {displayValue}
      </span>
      <span className='text-sm lg:text-base font-semibold text-primary-300 text-center mt-2 uppercase tracking-wide'>{label}</span>
    </div>
  );
}

export function StatCounter() {
  return (
    <section className="py-20 bg-neutral-50 relative z-20">
      <div className="container-k3">
        <motion.div 
          variants={staggerContainer} 
          initial='hidden' 
          whileInView='visible' 
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat) => (
            <motion.div key={stat.id} variants={fadeUp}>
              <StatItem 
                icon={stat.icon as keyof typeof iconMap} 
                target={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
