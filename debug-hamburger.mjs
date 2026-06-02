import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/index.html');
  await page.waitForTimeout(1000);
  
  const hamburger = await page.$('.hamburger');
  if (hamburger) {
    const box = await hamburger.boundingBox();
    console.log('Hamburger box:', box);
    
    const isVisible = await hamburger.isVisible();
    console.log('Hamburger visible:', isVisible);
    
    const display = await page.evaluate(el => window.getComputedStyle(el).display, hamburger);
    console.log('Hamburger display:', display);

    const spans = await page.$$eval('.hamburger span', spans => spans.map(s => {
       const style = window.getComputedStyle(s);
       return { width: style.width, height: style.height, display: style.display, bgColor: style.backgroundColor };
    }));
    console.log('Spans:', spans);
  } else {
    console.log('Hamburger NOT FOUND');
  }
  
  await page.screenshot({ path: 'hamburger-debug.png' });
  await browser.close();
})();
