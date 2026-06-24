"use client";

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, X, Play, Clock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { allVideos, categories } from '@/lib/videos';
import { Video, SortOption } from '@/types/video';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import FilterControls from '@/components/FilterControls';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 24;

export default function DrPinguinGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL State
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sort') as SortOption) || 'newest';
  const selectedCategories = searchParams.get('cat')?.split(',').filter(Boolean) || [];

  // Local State
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL params
  const updateParams = (updates: Record<string, string | string[] | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 when filters change (except page itself)
    if (!('page' in updates)) {
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filtered + Sorted Videos
  const filteredVideos = useMemo(() => {
    let result = [...allVideos];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(video =>
        video.title.toLowerCase().includes(q) ||
        video.categories.some(cat => cat.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(video =>
        selectedCategories.every(cat => video.categories.includes(cat))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
        break;
      case 'oldest':
        result.sort((a, b) => a.uploadDate.localeCompare(b.uploadDate));
        break;
      case 'duration':
        result.sort((a, b) => {
          const [aMin, aSec] = a.duration.split(':').map(Number);
          const [bMin, bSec] = b.duration.split(':').map(Number);
          return (bMin * 60 + bSec) - (aMin * 60 + bSec);
        });
        break;
      case 'views':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleSearch = (query: string) => {
    updateParams({ q: query || null });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    updateParams({ cat: newCategories });
  };

  const handleSortChange = (newSort: SortOption) => {
    updateParams({ sort: newSort });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    router.push('/', { scroll: false });
  };

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'visible';
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#262626] bg-[#0a0a0a]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="font-semibold text-2xl tracking-tight">Dr. Pinguin</h1>
              <p className="text-[10px] text-zinc-500 -mt-1">M.S.B • KOLEKSI PILIHAN</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              {allVideos.length.toLocaleString('id-ID')} video tersedia
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 transition-colors"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-900 text-xs tracking-[2px] text-zinc-400 mb-4">
            KOLEKSI EKSKLUSIF
          </div>
          <h2 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-4">
            Koleksi Video<br />Pilihan Dr. Pinguin
          </h2>
          <p className="text-xl text-zinc-400 max-w-md">
            Ribuan konten berkualitas tinggi. Update setiap hari. Nikmati pengalaman terbaik.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Search + Controls */}
        <div className="mb-8">
          <FilterControls
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            totalResults={filteredVideos.length}
            isOpen={isFilterOpen}
            onToggleMobile={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="text-zinc-400">
            Menampilkan <span className="text-white font-medium">{paginatedVideos.length}</span> dari{' '}
            <span className="text-white font-medium">{filteredVideos.length}</span> video
            {hasActiveFilters && ' (dengan filter)'}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors text-sm"
            >
              <X size={14} /> Reset semua filter
            </button>
          )}
        </div>

        {/* Video Grid */}
        {paginatedVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence>
              {paginatedVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.015, 0.3) }}
                >
                  <VideoCard video={video} onClick={() => openVideo(video)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
              <Search className="text-zinc-500" size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Tidak ada video ditemukan</h3>
            <p className="text-zinc-400 max-w-xs mb-6">
              Coba ubah kata kunci pencarian atau hapus beberapa filter kategori.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-2xl bg-white text-black font-medium hover:bg-zinc-200 active:bg-zinc-300 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Dr. Pinguin Bokep, M.S.B. • Semua konten untuk dewasa 18+ • 
          <span className="mx-1">•</span> 
          <a href="#" className="hover:text-zinc-400 transition-colors">Kebijakan Privasi</a>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={closeVideo} 
            allVideos={allVideos}
            onVideoChange={(newVideo) => setSelectedVideo(newVideo)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}