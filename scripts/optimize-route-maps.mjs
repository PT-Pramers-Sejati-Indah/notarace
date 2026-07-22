/**
 * Optimize route maps for fast loading:
 * Raster WebP @1440w from PNG sources (primary delivery format).
 *
 * Usage: node scripts/optimize-route-maps.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const routesDir = path.join(root, 'public', 'routes');

const MAPS = [
  { png: 'route-10k.png', webp: 'route-10k.webp' },
  { png: 'route-5k.png', webp: 'route-5k.webp' },
  { png: 'route-2-5k.png', webp: 'route-2-5k.webp' },
];

/** Logical width for modal/card delivery. */
const TARGET_WIDTH = 1440;

async function main() {
  for (const { png, webp } of MAPS) {
    const pngPath = path.join(routesDir, png);
    const webpPath = path.join(routesDir, webp);

    const info = await sharp(pngPath)
      .resize({
        width: TARGET_WIDTH,
        withoutEnlargement: true,
      })
      .webp({
        quality: 86,
        effort: 5,
        smartSubsample: true,
      })
      .toFile(webpPath);

    const pngStat = await fs.stat(pngPath);
    console.log(
      `${png}: ${(pngStat.size / 1024).toFixed(1)} KiB PNG → ${(info.size / 1024).toFixed(1)} KiB WebP (${info.width}×${info.height})`,
    );
  }
  console.log('Done. Point routeMapImageSrc at *.webp in eventInfo.ts.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
