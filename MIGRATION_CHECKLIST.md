# Kavach Domain Migration Checklist & URL Map

## Overview
This document serves as the master checklist for migrating `kavach-industrials.vercel.app` to the permanent custom production domain (e.g. `kavachfire.in` or `kavachindustrials.com`).

---

## 1. Domain & DNS Configuration (Human Action Required)
- [ ] **Purchase & Configure Production Domain:** Register the chosen domain with registrar and point DNS records (A / CNAME) to Vercel.
- [ ] **Vercel Custom Domain Assignment:** Add domain under Vercel Project Settings > Domains.
- [ ] **SSL/TLS Certificate:** Verify automatic Let's Encrypt / Vercel SSL certificate provisioning.
- [ ] **Set Primary Domain:** Enforce automatic canonical redirect from `www` to non-`www` (or vice versa).

---

## 2. Google Search Console & Verification (Human Action Required)
- [ ] **Update Google Site Verification:** If changing Google accounts or using DNS verification, update the verification meta tag (`google-site-verification`) or upload the HTML verification file at root.
  - Current verification token: `T_H5RPV1DsTjod8HdQs7iJELtpm79u1HhkSLyjuwbrE`
  - Current verification file: `google26abebda847161d0.html`
- [ ] **Add New Domain Property in GSC:** Add Domain Property in Google Search Console for the new domain.
- [ ] **Submit Sitemap:** Resubmit `https://{NEW_DOMAIN}/sitemap.xml` in Search Console.
- [ ] **Use Change of Address Tool:** Use GSC Change of Address tool to notify Google of the migration from `kavach-industrials.vercel.app`.

---

## 3. Codebase Find-and-Replace (Code/Automated Step)
The following files contain hardcoded instances of `https://kavach-industrials.vercel.app` and must be updated in a single pass upon domain switch:
1. `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD @id, url)
2. `robots.txt` (Sitemap URL)
3. `sitemap.xml` (all `<loc>` entries)
4. `js/components.js`
5. `pages/*.html` (all service, about, contact, projects, compliance, careers pages)
6. `pages/fire-hydrant-systems/*.html` (sub-cluster pages)
7. `pages/fire-alarm-systems/*.html` (sub-cluster pages)
8. `pages/fire-sprinkler-systems/*.html` (sub-cluster pages)
9. `pages/fire-safety-audit/*.html` (sub-cluster pages)
10. `pages/amc-services/*.html` (sub-cluster pages)
11. `blogs/*.html` (all technical blog posts and blog index)
12. `locations/*.html` (all location pages and location index hub)

---

## 4. 301 Redirects Configuration (Vercel / Server Level)
Configure HTTP 301 Permanent Redirects from every existing `.vercel.app` URL to the new domain equivalent in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "kavach-industrials.vercel.app"
        }
      ],
      "destination": "https://[NEW_DOMAIN]/$1",
      "permanent": true
    }
  ]
}
```

### Complete URL Inventory for 301 Mapping
#### Core & Corporate Pages
- `https://kavach-industrials.vercel.app/`
- `https://kavach-industrials.vercel.app/pages/about.html`
- `https://kavach-industrials.vercel.app/pages/services.html`
- `https://kavach-industrials.vercel.app/pages/projects.html`
- `https://kavach-industrials.vercel.app/pages/case-studies.html`
- `https://kavach-industrials.vercel.app/pages/certifications-compliance.html`
- `https://kavach-industrials.vercel.app/pages/careers.html`
- `https://kavach-industrials.vercel.app/pages/contact.html`
- `https://kavach-industrials.vercel.app/pages/request-inspection.html`
- `https://kavach-industrials.vercel.app/pages/industries-served.html`
- `https://kavach-industrials.vercel.app/pages/fire-noc-assistance.html`
- `https://kavach-industrials.vercel.app/pages/industrial-safety-training.html`

#### 6 Core Service Pages
- `https://kavach-industrials.vercel.app/pages/fire-hydrant-systems.html`
- `https://kavach-industrials.vercel.app/pages/fire-alarm-systems.html`
- `https://kavach-industrials.vercel.app/pages/fire-sprinkler-systems.html`
- `https://kavach-industrials.vercel.app/pages/fire-extinguisher-services.html`
- `https://kavach-industrials.vercel.app/pages/fire-safety-audit.html`
- `https://kavach-industrials.vercel.app/pages/amc-services.html`

#### 9 Sub-Cluster Pages
- `https://kavach-industrials.vercel.app/pages/fire-hydrant-systems/pump-room-design-nbc-2016.html`
- `https://kavach-industrials.vercel.app/pages/fire-hydrant-systems/external-ring-main-is-13039.html`
- `https://kavach-industrials.vercel.app/pages/fire-alarm-systems/vesda-aspiration-detection.html`
- `https://kavach-industrials.vercel.app/pages/fire-alarm-systems/addressable-vs-conventional-panels.html`
- `https://kavach-industrials.vercel.app/pages/fire-sprinkler-systems/esfr-warehouse-sprinklers.html`
- `https://kavach-industrials.vercel.app/pages/fire-sprinkler-systems/pre-action-systems-data-centers.html`
- `https://kavach-industrials.vercel.app/pages/fire-safety-audit/factory-act-compliance-audit.html`
- `https://kavach-industrials.vercel.app/pages/fire-safety-audit/fire-noc-maharashtra-process.html`
- `https://kavach-industrials.vercel.app/pages/amc-services/quarterly-testing-checklist.html`

#### Blog Index & 10 Technical Blog Articles
- `https://kavach-industrials.vercel.app/blogs/index.html`
- `https://kavach-industrials.vercel.app/blogs/fire-safety-audit-frequency-maharashtra.html`
- `https://kavach-industrials.vercel.app/blogs/nbc-2016-part-4-explained.html`
- `https://kavach-industrials.vercel.app/blogs/wet-riser-vs-down-comer.html`
- `https://kavach-industrials.vercel.app/blogs/addressable-vs-conventional-alarm-panels.html`
- `https://kavach-industrials.vercel.app/blogs/esfr-sprinklers-warehouses.html`
- `https://kavach-industrials.vercel.app/blogs/fire-noc-midc-maharashtra.html`
- `https://kavach-industrials.vercel.app/blogs/amc-vs-one-time-installation.html`
- `https://kavach-industrials.vercel.app/blogs/novec-1230-vs-fm-200.html`
- `https://kavach-industrials.vercel.app/blogs/is-15683-fire-extinguisher-verification.html`
- `https://kavach-industrials.vercel.app/blogs/pre-action-vs-deluge-systems.html`

#### Location Hub & 5 Regional Pages
- `https://kavach-industrials.vercel.app/locations/index.html`
- `https://kavach-industrials.vercel.app/locations/pune.html`
- `https://kavach-industrials.vercel.app/locations/chakan-midc.html`
- `https://kavach-industrials.vercel.app/locations/ranjangaon-midc.html`
- `https://kavach-industrials.vercel.app/locations/talegaon-midc.html`
- `https://kavach-industrials.vercel.app/locations/pimpri-chinchwad.html`

---

## 5. Post-Migration Verification Checklist (Human Action Required)
- [ ] Verify 301 redirects return status `301 Moved Permanently`.
- [ ] Verify canonical tags on all new domain URLs match `https://{NEW_DOMAIN}/...`.
- [ ] Verify Open Graph and Twitter Card image URLs resolve without 404s.
- [ ] Verify SSL certificate shows A+ rating on Qualys SSL Labs.
- [ ] Inspect Google Analytics / Google Tag Manager to ensure tracking continues on the new host.
