# SEO & deployment health audit — Next.js (static export) on Cloudflare Pages

Reusable runbook for auditing/fixing canonical-domain and deployment issues on any
Next.js + Cloudflare Pages site. Originally derived from a sitemap/canonical-host
mismatch found on acrestbooks.com that caused a Google Search Console "Page with
redirect" indexing issue. Paste this whole file into a Claude Code session on another
project to run the same audit there.

Run this as a full audit + fix pass, not a quick glance. Verify every claim by testing
actual live behavior (HTTP status codes, response bodies, redirect targets) — never
trust "looks configured in the dashboard" as confirmation. For every fix, show the
before/after verification output, not just "done."

## 1. Canonical URL consistency (the most common silent bug)

Find every place the canonical/base URL is defined and confirm they all agree on ONE
host (bare domain vs `www`, trailing slash or not):

- `grep -rn "canonicalUrl\|rel=\"canonical\"" pages/ components/` — the hardcoded or
  prop-driven canonical tags on each page
- The sitemap generator (commonly `scripts/generate-sitemap.js` or similar) — what env
  var or constant does it build URLs from?
- `NEXT_PUBLIC_SITE_URL` (or equivalent) — read its ACTUAL value from the deploy
  platform's dashboard/API, not from `.env.example` or docs, which may be stale

If the sitemap and canonical tags disagree, fix the sitemap's base URL to match the
canonical tags (not the reverse) — canonical tags in-page are usually the intentional,
hardcoded source of truth. This exact mismatch (sitemap listing `www`, canonical tags
saying apex) is what caused a real Search Console "Page with redirect" indexing issue
on a prior project — treat it as a known failure pattern, actively check for it.

## 2. www/apex consolidation — use a Cloudflare Redirect Rule, NOT `_redirects`

If both `example.com` and `www.example.com` are attached as custom domains on the same
Cloudflare Pages project, a `public/_redirects` file **cannot** redirect one to the
other — Cloudflare Pages' `_redirects` is strictly path-based and has no hostname
matching. A rule like `https://www.example.com/* https://example.com/:splat 301!`
in that file will deploy without error and silently never fire. Don't write one.

Instead, set it up at the zone level:
**Cloudflare dashboard → zone → Rules → Redirect Rules → Create rule → use the
"Redirect from WWW to root" template** (there is also a "root to WWW" template that
looks nearly identical and does the opposite — read the Request URL / Target URL
fields before deploying to confirm direction). Check **"Preserve query string"**
(unchecked by default). If Cloudflare warns "DNS configuration may not be proxying
traffic for www," check the actual DNS record first (orange cloud = proxied) before
trusting the warning — Pages custom-domain records are proxied by default and this
can be a false positive; verify, don't guess.

After deploying, verify directly:

```
curl -I https://www.<domain>/some/path?x=1
```

Confirm: 301/308, `Location` header is the apex with path AND query string preserved.

## 3. Build command correctness

If `package.json` has a `prebuild` script (sitemap generation, etc.), confirm the
platform's configured build command is `npm run build` — **not** `next build` or
`npx next build` directly, which silently skips `prebuild`. Check Settings →
Builds & deployments → Build command. Verify by checking the deployed sitemap's
`lastmod` dates / URL count match what a local `npm run build` produces.

## 4. Environment variables — don't trust existing docs

```
grep -rn "process.env.NEXT_PUBLIC" --include="*.js" --include="*.jsx" .
```

This is the real list — cross-check against what's actually set in the platform
dashboard (Production environment). Existing README/CLAUDE.md docs are commonly
stale/incomplete here. After any env var change, trigger a **fresh deployment** —
platforms do not retroactively patch env vars into an already-built deployment.

To verify a value actually made it into the build: Next.js inlines
`NEXT_PUBLIC_*` vars into the **compiled JS bundles**, not necessarily the raw
server-rendered HTML. Don't grep the HTML response and conclude it's missing —
parse the `<script src="...">` tags from the actual HTML, fetch each one, and
grep those. If the project uses Turbopack (Next.js 16+ default), chunk filenames
are content-hashed, not route-named (`pages/_app-*.js` patterns no longer exist)
— don't hardcode a filename pattern, discover the real `<script>` tags first.

## 5. HTTPS enforcement

Confirm `http://` requests to both the apex and any subdomain redirect to `https://`.
Usually automatic on a proxied Cloudflare zone, but verify, don't assume.

## 6. Safe-deployment discipline for any risky change

Never test directly against the production custom domain. For DNS/hosting
reconfiguration, dependency major-version bumps, or anything that could break
the live site: build in an isolated branch/worktree → deploy to a Cloudflare
Pages **preview** (a throwaway branch name, or direct-upload via `wrangler pages
deploy`) → run a full route-by-route status-code and content comparison against
current production → only then apply to the real branch/production.

For `npm audit` findings on `next` itself: `fixAvailable` only reports the best
same-major-version fix. Read the actual advisory list for what's still unfixed
after that, and assess real exposure based on what the project actually uses —
a static-export, Pages-Router-only site has zero exposure to CVEs about
Middleware, Server Actions, the Image Optimization API, or custom servers, even
if `npm audit` keeps flagging them. Don't chase 100% audit silence without
checking relevance; a full major upgrade (e.g. 14→16) is a separate, deliberately
tested migration, not something to fold into a routine patch.

## 7. Search Console follow-through (if you have access, or hand this to the user)

After fixing sitemap/canonical consistency: resubmit the sitemap, and check the
Page Indexing report specifically for a **"Page with redirect"** issue — the
signature symptom of the bug in step 1. Re-validate it after the fix. This runs
on Google's own timeline (days to ~2 weeks) — don't expect or force immediate
results.

## 8. Update project docs

Whatever you find and fix, update the project's CLAUDE.md/README: actual deploy
target, correct build command, full env var list, and — critically — where the
www-redirect mechanism actually lives (a Cloudflare dashboard Redirect Rule is
invisible in the repo; undocumented, a future session will waste time looking
for a `_redirects` file that was deliberately removed).

## Report back

For each of the 8 areas: what you found, what you changed (if anything), and the
actual verification output proving it works — not "should be fine now."
