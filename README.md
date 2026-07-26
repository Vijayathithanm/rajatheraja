# Isaignani Ilaiyaraaja — Official-style Portfolio

A premium, minimal, fully-responsive tribute & portfolio website for the legendary
Indian composer **Isaignani Ilaiyaraaja**. Built to feel timeless and world-class —
pure white canvas, elegant Playfair Display / Inter typography, a single gold accent,
generous white space, tasteful music-note motifs and smooth Framer Motion animation.

> This is an independent tribute/demonstration built entirely from **publicly available
> factual information** and **original, license-safe vector placeholder imagery**.
> It is not an official commercial website and hosts no copyrighted media.

---

## ✨ Features

- **Home** — parallax-style hero with floating music notes & animated equalizer, an
  auto-sliding Embla hero carousel, animated statistic counters, biography preview,
  latest posts, latest news and an “interesting facts” grid.
- **Biography** — interactive vertical milestone timeline (birth → international
  recognition → Parliament).
- **Compositions** — filter tabs (Movies / Albums / Background Score / Devotional /
  Independent), live search, sorting and pagination. Each card shows year, language,
  director, label, genre and song count.
- **Concerts** — Maestroverse & Live-In-Concert series, Upcoming/Completed filters,
  venue, country and booking links.
- **Awards** — animated counters plus a category-filterable honours timeline
  (National, State, Filmfare, Padma, International, Honorary Doctorates).
- **Shop** — product grid (Books / CD / Vinyl / Merchandise / Collections) with a
  demo bag.
- **Gallery** — masonry layout with an accessible lightbox.
- **Quiz** — interactive trivia game with live score and leaderboard.
- **Apply Certificate** — validated online form.
- **Admin Dashboard** — a localStorage-backed CMS to add/edit/delete News, Posts,
  Concerts, Compositions, Products, the Homepage Slider, Gallery and Quiz.
- **Global search**, sticky glass navigation, scroll-progress bar, loading skeletons,
  404 page, full SEO (metadata, Open Graph, Twitter cards, JSON-LD structured data,
  sitemap, robots) and accessibility (skip link, ARIA, focus states, reduced-motion).

## 🧰 Tech Stack

| Area          | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | **Next.js 14** (App Router, static export)         |
| Language      | **TypeScript**                                     |
| Styling       | **Tailwind CSS** (custom brand palette)            |
| Animation     | **Framer Motion**                                  |
| Icons         | **Lucide** (music-themed throughout)               |
| Carousel      | **Embla Carousel** (+ autoplay)                    |
| Data layer    | **React Query** over a mockable services layer     |
| Fonts         | **Playfair Display** (headings) + **Inter** (body) |

## 🎨 Design Tokens

| Token          | Value     |
| -------------- | --------- |
| Background     | `#FFFFFF` |
| Primary text   | `#222222` |
| Secondary text | `#666666` |
| Accent (gold)  | `#C8A542` |
| Borders        | `#ECECEC` |
| Hover surface  | `#F7F7F7` |

## 📁 Project Structure

```
app/                     # App Router pages (home, biography, compositions, concerts,
                         #   awards, shop, gallery, quiz, certificate, admin, legal),
                         #   layout, robots.ts, sitemap.ts, icon.svg, not-found, loading
components/
  layout/                # Navbar, Footer, Providers (React Query), ScrollProgress
  ui/                    # Reveal, Section, PageHeader, Counter, Icon, Media, Skeleton,
                         #   MusicNotes/Equalizer, PianoDivider, LegalPage
  home/                  # Hero, HeroSlider, Stats, BiographyPreview, LatestPosts,
                         #   LatestNews, Facts
  biography/ compositions/ concerts/ awards/ shop/ gallery/ quiz/ certificate/ admin/
  search/                # GlobalSearch modal
data/                    # Mock content (site, biography, compositions, concerts,
                         #   awards, shop, gallery, quiz)
lib/                     # types, utils, hooks, services (API layer), cms (localStorage)
scripts/                 # generate-placeholders.mjs — builds all SVG imagery
public/img/              # Generated placeholder artwork
```

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) regenerate placeholder imagery
node scripts/generate-placeholders.mjs

# 3. Run the dev server
npm run dev          # http://localhost:3000

# 4. Production build (static export → ./out)
npm run build
```

## 🗂️ Data & the “API” layer

The site is a **fully static export**, so there is no server at runtime. To keep a clean,
production-shaped architecture:

- All content lives in `data/` as typed mock data.
- `lib/services.ts` exposes async functions (`getCompositions`, `getConcerts`, …) that
  return Promises — the components consume them through **React Query** exactly as they
  would a real REST/GraphQL backend. Swap the function bodies for `fetch()` calls to go
  live without touching any component.
- `lib/cms.ts` merges any **Admin dashboard** edits (saved to `localStorage`) on top of
  the seed data, so admin changes appear instantly across the site.

## 🔐 Admin Dashboard

Visit **`/admin`**, enter any passphrase (demo gate), and manage every collection.
Edits persist to your browser’s local storage and can be reset per-collection.
In production, replace `lib/cms.ts` with calls to a real database/CMS.

## 🖼️ Replacing Placeholder Imagery

All artwork under `public/img/` is generated by `scripts/generate-placeholders.mjs`
(pure white, gold-accented, music-themed SVGs). Drop officially-licensed photography
into `public/img/` using the same file names — search the codebase for image paths
(`/img/…`) to see where each is used.

## 📦 Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds the static export and publishes it to GitHub Pages
on every push to `main`. The workflow injects `NEXT_PUBLIC_BASE_PATH` automatically, and
`next/image` prefixes it, so the site works from a project sub-path or a custom domain.
The output is a plain static bundle — it can equally be hosted on Vercel, Netlify,
Cloudflare Pages or any static host.

## ♿ Accessibility & Performance

- Semantic HTML, ARIA labels, keyboard-navigable menus, visible focus rings.
- `prefers-reduced-motion` disables non-essential animation.
- Lazy-loaded, optimized images and code-split routes for fast first loads.

## 📜 Content Sources & Licensing

Factual information (biography, filmography, awards) is drawn from open public sources
such as encyclopaedias and public music/film databases. No copyrighted audio, video or
photographs are included — every image is an original vector placeholder.
See `/disclaimer`, `/privacy` and `/terms` in the app.
