const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

let totalErrors = 0;
let totalWarnings = 0;
let totalChecks = 0;
let passedChecks = 0;

function checkHtmlFile(relPath) {
  // Skip utility redirect file for standard page audit
  if (relPath === 'blogs/post.html') return;

  const fullPath = path.join(rootDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  console.log(`\n=== Checking: ${relPath} ===`);

  // 1. Title
  totalChecks++;
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    console.error(`❌ ERROR: Missing <title> in ${relPath}`);
    totalErrors++;
  } else {
    const title = titleMatch[1];
    if (title.length > 65) {
      console.warn(`⚠️ WARNING: Title length > 65 chars (${title.length}): "${title}"`);
      totalWarnings++;
    } else {
      console.log(`✓ Title (${title.length} chars): "${title}"`);
      passedChecks++;
    }
  }

  // 2. Meta description
  totalChecks++;
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) {
    console.error(`❌ ERROR: Missing meta description in ${relPath}`);
    totalErrors++;
  } else {
    const desc = descMatch[1];
    console.log(`✓ Meta Description (${desc.length} chars): "${desc.substring(0, 60)}..."`);
    passedChecks++;
  }

  // 3. Canonical
  totalChecks++;
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (!canonMatch) {
    console.error(`❌ ERROR: Missing canonical in ${relPath}`);
    totalErrors++;
  } else {
    console.log(`✓ Canonical: ${canonMatch[1]}`);
    passedChecks++;
  }

  // 4. H1 Tag presence
  totalChecks++;
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) {
    console.error(`❌ ERROR: Missing H1 tag in ${relPath}`);
    totalErrors++;
  } else {
    const h1 = h1Match[1].replace(/<[^>]+>/g, '').trim();
    console.log(`✓ H1 Tag: "${h1}"`);
    passedChecks++;
  }

  // 5. Schema JSON-LD syntax check
  totalChecks++;
  const schemaMatches = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (schemaMatches.length === 0) {
    console.warn(`⚠️ WARNING: No Schema JSON-LD found in ${relPath}`);
    totalWarnings++;
  } else {
    let schemaOk = true;
    schemaMatches.forEach((m, idx) => {
      try {
        const parsed = JSON.parse(m[1]);
        console.log(`✓ Schema #${idx + 1} (${parsed['@type'] || 'Valid'}): Valid JSON-LD`);
      } catch (err) {
        console.error(`❌ ERROR: Invalid JSON in Schema #${idx + 1} in ${relPath}:`, err.message);
        totalErrors++;
        schemaOk = false;
      }
    });
    if (schemaOk) passedChecks++;
  }

  // 6. Preconnect hints
  totalChecks++;
  if (content.includes('rel="preconnect"')) {
    console.log(`✓ Resource Hints: Preconnect enabled`);
    passedChecks++;
  } else {
    console.warn(`⚠️ WARNING: Missing preconnect resource hints in ${relPath}`);
    totalWarnings++;
  }

  // 7. Noscript check
  totalChecks++;
  if (!content.includes('<noscript>')) {
    console.warn(`⚠️ WARNING: No <noscript> navigation fallback in ${relPath}`);
    totalWarnings++;
  } else {
    console.log(`✓ <noscript> navigation present`);
    passedChecks++;
  }
}

// Find all HTML files
function getHtmlFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.git') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full, path.join(base, file)));
    } else if (file.endsWith('.html') && !file.startsWith('google')) {
      results.push(path.join(base, file).replace(/\\/g, '/'));
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to inspect.`);

htmlFiles.forEach(checkHtmlFile);

// Check Sitemap against files
console.log(`\n=== Checking sitemap.xml ===`);
const sitemapContent = fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
console.log(`Sitemap contains ${locMatches.length} URLs.`);

for (const loc of locMatches) {
  totalChecks++;
  const rel = loc.replace('https://kavach-industrials.vercel.app/', '');
  const localTarget = rel === '' ? 'index.html' : rel;
  if (!fs.existsSync(path.join(rootDir, localTarget))) {
    console.error(`❌ ERROR: Sitemap URL does not exist on disk: ${localTarget}`);
    totalErrors++;
  } else {
    console.log(`✓ Sitemap route exists on disk: ${localTarget}`);
    passedChecks++;
  }
}

const score = Math.round((passedChecks / totalChecks) * 100);

console.log(`\n======================================================`);
console.log(`🎯 SEO AUDIT FINISHED`);
console.log(`Total Checks: ${totalChecks} | Passed: ${passedChecks}`);
console.log(`Errors: ${totalErrors} | Warnings: ${totalWarnings}`);
console.log(`FINAL SEO HEALTH SCORE: ${score} / 100`);
console.log(`======================================================\n`);
