/**
 * Load test: home page + discovered JS/CSS + hero WebP (+ optional gallery JSON).
 *
 * Install k6: https://k6.io/docs/get-started/installation/
 *
 * Examples:
 *   k6 run scripts/load/notarace-home.k6.js
 *   k6 run -e BASE_URL=https://staging.example.com scripts/load/notarace-home.k6.js
 *   k6 run -e INCLUDE_DATA_JSON=true scripts/load/notarace-home.k6.js
 *
 * Tune stages below for your risk tolerance. Ramp slowly before hitting high VUs.
 */
import http from 'k6/http';
import { check, group } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const failRate = new Rate('failed_checks');
const docDur = new Trend('timing_document_ms');
const assetDur = new Trend('timing_assets_ms');

export const options = {
  scenarios: {
    steady_ramp: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '2m', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<8000'],
    failed_checks: ['rate<0.05'],
  },
};

const BASE = __ENV.BASE_URL || 'https://notarace.id';
const INCLUDE_DATA_JSON = __ENV.INCLUDE_DATA_JSON === 'true';
const DATA_JSON_URL =
  __ENV.DATA_JSON_URL ||
  'https://raw.githubusercontent.com/PT-Pramers-Sejati-Indah/notarace/refs/heads/main/public/data.json';

export function setup() {
  const res = http.get(BASE);
  if (res.status !== 200) {
    return { ok: false, jsPath: null, cssPath: null };
  }
  const body = res.body || '';
  const jsPath = body.match(/src="(\/assets\/[^"]+\.js)"/)?.[1] || null;
  const cssPath = body.match(/href="(\/assets\/[^"]+\.css)"/)?.[1] || null;
  return { ok: true, jsPath, cssPath };
}

export default function (data) {
  const ok = check(data, {
    setup_ok: () => data.ok === true,
    has_js: () => !!data.jsPath,
    has_css: () => !!data.cssPath,
  });
  if (!ok) failRate.add(1);

  group('document', () => {
    const res = http.get(BASE);
    const pass = check(res, { 'GET / status 200': (r) => r.status === 200 });
    failRate.add(!pass);
    docDur.add(res.timings.duration);
  });

  if (!data.jsPath || !data.cssPath) return;

  group('critical_assets', () => {
    const batch = [
      ['GET', `${BASE}${data.jsPath}`, null, { tags: { asset: 'js' } }],
      ['GET', `${BASE}${data.cssPath}`, null, { tags: { asset: 'css' } }],
      ['GET', `${BASE}/hero/notarace-start-1024.webp`, null, { tags: { asset: 'hero' } }],
    ];
    const responses = http.batch(batch);
    for (const res of responses) {
      const pass = check(res, {
        'asset status 200': (r) => r.status === 200,
      });
      failRate.add(!pass);
      assetDur.add(res.timings.duration);
    }
  });

  if (INCLUDE_DATA_JSON) {
    group('gallery_data_json', () => {
      const res = http.get(DATA_JSON_URL);
      const pass = check(res, {
        'data.json status 200': (r) => r.status === 200,
      });
      failRate.add(!pass);
    });
  }
}
