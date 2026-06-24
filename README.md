# Koleksi Dr. Pinguin — Next.js Video Gallery

Proyek gallery video modern untuk **Dr. Pinguin Bokep, M.S.B.**

Sudah termasuk:
- Dark elegant UI
- Search real-time
- Multi-select kategori filter
- Sort (Terbaru, Terlama, Views, Durasi)
- URL-based filters & pagination (bisa di-share)
- Responsive grid (mobile friendly)
- Modal player + prev/next navigation
- Sample data 24 video (siap diganti)
- Framer Motion animation
- TypeScript + Tailwind

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Cara Deploy ke Vercel (Recommended)

1. Push folder ini ke GitHub
2. Import project di Vercel
3. Deploy otomatis

Atau gunakan custom domain `videyy.icu` nanti.

## Cara Ganti Data Video

Edit file: `lib/videos.ts`

Ganti array `allVideos` dengan data asli kamu.

**Format setiap video:**
```ts
{
  id: number,
  title: string,
  thumbnail: string,           // URL gambar (picsum atau hosting sendiri)
  embedUrl: string,            // URL embed (YouTube / IndoAV / custom)
  categories: string[],        // salah satu dari daftar categories
  duration: string,            // "12:45"
  uploadDate: string,          // "2026-06-20"
  views?: number
}
```

## Ganti Embed Player

Saat ini modal menggunakan YouTube sebagai contoh.  
Di production, ganti logic di `components/VideoModal.tsx` sesuai sumber embed kamu (IndoAV, dll).

## Fitur Selanjutnya yang Bisa Ditambahkan

- Admin panel sederhana (form tambah video)
- Infinite scroll (opsional)
- Favorites / Watch later (localStorage)
- View count real (jika pakai database)
- SEO per video page (dynamic route)

---

Dibuat khusus untuk Dr. Pinguin. Tinggal kembangin sesuai kebutuhan.

Butuh bantuan tambahan? Hubungi saya lagi.