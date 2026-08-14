const fs = require('fs');
const path = require('path');

const pagesData = {
  'services.html': {
    title: 'Industrial Fire Safety Engineering Services | Kavach',
    meta: 'Comprehensive industrial fire safety services: hydrant & sprinkler installation, gas suppression, safety audits, and AMC for manufacturing plants.',
    pageName: 'Our Services',
    h1: 'Industrial Fire Safety Engineering Services & Solutions',
    ogImage: 'about-us.webp',
    extraSchema: `{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://kavach-industrials.vercel.app/pages/services.html#collection",
  "name": "Industrial Fire Safety Services",
  "url": "https://kavach-industrials.vercel.app/pages/services.html",
  "description": "Comprehensive industrial fire safety services: hydrant & sprinkler installation, gas suppression, safety audits, and AMC for manufacturing plants."
}`
  },
  'about.html': {
    title: 'About Kavach | Industrial Life Safety Architects India',
    meta: 'Discover Kavach Fire Safety: 15+ years engineering certified, NBC-compliant industrial fire protection & life safety systems across 1,200+ projects.',
    pageName: 'About Us',
    h1: 'About Kavach | Industrial Fire Protection Engineers',
    ogImage: 'about-us.webp',
    extraSchema: `{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://kavach-industrials.vercel.app/pages/about.html#about",
  "name": "About Kavach Fire Safety",
  "url": "https://kavach-industrials.vercel.app/pages/about.html",
  "description": "Discover Kavach Fire Safety: 15+ years engineering certified, NBC-compliant industrial fire protection & life safety systems across 1,200+ projects."
}`
  },
  'fire-alarm-systems.html': {
    title: 'Industrial Fire Alarm & Detection Systems | Kavach',
    meta: 'Advanced addressable fire alarm and early smoke detection systems for industrial plants and warehouses. Certified NBC & NFPA compliant installation.',
    pageName: 'Fire Alarm Systems',
    h1: 'Industrial Fire Alarm & Early Smoke Detection Systems',
    ogImage: 'fire-alarm-1.webp',
    serviceSchema: {
      name: 'Industrial Fire Alarm & Detection Systems',
      serviceType: 'Fire Alarm System Installation and Maintenance',
      description: 'Turnkey design, installation, and maintenance of addressable smoke detection, VESDA aspirating systems, and FACP panel integration compliant with IS:2189 and NFPA 72.'
    },
    faqs: [
      {
        q: 'What is the difference between addressable and conventional fire alarm systems?',
        a: 'Conventional fire alarm systems divide a facility into broad physical zones, indicating the general area of a fire. Addressable fire alarm systems assign a unique IP address to every individual detector, allowing the control panel to pinpoint the exact device, room, and floor triggered in real time.'
      },
      {
        q: 'How do Kavach fire alarm systems integrate with building management systems?',
        a: 'Our systems integrate seamlessly via relay modules with HVAC Air Handling Units (AHU) for automatic smoke shutdown, electronic access control doors for emergency release, elevator homing protocols, and emergency voice evacuation systems.'
      },
      {
        q: 'Which standards do Kavach fire alarm installations comply with?',
        a: 'All Kavach fire alarm and early detection installations strictly comply with IS:2189, NBC 2016 Part 4, and international NFPA 72 codes.'
      }
    ]
  },
  'fire-hydrant-systems.html': {
    title: 'Industrial Fire Hydrant System Installation | Kavach',
    meta: 'Heavy-duty industrial fire hydrant systems, high-pressure pump houses, and yard hydrant networks engineered to NBC 2016 & IS 3844 standards.',
    pageName: 'Fire Hydrant Systems',
    h1: 'Industrial Fire Hydrant Systems & Pump Room Engineering',
    ogImage: 'fire-hydrant-1.webp',
    serviceSchema: {
      name: 'Industrial Fire Hydrant & Ring Main System Engineering',
      serviceType: 'Fire Hydrant System Design and Commissioning',
      description: 'High-capacity external ring mains, internal landing valves, heavy-duty pump rooms (main electric, diesel standby, jockey pumps), and yard hydrant networks conforming to IS:3844 and IS:13039.'
    },
    faqs: [
      {
        q: 'What are the essential components of an industrial fire hydrant system?',
        a: 'An industrial fire hydrant network comprises high-pressure underground/above-ground ring mains, internal landing valves, external yard hydrants, hose reels, fire hose boxes, and a dedicated pump house featuring main electric, diesel backup, and jockey pumps.'
      },
      {
        q: 'What water pressure must an industrial fire hydrant maintain?',
        a: 'Under NBC 2016 and IS 3844 standards, industrial fire hydrant networks must maintain a minimum running pressure of 3.5 kg/cm² to 7.0 kg/cm² at the furthest remote hydrant outlet.'
      },
      {
        q: 'Why is a jockey pump essential in a hydrant network?',
        a: 'A jockey pump maintains baseline pressure in the piping network, compensating for minor joint leaks and temperature fluctuations without unnecessarily short-cycling and damaging the massive main electric or diesel fire pumps.'
      }
    ]
  },
  'fire-sprinkler-systems.html': {
    title: 'Industrial Fire Sprinkler System Installation | Kavach',
    meta: 'Custom hydraulic fire sprinkler systems (ESFR, pre-action, deluge) for warehouses and factories. Complete NFPA 13 & NBC compliance engineering.',
    pageName: 'Fire Sprinkler Systems',
    h1: 'Turnkey Industrial Fire Sprinkler Engineering & Installation',
    ogImage: 'fire-sprinkler-1.webp',
    serviceSchema: {
      name: 'Automatic Fire Sprinkler System Engineering',
      serviceType: 'Industrial Sprinkler System Installation',
      description: 'Hydraulic calculation, design, and turnkey installation of wet pipe, dry pipe, deluge, pre-action, and ESFR fire sprinkler systems adhering to NFPA 13 and NBC 2016 Part 4.'
    },
    faqs: [
      {
        q: 'What are ESFR fire sprinklers and where are they required?',
        a: 'Early Suppression Fast Response (ESFR) fire sprinklers are high-output, high-volume suppression heads designed specifically for high-ceiling warehouses and logistics parks, eliminating the need for in-rack sprinkler piping.'
      },
      {
        q: 'What causes pinhole leaks and pipe corrosion in sprinkler systems?',
        a: 'Pinhole leaks are commonly caused by Microbiologically Influenced Corrosion (MIC), where bacteria react with stagnant water, oxygen, and steel pipes to produce corrosive acids. Regular water testing, biocide treatment, and nitrogen inerting prevent this.'
      },
      {
        q: 'How often should industrial fire sprinkler systems undergo testing?',
        a: 'Sprinkler systems require quarterly functional inspections of alarm valves, flow switches, and pressure gauges, alongside annual comprehensive flow tests and 5-year internal pipe inspections under NFPA 25 standards.'
      }
    ]
  },
  'fire-extinguisher-services.html': {
    title: 'Industrial Fire Extinguishers & Gas Suppression | Kavach',
    meta: 'BIS-certified industrial fire extinguishers and clean agent gas suppression systems (Novec 1230 / FM-200) for server rooms and electrical panels.',
    pageName: 'Fire Extinguisher Services',
    h1: 'Industrial Fire Extinguishers & Clean Agent Gas Suppression',
    ogImage: 'about-us.webp',
    serviceSchema: {
      name: 'Fire Extinguishers & Clean Agent Gas Suppression',
      serviceType: 'Fire Extinguisher Supply and Total Flooding Systems',
      description: 'Supply, refilling, and maintenance of BIS-marked portable/trolley extinguishers and engineered clean agent total flooding suppression systems (Novec 1230, FM-200, CO2) conforming to IS:15683 and NFPA 2001.'
    },
    faqs: [
      {
        q: 'What clean agents are recommended for server rooms and electrical panels?',
        a: 'Novec 1230 and FM-200 are the gold standards for IT data centers, server rooms, and electrical control rooms because they leave zero chemical residue, are electrically non-conductive, and do not cause thermal shock to sensitive equipment.'
      },
      {
        q: 'How frequently must industrial fire extinguishers be refilled and tested?',
        a: 'Extinguishers require monthly visual inspections, annual servicing and refilling depending on agent type, and hydrostatic pressure testing every 3 to 5 years as per IS:2190 guidelines.'
      },
      {
        q: 'What extinguisher types are suitable for chemical and electrical fires?',
        a: 'Class B chemical fires require Mechanical Foam (AFFF) or ABC Dry Chemical Powder, while Class C electrical fires require Carbon Dioxide (CO2) or Clean Agent (Novec 1230/FM-200) extinguishers.'
      }
    ]
  },
  'fire-safety-audit.html': {
    title: 'Third-Party Fire Safety Audit & Assessment | Kavach',
    meta: 'Certified third-party industrial fire safety audits conforming to IS 14489, Factory Act, and NBC Part 4. Identify hazards and ensure compliance.',
    pageName: 'Fire Safety Audit',
    h1: 'Third-Party Industrial Fire Safety Audits (IS 14489)',
    ogImage: 'about-us.webp',
    serviceSchema: {
      name: 'Industrial Fire Safety Audit & Risk Assessment',
      serviceType: 'Safety Audit and Hazard Identification',
      description: 'Comprehensive third-party fire safety audits, risk assessments, gap analysis reports, and emergency evacuation planning under IS:14489, Maharashtra Fire Prevention Act, and NBC 2016.'
    },
    faqs: [
      {
        q: 'Is a third-party fire safety audit mandatory for manufacturing factories in India?',
        a: 'Yes, under Section 38 of the Factories Act 1948, the Maharashtra Fire Prevention and Life Safety Measures Act 2006, and IS:14489, industrial units must conduct periodic third-party fire safety audits and submit bi-annual Form B compliance certificates.'
      },
      {
        q: 'What deliverables are provided in a Kavach Fire Safety Audit?',
        a: 'Clients receive an exhaustive technical audit report detailing existing equipment condition, hydraulic calculations, hazardous area classifications, non-compliance gap analysis, risk mitigation roadmap, and evacuation route diagrams.'
      },
      {
        q: 'How often should an industrial facility undergo a fire safety audit?',
        a: 'High-hazard industrial facilities (chemical, pharma, engineering) must conduct a formal comprehensive audit annually, with bi-annual preventive maintenance certifications (Form B in Maharashtra).'
      }
    ]
  },
  'amc-services.html': {
    title: 'Fire Protection AMC & Breakdown Maintenance | Kavach',
    meta: '24/7 industrial fire protection AMC services with guaranteed 4-hour on-site breakdown response across Pune and Maharashtra MIDC industrial zones.',
    pageName: 'AMC Services',
    h1: 'Industrial Fire Protection AMC & 24/7 Breakdown Services',
    ogImage: 'about-us.webp',
    serviceSchema: {
      name: 'Annual Maintenance Contracts (AMC) for Industrial Fire Systems',
      serviceType: 'Comprehensive Fire Protection Maintenance',
      description: 'Preventive and corrective maintenance covering fire pump rooms, alarm panels, sprinkler networks, hydrant ring mains, gas suppression, and emergency response across Maharashtra industrial corridors.'
    },
    faqs: [
      {
        q: 'What is covered under a Kavach Comprehensive Fire AMC?',
        a: 'Our AMC covers regular monthly/quarterly inspections, pump house servicing, diesel engine testing, sprinkler flow checks, smoke detector sensitivity calibration, hydrant pressure testing, logbook maintenance, and 24/7 emergency breakdown support.'
      },
      {
        q: 'What is your emergency breakdown response time in Pune MIDC areas?',
        a: 'Active AMC clients in Pune, PCMC, Chakan, Talegaon, Bhosari, Ranjangaon, and Shirur industrial belts receive guaranteed 4-hour on-site dispatch by certified senior technicians.'
      },
      {
        q: 'How does regular AMC maintenance help with statutory Fire NOC renewals?',
        a: 'Regular AMC servicing ensures that all fire systems operate flawlessly during government inspections and allows Kavach to issue valid Form B compliance certificates required for Fire NOC renewal.'
      }
    ]
  },
  'fire-noc-assistance.html': {
    title: 'Fire NOC Approval & Statutory Liaison | Kavach Pune',
    meta: 'Fast-track provisional & final Fire Department NOC approvals for industrial facilities in Maharashtra. Complete documentation, liaison & audit support.',
    pageName: 'Fire NOC Assistance',
    h1: 'Industrial Fire NOC Approval & Compliance Liaison Pune',
    ogImage: 'about-us.webp',
    serviceSchema: {
      name: 'Fire NOC Certification & Statutory Liaison Services',
      serviceType: 'Fire Department NOC Licensing and Consulting',
      description: 'End-to-end liaison and compliance engineering to secure Provisional and Final Fire NOC approvals from Maharashtra Fire Services, MIDC, PMRDA, and local municipal corporations.'
    },
    faqs: [
      {
        q: 'What is the difference between a Provisional and Final Fire NOC?',
        a: 'A Provisional Fire NOC is granted at the building plan approval stage before construction begins, approving the proposed fire system blueprints. A Final Fire NOC is issued after construction and successful commissioning/inspection of all fire systems.'
      },
      {
        q: 'What documents are required to obtain an industrial Fire NOC in Maharashtra?',
        a: 'Required documents include architectural layout blueprints, hydraulic calculation reports, water storage tank capacity proofs, electrical load sanctions, third-party audit reports, and Form A/B certificates.'
      },
      {
        q: 'How long is an industrial Fire NOC valid and how is it renewed?',
        a: 'A Final Fire NOC is generally valid for one year. Renewal requires submitting bi-annual Form B certificates (issued in January and July) certifying that all life safety systems are maintained in operational condition.'
      }
    ]
  },
  'industrial-safety-training.html': {
    title: 'Industrial Fire Safety & Mock Drill Training | Kavach',
    meta: 'Hands-on workplace fire safety training, emergency evacuation mock drills, and equipment operation workshops for factory staff and ERT teams.',
    pageName: 'Industrial Safety Training',
    h1: 'Industrial Fire Safety Training & Evacuation Mock Drills',
    ogImage: 'safety-training.webp',
    serviceSchema: {
      name: 'Industrial Fire Safety Training & Mock Drills',
      serviceType: 'Workplace Safety Training and Evacuation Drills',
      description: 'Certified workplace safety training programs including live fire extinguisher demonstrations, emergency response team (ERT) training, and evacuation mock drills compliant with the Factories Act 1948.'
    },
    faqs: [
      {
        q: 'Are fire evacuation mock drills legally mandatory for factories in India?',
        a: 'Yes, under the Model Factories Rules and State Factory Rules, every industrial facility must conduct fire evacuation mock drills at least once every six months for all operating shifts.'
      },
      {
        q: 'What topics are covered in Kavach industrial fire safety training?',
        a: 'Training modules cover fire chemistry and classification, PASS method for extinguisher operation, emergency evacuation protocols, handling hydrant landing valves, and Emergency Response Team (ERT) command chain management.'
      },
      {
        q: 'Do participants receive training completion certificates?',
        a: 'Yes, all participating personnel and ERT members receive recognized training certification, and the company receives an official Mock Drill Performance & Compliance Report.'
      }
    ]
  },
  'industries-served.html': {
    title: 'Fire Safety for Manufacturing & Warehousing | Kavach',
    meta: 'Specialized fire engineering solutions for automotive plants, pharmaceutical cleanrooms, chemical storage, 3PL logistics, and high-hazard facilities.',
    pageName: 'Industries Served',
    h1: 'Industrial Fire Protection Across Manufacturing Sectors',
    ogImage: 'industries-1.webp'
  },
  'projects.html': {
    title: 'Industrial Fire Protection Projects Portfolio | Kavach',
    meta: 'Explore 1,200+ turnkey industrial fire protection installations and commissioning projects across Maharashtra manufacturing and logistics hubs.',
    pageName: 'Projects',
    h1: 'Industrial Fire Engineering Projects Portfolio',
    ogImage: 'projects-1.webp'
  },
  'case-studies.html': {
    title: 'Industrial Fire Engineering Case Studies | Kavach',
    meta: 'Real-world case studies in industrial fire protection: retrofit engineering, pump room overhauls, and statutory Fire NOC compliance resolutions.',
    pageName: 'Case Studies',
    h1: 'Industrial Fire Safety Engineering Case Studies',
    ogImage: 'case-studies.webp'
  },
  'certifications-compliance.html': {
    title: 'Fire Safety Certifications & Standards | Kavach',
    meta: 'Certified industrial fire safety compliance: ISO 9001:2015, NBC 2016 Part 4, NFPA, IS Codes, and Maharashtra Fire Department approved standards.',
    pageName: 'Certifications & Compliance',
    h1: 'Industrial Fire Safety Certifications & Compliance Standards',
    ogImage: 'certifications.webp'
  },
  'request-inspection.html': {
    title: 'Request Industrial Site Fire Survey | Kavach Pune',
    meta: 'Book a comprehensive on-site industrial fire safety audit and hydraulic assessment by certified engineers. Fast response across Maharashtra MIDCs.',
    pageName: 'Request Site Inspection',
    h1: 'Request On-Site Industrial Fire Safety Survey',
    ogImage: 'request-inspection.webp'
  },
  'careers.html': {
    title: 'Careers in Fire Safety Engineering | Kavach Jobs',
    meta: 'Join Kavach Fire Safety: career opportunities for certified fire protection engineers, safety auditors, CAD designers, and hydraulic specialists in Pune.',
    pageName: 'Careers',
    h1: 'Careers in Fire Safety Engineering & Life Safety',
    ogImage: 'about-us.webp'
  },
  'contact.html': {
    title: 'Contact Kavach Fire Safety | Pune Engineering Hub',
    meta: 'Get in touch with Kavach Fire Safety Industrial Services in Pune for turnkey fire engineering, 24/7 AMC emergency support, and site survey bookings.',
    pageName: 'Contact Us',
    h1: 'Contact Kavach Fire Safety Industrial Services',
    ogImage: 'contact-us.webp',
    extraSchema: `{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://kavach-industrials.vercel.app/pages/contact.html#contact",
  "url": "https://kavach-industrials.vercel.app/pages/contact.html",
  "name": "Contact Kavach Fire Safety Industrial Services",
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": "https://kavach-industrials.vercel.app/#localbusiness",
    "name": "Kavach Fire Safety Industrial Services",
    "telephone": "+91 8888251522",
    "email": "projects@kavachfire.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jategaon Bk, Taluka: Shirur",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "412208",
      "addressCountry": "IN"
    }
  }
}`
  }
};

const pagesDir = path.join(__dirname, '../pages');

for (const [filename, data] of Object.entries(pagesData)) {
  const filePath = path.join(pagesDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn('File does not exist:', filename);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Preconnect
  if (!content.includes('rel="preconnect"')) {
    content = content.replace(/<link href="https:\/\/fonts\.googleapis\.com/i, '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com');
  }

  // Replace Title
  content = content.replace(/<title>.*?<\/title>/s, `<title>${data.title}</title>`);

  // Replace Meta Description
  content = content.replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${data.meta}">`);

  // Replace Open Graph & Twitter
  content = content.replace(/<meta property="og:title" content=".*?">/s, `<meta property="og:title" content="${data.title}">`);
  content = content.replace(/<meta property="og:description" content=".*?">/s, `<meta property="og:description" content="${data.meta}">`);
  content = content.replace(/<meta name="twitter:title" content=".*?">/s, `<meta name="twitter:title" content="${data.title}">`);
  content = content.replace(/<meta name="twitter:description" content=".*?">/s, `<meta name="twitter:description" content="${data.meta}">`);

  const ogImg = data.ogImage || 'about-us.webp';
  content = content.replace(/<meta property="og:image" content=".*?">/s, `<meta property="og:image" content="https://kavach-industrials.vercel.app/assets/images/${ogImg}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:image" content="https://kavach-industrials.vercel.app/assets/images/${ogImg}">`);

  // Replace H1 if provided
  if (data.h1) {
    content = content.replace(/<h1[^>]*>.*?<\/h1>/s, `<h1 class="page-title">${data.h1}</h1>`);
  }

  // Build JSON-LD schemas
  let schemas = [];

  // Breadcrumb
  schemas.push(`{
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
      "name": ${JSON.stringify(data.pageName)},
      "item": "https://kavach-industrials.vercel.app/pages/${filename}"
    }
  ]
}`);

  if (data.serviceSchema) {
    schemas.push(`{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://kavach-industrials.vercel.app/pages/${filename}#service",
  "name": ${JSON.stringify(data.serviceSchema.name)},
  "serviceType": ${JSON.stringify(data.serviceSchema.serviceType)},
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
    "name": "Maharashtra"
  },
  "url": "https://kavach-industrials.vercel.app/pages/${filename}",
  "description": ${JSON.stringify(data.serviceSchema.description)}
}`);
  }

  if (data.faqs && data.faqs.length > 0) {
    const faqItems = data.faqs.map(f => `    {
      "@type": "Question",
      "name": ${JSON.stringify(f.q)},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ${JSON.stringify(f.a)}
      }
    }`).join(',\n');

    schemas.push(`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqItems}
  ]
}`);
  }

  if (data.extraSchema) {
    schemas.push(data.extraSchema);
  }

  const jsonLdBlock = schemas.map(s => `<script type="application/ld+json">\n${s}\n</script>`).join('\n');

  // Replace existing schemas in head
  content = content.replace(/(<script type="application\/ld\+json">.*?<\/script>\s*)+/s, jsonLdBlock + '\n');

  // Add noscript navigation if not present
  if (!content.includes('<noscript>')) {
    const noscriptNav = `\n<noscript>
  <nav style="background:#0d1b2a; padding:12px 24px; text-align:center;">
    <a href="../index.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Home</a>
    <a href="about.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">About Us</a>
    <a href="services.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Services</a>
    <a href="projects.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Projects</a>
    <a href="../blogs/index.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Blog</a>
    <a href="contact.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Contact Us</a>
    <a href="request-inspection.html" style="color:#fff; margin:0 12px; text-decoration:none; font-weight:600;">Get a Quote</a>
  </nav>
</noscript>\n`;
    content = content.replace(/<body>/i, `<body>${noscriptNav}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated metadata, H1 & schema in pages/${filename}`);
}

console.log('All core pages updated successfully.');
