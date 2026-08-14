const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '../blogs/data.js'), 'utf8') + '; globalThis.blogData = blogData;';
eval(code);

const blogSeoMap = {
  'the-silent-threat-of-pipe-corrosion': {
    title: 'Pipe Corrosion in Sprinkler Systems (MIC) | Kavach',
    meta: 'Prevent Microbiologically Influenced Corrosion (MIC) in industrial fire sprinkler pipes. Learn symptoms, NDT testing, and nitrogen inerting AMC solutions.',
    serviceLinks: [
      { text: 'fire sprinkler system installation', url: '../pages/fire-sprinkler-systems.html' },
      { text: 'Annual Maintenance Contract (AMC)', url: '../pages/amc-services.html' }
    ]
  },
  'jockey-pump-unsung-hero': {
    title: 'Jockey Pump Industrial Fire Safety Guide | Kavach',
    meta: 'Understand the critical role of jockey pumps in maintaining fire hydrant pressure and preventing catastrophic short-cycling damage to main fire pumps.',
    serviceLinks: [
      { text: 'industrial fire hydrant networks', url: '../pages/fire-hydrant-systems.html' },
      { text: 'preventive fire pump AMC', url: '../pages/amc-services.html' }
    ]
  },
  'reactive-vs-proactive-maintenance': {
    title: 'Proactive Fire System Maintenance & AMC | Kavach',
    meta: 'Compare reactive repairs vs. proactive fire protection AMCs. Cut emergency downtime, ensure 100% NBC compliance, and protect factory assets.',
    serviceLinks: [
      { text: 'industrial fire protection AMC', url: '../pages/amc-services.html' },
      { text: 'third-party fire safety audit', url: '../pages/fire-safety-audit.html' }
    ]
  },
  'navigating-fire-safety-audits': {
    title: 'Industrial Fire Safety Audit Checklist | Kavach',
    meta: 'Prepare for third-party industrial fire audits under IS 14489, Factories Act, and NBC 2016 Part 4. Download compliance checklists and audit roadmaps.',
    serviceLinks: [
      { text: 'certified fire safety audits', url: '../pages/fire-safety-audit.html' },
      { text: 'statutory Fire NOC liaison', url: '../pages/fire-noc-assistance.html' }
    ]
  },
  'yard-hydrant-winterization-and-maintenance': {
    title: 'Yard Hydrant Maintenance & Inspection | Kavach',
    meta: 'Complete guide to industrial yard hydrant maintenance, landing valve inspections, and ring main flushing to ensure peak pressure readiness under IS 3844.',
    serviceLinks: [
      { text: 'yard hydrant and pump room engineering', url: '../pages/fire-hydrant-systems.html' },
      { text: 'scheduled maintenance contracts', url: '../pages/amc-services.html' }
    ]
  },
  'facp-alarm-fatigue': {
    title: 'Managing FACP Alarm Fatigue in Plants | Kavach',
    meta: 'Eliminate false alarms and prevent operator alarm fatigue in industrial fire alarm control panels with addressable smoke detectors and VESDA systems.',
    serviceLinks: [
      { text: 'addressable fire alarm systems', url: '../pages/fire-alarm-systems.html' },
      { text: 'book an on-site system inspection', url: '../pages/request-inspection.html' }
    ]
  },
  'clean-agent-system-maintenance': {
    title: 'Clean Agent Gas Suppression Maintenance | Kavach',
    meta: 'Maintain Novec 1230 and FM-200 clean agent gas suppression systems in server rooms and electrical panels. Room integrity testing and enclosure audits.',
    serviceLinks: [
      { text: 'clean agent gas suppression systems', url: '../pages/fire-extinguisher-services.html' },
      { text: 'comprehensive fire system AMC', url: '../pages/amc-services.html' }
    ]
  },
  'water-storage-tank-inspections': {
    title: 'Fire Water Storage Tank Inspection Guide | Kavach',
    meta: 'Guidelines for inspecting dedicated industrial fire water tanks, suction sumps, and vortex plates to guarantee uninterrupted water flow to fire pumps.',
    serviceLinks: [
      { text: 'fire hydrant and sprinkler systems', url: '../pages/fire-hydrant-systems.html' },
      { text: 'schedule a facility audit', url: '../pages/request-inspection.html' }
    ]
  },
  'human-element-in-fire-safety': {
    title: 'Workplace Fire Safety Training & Drills | Kavach',
    meta: 'Equip plant personnel with certified fire safety training, emergency evacuation drills, and ERT workshops compliant with the Factories Act 1948.',
    serviceLinks: [
      { text: 'certified workplace fire safety training', url: '../pages/industrial-safety-training.html' },
      { text: 'consult our safety team', url: '../pages/contact.html' }
    ]
  },
  'modernizing-aging-fire-systems': {
    title: 'Modernizing Aging Industrial Fire Systems | Kavach',
    meta: 'Step-by-step roadmap for retrofitting obsolete fire alarm panels, leaky hydrant ring mains, and legacy sprinkler valves without disrupting plant production.',
    serviceLinks: [
      { text: 'turnkey fire engineering services', url: '../pages/services.html' },
      { text: 'request a facility survey', url: '../pages/request-inspection.html' }
    ]
  }
};

console.log('Generating', blogData.length, 'static blog files with optimized SEO titles & internal links...');

for (const blog of blogData) {
  const seoConfig = blogSeoMap[blog.id] || {};
  const seoTitle = seoConfig.title || `${blog.title.substring(0, 45)} | Kavach`;
  const seoMeta = seoConfig.meta || blog.excerpt.replace(/"/g, '&quot;').substring(0, 155);
  
  // Format published date
  let isoDate = '2024-01-01';
  try {
    const d = new Date(blog.date + ' 2024');
    if (!isNaN(d.getTime())) {
      isoDate = d.toISOString().split('T')[0];
    }
  } catch(e){}

  // Inject contextual internal link callout box at end of blog content
  const linksHtml = (seoConfig.serviceLinks || []).map(l => `<li><i class="fa-solid fa-arrow-right" style="color:var(--red); margin-right:8px;"></i>Explore our <a href="${l.url}" style="color:var(--navy); font-weight:700; text-decoration:underline;">${l.text}</a></li>`).join('');

  const enhancedContent = blog.content + `
    <div style="background: rgba(2,33,71,0.04); border-left: 4px solid var(--red); padding: 24px 28px; border-radius: 4px; margin: 40px 0 20px;">
      <h4 style="font-family:var(--font-display); font-size:20px; color:var(--navy); margin-bottom:12px; text-transform:uppercase;">Related Engineering Services & Solutions</h4>
      <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; font-size:16px;">
        ${linksHtml}
        <li><i class="fa-solid fa-clipboard-check" style="color:var(--red); margin-right:8px;"></i>Need a site survey? <a href="../pages/request-inspection.html" style="color:var(--red); font-weight:700; text-decoration:underline;">Book an On-Site Industrial Fire Inspection</a></li>
      </ul>
    </div>
  `;

  const html = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${seoTitle}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&amp;family=Barlow:wght@300;400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/styles.css">
<style>
  .blog-hero {
    background: var(--navy);
    padding: 140px 48px 60px;
    color: var(--white);
    text-align: center;
  }
  .blog-meta {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .blog-meta span {
    color: var(--red);
    font-weight: 700;
  }
  .blog-title {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 800;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.2;
  }
  .blog-content-wrapper {
    max-width: 800px;
    margin: 60px auto;
    padding: 0 24px;
    font-size: 18px;
    line-height: 1.8;
    color: var(--charcoal);
  }
  .blog-content-wrapper h2 {
    font-family: var(--font-display);
    font-size: 32px;
    color: var(--navy);
    margin: 40px 0 24px;
  }
  .blog-content-wrapper p {
    margin-bottom: 24px;
  }
  .blog-content-wrapper ul {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  .blog-content-wrapper li {
    margin-bottom: 12px;
  }
  .blog-author {
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .author-img {
    width: 64px;
    height: 64px;
    background: var(--red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 24px;
    font-weight: 700;
  }
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="canonical" href="https://kavach-industrials.vercel.app/blogs/${blog.id}.html">
<link rel="preload" href="../css/styles.css" as="style">
<meta name="theme-color" content="#f42223">
<meta name="description" content="${seoMeta}">
<meta property="og:url" content="https://kavach-industrials.vercel.app/blogs/${blog.id}.html">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Kavach Fire Safety Industrial Services">
<meta name="application-name" content="Kavach Fire Safety Industrial Services">
<meta name="apple-mobile-web-app-title" content="Kavach Fire Safety">
<meta property="og:title" content="${seoTitle}">
<meta property="og:description" content="${seoMeta}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${seoTitle}">
<meta name="twitter:description" content="${seoMeta}">
<meta property="og:image" content="https://kavach-industrials.vercel.app/assets/images/blog.webp">
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
      "name": "Blog",
      "item": "https://kavach-industrials.vercel.app/blogs/index.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": ${JSON.stringify(blog.title)},
      "item": "https://kavach-industrials.vercel.app/blogs/${blog.id}.html"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://kavach-industrials.vercel.app/blogs/${blog.id}.html"
  },
  "headline": ${JSON.stringify(blog.title)},
  "description": ${JSON.stringify(seoMeta)},
  "image": "https://kavach-industrials.vercel.app/assets/images/blog.webp",
  "inLanguage": "en-IN",
  "author": {
    "@type": "Organization",
    "name": ${JSON.stringify(blog.author)},
    "url": "https://kavach-industrials.vercel.app"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Kavach Fire Safety Industrial Services",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kavach-industrials.vercel.app/assets/images/logo.png"
    }
  },
  "datePublished": "${isoDate}",
  "dateModified": "2026-06-02"
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
    <a href="../pages/about.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">About Us</a>
    <a href="../pages/services.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Services</a>
    <a href="../pages/projects.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Projects</a>
    <a href="index.html" style="color:#f42223; margin:0 12px; text-decoration:none; font-weight:600;">Blog</a>
    <a href="../pages/contact.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Contact Us</a>
    <a href="../pages/request-inspection.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Get a Quote</a>
  </nav>
</noscript>

<kavach-header base="../"></kavach-header>

<div id="blog-header" class="blog-hero">
  <div class="blog-meta">Category: <span id="meta-category">${blog.category}</span> &nbsp;|&nbsp; Published: <span id="meta-date">${blog.date}</span></div>
  <h1 id="post-title" class="blog-title">${blog.title}</h1>
</div>

<article id="blog-article" class="blog-content-wrapper reveal visible">
  <div id="post-content">${enhancedContent}</div>

  <div class="blog-author">
    <div class="author-img"><i class="fa-solid fa-user-shield"></i></div>
    <div>
      <h4 id="author-name" style="color:var(--navy); font-family:var(--font-display); font-size:20px; margin-bottom:4px;">${blog.author}</h4>
      <p id="author-role" style="font-size:14px; margin:0; color:var(--charcoal);">${blog.role}</p>
    </div>
  </div>
</article>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>

</body></html>`;

  fs.writeFileSync(path.join(__dirname, `../blogs/${blog.id}.html`), html, 'utf8');
  console.log(`Generated blogs/${blog.id}.html`);
}

console.log('All static blog post pages generated successfully.');
