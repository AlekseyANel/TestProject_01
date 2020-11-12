const playwright = require("playwright-chromium");

jest.setTimeout(60000);
let browser; let context;

beforeAll(async () => {
    browser = await playwright.chromium.launch({headless:false, slowMo:1000});
    }); //Open Bro at beginning
beforeEach(async () => {context = await browser.newContext();
    }); //Create context page before each test
afterEach(async () => {await context.close();
    }); //Close context page after each test
afterAll(async () => {await browser.close();
    }); //Close Bro at the end

describe('UI test',() => {
  let page;
test('1.Launch Br, CLick any links', async () => {
    //const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.waitForTimeout(500);
    await page.click('[href="/statistics"]');
    await page.waitForTimeout(500);
    });

test('2.Open Br, wait for "true"', async () => {
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.waitForTimeout(500);
    await page.click('#rmenu');
    await page.waitForTimeout(1000);
    await page.waitForSelector('[aria-expanded="true"]');
    });

test('3.Open Br, search, not found litecoin', async () => {
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.waitForSelector('[id="search-box"]');
    await page.fill('[id="search-box"]', 'litecoin');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.robot');
    await page.waitForTimeout(1000);
    });

test('4.Open Br, check radio-buttons', async () => {
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    await page.waitForSelector('[for="option-fee-map-v-size"]');
    await page.check('[for="option-fee-map-count"]');
    await page.waitForTimeout(2000);
    await page.check('[for="option-fee-map-scale-logarithmic"]');
    await page.waitForTimeout(2000);
    });

test('5.Open pg, click qr-code, launch a cam', async () => {
    page = await context.newPage();
    await page.goto('https://bitaps.com');
    //await context.clearPermissions(['camera']);
    await context.grantPermissions(['camera']);
    //await page.waitForTimeout(1000);

    await page.waitForSelector('.scan-qr');
    await page.click('.scan-qr');
    await page.waitForTimeout(5000);

    await page.screenshot({path:'./screen.jpg'});
    await page.waitForTimeout(1000);
    });
});