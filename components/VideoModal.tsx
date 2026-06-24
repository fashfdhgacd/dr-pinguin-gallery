'use client';

import { useState } from 'react';
import { X, Clock, Eye, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Video } from '@/types/video';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
  allVideos: Video[];
  onVideoChange: (video: Video) => void;
}

export default function VideoModal({ video, onClose, allVideos, onVideoChange }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentIndex = allVideos.findIndex(v => v.id === video.id);
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevVideo) {
      onVideoChange(prevVideo);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (nextVideo) {
      onVideoChange(nextVideo);
      setIsPlaying(false);
    }
  };

  // Simple embed renderer (replace with real logic later)
  const renderPlayer = () => {
    if (!isPlaying) {
      return (
        <div 
          onClick={() => setIsPlaying(true)}
          className="aspect-video bg-zinc-950 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden rounded-2xl border border-zinc-800"
        >
          <div className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 hover:bg-white/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <ArrowRight className="text-black ml-1" size={32} />
              </div>
            </div>
            <p className="text-zinc-400 text-sm">Klik untuk memutar video</p>
            <p className="text-[10px] text-zinc-500 mt-1">(Ganti dengan embed code asli di production)</p>
          </div>
        </div>
      );
    }

    // YouTube embed example (replace this logic with your real embed URLs)
    if (video.embedUrl.includes('youtube.com')) {
      return (
        <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-800">
          <iframe
            src={video.embedUrl.replace('watch?v=', 'embed/')}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    }

    // Fallback for custom embeds
    return (
      <div className="aspect-video bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-zinc-400 mb-2">Embed Player</p>
          <p className="text-xs text-zinc-500">Masukkan iframe embed code dari sumber video kamu di sini</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: "spring", bounce: 0.02, duration: 0.25 }}
        className="modal w-full max-w-5xl bg-[#0a0a0a] rounded-3xl border border-zinc-800 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          {/* Player Area */}
          <div className="mb-6">
            {renderPlayer()}
          </div>

          {/* Video Info */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-semibold tracking-tight pr-12 leading-tight mb-4">
                {video.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-5">
                {video.categories.map((cat, i) => (
                  <span key={i} className="text-xs px-4 py-1 rounded-full border border-zinc-700 text-zinc-300">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {video.duration}
                </div>
                {video.views && (
                  <div className="flex items-center gap-2">
                    <Eye size={16} /> {video.views.toLocaleString('id-ID')} tayang
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {new Date(video.uploadDate).toLocaleDateString('id-ID', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex md:flex-col gap-3 md:pt-1">
              <button 
                onClick={handlePrev} 
                disabled={!prevVideo}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.985]"
              >
                <ArrowLeft size={18} /> Sebelumnya
              </button>
              <button 
                onClick={handleNext} 
                disabled={!nextVideo}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.985]"
              >
                Selanjutnya <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/70 px-6 md:px-8 py-4 text-[10px] text-zinc-500 border-t border-zinc-800 flex items-center justify-between text-center">
          <div>Dr. Pinguin • Koleksi Pilihan</div>
          <div className="hidden md:block">Tekan ESC untuk menutup • Gunakan tombol panah untuk navigasi</div>
        </div>
      </div>
    </div>
  );
}