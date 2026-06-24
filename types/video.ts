export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  embedUrl: string;
  categories: string[];
  duration: string;
  uploadDate: string; // YYYY-MM-DD
  views?: number;
}

export type SortOption = 'newest' | 'oldest' | 'duration' | 'views';