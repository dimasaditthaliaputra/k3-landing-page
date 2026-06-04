import { RegulationCategory } from '@/types/regulation';

interface CategoryFilterProps {
  activeCategory: RegulationCategory;
  onChange: (category: RegulationCategory) => void;
}

const CATEGORIES: RegulationCategory[] = ['Semua', 'UU', 'PP', 'Permen', 'Standar Internasional'];

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
            ${activeCategory === category 
              ? 'bg-safety-gold border-safety-gold text-primary-950 shadow-sm' 
              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
            }
          `}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
