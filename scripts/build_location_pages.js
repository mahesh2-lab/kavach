const fs = require('fs');
const path = require('path');

const locations = [
  {
    slug: 'fire-safety-chakan-midc',
    name: 'Chakan MIDC',
    region: 'Pune Industrial Corridor',
    title: 'Industrial Fire Protection & Safety Chakan MIDC | Kavach',
    meta: 'Turnkey fire protection engineering, hydrant systems, sprinkler installation, and 2-hour emergency AMC response for automotive and manufacturing plants in Chakan MIDC.',
    h1: 'Industrial Fire Protection & Safety Services in Chakan MIDC',
    sectors: 'Automotive OEMs, Tier-1 Auto Ancillaries, Heavy Engineering, Heavy Fabrication, 3PL Logistics Parks',
    sla: 'Guaranteed 2-Hour Breakdown Response across Chakan MIDC Phases 1, 2, 3 & 4',
    description: 'Chakan MIDC is Maharashtra’s premier automotive and heavy manufacturing hub. Kavach Fire Safety provides specialized, turnkey industrial fire protection engineering, NFPA 13 sprinkler systems, high-pressure hydrant pump houses, and statutory Form B / Fire NOC liaison for industrial plants across Chakan Phase 1, Phase 2, Phase 3, and Phase 4.'
  },
  {
    slug: 'fire-safety-bhosari-midc',
    name: 'Bhosari MIDC',
    region: 'Pimpri-Chinchwad Industrial Belt',
    title: 'Industrial Fire Systems & AMC Bhosari MIDC | Kavach',
    meta: 'Expert industrial fire fighting systems, safety audits (IS 14489), and 24/7 AMC services for fabrication, tooling, and industrial units in Bhosari MIDC & PCMC.',
    h1: 'Industrial Fire Fighting Systems & AMC in Bhosari MIDC',
    sectors: 'Precision Tooling, Machine Tools, Sheet Metal Fabrication, Chemical Ancillaries, Electronics Assembly',
    sla: 'Guaranteed 2-Hour Emergency AMC Response across Bhosari Industrial Area & PCMC',
    description: 'Serving the dense manufacturing ecosystem of Bhosari MIDC and Pimpri-Chinchwad, Kavach Fire Safety delivers complete fire safety retrofits, addressable alarm detection, pump room overhauls, and bi-annual Form B compliance certifications adhering strictly to Maharashtra Fire Services and NBC 2016 Part 4.'
  },
  {
    slug: 'fire-safety-ranjangaon-midc',
    name: 'Ranjangaon MIDC',
    region: 'Shirur Industrial Corridor',
    title: 'Fire Protection Engineering Ranjangaon MIDC | Kavach',
    meta: 'Certified turnkey industrial fire protection, clean agent suppression, and pump house maintenance for electronics, FMCG, and automotive plants in Ranjangaon MIDC.',
    h1: 'Industrial Fire Protection Engineering in Ranjangaon MIDC',
    sectors: 'Consumer Electronics, Home Appliances, FMCG Manufacturing, Global Tier-1 Automotive, Large-Scale Warehouses',
    sla: 'Immediate Proximity Dispatch: Under 45-Minute Emergency Response in Ranjangaon MIDC',
    description: 'Located in direct proximity to Ranjangaon MIDC (Taluka: Shirur), Kavach Fire Safety is the region’s premier rapid-response industrial fire contractor. We engineer custom clean agent gas suppression (Novec 1230 / FM-200), high-density sprinkler arrays, and annual maintenance contracts for world-class manufacturing plants.'
  },
  {
    slug: 'fire-safety-talegaon-midc',
    name: 'Talegaon MIDC',
    region: 'Pune-Mumbai Industrial Expressway Corridor',
    title: 'Industrial Fire Safety & Sprinklers Talegaon MIDC | Kavach',
    meta: 'ESFR sprinkler systems, warehouse fire protection, third-party safety audits, and Fire NOC liaison for logistics parks and manufacturing plants in Talegaon MIDC.',
    h1: 'Industrial Fire Safety & ESFR Sprinkler Systems in Talegaon MIDC',
    sectors: 'Mega Logistics Parks, E-Commerce Fulfillment Centers, Industrial Warehousing, Engineering & Pharma Plants',
    sla: 'Guaranteed 2-Hour On-Site Emergency AMC Dispatch across Talegaon Industrial Belts',
    description: 'Talegaon MIDC’s rapid emergence as Maharashtra’s logistics and engineering epicenter requires specialized, high-capacity fire suppression. Kavach engineers turnkey ESFR ceiling sprinkler systems, yard hydrants, and complete statutory Fire NOC compliance for massive industrial footprints.'
  }
];

const pagesDir = path.join(__dirname, '../pages');

for (const loc of locations) {
  const html = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${loc.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&amp;family=Barlow:wght@300;400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/styles.css">
<style>
  .page-header {
    background: var(--navy);
    padding: 140px 48px 60px;
    text-align: center;
    color: var(--white);
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 44px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    line-height: 1.2;
  }
  .breadcrumb {
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .breadcrumb a {
    color: var(--red);
    text-decoration: none;
    font-weight: 600;
  }
  .sla-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(244,34,35,0.1);
    border: 1px solid var(--red);
    color: var(--red);
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 24px;
  }
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="canonical" href="https://kavach-industrials.vercel.app/pages/${loc.slug}.html">
<link rel="preload" href="../css/styles.css" as="style">
<meta name="theme-color" content="#f42223">
<meta name="description" content="${loc.meta}">
<meta property="og:url" content="https://kavach-industrials.vercel.app/pages/${loc.slug}.html">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kavach Fire Safety Industrial Services">
<meta name="application-name" content="Kavach Fire Safety Industrial Services">
<meta name="apple-mobile-web-app-title" content="Kavach Fire Safety">
<meta property="og:title" content="${loc.title}">
<meta property="og:description" content="${loc.meta}">
<meta property="og:image" content="https://kavach-industrials.vercel.app/assets/images/about-us.webp">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${loc.title}">
<meta name="twitter:description" content="${loc.meta}">
<meta name="twitter:image" content="https://kavach-industrials.vercel.app/assets/images/about-us.webp">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://kavach-industrials.vercel.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Locations",
      "item": "https://kavach-industrials.vercel.app/pages/industries-served.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": ${JSON.stringify(loc.name)},
      "item": "https://kavach-industrials.vercel.app/pages/${loc.slug}.html"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://kavach-industrials.vercel.app/pages/${loc.slug}.html#service",
  "name": ${JSON.stringify('Industrial Fire Protection Services in ' + loc.name)},
  "serviceType": "Turnkey Fire Engineering & AMC Services",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://kavach-industrials.vercel.app/#localbusiness",
    "name": "Kavach Fire Safety Industrial Services",
    "telephone": "+91 8888251522",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jategaon Bk, Taluka: Shirur",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "412208",
      "addressCountry": "IN"
    }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": ${JSON.stringify(loc.name + ', Maharashtra')}
  },
  "url": "https://kavach-industrials.vercel.app/pages/${loc.slug}.html",
  "description": ${JSON.stringify(loc.description)}
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": ${JSON.stringify('What is your emergency breakdown response time in ' + loc.name + '?')},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ${JSON.stringify(loc.sla + '. Our dedicated emergency response technicians carry mobile diagnostic kits and critical spare parts to restore system pressure immediately.')}
      }
    },
    {
      "@type": "Question",
      "name": ${JSON.stringify('Do you handle statutory Fire NOC approvals and Form B certification for plants in ' + loc.name + '?')},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Kavach manages end-to-end statutory liaison with Maharashtra Fire Services, MIDC Fire Department, and PMRDA, including third-party IS 14489 audits and bi-annual Form B certification."
      }
    },
    {
      "@type": "Question",
      "name": ${JSON.stringify('What types of industrial fire systems do you engineer in ' + loc.name + '?')},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide turnkey design and installation of heavy-duty hydrant ring mains, ESFR fire sprinklers, clean agent gas suppression (FM-200 / Novec 1230), addressable fire alarms, and fire pump room automation."
      }
    }
  ]
}
</script>
<meta name="author" content="Kavach Fire Safety Industrial Services">
<meta name="publisher" content="Kavach Fire Safety Industrial Services">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="icon" type="image/svg+xml" href="../assets/images/logo.svg">
<link rel="icon" type="image/png" href="../assets/images/logo.png">
<link rel="apple-touch-icon" href="../assets/images/logo.png">
<meta name="google-site-verification" content="T_H5RPV1DsTjod8HdQs7iJELtpm79u1HhkSLyjuwbrE" />
</head>
<body>
<noscript>
  <nav style="background:#0d1b2a; padding:12px 24px; text-align:center;">
    <a href="../index.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Home</a>
    <a href="about.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">About Us</a>
    <a href="services.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Services</a>
    <a href="projects.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Projects</a>
    <a href="../blogs/index.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Blog</a>
    <a href="contact.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Contact Us</a>
    <a href="request-inspection.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Get a Quote</a>
  </nav>
</noscript>

<kavach-header base="../"></kavach-header>

<div class="page-header reveal">
  <div class="sla-badge"><i class="fa-solid fa-bolt"></i> ${loc.sla}</div>
  <h1 class="page-title">${loc.h1}</h1>
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="industries-served.html">Locations</a> / ${loc.name}</div>
</div>

<section class="container" style="padding-top:60px;">
  
  <div style="text-align: center; margin-bottom: 60px;" class="reveal">
    <span class="section-label">${loc.region} Industrial Hub</span>
    <h2 class="section-title">Certified Fire Engineering &amp; <em>AMC</em> in ${loc.name}</h2>
    <p style="font-size:18px; line-height:1.7; color: var(--charcoal); max-width: 920px; margin: 0 auto;">${loc.description}</p>
  </div>

  <div class="company-grid" style="margin-bottom: 60px;">
    <div class="company-left reveal-left">
      <h3 style="font-family:var(--font-display); font-size:26px; color:var(--navy); text-transform:uppercase; margin-bottom:20px;">Dedicated Industrial Solutions for ${loc.name}</h3>
      <p style="font-size:15px; color:var(--charcoal); line-height:1.7; margin-bottom:24px;">Operating within Maharashtra's most rigorous industrial sectors requires zero tolerance for safety downtime. Our team of certified fire protection engineers and hydraulic specialists provides end-to-end turnkey execution conforming to NBC 2016 Part 4, IS Codes, and NFPA standards.</p>
      
      <div style="background: var(--off-white); border-left: 4px solid var(--red); padding: 24px; border-radius: 4px; margin-bottom: 24px;">
        <h4 style="font-size:16px; font-family: var(--font-display); color:var(--navy); text-transform:uppercase; margin-bottom:8px;">Target Sectors Served in ${loc.name}</h4>
        <p style="font-size:14px; color:var(--charcoal); margin:0; line-height:1.6;">${loc.sectors}</p>
      </div>

      <h3 style="font-family:var(--font-display); font-size:22px; color:var(--navy); text-transform:uppercase; margin-bottom:20px; border-bottom: 2px solid var(--red); padding-bottom: 8px;">Core Services Deployed in ${loc.name}</h3>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:16px; padding:0;">
        <li style="display:flex; gap:12px; align-items:flex-start;">
          <i class="fa-solid fa-fire-flame-curved" style="color:var(--red); font-size:20px; margin-top:4px;"></i>
          <div>
            <h4 style="font-size:17px; margin-bottom:4px; font-family:var(--font-display); text-transform:uppercase;"><a href="fire-hydrant-systems.html" style="color:var(--navy); text-decoration:none;">Fire Hydrant Systems &amp; Pump Rooms</a></h4>
            <p style="font-size:14px; color:var(--ash); margin:0;">Heavy-duty ring mains, internal landing valves, and automated pump house engineering (IS 3844).</p>
          </div>
        </li>
        <li style="display:flex; gap:12px; align-items:flex-start;">
          <i class="fa-solid fa-shower" style="color:var(--red); font-size:20px; margin-top:4px;"></i>
          <div>
            <h4 style="font-size:17px; margin-bottom:4px; font-family:var(--font-display); text-transform:uppercase;"><a href="fire-sprinkler-systems.html" style="color:var(--navy); text-decoration:none;">Automatic &amp; ESFR Sprinkler Networks</a></h4>
            <p style="font-size:14px; color:var(--ash); margin:0;">NFPA 13 compliant hydraulic systems for high-bay manufacturing bays and multi-tier logistics racks.</p>
          </div>
        </li>
        <li style="display:flex; gap:12px; align-items:flex-start;">
          <i class="fa-solid fa-file-shield" style="color:var(--red); font-size:20px; margin-top:4px;"></i>
          <div>
            <h4 style="font-size:17px; margin-bottom:4px; font-family:var(--font-display); text-transform:uppercase;"><a href="fire-safety-audit.html" style="color:var(--navy); text-decoration:none;">Third-Party Fire Safety Audits &amp; Form B</a></h4>
            <p style="font-size:14px; color:var(--ash); margin:0;">Certified IS 14489 audits, gap analysis, and statutory bi-annual Form B certification for factory compliance.</p>
          </div>
        </li>
        <li style="display:flex; gap:12px; align-items:flex-start;">
          <i class="fa-solid fa-clock-rotate-left" style="color:var(--red); font-size:20px; margin-top:4px;"></i>
          <div>
            <h4 style="font-size:17px; margin-bottom:4px; font-family:var(--font-display); text-transform:uppercase;"><a href="amc-services.html" style="color:var(--navy); text-decoration:none;">24/7 Comprehensive AMC Contracts</a></h4>
            <p style="font-size:14px; color:var(--ash); margin:0;">Guaranteed emergency breakdown response with dedicated technicians stationed in the industrial corridor.</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="company-right reveal-right">
      <div style="background: var(--off-white); border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 36px; margin-bottom: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <h3 style="font-family:var(--font-display); font-size:22px; color:var(--navy); text-transform:uppercase; margin-bottom:16px; border-bottom: 3px solid var(--red); padding-bottom:10px;"><i class="fa-solid fa-building-circle-check" style="margin-right:8px;"></i> Book a Site Survey in ${loc.name}</h3>
        <p style="font-size:14px; color:var(--charcoal); margin-bottom:20px; line-height: 1.6;">Our senior fire engineering consultants provide comprehensive on-site inspections for manufacturing units, warehouses, and industrial plants across ${loc.name}.</p>
        <ul style="font-size:14px; color:var(--charcoal); line-height:1.6; padding-left:20px; margin-bottom: 24px;">
          <li>Hydraulic calculation &amp; water pressure assessment</li>
          <li>NBC 2016 Part 4 statutory gap analysis</li>
          <li>Fire pump room readiness inspection</li>
          <li>Fire NOC documentation &amp; renewal audit</li>
        </ul>
        <a href="request-inspection.html" class="btn-primary" style="width:100%; text-align:center; padding:14px; font-size:16px; display:block;">Schedule ${loc.name} Site Inspection</a>
      </div>

      <div style="background: var(--navy); color: var(--white); padding: 32px; border-radius: 8px; text-align:center;">
        <h4 style="font-family:var(--font-display); font-size:20px; text-transform:uppercase; margin-bottom:12px; color:var(--white);">Direct Regional Hotline</h4>
        <p style="font-size:14px; color:rgba(255,255,255,0.8); margin-bottom:16px;">Speak directly with our senior industrial fire engineering project manager.</p>
        <p style="font-size:22px; font-family:var(--font-display); font-weight:700; color:var(--red); margin-bottom:16px;"><i class="fa-solid fa-phone" style="margin-right:8px;"></i>+91 8888251522</p>
        <a href="tel:+918888251522" class="btn-primary" style="background:var(--white); color:var(--navy); font-size:14px; padding:12px 24px;">Call Engineering Desk</a>
      </div>
    </div>
  </div>

  <div style="margin-top: 60px; background: linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(244,34,35,0.95) 100%); padding: 50px 40px; border-radius: 8px; text-align:center; color: var(--white);" class="reveal">
    <h3 style="font-family:var(--font-display); font-size:30px; text-transform:uppercase; margin-bottom:16px; letter-spacing: 1px;">Protect Your ${loc.name} Plant with Kavach</h3>
    <p style="max-width: 700px; margin: 0 auto 28px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.85);">Ensure complete fire safety compliance, uninterrupted factory operations, and rapid 24/7 emergency support. Contact our engineering team today for an obligation-free consultation.</p>
    <a href="contact.html" class="btn-primary" style="background: var(--white); color: var(--navy); font-size: 17px; padding: 14px 36px;">Contact Our Engineering Team</a>
  </div>

</section>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>
</body></html>`;

  fs.writeFileSync(path.join(pagesDir, `${loc.slug}.html`), html, 'utf8');
  console.log(`Created location landing page: pages/${loc.slug}.html`);
}

console.log('All MIDC location pages built successfully.');
