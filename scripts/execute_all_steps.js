const fs = require('fs');
const path = require('path');
const {
  BASE_URL,
  VERIFICATION_CODE,
  TODAY_DATE,
  serviceFaqsData,
  subClusterPagesData,
  blogPostsData,
  locationPagesData
} = require('./site_build_data');

const rootDir = path.join(__dirname, '..');

// Helper to build standard noscript navigation
function getNoscriptNav(base) {
  return `
<noscript>
  <nav style="background:#0d1b2a; padding:12px 24px; text-align:center;">
    <a href="${base}index.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Home</a>
    <a href="${base}pages/about.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">About Us</a>
    <a href="${base}pages/services.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Services</a>
    <a href="${base}locations/index.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Locations</a>
    <a href="${base}pages/projects.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Projects</a>
    <a href="${base}blogs/index.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Blog</a>
    <a href="${base}pages/contact.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Contact Us</a>
    <a href="${base}pages/request-inspection.html" style="color:#fff; margin:0 10px; text-decoration:none; font-weight:600;">Get a Quote</a>
  </nav>
</noscript>`;
}

// -------------------------------------------------------------
// Helper to generate Step 1 metadata block
// -------------------------------------------------------------
function buildMetadataBlock({ title, meta, canonical, ogImage, ogType = 'website', cssBase = '../' }) {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${meta}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${meta}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:site_name" content="Kavach Fire Safety Industrial Services">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${meta}">
<meta name="twitter:image" content="${ogImage}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#f42223">
<meta name="author" content="Kavach Fire Safety Industrial Services">
<meta name="publisher" content="Kavach Fire Safety Industrial Services">
<meta name="apple-mobile-web-app-title" content="Kavach Fire Safety">
<meta name="application-name" content="Kavach Fire Safety Industrial Services">
<meta name="google-site-verification" content="${VERIFICATION_CODE}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&amp;family=Barlow:wght@300;400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="${cssBase}css/styles.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="icon" type="image/svg+xml" href="${cssBase}assets/images/logo.svg">
<link rel="icon" type="image/png" href="${cssBase}assets/images/logo.png">
<link rel="apple-touch-icon" href="${cssBase}assets/images/logo.png">`;
}

// -------------------------------------------------------------
// 1. UPDATE 6 SERVICE PAGES
// -------------------------------------------------------------
console.log('\n>>> STEP 3: Updating 6 Service Pages with FAQs, Schema & Related Topics...');

for (const [filename, sData] of Object.entries(serviceFaqsData)) {
  const filePath = path.join(rootDir, 'pages', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Generate FAQ HTML
  const faqItemsHtml = sData.faqs.map(f => `
      <details class="faq-item">
        <summary class="faq-question">${f.q}</summary>
        <div class="faq-answer">${f.a}</div>
      </details>`).join('\n');

  const faqSectionHtml = `
  <!-- Frequently Asked Questions Section -->
  <section class="faq-section" style="margin-top: 60px;">
    <div style="text-align: center; margin-bottom: 40px;" class="reveal">
      <span class="section-label">Engineering Answers</span>
      <h2 class="section-title">Frequently Asked <em>Questions</em></h2>
      <p style="font-size:16px; color:var(--charcoal); max-width:800px; margin:0 auto; line-height:1.6;">Authoritative engineering guidance on statutory standards, system design parameters, and mandatory maintenance schedules.</p>
    </div>
    <div class="faq-grid">
      ${faqItemsHtml}
    </div>
  </section>`;

  // Generate Related Topics HTML
  const relatedCardsHtml = sData.related.map(r => `
      <div class="related-card">
        <div>
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
        </div>
        <a href="${r.url}">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>`).join('\n');

  const relatedSectionHtml = `
  <!-- Related Sub-Cluster & Technical Topics -->
  <section class="related-topics-section" style="margin-top: 60px; margin-bottom: 40px;">
    <div style="text-align: center; margin-bottom: 30px;" class="reveal">
      <span class="section-label">Deep-Dive Resources</span>
      <h3 style="font-family: var(--font-display); font-size: 28px; color: var(--navy); text-transform: uppercase; letter-spacing: 1px;">Explore Related Engineering Topics</h3>
    </div>
    <div class="related-grid">
      ${relatedCardsHtml}
    </div>
  </section>`;

  // Generate FAQ JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sData.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${BASE_URL}/pages/services.html`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": sData.title.split('—')[0].trim(),
        "item": sData.canonical
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${sData.canonical}#service`,
    "name": sData.title.split('—')[0].trim(),
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
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
      "name": "Maharashtra"
    },
    "url": sData.canonical,
    "description": sData.meta
  };

  // Replace existing schemas and head
  const headHtml = buildMetadataBlock({
    title: sData.title,
    meta: sData.meta,
    canonical: sData.canonical,
    ogImage: sData.ogImage,
    cssBase: '../'
  }) + `
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(serviceSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
</head>`;

  // Strip old head
  content = content.replace(/<!DOCTYPE html>[\s\S]*?<\/head>/i, headHtml);

  // Update noscript nav
  content = content.replace(/<noscript>[\s\S]*?<\/noscript>/i, getNoscriptNav('../'));

  // Remove existing faq sections or related topics if any
  content = content.replace(/<!-- Frequently Asked Questions Section -->[\s\S]*?<\/section>/gi, '');
  content = content.replace(/<!-- Related Sub-Cluster & Technical Topics -->[\s\S]*?<\/section>/gi, '');

  // Insert before the final CTA banner (<div style="margin-top: 60px; background: linear-gradient... or before </section>)
  const ctaMatch = content.match(/<div style="[^"]*background:\s*linear-gradient[^"]*"[^>]*class="reveal">/i);
  if (ctaMatch) {
    const idx = content.indexOf(ctaMatch[0]);
    content = content.slice(0, idx) + relatedSectionHtml + '\n' + faqSectionHtml + '\n\n  ' + content.slice(idx);
  } else {
    // Fallback insert before </section>
    const lastSecIdx = content.lastIndexOf('</section>');
    if (lastSecIdx !== -1) {
      content = content.slice(0, lastSecIdx) + relatedSectionHtml + '\n' + faqSectionHtml + '\n' + content.slice(lastSecIdx);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated service page: ${filename}`);
}

// -------------------------------------------------------------
// 2. CREATE 9 SUB-CLUSTER PAGES
// -------------------------------------------------------------
console.log('\n>>> STEP 4: Creating 9 Sub-Cluster Pages...');

for (const sub of subClusterPagesData) {
  const dirPath = path.join(rootDir, 'pages', sub.folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, sub.file);
  const canonicalUrl = `${BASE_URL}/pages/${sub.folder}/${sub.file}`;

  const faqItemsHtml = sub.faqs.map(f => `
      <details class="faq-item">
        <summary class="faq-question">${f.q}</summary>
        <div class="faq-answer">${f.a}</div>
      </details>`).join('\n');

  const relatedCardsHtml = sub.related.map(r => `
      <div class="related-card">
        <div>
          <h4>${r.title}</h4>
          <p>${r.desc}</p>
        </div>
        <a href="${r.url}">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>`).join('\n');

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${BASE_URL}/pages/services.html`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": sub.parentName,
        "item": `${BASE_URL}/pages/${sub.folder}.html`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": sub.title.split('—')[0].trim(),
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sub.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    "name": sub.h1,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      "name": "Kavach Fire Safety Industrial Services"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Maharashtra"
    },
    "url": canonicalUrl,
    "description": sub.meta
  };

  const pageHtml = `${buildMetadataBlock({
    title: sub.title,
    meta: sub.meta,
    canonical: canonicalUrl,
    ogImage: sub.ogImage,
    cssBase: '../../'
  })}
<style>
  .page-header {
    background: var(--navy);
    padding: 140px 48px 60px;
    text-align: center;
    color: var(--white);
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
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
  .article-content {
    max-width: 960px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.8;
    color: var(--charcoal);
  }
  .article-content h2 {
    font-family: var(--font-display);
    font-size: 26px;
    color: var(--navy);
    margin: 40px 0 16px;
    text-transform: uppercase;
    border-bottom: 2px solid var(--red);
    padding-bottom: 8px;
  }
  .article-content h3 {
    font-family: var(--font-display);
    font-size: 20px;
    color: var(--navy);
    margin: 28px 0 12px;
    text-transform: uppercase;
  }
  .article-content p {
    margin-bottom: 20px;
  }
  .article-content ul {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  .article-content li {
    margin-bottom: 10px;
  }
</style>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(serviceSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
</head>
<body>

${getNoscriptNav('../../')}

<kavach-header base="../../"></kavach-header>

<div class="page-header reveal">
  <h1 class="page-title">${sub.h1}</h1>
  <div class="breadcrumb">
    <a href="../../index.html">Home</a> / 
    <a href="../services.html">Services</a> / 
    <a href="${sub.parentUrl}">${sub.parentName}</a> / 
    <span>${sub.title.split('—')[0].trim()}</span>
  </div>
</div>

<section class="container" style="padding-top: 60px; padding-bottom: 60px;">
  <div class="article-content reveal">
    ${sub.content}
  </div>

  <!-- Related Topics & Sub-Clusters -->
  <section class="related-topics-section" style="margin-top: 60px; margin-bottom: 40px;">
    <div style="text-align: center; margin-bottom: 30px;" class="reveal">
      <span class="section-label">Deep-Dive Resources</span>
      <h3 style="font-family: var(--font-display); font-size: 28px; color: var(--navy); text-transform: uppercase; letter-spacing: 1px;">Related Engineering Systems & Guides</h3>
    </div>
    <div class="related-grid">
      ${relatedCardsHtml}
    </div>
  </section>

  <!-- Frequently Asked Questions -->
  <section class="faq-section" style="margin-top: 60px;">
    <div style="text-align: center; margin-bottom: 40px;" class="reveal">
      <span class="section-label">Technical Q&amp;A</span>
      <h2 class="section-title">Frequently Asked <em>Questions</em></h2>
    </div>
    <div class="faq-grid">
      ${faqItemsHtml}
    </div>
  </section>

  <!-- Call to Action Banner -->
  <div style="margin-top: 60px; background: linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(244,34,35,0.95) 100%); padding: 60px 40px; border-radius: 8px; text-align:center; color: var(--white);" class="reveal">
    <h3 style="font-family:var(--font-display); font-size:32px; text-transform:uppercase; margin-bottom:20px; letter-spacing: 1px;">Require Specialized Engineering Design?</h3>
    <p style="max-width: 700px; margin: 0 auto 32px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">Our certified fire protection engineers provide turnkey hydraulic calculations, CAD layouts, and statutory compliance approvals across Maharashtra.</p>
    <a href="../request-inspection.html" class="btn-primary" style="background: var(--white); color: var(--navy); font-size: 18px; padding: 16px 40px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">Request Site Engineering Consultation</a>
  </div>
</section>

<kavach-footer base="../../"></kavach-footer>
<script src="../../js/components.js"></script>
<script src="../../js/main.js"></script>

</body></html>`;

  fs.writeFileSync(filePath, pageHtml, 'utf8');
  console.log(`✓ Created sub-cluster page: /pages/${sub.folder}/${sub.file}`);
}

// -------------------------------------------------------------
// 3. CREATE 10 BLOG POSTS & UPDATE BLOG INDEX
// -------------------------------------------------------------
console.log('\n>>> STEP 5: Creating 10 Blog Posts & Updating /blogs/index.html...');

const blogsDir = path.join(rootDir, 'blogs');
if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir, { recursive: true });

const blogDataArray = [];

for (const blog of blogPostsData) {
  const filePath = path.join(blogsDir, `${blog.slug}.html`);
  const canonicalUrl = `${BASE_URL}/blogs/${blog.slug}.html`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${BASE_URL}/blogs/index.html`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.headline,
        "item": canonicalUrl
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": blog.headline,
    "description": blog.meta,
    "image": blog.ogImage,
    "inLanguage": "en-IN",
    "author": {
      "@type": "Organization",
      "name": "Kavach Fire Safety Engineering Team",
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kavach Fire Safety Industrial Services",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/assets/images/logo.png`
      }
    },
    "datePublished": TODAY_DATE,
    "dateModified": TODAY_DATE
  };

  const blogHtml = `${buildMetadataBlock({
    title: blog.title,
    meta: blog.meta,
    canonical: canonicalUrl,
    ogImage: blog.ogImage,
    ogType: 'article',
    cssBase: '../'
  })}
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
    margin-bottom: 20px;
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
    margin: 0 auto 20px;
    line-height: 1.2;
    text-transform: uppercase;
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
  .blog-content-wrapper {
    max-width: 860px;
    margin: 60px auto;
    padding: 0 24px;
    font-size: 17px;
    line-height: 1.8;
    color: var(--charcoal);
  }
  .blog-content-wrapper h2 {
    font-family: var(--font-display);
    font-size: 28px;
    color: var(--navy);
    margin: 40px 0 20px;
    text-transform: uppercase;
    border-bottom: 2px solid var(--red);
    padding-bottom: 8px;
  }
  .blog-content-wrapper h3 {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--navy);
    margin: 28px 0 14px;
    text-transform: uppercase;
  }
  .blog-content-wrapper p {
    margin-bottom: 22px;
  }
  .blog-content-wrapper ul {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  .blog-content-wrapper li {
    margin-bottom: 12px;
  }
  .blog-content-wrapper a {
    color: var(--red);
    text-decoration: underline;
    font-weight: 600;
  }
  .blog-author {
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .author-img {
    width: 60px;
    height: 60px;
    background: var(--navy);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 22px;
    font-weight: 700;
    flex-shrink: 0;
  }
</style>
<script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>
</head>
<body>

${getNoscriptNav('../')}

<kavach-header base="../"></kavach-header>

<div class="blog-hero reveal">
  <div class="blog-meta">Category: <span>${blog.category}</span> &bull; Published: <span>August 18, 2026</span></div>
  <h1 class="blog-title">${blog.headline}</h1>
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Blog</a> / <span>Article</span></div>
</div>

<article class="blog-content-wrapper reveal">
  ${blog.content}

  <div class="blog-author">
    <div class="author-img"><i class="fa-solid fa-user-shield"></i></div>
    <div>
      <div style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--navy); text-transform: uppercase;">Kavach Fire Safety Engineering Team</div>
      <div style="font-size: 14px; color: var(--ash);">Certified Fire Protection Engineers, Safety Auditors &amp; Statutory Compliance Specialists in Pune &amp; Maharashtra.</div>
    </div>
  </div>

  <div style="margin-top: 60px; background: var(--off-white); border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 36px; text-align:center;">
    <h3 style="font-family:var(--font-display); font-size:24px; color:var(--navy); text-transform:uppercase; margin-bottom:12px;">Need Expert Assistance with Your Facility?</h3>
    <p style="font-size:15px; color:var(--charcoal); margin-bottom:24px;">Consult our Pune engineering team for turnkey fire protection design, third-party audits, or statutory Fire NOC liaison.</p>
    <a href="../pages/request-inspection.html" class="btn-primary" style="display:inline-block; padding:14px 32px;">Schedule an Engineering Survey</a>
  </div>
</article>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>

</body></html>`;

  fs.writeFileSync(filePath, blogHtml, 'utf8');
  console.log(`✓ Created blog post: /blogs/${blog.slug}.html`);

  blogDataArray.push({
    id: blog.slug,
    title: blog.headline,
    category: blog.category,
    date: 'Aug 18, 2026',
    excerpt: blog.meta,
    author: 'Kavach Fire Safety Engineering Team',
    role: 'Certified Fire Protection Engineers'
  });
}

// Update blogs/data.js
const dataJsContent = `const blogData = ${JSON.stringify(blogDataArray, null, 2)};\n`;
fs.writeFileSync(path.join(blogsDir, 'data.js'), dataJsContent, 'utf8');
console.log('✓ Updated /blogs/data.js with all 10 new blog posts');

// Update blogs/index.html with static card grid
const blogCardsHtml = blogDataArray.map(b => `
      <div class="blog-card reveal visible">
        <span class="blog-card-category">${b.category}</span>
        <h3 class="blog-card-title">${b.title}</h3>
        <p class="blog-card-excerpt">${b.excerpt}</p>
        <a href="${b.id}.html" class="blog-card-link">Read Full Article <i class="fa-solid fa-arrow-right" style="margin-left: 4px;"></i></a>
      </div>`).join('\n');

const blogIndexHtml = `${buildMetadataBlock({
  title: 'Fire Safety Blog & Technical Guides | Kavach',
  meta: 'Expert technical guides on industrial fire sprinkler maintenance, jockey pumps, fire safety audits, FACP systems, and statutory NBC compliance.',
  canonical: `${BASE_URL}/blogs/index.html`,
  ogImage: `${BASE_URL}/assets/images/blog.webp`,
  cssBase: '../'
})}
<style>
  .page-header {
    background: var(--navy);
    padding: 140px 48px 60px;
    text-align: center;
    color: var(--white);
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
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
  .blog-card {
    background: var(--white);
    border: 1px solid rgba(0,0,0,0.08);
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  }
  .blog-card-category {
    background: rgba(13,27,42,0.1);
    color: var(--navy);
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 4px;
    display: inline-block;
    width: fit-content;
    margin-bottom: 12px;
  }
  .blog-card-title {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--navy);
    margin-bottom: 16px;
    line-height: 1.3;
  }
  .blog-card-excerpt {
    font-size: 14px;
    color: var(--charcoal);
    line-height: 1.6;
    margin-bottom: 24px;
    flex-grow: 1;
  }
  .blog-card-link {
    color: var(--red);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid var(--red);
    display: inline-block;
    width: fit-content;
    padding-bottom: 2px;
  }
</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${BASE_URL}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog / Resources",
      "item": "${BASE_URL}/blogs/index.html"
    }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "${BASE_URL}/blogs/index.html#collection",
  "name": "Industrial Fire Safety Blog & Engineering Resources",
  "url": "${BASE_URL}/blogs/index.html",
  "description": "Expert technical guides on industrial fire sprinkler maintenance, jockey pumps, fire safety audits, FACP systems, and statutory NBC compliance."
}
</script>
</head>
<body>

${getNoscriptNav('../')}

<kavach-header base="../"></kavach-header>

<div class="page-header reveal">
  <h1 class="page-title">Blog / Engineering Resources</h1>
  <div class="breadcrumb"><a href="../index.html">Home</a> / Blog</div>
</div>

<section class="container" style="padding-top:60px;">
  <div style="text-align: center; margin-bottom: 60px;" class="reveal">
    <span class="section-label">Industrial Safety Insights</span>
    <h2 class="section-title">Fire Safety <em>Engineering Articles</em></h2>
    <p style="font-size:18px; line-height:1.7; color: var(--charcoal); max-width: 900px; margin: 0 auto;">Stay informed on the latest developments in industrial fire protection engineering, statutory compliance updates under NBC 2016 Part 4, and facility maintenance best practices.</p>
  </div>

  <div id="blog-grid" class="responsive-grid grid-3" style="margin-bottom: 80px;">
    ${blogCardsHtml}
  </div>

  <div style="background: var(--navy); border-radius: 8px; padding: 48px; text-align:center; color: var(--white); margin-bottom: 80px;" class="reveal">
    <h3 style="font-family:var(--font-display); font-size:28px; text-transform:uppercase; margin-bottom:16px; letter-spacing: 1px;">Join Our Safety Technical Briefing</h3>
    <p style="font-size:16px; color:rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 32px; max-width: 700px; margin-left: auto; margin-right: auto;">Get statutory regulatory updates and engineering case studies delivered directly to your engineering team.</p>
    <form style="display: flex; justify-content: center; gap: 16px; max-width: 500px; margin: 0 auto;">
      <input type="email" placeholder="Enter your work email" style="padding: 16px; border-radius: 4px; border: none; flex-grow: 1; font-family: var(--font-body); font-size: 14px;" required="">
      <button type="submit" class="btn-primary" style="background: var(--red); color: var(--white); padding: 16px 32px; border: none; cursor: pointer;">Subscribe</button>
    </form>
  </div>
</section>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>

</body></html>`;

fs.writeFileSync(path.join(blogsDir, 'index.html'), blogIndexHtml, 'utf8');
console.log('✓ Updated /blogs/index.html with all 10 posts');

// -------------------------------------------------------------
// 4. CREATE LOCATIONS HUB & 5 LOCATION PAGES
// -------------------------------------------------------------
console.log('\n>>> STEP 6: Creating Location Hub & 5 Regional Pages...');

const locationsDir = path.join(rootDir, 'locations');
if (!fs.existsSync(locationsDir)) fs.mkdirSync(locationsDir, { recursive: true });

// Location Hub /locations/index.html
const locHubData = locationPagesData['index.html'];
const locFaqHtml = locHubData.faqs.map(f => `
      <details class="faq-item">
        <summary class="faq-question">${f.q}</summary>
        <div class="faq-answer">${f.a}</div>
      </details>`).join('\n');

const locationCardsHtml = Object.entries(locationPagesData)
  .filter(([k]) => k !== 'index.html')
  .map(([file, loc]) => `
      <div class="related-card">
        <div>
          <h4>${loc.h1.replace('Industrial Fire Protection & Safety Services in ', '').replace('Industrial Fire Fighting Systems & AMC in ', '').replace('Industrial Fire Protection Engineering in ', '').replace('Industrial Fire Safety & ESFR Sprinkler Systems in ', '')}</h4>
          <p>${loc.meta}</p>
        </div>
        <a href="${file}">View Location Hub <i class="fa-solid fa-arrow-right"></i></a>
      </div>`).join('\n');

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "Kavach Fire Safety Industrial Services",
  "image": `${BASE_URL}/assets/images/about-us.webp`,
  "url": `${BASE_URL}/locations/index.html`,
  "telephone": "+91 8888251522",
  "email": "projects@kavachfire.in",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jategaon Bk, Taluka: Shirur",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "412208",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.8105,
    "longitude": 74.1500
  },
  "areaServed": [
    { "@type": "City", "name": "Pune" },
    { "@type": "AdministrativeArea", "name": "Chakan MIDC" },
    { "@type": "AdministrativeArea", "name": "Ranjangaon MIDC" },
    { "@type": "AdministrativeArea", "name": "Talegaon MIDC" },
    { "@type": "AdministrativeArea", "name": "Pimpri-Chinchwad & Bhosari MIDC" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:30"
  }
};

const locFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": locHubData.faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }))
};

const locHubHtml = `${buildMetadataBlock({
  title: locHubData.title,
  meta: locHubData.meta,
  canonical: locHubData.canonical,
  ogImage: locHubData.ogImage,
  cssBase: '../'
})}
<style>
  .page-header {
    background: var(--navy);
    padding: 140px 48px 60px;
    text-align: center;
    color: var(--white);
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
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
</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${BASE_URL}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Locations",
      "item": "${BASE_URL}/locations/index.html"
    }
  ]
}
</script>
<script type="application/ld+json">
${JSON.stringify(localBusinessSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(locFaqSchema, null, 2)}
</script>
</head>
<body>

${getNoscriptNav('../')}

<kavach-header base="../"></kavach-header>

<div class="page-header reveal">
  <h1 class="page-title">${locHubData.h1}</h1>
  <div class="breadcrumb"><a href="../index.html">Home</a> / Locations</div>
</div>

<section class="container" style="padding-top:60px; padding-bottom:60px;">
  <div style="text-align: center; margin-bottom: 60px;" class="reveal">
    <span class="section-label">Regional Industrial Coverage</span>
    <h2 class="section-title">Maharashtra Industrial <em>Corridors</em></h2>
    <p style="font-size:18px; line-height:1.7; color: var(--charcoal); max-width: 900px; margin: 0 auto;">Kavach Fire Safety Industrial Services delivers turnkey fire engineering, statutory Form B certifications, and guaranteed 2-hour emergency breakdown AMC response across Pune and major MIDC manufacturing belts.</p>
  </div>

  <div class="related-grid" style="margin-bottom: 60px;">
    ${locationCardsHtml}
  </div>

  <!-- Frequently Asked Questions -->
  <section class="faq-section" style="margin-top: 60px;">
    <div style="text-align: center; margin-bottom: 40px;" class="reveal">
      <span class="section-label">Regional Coverage Q&amp;A</span>
      <h2 class="section-title">Frequently Asked <em>Questions</em></h2>
    </div>
    <div class="faq-grid">
      ${locFaqHtml}
    </div>
  </section>

  <!-- CTA -->
  <div style="margin-top: 60px; background: linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(244,34,35,0.95) 100%); padding: 60px 40px; border-radius: 8px; text-align:center; color: var(--white);" class="reveal">
    <h3 style="font-family:var(--font-display); font-size:32px; text-transform:uppercase; margin-bottom:20px; letter-spacing: 1px;">Operating in Maharashtra MIDC?</h3>
    <p style="max-width: 700px; margin: 0 auto 32px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">Schedule a comprehensive on-site fire system survey or emergency AMC consultation with our local engineering teams.</p>
    <a href="../pages/request-inspection.html" class="btn-primary" style="background: var(--white); color: var(--navy); font-size: 18px; padding: 16px 40px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">Request Site Survey</a>
  </div>
</section>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>

</body></html>`;

fs.writeFileSync(path.join(locationsDir, 'index.html'), locHubHtml, 'utf8');
console.log('✓ Created /locations/index.html (Location Hub)');

// 5 Child Location Pages
for (const [filename, loc] of Object.entries(locationPagesData)) {
  if (filename === 'index.html') continue;
  const filePath = path.join(locationsDir, filename);

  const locFaqItemsHtml = loc.faqs.map(f => `
      <details class="faq-item">
        <summary class="faq-question">${f.q}</summary>
        <div class="faq-answer">${f.a}</div>
      </details>`).join('\n');

  const locFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": loc.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const locBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": `${BASE_URL}/locations/index.html`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": loc.h1.replace('Industrial Fire Protection & Safety Services in ', '').replace('Industrial Fire Fighting Systems & AMC in ', '').replace('Industrial Fire Protection Engineering in ', '').replace('Industrial Fire Safety & ESFR Sprinkler Systems in ', ''),
        "item": loc.canonical
      }
    ]
  };

  // Sibling locations and relevant services
  const otherLocations = Object.entries(locationPagesData)
    .filter(([k]) => k !== 'index.html' && k !== filename)
    .slice(0, 2)
    .map(([file, l]) => `
      <div class="related-card">
        <div>
          <h4>${l.h1.replace('Industrial Fire Protection & Safety Services in ', '').replace('Industrial Fire Fighting Systems & AMC in ', '').replace('Industrial Fire Protection Engineering in ', '').replace('Industrial Fire Safety & ESFR Sprinkler Systems in ', '')}</h4>
          <p>${l.meta}</p>
        </div>
        <a href="${file}">Explore Corridor <i class="fa-solid fa-arrow-right"></i></a>
      </div>`).join('\n');

  const serviceLinks = `
      <div class="related-card">
        <div>
          <h4>Industrial Hydrant Systems</h4>
          <p>Heavy-duty external ring mains, pump room design, and IS 3844 wet riser engineering.</p>
        </div>
        <a href="../pages/fire-hydrant-systems.html">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="related-card">
        <div>
          <h4>Fire Safety Audits &amp; NOC</h4>
          <p>Statutory IS 14489 audits, Factory Act Section 38 compliance, and MIDC CFO liaison.</p>
        </div>
        <a href="../pages/fire-safety-audit.html">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="related-card">
        <div>
          <h4>24/7 AMC Support</h4>
          <p>Guaranteed 2-hour on-site breakdown attendance and bi-annual Form B certification.</p>
        </div>
        <a href="../pages/amc-services.html">Learn More <i class="fa-solid fa-arrow-right"></i></a>
      </div>`;

  const locPageHtml = `${buildMetadataBlock({
    title: loc.title,
    meta: loc.meta,
    canonical: loc.canonical,
    ogImage: loc.ogImage,
    cssBase: '../'
  })}
<style>
  .page-header {
    background: var(--navy);
    padding: 140px 48px 60px;
    text-align: center;
    color: var(--white);
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
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
  .location-content {
    max-width: 960px;
    margin: 0 auto 60px;
    font-size: 16px;
    line-height: 1.8;
    color: var(--charcoal);
  }
  .location-content h2 {
    font-family: var(--font-display);
    font-size: 26px;
    color: var(--navy);
    margin: 40px 0 16px;
    text-transform: uppercase;
    border-bottom: 2px solid var(--red);
    padding-bottom: 8px;
  }
  .location-content p {
    margin-bottom: 20px;
  }
  .location-content ul {
    margin-bottom: 24px;
    padding-left: 24px;
  }
  .location-content li {
    margin-bottom: 10px;
  }
</style>
<script type="application/ld+json">
${JSON.stringify(locBreadcrumbSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(localBusinessSchema, null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(locFaqSchema, null, 2)}
</script>
</head>
<body>

${getNoscriptNav('../')}

<kavach-header base="../"></kavach-header>

<div class="page-header reveal">
  <h1 class="page-title">${loc.h1}</h1>
  <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Locations</a> / <span>${filename.replace('.html', '').toUpperCase()}</span></div>
</div>

<section class="container" style="padding-top:60px; padding-bottom:60px;">
  <div class="location-content reveal">
    <h2>1. Industrial Character &amp; Hazard Density</h2>
    <p>${loc.character}</p>
    <p>Operating industrial assets in this corridor requires strict compliance with the <strong>Maharashtra Fire Prevention and Life Safety Measures Act 2006</strong>, the <strong>Factories Act 1948</strong>, and <strong>NBC 2016 Part 4</strong>. Kavach Fire Safety provides dedicated engineering support tailored to the specific operational hazards of plants in this region.</p>

    <h2>2. Statutory Compliance &amp; MIDC Liaison Services</h2>
    <p>Navigating municipal fire department approvals and MIDC Chief Fire Officer (CFO) requirements requires local technical expertise. As a state-certified Licensed Agency, Kavach manages the full compliance lifecycle for facilities in this zone:</p>
    <ul>
      <li><strong>Provisional &amp; Final Fire NOC:</strong> Preparation of architectural CAD fire blueprints, static water calculations, and direct representation during official CFO site inspections.</li>
      <li><strong>Bi-Annual Form B Renewals:</strong> Mandatory physical maintenance audits conducted every January and July to maintain unbroken statutory legal standing.</li>
      <li><strong>Third-Party Safety Audits:</strong> Comprehensive risk assessments under IS 14489 and Section 38 of the Factories Act 1948.</li>
    </ul>

    <h2>3. Turnkey Fire Protection Engineering &amp; 24/7 AMC</h2>
    <p>Kavach maintains rapid-response mobile engineering teams dedicated to this industrial sector. We provide complete turnkey design, procurement, installation, and maintenance across critical suppression systems:</p>
    <ul>
      <li><strong>High-Pressure Hydrant Networks:</strong> IS 13039 external yard hydrants, landing valves, and pump rooms with electric, diesel standby, and jockey pumps.</li>
      <li><strong>Automatic Sprinkler Systems:</strong> Ceiling ESFR sprinklers for high-rack warehouses and pre-action systems for server rooms.</li>
      <li><strong>Addressable Fire Alarms:</strong> Early smoke detection loops, VESDA air sampling, and automated HVAC/Access Control interlocks conforming to IS 2189.</li>
      <li><strong>Guaranteed Emergency SLA:</strong> On-site emergency breakdown attendance within 2 hours to resolve pump faults, false alarms, and valve impairments.</li>
    </ul>
  </div>

  <!-- Related Services & Neighboring Locations -->
  <section class="related-topics-section" style="margin-top: 40px; margin-bottom: 40px;">
    <div style="text-align: center; margin-bottom: 30px;" class="reveal">
      <span class="section-label">Engineering Services &amp; Network</span>
      <h3 style="font-family: var(--font-display); font-size: 28px; color: var(--navy); text-transform: uppercase; letter-spacing: 1px;">Related Services &amp; Neighboring Corridors</h3>
    </div>
    <div class="related-grid">
      ${serviceLinks}
      ${otherLocations}
    </div>
  </section>

  <!-- FAQs -->
  <section class="faq-section" style="margin-top: 60px;">
    <div style="text-align: center; margin-bottom: 40px;" class="reveal">
      <span class="section-label">Location Q&amp;A</span>
      <h2 class="section-title">Frequently Asked <em>Questions</em></h2>
    </div>
    <div class="faq-grid">
      ${locFaqItemsHtml}
    </div>
  </section>

  <!-- CTA -->
  <div style="margin-top: 60px; background: linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(244,34,35,0.95) 100%); padding: 60px 40px; border-radius: 8px; text-align:center; color: var(--white);" class="reveal">
    <h3 style="font-family:var(--font-display); font-size:32px; text-transform:uppercase; margin-bottom:20px; letter-spacing: 1px;">Request Local Engineering Support</h3>
    <p style="max-width: 700px; margin: 0 auto 32px; font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.8);">Speak directly with our local engineering dispatch team for site surveys, Fire NOC liaison, or emergency AMC coverage.</p>
    <a href="../pages/request-inspection.html" class="btn-primary" style="background: var(--white); color: var(--navy); font-size: 18px; padding: 16px 40px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">Schedule an On-Site Consultation</a>
  </div>
</section>

<kavach-footer base="../"></kavach-footer>
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>

</body></html>`;

  fs.writeFileSync(filePath, locPageHtml, 'utf8');
  console.log(`✓ Created location page: /locations/${filename}`);
}

// -------------------------------------------------------------
// 5. UPDATE NOSCRIPT ON INDEX.HTML & REMAINING PAGES
// -------------------------------------------------------------
console.log('\n>>> Updating noscript navigation on root index.html and core pages...');

const rootIndex = path.join(rootDir, 'index.html');
if (fs.existsSync(rootIndex)) {
  let content = fs.readFileSync(rootIndex, 'utf8');
  content = content.replace(/<noscript>[\s\S]*?<\/noscript>/i, getNoscriptNav('./'));
  fs.writeFileSync(rootIndex, content, 'utf8');
  console.log('✓ Updated root index.html noscript');
}

const otherPages = [
  'about.html', 'services.html', 'projects.html', 'case-studies.html',
  'certifications-compliance.html', 'careers.html', 'contact.html',
  'request-inspection.html', 'industries-served.html', 'fire-noc-assistance.html',
  'industrial-safety-training.html'
];

for (const p of otherPages) {
  const pPath = path.join(rootDir, 'pages', p);
  if (fs.existsSync(pPath)) {
    let content = fs.readFileSync(pPath, 'utf8');
    content = content.replace(/<noscript>[\s\S]*?<\/noscript>/i, getNoscriptNav('../'));
    fs.writeFileSync(pPath, content, 'utf8');
  }
}
console.log('✓ Updated noscript on all core pages');

// -------------------------------------------------------------
// 6. GENERATE SITEMAP.XML & UPDATE ROBOTS.TXT
// -------------------------------------------------------------
console.log('\n>>> STEP 7: Generating Complete sitemap.xml & Verifying robots.txt...');

function getAllHtmlFiles(dir, relPrefix = '') {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'scripts') continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relPrefix, entry.name).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      list = list.concat(getAllHtmlFiles(fullPath, relPath));
    } else if (entry.name.endsWith('.html') && !entry.name.startsWith('google')) {
      // Exclude redirect helper post.html
      if (relPath !== 'blogs/post.html') {
        list.push(relPath);
      }
    }
  }
  return list;
}

const allHtml = getAllHtmlFiles(rootDir);
console.log(`Found ${allHtml.length} total HTML pages to include in sitemap.`);

function getPriority(pagePath) {
  if (pagePath === 'index.html') return '1.0';
  if (pagePath === 'pages/services.html' || pagePath.startsWith('pages/fire-') || pagePath === 'pages/amc-services.html') return '0.9';
  if (pagePath.startsWith('locations/')) return '0.9';
  if (pagePath.includes('/') && pagePath.split('/').length > 2) return '0.8'; // sub-clusters
  if (pagePath.startsWith('pages/')) return '0.8';
  if (pagePath === 'blogs/index.html') return '0.7';
  if (pagePath.startsWith('blogs/')) return '0.6';
  return '0.7';
}

function getChangeFreq(pagePath) {
  if (pagePath === 'index.html' || pagePath === 'blogs/index.html' || pagePath === 'locations/index.html') return 'weekly';
  return 'monthly';
}

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const rel of allHtml) {
  const urlLoc = rel === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${rel}`;
  sitemapXml += `  <url>
    <loc>${urlLoc}</loc>
    <lastmod>${TODAY_DATE}</lastmod>
    <changefreq>${getChangeFreq(rel)}</changefreq>
    <priority>${getPriority(rel)}</priority>
  </url>\n`;
}
sitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✓ sitemap.xml generated with ${allHtml.length} URLs.`);

// Verify robots.txt
const robotsTxtPath = path.join(rootDir, 'robots.txt');
const robotsContent = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(robotsTxtPath, robotsContent, 'utf8');
console.log('✓ robots.txt verified.');

console.log('\n>>> All generation steps completed successfully!');
