import { Builder, WebDriver, Capabilities, By } from "selenium-webdriver";
import { LoginPage } from "../../pagesObject/login.po";
import { SeleniumUtils } from "../../utils/se.utils";
import { HhPage } from "../../pagesObject/hh.po";
import { AccountPage } from "../../pagesObject/account.po";

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require("chromedriver");
const assert: IAssert = require("assert");
let capabilities = Capabilities.chrome();

capabilities.set("goog:chromeOptions", {
  args: ["--lang=en", "disable-infobars", "--disable-plugins"]
});

describe("Login form", function() {
  let driver: WebDriver;
  let loginPage: LoginPage;
  let hhPage: HhPage;
  let accountPage: AccountPage;
  let browser: SeleniumUtils;

  before(async function() {
    driver = await new Builder().withCapabilities(capabilities).build();
    loginPage = new LoginPage(driver);
    hhPage = new HhPage(driver);
    accountPage = new AccountPage(driver);
    browser = new SeleniumUtils(driver);
  });

  
  it("XX-главная", async function() {
    driver.get('https://spb.hh.ru/');
    await hhPage.isLoad();
    await driver.findElement(By.css('.supernova-dashboard-content [data-qa="login"]')).click();
    await assert.equal(await hhPage.isPage(), true);
  });

  it("XX-авторизация", async function() {
    driver.get('https://spb.hh.ru/account/login');
    await loginPage.isLoad();
    await driver.findElement(By.css('[data-qa="login-input-username"]')).sendKeys('tofir53601@imail5.net');
    await driver.findElement(By.css('[data-qa="login-input-password"]')).sendKeys('qwer1234');
    await driver.findElement(By.css('[data-qa="account-login-submit"]')).click();
    await assert.equal(await loginPage.isPage(), true);
  });

  it("XX-поиск вакансий", async function() {
    driver.get('https://spb.hh.ru/');
    await accountPage.isLoad();
    await driver.findElement(By.css('[data-qa="search-input"]')).sendKeys('Тестирование ПО');
    await driver.findElement(By.css('.supernova-search-submit-text')).click();
    await assert.equal(await accountPage.isPage(), true);
  });
  
  after(() => driver && driver.quit());
});