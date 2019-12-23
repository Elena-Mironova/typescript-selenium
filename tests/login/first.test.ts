import { Builder, WebDriver, Capabilities, By } from "selenium-webdriver";
import { LoginPage } from "../../pagesObject/login.po";
import { CalendarPage } from "../../pagesObject//calendar.po";
import { CertificatePage } from "../../pagesObject//certificate.po";
import { AccountPage } from "../../pagesObject//qashop.po"
import { App } from "../../pagesObject/config.po";
import { SeleniumUtils } from "../../utils/se.utils";

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
  let page: LoginPage;
  let calendarPage: CalendarPage;
  let certificatePage: CertificatePage;
  let accountPage: AccountPage;
  let browser: SeleniumUtils;

  before(async function() {
    driver = await new Builder().withCapabilities(capabilities).build();
    page = new LoginPage(driver);
    calendarPage = new CalendarPage(driver);
    certificatePage = new CertificatePage(driver);
    accountPage = new AccountPage(driver);
    browser = new SeleniumUtils(driver);
  });

  it("Авторизация с неверным паролем", async function() {    
    driver.get('http://bezrukovyra-wordpress-2.tw1.ru/my-account/');
    await driver.sleep(5000);
    await accountPage.isLoad();
    await driver.findElement(By.css('#username')).sendKeys('admin');
    await driver.findElement(By.css('#password')).sendKeys('1234');
    await driver.findElement(By.css('.woocommerce-button.button.woocommerce-form-login__submit')).click();
    await driver.sleep(1000);
    await assert.equal(await accountPage.isLoginForm(), true);
  });


  it("Авторизация", async function() {    
      driver.get('http://bezrukovyra-wordpress-2.tw1.ru/my-account/');
      await driver.sleep(5000);
      await accountPage.isLoad();
      await driver.findElement(By.css('#username')).sendKeys('admin');
      await driver.findElement(By.css('#password')).sendKeys('7RfbnSvH');
      await driver.findElement(By.css('.woocommerce-button.button.woocommerce-form-login__submit')).click();
      await driver.sleep(1000);
      await assert.equal(await accountPage.isPage(), true);
    });


     after(() => driver && driver.quit());
});