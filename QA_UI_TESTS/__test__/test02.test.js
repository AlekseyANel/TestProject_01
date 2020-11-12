const playwright = require("playwright-chromium");

jest.setTimeout(40000);
let browser; let context;

beforeAll(async () => {
    browser = await playwright.chromium.launch({headless:false, slowMo:100});
    }); //Open Bro at beginning
beforeEach(async () => {context = await browser.newContext();
    }); //Create context page before each test
afterEach(async () => {await context.close();
    }); //Close context page after each test
afterAll(async () => {await browser.close();
    }); //Close Bro at the end

describe('UI test',() => {
  let page;
  
test('1.Add/Remove Elements', async () => {
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/');
    await page.click('[href="/add_remove_elements/"]');
    await page.click('[onclick="addElement()"]');
    await page.waitForSelector('.added-manually');
    await page.waitForTimeout(500);
    });

test('2.Basic Authentication', async () => {
    context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin',
        }
    });
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await page.waitForTimeout(1000);
    });

test('3.Checkboxes', async () => {
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.check('#checkboxes [type="checkbox"]:nth-child(1)');
    await page.uncheck('#checkboxes [type="checkbox"]:nth-child(3)');
    await page.waitForTimeout(1000);
    });

//test('4.Context Menu - no', async () => {
//    page = await context.newPage();
//    await page.goto('https://the-internet.herokuapp.com/context_menu');
//    await page.click('#hot-spot', {button: 'right'});
//   });

test('5.Digest Authentication', async () => {
    context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin',
        }
    });
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/digest_auth');
    await page.waitForSelector('text=Congratulations! You must have the proper credentials.');
    });

test('6.Dropdown List', async () => {
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', '2');
    await page.waitForTimeout(1000);
    });    

test('7.Disabled input / dynamic_controls', async () => {
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await page.click('#input-example [type="button"]')
    await page.waitForSelector('[type="text"]:not([disabed])')
    await page.waitForTimeout(2000)
    });  

test('8.Form Authentication', async () => {
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.type('#username', 'tomsmith')  
    await page.type('#password', 'SuperSecretPassword!') 
    await page.click('[type="submit"]')
    await page.waitForSelector('[href="/logout"]')
    });

});