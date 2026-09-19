// scripts/fetch-thumbnails.mjs
// A TikTok videók borítóképeit tölti le a public/thumbs mappába ({tikTokId}.jpg).
// A kártyák és a videó-előnézetek ezeket használják; ha egy kép hiányzik,
// a RecipePoster egy megtervezett, textúrás borítót mutat helyette.
//
// Futtatás: npm run thumbs   (Node 18+; a már letöltött képeket kihagyja)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { recipes } from '../src/data/mockRecipes.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, 'public', 'thumbs');
const PROFILE = 'eranagy20';

await fs.mkdir(OUT_DIR, { recursive: true });

let ok = 0;
for (const recipe of recipes) {
  const id = recipe.tikTokId?.trim();
  if (!id) continue;

  const target = path.join(OUT_DIR, `${id}.jpg`);
  try {
    await fs.access(target);
    ok++;
    continue; // már megvan
  } catch {}

  try {
    const videoUrl = `https://www.tiktok.com/@${PROFILE}/video/${id}`;
    const meta = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`).then((r) => r.json());
    if (!meta.thumbnail_url) throw new Error('nincs thumbnail_url');

    const img = await fetch(meta.thumbnail_url);
    if (!img.ok) throw new Error(`HTTP ${img.status}`);
    await fs.writeFile(target, Buffer.from(await img.arrayBuffer()));
    ok++;
    console.log(`✅ ${recipe.title}`);
  } catch (err) {
    console.warn(`⚠️  ${recipe.title}: ${err.message}`);
  }
}

console.log(`\nKész: ${ok} borítókép a public/thumbs mappában.`);
