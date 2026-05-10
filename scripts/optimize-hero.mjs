/**
 * Generates optimized hero images (WebP + JPEG, multiple widths) from a source raster.
 *
 * Usage:
 *   node scripts/optimize-hero.mjs <source-image-path>
 *
 * Output: public/hero/notarace-start-{640,1024,1600}.{webp,jpg}
 *
 * Why: photographic content should not be SVG. Smaller variants + modern format
 * cut payload by 60-80% vs. base64-in-SVG, dramatically improving load under load.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SRC = process.argv[2];
if (!SRC) {
  console.error('Provide a source image path as the first argument.');
  process.exit(1);
}

const OUT_DIR = path.resolve('public', 'hero');
await fs.mkdir(OUT_DIR, { recursive: true });

const WIDTHS = [640, 1024];
const BASENAME = 'notarace-start';

const srcBuf = await fs.readFile(SRC);
const pipelineMeta = await sharp(srcBuf).metadata();
console.log(`Source: ${pipelineMeta.width}x${pipelineMeta.height}, ${(srcBuf.length / 1024).toFixed(1)} KB`);

for (const w of WIDTHS) {
  const base = sharp(srcBuf).resize({ width: w, withoutEnlargement: true });

  const webpPath = path.join(OUT_DIR, `${BASENAME}-${w}.webp`);
  const jpgPath = path.join(OUT_DIR, `${BASENAME}-${w}.jpg`);

  const webpBuf = await base.clone().webp({ quality: 72, effort: 5 }).toBuffer();
  const jpgBuf = await base.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toBuffer();

  await fs.writeFile(webpPath, webpBuf);
  await fs.writeFile(jpgPath, jpgBuf);
  console.log(`  ${w}w → webp ${(webpBuf.length / 1024).toFixed(1)} KB · jpg ${(jpgBuf.length / 1024).toFixed(1)} KB`);
}

console.log('Done.');
