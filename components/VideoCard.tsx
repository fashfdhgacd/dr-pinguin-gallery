'use client';

import { Play, Clock, Eye } from 'lucide-react';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      onClick={onClick}
      className="video-card group cursor-pointer bg-[#171717] rounded-3xl overflow-hidden border border-[#262626] hover:border-zinc-700 flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-zinc-950 overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
            <Play className="text-black ml-0.5" size={22} fill="currentColor" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-px bg-black/80 text-white text-[10px] font-mono tracking-widest rounded-md flex items-center gap-1">
          <Clock size={11} /> {video.duration}
        </div>

        {/* Views */}
        {video.views && (
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/70 text-white text-[10px] rounded-full flex items-center gap-1">
            <Eye size={11} /> {(video.views / 1000).toFixed(0)}k
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-[15px] leading-tight line-clamp-2 mb-3 group-hover:text-rose-400 transition-colors">
          {video.title}
        </h3>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {video.categories.slice(0, 3).map((cat, idx) => (
            <span 
              key={idx}
              className="text-[10px] px-2.5 py-px rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}