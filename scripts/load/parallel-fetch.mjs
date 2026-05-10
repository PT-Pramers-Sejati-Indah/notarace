/**
 * Parallel fetch smoke test (Node 18+ fetch).
 *
 *   node scripts/load/parallel-fetch.mjs [url] [totalRequests] [maxConcurrent]
 *
 * Examples:
 *   node scripts/load/parallel-fetch.mjs https://notarace.id/ 1000 120
 *
 * `totalRequests` = how many page loads to simulate.
 * `maxConcurrent` = cap simultaneous connections (avoids local socket / Undici timeouts when
 *   firing thousands of connects from one machine — real users are distributed across IPs).
 *
 * For edge/CDN behaviour closer to “everyone hits at once”, use k6 (scripts/load/notarace-home.k6.js)
 * from multiple IPs or k6 cloud.
 */
const url = process.argv[2] || 'https://notarace.id/';
const total = Math.min(5000, Math.max(1, Number(process.argv[3] || 200)));
const maxConcurrent = Math.min(total, Math.max(1, Number(process.argv[4] || 150)));

/** @type {number[]} */
const times = new Array(total);

async function oneFetch() {
  const t0 = performance.now();
  const res = await fetch(url, { redirect: 'follow' });
  await res.arrayBuffer();
  const ms = performance.now() - t0;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return ms;
}

const wall0 = performance.now();
let next = 0;
let active = 0;
/** @type {Error[]} */
const errors = [];

await new Promise((resolve, reject) => {
  function schedule() {
    while (active < maxConcurrent && next < total) {
      const i = next++;
      active++;
      oneFetch()
        .then((ms) => {
          times[i] = ms;
        })
        .catch((e) => {
          errors.push(e);
        })
        .finally(() => {
          active--;
          if (errors.length > total * 0.1 && active === 0) {
            reject(errors[0]);
            return;
          }
          if (next >= total && active === 0) resolve();
          else schedule();
        });
    }
  }
  schedule();
});

const wallMs = performance.now() - wall0;

const ok = times.filter((t) => typeof t === 'number').sort((a, b) => a - b);
const pct = (p) => ok[Math.min(ok.length - 1, Math.ceil(p * ok.length) - 1)];

console.log(
  JSON.stringify(
    {
      url,
      total_requests: total,
      max_concurrent: maxConcurrent,
      successes: ok.length,
      failures: errors.length,
      wall_clock_ms: Math.round(wallMs),
      min_ms: ok.length ? Math.round(ok[0]) : null,
      median_ms: ok.length ? Math.round(pct(0.5)) : null,
      p95_ms: ok.length ? Math.round(pct(0.95)) : null,
      max_ms: ok.length ? Math.round(ok[ok.length - 1]) : null,
    },
    null,
    2,
  ),
);

if (errors.length) {
  console.error('Sample error:', errors[0]?.message || errors[0]);
  process.exitCode = 1;
}
