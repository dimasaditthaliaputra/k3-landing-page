import { MarkerCategory } from '@/types/map';
import { CATEGORY_STYLES } from './MapLegend';

interface LayerControlsProps {
  activeCategories: MarkerCategory[];
  onChange: (categories: MarkerCategory[]) => void;
  className?: string;
}

export function LayerControls({ activeCategories, onChange, className = '' }: LayerControlsProps) {
  const toggleCategory = (category: MarkerCategory) => {
    if (activeCategories.includes(category)) {
      onChange(activeCategories.filter((c) => c !== category));
    } else {
      onChange([...activeCategories, category]);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {Object.entries(CATEGORY_STYLES).map(([key, style]) => {
        const category = key as MarkerCategory;
        const isActive = activeCategories.includes(category);
        const Icon = style.icon;

        return (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
              ${isActive 
                ? 'bg-neutral-800 border-neutral-600 text-white shadow-sm' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }
            `}
            aria-pressed={isActive}
            aria-label={`Filter marker ${style.label}`}
          >
            <Icon size={16} className={isActive ? style.color.replace('text-', 'text-') : ''} />
            {style.label}
          </button>
        );
      })}
    </div>
  );
}
