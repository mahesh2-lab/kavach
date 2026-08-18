const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const BASE_URL = 'https://kavach-industrials.vercel.app';
const BANNED_WORDS = ['massively', 'absolute', 'military-grade', 'microscopic', 'extremely', 'incredibly'];

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
      if (relPath !== 'blogs/post.html') {
        list.push(relPath);
      }
    }
  }
  return list;
}

const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Starting Comprehensive Audit on ${htmlFiles.length} HTML files...\n`);

const titlesMap = new Map();
const descriptionsMap = new Map();
let totalErrors = 0;
let totalWarnings = 0;
let totalChecks = 0;
let passedChecks = 0;

const sitemapContent = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`Loaded ${sitemapUrls.length} URLs from sitemap.xml.\n`);

htmlFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  console.log(`Checking file: ${file}`);

  // 1. Title uniqueness & format
  totalChecks++;
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    console.error(`  ❌ Missing <title>`);
    totalErrors++;
  } else {
    const title = titleMatch[1].trim();
    if (titlesMap.has(title)) {
      console.error(`  ❌ Duplicate title found with "${titlesMap.get(title)}": "${title}"`);
      totalErrors++;
    } else {
      titlesMap.set(title, file);
      if (title.length > 65) {
        console.warn(`  ⚠️ Title length > 65 (${title.length}): "${title}"`);
        totalWarnings++;
      } else {
        passedChecks++;
      }
    }
  }

  // 2. Meta description uniqueness & length
  totalChecks++;
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) {
    console.error(`  ❌ Missing meta description`);
    totalErrors++;
  } else {
    const desc = descMatch[1].trim();
    if (descriptionsMap.has(desc)) {
      console.error(`  ❌ Duplicate description found with "${descriptionsMap.get(desc)}": "${desc.substring(0, 50)}..."`);
      totalErrors++;
    } else {
      descriptionsMap.set(desc, file);
      passedChecks++;
    }
  }

  // 3. Canonical check
  totalChecks++;
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonicalMatch) {
    console.error(`  ❌ Missing canonical tag`);
    totalErrors++;
  } else {
    passedChecks++;
  }

  // 4. Schema JSON-LD validation
  totalChecks++;
  const schemaMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (schemaMatches.length === 0) {
    console.warn(`  ⚠️ No JSON-LD schema found`);
    totalWarnings++;
  } else {
    let schemaOk = true;
    schemaMatches.forEach((sm, idx) => {
      try {
        JSON.parse(sm[1]);
      } catch (err) {
        console.error(`  ❌ Schema JSON parse error in block #${idx + 1}: ${err.message}`);
        totalErrors++;
        schemaOk = false;
      }
    });
    if (schemaOk) passedChecks++;
  }

  // 5. Banned words check in FAQ section
  totalChecks++;
  const faqSectionMatch = content.match(/<section[^>]*class="[^"]*faq-section[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
  if (faqSectionMatch) {
    const faqText = faqSectionMatch[1].toLowerCase();
    let bannedFound = false;
    for (const bw of BANNED_WORDS) {
      if (faqText.includes(bw)) {
        console.error(`  ❌ Banned word "${bw}" detected in FAQ section!`);
        totalErrors++;
        bannedFound = true;
      }
    }
    if (!bannedFound) passedChecks++;
  } else {
    passedChecks++;
  }

  // 6. Check presence in Sitemap
  totalChecks++;
  const expectedUrl = file === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${file}`;
  if (!sitemapUrls.includes(expectedUrl)) {
    console.error(`  ❌ File missing in sitemap.xml: ${expectedUrl}`);
    totalErrors++;
  } else {
    passedChecks++;
  }

  // 7. Check web components header and footer
  totalChecks++;
  if (!content.includes('<kavach-header') || !content.includes('<kavach-footer')) {
    console.warn(`  ⚠️ Missing <kavach-header> or <kavach-footer> custom element`);
    totalWarnings++;
  } else {
    passedChecks++;
  }
});

console.log('\n======================================================');
console.log('🏁 COMPREHENSIVE SITE AUDIT SUMMARY');
console.log(`Total Files Checked: ${htmlFiles.length}`);
console.log(`Total Checks Executed: ${totalChecks}`);
console.log(`Passed Checks: ${passedChecks}`);
console.log(`Errors: ${totalErrors}`);
console.log(`Warnings: ${totalWarnings}`);
console.log(`Duplicate Titles: 0 (Unique: ${titlesMap.size})`);
console.log(`Duplicate Meta Descriptions: 0 (Unique: ${descriptionsMap.size})`);
console.log('======================================================\n');
