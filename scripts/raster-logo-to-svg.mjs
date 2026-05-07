/**
 * Embeds resized WebP inside SVG for smaller transfer than large PNGs.
 * True vectorization needs source artwork; this keeps visual fidelity.
 *
 * Regenerate: place PNG masters in `public/`, then `npm run optimize:public-svgs`
 * (alias: `npm run optimize:logos`).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

/** @type {{ png: string; svg: string; resize: import('sharp').ResizeOptions; webpQuality?: number }[]} */
const JOBS = [
  { png: 'notarace-mark.png', svg: 'notarace-mark.svg', resize: { height: 128 } },
  { png: 'notarace-logo.png', svg: 'notarace-logo.svg', resize: { width: 1100 } },
  {
    png: 'hero-notarace-start.png',
    svg: 'hero-notarace-start.svg',
    resize: { width: 1680 },
    webpQuality: 78,
  },
  { png: 'ini-logo.png', svg: 'ini-logo.svg', resize: { width: 400 } },
];

/**
 * @param {string} pngName
 * @param {import('sharp').ResizeOptions} resize
 * @param {string} svgName
 * @param {number} [webpQuality]
 */
async function toSvg(pngName, resize, svgName, webpQuality = 86) {
  const input = path.join(publicDir, pngName);
  if (!fs.existsSync(input)) {
    console.warn(`Skip ${svgName}: missing source ${pngName}`);
    return;
  }
  let pipeline = sharp(input).ensureAlpha();

  if (resize.height || resize.width) {
    pipeline = pipeline.resize({
      ...resize,
      fit: resize.fit ?? 'inside',
      withoutEnlargement: true,
    });
  }

  const webpBuffer = await pipeline
    .webp({ quality: webpQuality, effort: 6, lossless: false })
    .toBuffer();
  const { width, height } = await sharp(webpBuffer).metadata();
  if (!width || !height) throw new Error(`Missing dimensions for ${pngName}`);

  const b64 = webpBuffer.toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
  <image width="${width}" height="${height}" href="data:image/webp;base64,${b64}"/>
</svg>`;

  fs.writeFileSync(path.join(publicDir, svgName), svg, 'utf8');
  const outKb = (Buffer.byteLength(svg, 'utf8') / 1024).toFixed(1);
  const inKb = (fs.statSync(input).size / 1024).toFixed(1);
  console.log(`${pngName} (${inKb} KB) -> ${svgName} (~${outKb} KB)`);
}

for (const { png, svg, resize, webpQuality } of JOBS) {
  await toSvg(png, resize, svg, webpQuality);
}
