/**
 * Generates premium, license-safe SVG placeholder imagery into /public/img.
 * Pure white background, dark-grey ink, single gold accent, music motifs.
 * Run: node scripts/generate-placeholders.mjs
 *
 * These are original vector placeholders — no copyrighted media is used.
 * Replace with officially-licensed photography when available (search "SWAP").
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'img');
mkdirSync(OUT, { recursive: true });

const GOLD = '#C8A542';
const INK = '#222222';
const MUTED = '#999999';
const LINE = '#ECECEC';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Reusable defs: faint staff lines + soft vignette */
function staff(w, h) {
  const lines = [];
  const gap = 14;
  const startY = h / 2 - gap * 2;
  for (let i = 0; i < 5; i++) {
    const y = startY + i * gap;
    lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${LINE}" stroke-width="1"/>`);
  }
  return lines.join('');
}

function pianoKeys(w, y, h) {
  const keyW = w / 14;
  let out = `<g opacity="0.9">`;
  for (let i = 0; i < 14; i++) {
    out += `<rect x="${i * keyW}" y="${y}" width="${keyW - 1}" height="${h}" fill="#fff" stroke="${LINE}"/>`;
  }
  // black keys
  const pattern = [0, 1, 3, 4, 5];
  for (let oct = 0; oct < 2; oct++) {
    for (const p of pattern) {
      const idx = oct * 7 + p;
      const x = (idx + 1) * keyW - keyW * 0.3;
      if (x < w) out += `<rect x="${x}" y="${y}" width="${keyW * 0.6}" height="${h * 0.6}" fill="${INK}"/>`;
    }
  }
  return out + `</g>`;
}

/* A treble clef glyph (simplified, original path). */
function treble(cx, cy, scale, color = GOLD, opacity = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${scale})" opacity="${opacity}">
    <path d="M2,-40 C-14,-30 -14,-6 2,2 C18,10 18,34 2,40 C-8,44 -18,38 -18,26 C-18,16 -10,12 -4,16
             M2,2 L2,60 C2,72 -8,76 -16,70"
      fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="-8" cy="66" r="6" fill="${color}"/>
  </g>`;
}

function note(cx, cy, scale, color = GOLD, opacity = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${scale})" opacity="${opacity}">
    <circle cx="0" cy="18" r="9" fill="${color}"/>
    <rect x="8" y="-24" width="3.5" height="42" fill="${color}"/>
    <path d="M8,-24 C22,-20 24,-8 18,-2 C22,-12 16,-18 8,-16 Z" fill="${color}"/>
  </g>`;
}

function base(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <rect width="${w}" height="${h}" fill="#FFFFFF"/>
  ${inner}
</svg>`;
}

/* ── Portraits (tall) ─────────────────────────────────────────── */
function portrait(name, w = 900, h = 1200, label = 'ISAIGNANI') {
  const inner = `
    <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${LINE}" stroke-width="2"/>
    ${staff(w, h)}
    ${treble(w / 2, h / 2 - 120, 3.4, GOLD, 0.9)}
    <circle cx="${w / 2}" cy="${h / 2 + 150}" r="120" fill="none" stroke="${LINE}" stroke-width="2"/>
    <text x="${w / 2}" y="${h / 2 + 168}" text-anchor="middle" font-family="Georgia, serif" font-size="120" fill="${INK}">IR</text>
    ${pianoKeys(w, h - 120, 96)}
    <text x="${w / 2}" y="${h - 150}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" letter-spacing="8" fill="${GOLD}">${esc(label)}</text>
  `;
  writeFileSync(join(OUT, name), base(w, h, inner));
}

/* ── Movie / album posters (2:3) ──────────────────────────────── */
function poster(name, title, year, w = 600, h = 900) {
  const inner = `
    <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${LINE}" stroke-width="2"/>
    <rect x="16" y="16" width="${w - 32}" height="${h * 0.62}" fill="#FAFAF7"/>
    ${treble(w / 2, h * 0.34, 2.2, GOLD, 0.85)}
    <line x1="60" y1="${h * 0.66}" x2="${w - 60}" y2="${h * 0.66}" stroke="${GOLD}" stroke-width="2"/>
    <text x="${w / 2}" y="${h * 0.75}" text-anchor="middle" font-family="Georgia, serif" font-size="42" fill="${INK}">${esc(title)}</text>
    <text x="${w / 2}" y="${h * 0.82}" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" letter-spacing="6" fill="${MUTED}">${esc(year)}</text>
    <text x="${w / 2}" y="${h - 44}" text-anchor="middle" font-family="Inter, sans-serif" font-size="17" letter-spacing="4" fill="${GOLD}">MUSIC · ILAIYARAAJA</text>
  `;
  writeFileSync(join(OUT, name), base(w, h, inner));
}

/* ── Wide banners / slides (16:9-ish) ─────────────────────────── */
function banner(name, title, w = 1600, h = 900) {
  let notes = '';
  const seed = title.length;
  for (let i = 0; i < 9; i++) {
    const x = ((i * 173 + seed * 40) % (w - 120)) + 60;
    const y = ((i * 97 + seed * 20) % (h - 240)) + 80;
    notes += note(x, y, 0.9 + (i % 3) * 0.25, GOLD, 0.16 + (i % 4) * 0.05);
  }
  const inner = `
    <rect width="${w}" height="${h}" fill="#FCFBF8"/>
    ${staff(w, h)}
    ${notes}
    ${treble(w * 0.16, h / 2, 3.2, GOLD, 0.5)}
    <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="${INK}">${esc(title)}</text>
    ${pianoKeys(w, h - 70, 70)}
  `;
  writeFileSync(join(OUT, name), base(w, h, inner));
}

/* ── Square gallery / posts / news ────────────────────────────── */
function tile(name, title, w = 800, h = 800, motif = 'note') {
  const glyph = motif === 'treble' ? treble(w / 2, h / 2 - 30, 2.6, GOLD, 0.85) : note(w / 2, h / 2 - 30, 2.4, GOLD, 0.85);
  const inner = `
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${LINE}" stroke-width="2"/>
    ${staff(w, h)}
    ${glyph}
    <text x="${w / 2}" y="${h - 70}" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="${INK}">${esc(title)}</text>
  `;
  writeFileSync(join(OUT, name), base(w, h, inner));
}

/* ── Products ─────────────────────────────────────────────────── */
function product(name, label, type, w = 700, h = 700) {
  let glyph = note(w / 2, h / 2 - 20, 2.2, GOLD, 0.9);
  if (type === 'Vinyl' || type === 'CD') {
    glyph = `<g transform="translate(${w / 2},${h / 2 - 20})">
      <circle r="150" fill="#FAFAF7" stroke="${LINE}" stroke-width="2"/>
      <circle r="120" fill="none" stroke="${LINE}"/>
      <circle r="90" fill="none" stroke="${LINE}"/>
      <circle r="46" fill="#FCFBF8" stroke="${GOLD}" stroke-width="2"/>
      <circle r="7" fill="${INK}"/>
    </g>`;
  } else if (type === 'Books') {
    glyph = `<g transform="translate(${w / 2},${h / 2 - 20})">
      <rect x="-110" y="-140" width="220" height="280" rx="6" fill="#FAFAF7" stroke="${LINE}" stroke-width="2"/>
      <line x1="-110" y1="-140" x2="-110" y2="140" stroke="${GOLD}" stroke-width="6"/>
      ${treble(0, -20, 1.6, GOLD, 0.85)}
    </g>`;
  }
  const inner = `
    <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${LINE}" stroke-width="2"/>
    ${glyph}
    <text x="${w / 2}" y="${h - 56}" text-anchor="middle" font-family="Inter, sans-serif" font-size="22" letter-spacing="3" fill="${MUTED}">${esc(label)}</text>
  `;
  writeFileSync(join(OUT, name), base(w, h, inner));
}

/* ═══════════════════════ Generate ═══════════════════════════ */
portrait('hero-portrait.svg');
portrait('bio-portrait.svg', 900, 1100, 'ILAIYARAAJA');

// Slides
banner('slide-concert.svg', 'Maestroverse');
banner('slide-album.svg', 'Latest Album');
banner('slide-movie.svg', 'On Screen');
banner('slide-awards.svg', 'Honours');
banner('slide-journey.svg', 'Life in Music');

// Posters — placeholder titles only (public factual filmography)
const posters = [
  ['poster-mullum-malarum.svg', 'Mullum Malarum', '1978'],
  ['poster-mouna-ragam.svg', 'Mouna Ragam', '1986'],
  ['poster-nayakan.svg', 'Nayakan', '1987'],
  ['poster-sagara-sangamam.svg', 'Sagara Sangamam', '1983'],
  ['poster-sindhu-bhairavi.svg', 'Sindhu Bhairavi', '1985'],
  ['poster-thalapathi.svg', 'Thalapathi', '1991'],
  ['poster-geethanjali.svg', 'Geethanjali', '1989'],
  ['poster-punnagai-mannan.svg', 'Punnagai Mannan', '1986'],
  ['poster-mahanadhi.svg', 'Mahanadhi', '1994'],
  ['poster-hey-ram.svg', 'Hey Ram', '2000'],
  ['poster-how-to-name-it.svg', 'How To Name It', '1986'],
  ['poster-nothing-but-wind.svg', 'Nothing But Wind', '1988'],
  ['poster-thiruvasagam.svg', 'Thiruvasagam', '2005'],
  ['poster-guru.svg', 'Guru', '1997'],
  ['poster-pithamagan.svg', 'Pithamagan', '2003'],
];
posters.forEach(([f, t, y]) => poster(f, t, y));

// Gallery tiles
for (let i = 1; i <= 9; i++) tile(`gallery-${i}.svg`, `Frame ${i}`, 800, i % 3 === 0 ? 1000 : 800, i % 2 ? 'treble' : 'note');

// Posts / news
tile('post-comingsoon.svg', 'Coming Soon', 900, 700, 'treble');
tile('post-maestroverse.svg', 'Maestroverse', 900, 700, 'note');
tile('post-liveconcert.svg', 'Live Concert', 900, 700, 'treble');
tile('post-studio.svg', 'Studio Sessions', 900, 700, 'note');
tile('news-1.svg', 'Netflix Score', 1000, 700, 'treble');
tile('news-2.svg', 'World Tour', 1000, 700, 'note');
tile('news-3.svg', 'New Album', 1000, 700, 'treble');

// Concerts
banner('concert-london.svg', 'London');
banner('concert-chennai.svg', 'Chennai');
banner('concert-singapore.svg', 'Singapore');
banner('concert-toronto.svg', 'Toronto');
banner('concert-dubai.svg', 'Dubai');
banner('concert-sydney.svg', 'Sydney');

// Products
product('shop-book-1.svg', 'HARDCOVER', 'Books');
product('shop-book-2.svg', 'BIOGRAPHY', 'Books');
product('shop-cd-1.svg', 'COMPACT DISC', 'CD');
product('shop-cd-2.svg', 'COMPACT DISC', 'CD');
product('shop-vinyl-1.svg', 'VINYL LP', 'Vinyl');
product('shop-vinyl-2.svg', 'VINYL LP', 'Vinyl');
product('shop-merch-1.svg', 'APPAREL', 'Merchandise');
product('shop-merch-2.svg', 'POSTER', 'Merchandise');
product('shop-collection.svg', 'BOX SET', 'Music Collection');

console.log('✔ Placeholder imagery generated into public/img');
