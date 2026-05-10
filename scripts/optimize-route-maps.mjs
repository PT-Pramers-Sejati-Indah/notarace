/**
 * Optimize route maps for fast loading:
 * 1. SVGO — strip exporter noise, tighten numbers (small gain on dense maps).
 * 2. Raster WebP @1440w — primary delivery format (large gain, sharp at modal/card sizes).
 *
 * Usage: node scripts/optimize-route-maps.mjs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const routesDir = path.join(root, 'public', 'routes');
const svgoBin = path.join(root, 'node_modules', 'svgo', 'bin', 'svgo.js');
const svgoConfig = path.join(root, 'svgo.routes.config.mjs');

const MAPS = [
  { svg: 'route-10k.svg', webp: 'route-10k.webp' },
  { svg: 'route-5k.svg', webp: 'route-5k.webp' },
  { svg: 'route-2-5k.svg', webp: 'route-2-5k.webp' },
];

/** Logical width from SVG viewBox (maps are ~1440×810). */
const TARGET_WIDTH = 1440;

async function main() {
  for (const { svg, webp } of MAPS) {
    const svgPath = path.join(routesDir, svg);
    const webpPath = path.join(routesDir, webp);

    execFileSync(process.execPath, [svgoBin, svgPath, '--config', svgoConfig], {
      cwd: root,
      stdio: 'inherit',
    });

    await sharp(svgPath)
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

    const svgStat = await fs.stat(svgPath);
    const webpStat = await fs.stat(webpPath);
    console.log(
      `${svg}: ${(svgStat.size / 1024).toFixed(1)} KiB SVG → ${(webpStat.size / 1024).toFixed(1)} KiB WebP`,
    );
  }
  console.log('Done. Point routeMapImageSrc at *.webp in eventInfo.ts.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
