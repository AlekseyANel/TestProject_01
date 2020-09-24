const playwright = require("playwright-chromium");

jest.setTimeout(30000);
let browser;

afterAll(async () => {
  await browser.close();
});

describe('UI test',() => {
  test('Frame', async () => {
    browser = await playwright.chromium.launch({
      headless:false, 
      slowMo: 500, 
      /*devtools: true*/
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.w3schools.com/html/html_iframe.asp');
    //await page.waitForSelector('[href="/default.asp"]');
    await page.waitForTimeout(2000);

    const frames = page.frames(); 
    const frame1 = frames[1]; 
    //console.log(frame1); как проверить наличие захваченного фрейма??
    
    await frame1.click('[onclick="open_search(this)"]');
    await frame1.waitForSelector('td#gs_tti50 > input#gsc-i-id1');
    //await frame1.waitForTimeout(1000);

    await frame1.fill('td#gs_tti50 > input#gsc-i-id1', 'НОВЫЙ ТЕКСТ');
    //await frame1.waitForTimeout(1000);

    await frame1.click('td > button.gsc-search-button.gsc-search-button-v2');
    await frame1.waitForSelector('[href="https://www.w3schools.com/xml/dom_nodes_add.asp"]');
    await page.waitForTimeout(1000);
    
  });
});