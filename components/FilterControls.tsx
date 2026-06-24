'use client';

import { Search, X, ChevronDown } from 'lucide-react';
import { SortOption } from '@/types/video';
import { categories } from '@/lib/videos';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
  isOpen: boolean;
  onToggleMobile: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'views', label: 'Paling Banyak Ditonton' },
  { value: 'duration', label: 'Durasi Terpanjang' },
];

export default function FilterControls({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  sortBy,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
  totalResults,
  isOpen,
  onToggleMobile,
}: FilterControlsProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari judul video atau kategori..."
          className="w-full bg-[#171717] border border-[#262626] focus:border-zinc-600 transition-colors pl-12 pr-5 py-4 rounded-3xl text-lg placeholder:text-zinc-500 outline-none"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Categories */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 px-1 text-xs tracking-widest text-zinc-500">
            KATEGORI
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={`filter-chip px-5 py-2 rounded-2xl text-sm border transition-all active:scale-[0.985] ${
                    isActive 
                      ? 'bg-rose-600 border-rose-600 text-white' 
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div className="lg:w-72">
          <div className="flex items-center gap-2 mb-2 px-1 text-xs tracking-widest text-zinc-500">
            URUTKAN
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full appearance-none bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors px-5 py-[17px] rounded-3xl text-sm outline-none cursor-pointer pr-10"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Mobile hint */}
      <div className="lg:hidden text-[10px] text-center text-zinc-500 pt-1">
        {totalResults} hasil • Geser untuk lihat lebih banyak kategori
      </div>
    </div>
  );
}