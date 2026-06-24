'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, index) => (
        page === '...' ? (
          <span key={index} className="px-3 text-zinc-500">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`h-11 min-w-[46px] px-4 rounded-2xl border text-sm font-medium transition-all active:scale-95 ${
              currentPage === page
                ? 'bg-white text-black border-white'
                : 'border-zinc-800 hover:bg-zinc-900 text-zinc-300'
            }`}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}