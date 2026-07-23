/**
 * Docker HEALTHCHECK probe. Kept as a tiny standalone script so compose does
 * not need shell-escaped `bun -e "..."` (Dokploy / some compose frontends
 * mangle the quoting and the probe always fails → "api is unhealthy").
 *
 * Usage: bun apps/api/scripts/docker-healthcheck.ts
 * Exit 0 = healthy, 1 = not ready / down.
 */
const url = process.env.OPENSHIP_HEALTH_URL ?? "http://127.0.0.1:4000/api/health";

try {
  const res = await fetch(url);
  process.exit(res.ok ? 0 : 1);
} catch {
  process.exit(1);
}
