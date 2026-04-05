// sync-thumbnails.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// A recepteket közvetlenül importáljuk a JS fájlból
import { recipes as originalRecipes } from './src/data/mockRecipes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RECIPES_PATH = path.join(__dirname, 'src/data/mockRecipes.js');

async function syncThumbnails() {
  console.log('🚀 TikTok borítóképek szinkronizálása indul...');
  
  // Másolatot készítünk, hogy ne az eredetit módosítsuk közvetlenül az importban
  let recipes = [...originalRecipes];

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.tikTokId) {
        console.log(`📸 Feldolgozás (${i + 1}/${recipes.length}): ${recipe.title}`);
        
        try {
          // TikTok embed oldal megnyitása
          const url = `https://www.tiktok.com/embed/${recipe.tikTokId}`;
          await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

          // Kép kinyerése
          const thumbUrl = await page.evaluate(() => {
            const img = document.querySelector('img');
            return img ? img.src : null;
          });

          if (thumbUrl) {
            recipe.image = thumbUrl;
            console.log(`   ✅ Siker!`);
          }
        } catch (err) {
          console.error(`   ❌ Hiba ennél: ${recipe.title}`, err.message);
        }
      }
    }

    await browser.close();

    // Mentés vissza a fájlba tiszta JavaScript formátumban
    const fileContent = `export const recipes = ${JSON.stringify(recipes, null, 2)};`;
    
    fs.writeFileSync(RECIPES_PATH, fileContent);
    console.log('\n✨ KÉSZ! A mockRecipes.js sikeresen frissítve lett az új képekkel.');

  } catch (globalErr) {
    console.error('❌ Kritikus hiba:', globalErr);
  }
}

syncThumbnails();