/**
 * Curated HD photography from the Unsplash CDN (free to use, no attribution
 * required). Used for atmospheric / editorial imagery — concert halls,
 * orchestras, studios and live audiences — where real photography elevates the
 * design. Identity portraits and film posters deliberately remain stylised
 * local SVGs (never a stranger's face labelled as the artist).
 *
 * Every consumer pairs these with a local SVG `fallback`, so a failed CDN
 * request degrades gracefully instead of showing a broken image.
 */

export function unsplash(id: string, w = 1200, h = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/** Purpose-mapped, long-stable Unsplash photo IDs. */
export const PHOTO = {
  orchestra: '1470225620780-dba8ba36b745', // symphony orchestra on stage
  studio: '1507838153414-b4b713384a76', // recording studio console
  stageLights: '1465847899084-d164df4dedc6', // performance stage lights
  concert: '1487215078519-e21cc028cb29', // live concert
  crowd: '1478720568477-152d9b164e26', // concert audience in lights
  manuscript: '1455390582262-044cdead277a', // handwriting / manuscript
  camera: '1452587925148-ce544e77e70d', // vintage camera
  hall: '1529107386315-e1a2ed48a620', // grand classical hall
  concert2: '1511671782779-c97d3d27a1d4', // concert stage wide
  crowd2: '1501386761578-eac5c94b800a', // festival crowd
  concert3: '1459749411175-04bf5292ceea', // live show
  hands: '1493225457124-a3eb161ffa5f', // audience hands raised
  headphones: '1508973379184-7517410fb0bc', // headphones / listening
  vinyl: '1514320291840-2e0a9bf2a9ae', // vinyl record close-up
} as const;
