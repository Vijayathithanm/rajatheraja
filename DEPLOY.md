# Deploying Ilaiyaraaja Official to your own domain

You have two ways to go live. Pick ONE.

---

## Option A — Upload the ready-made static site (simplest)

Use the **`ilaiyaraaja-site-static.zip`** archive. It is the fully built website
(plain HTML/CSS/JS/images) with paths served from the domain **root** (`/`).

1. Unzip it. You get a folder of files (`index.html`, `compositions/`, `img/`, …).
2. Upload the **contents** of that folder to your web host's public root:
   - **cPanel / shared hosting:** upload into `public_html/`.
   - **Netlify:** drag the folder onto app.netlify.com → "Add new site → Deploy manually".
   - **Cloudflare Pages:** "Direct upload" the folder.
   - **AWS S3 + CloudFront:** `aws s3 sync ./ s3://your-bucket --delete`, enable static hosting.
   - **nginx / Apache:** copy into the server's document root.
3. Point your domain's DNS at the host and enable HTTPS. Done.

Deep links (e.g. `/compositions`, `/awards`) already work because each page is a
real folder with its own `index.html`, and `404.html` handles unknown paths.

> This build uses the bundled content (no database). It is fully functional as-is.

---

## Option B — Deploy from source (best if you'll edit content or use Supabase)

Use the **`ilaiyaraaja-source.zip`** archive (full project, no `node_modules`).

### Local run / rebuild
```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static export → ./out  (upload like Option A)
```

### One-click hosting (recommended)
- **Vercel:** import the project, framework "Next.js", deploy, then add your
  domain under Project → Settings → Domains.
- **Netlify:** build command `npm run build`, publish directory `out`.

Because it is served from the domain root, **leave `NEXT_PUBLIC_BASE_PATH` unset**.
(Only GitHub Pages *project* sites need it.)

### Optional: connect Supabase (shared, editable content)
1. Create a project at supabase.com.
2. In SQL editor, run `supabase/schema.sql` then `supabase/seed.sql`.
3. Set these env vars in your host (or `.env.local` for local builds):
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. Rebuild/redeploy. The site now reads content from your database; without the
   vars it falls back to the bundled content. See README "Connect a database".

---

## Notes
- **Custom sub-path** (e.g. `example.com/music`): set `NEXT_PUBLIC_BASE_PATH=/music`
  at build time, then rebuild.
- **Images:** all artwork in `public/img` is original placeholder art plus the two
  portrait photos you provided. Replace files there (same names) to swap imagery.
- **Admin:** `/admin` manages content in the browser's local storage in this build;
  connect Supabase (Option B) for shared, persistent edits.
- **No payment is processed** at checkout — it is a demonstration flow.
