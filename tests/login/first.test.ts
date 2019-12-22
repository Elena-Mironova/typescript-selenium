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



  // it("Negative test VK", async function() {    
  //   driver.get('https://m.vk.com/'); 
  //   await driver.sleep(2000);
  //   await driver.findElement(By.css('[name="email"]')).sendKeys('+79211402028');
  //   await driver.sleep(1000);
  //   await driver.findElement(By.css('[type="password"]')).sendKeys('test');
  //   await driver.sleep(1000);
  //   await driver.findElement(By.css('[type="submit"]')).click();
  //   await driver.sleep(1000);
  //   await driver.findElement(By.css('.service_msg.service_msg_warning'));
  // });


  // it("Positive test Проверка сертификата", async function() {    
  //   driver.get('https://brunoyam.com/verify');
  //   await driver.sleep(1000);
  //   await driver.findElement(By.css('form[action="/verify"] [name="fio"]')).sendKeys('Шарина Юлия Валерьевна');
  //   await driver.findElement(By.css('form[action="/verify"] [name="number"]')).sendKeys('TE250-1725');
  //   await driver.findElement(By.css('form[action="/verify"] button[type="submit"]')).click();
  //   await driver.sleep(1000);
  //   await driver.findElement(By.css('.certificate'));
  // });


  // it("Negative test Проверка сертификата", async function() {
  //   driver.get('https://brunoyam.com/verify');
  //   await certificatePage.isLoad();
  //   await driver.findElement(By.css('form[action="/verify"] [name="fio"]')).sendKeys('Шарина Юлия Валерьевна');
  //   await driver.findElement(By.css('form[action="/verify"] [name="number"]')).sendKeys('TE250-1');
  //   await driver.findElement(By.css('form[action="/verify"] button[type="submit"]')).click();
  //   await driver.sleep(1000);
  //   await assert.equal(await certificatePage.isPage(), true);
  // });

  
  // it("Сломанный тест для azure", async function() {
  //   driver.get('https://yandex.ru/');
  //   await certificatePage.isLoad();
  //   await driver.findElement(By.css('form[action="/verify"] [name="fio"]')).sendKeys('Шарина Юлия Валерьевна');
  //   await driver.findElement(By.css('form[action="/verify"] [name="number"]')).sendKeys('TE250-1');
  //   await driver.findElement(By.css('form[action="/verify"] button[type="submit"]')).click();
  //   await driver.sleep(1000);
  //   await assert.equal(await certificatePage.isPage(), true);
  // });

  //it("Positive test", async function() {
    // browser.go(App.url); // переход
    // await page.isLoad();  // проверяем, что загрузилась
    // await browser.keys(page.email(), App.user.login);
    // await browser.keys(page.password(), App.user.password); 
    // await browser.click(page.submit());
    // await calendarPage.isLoad();
    // await assert.equal(await calendarPage.isPage(), true);
  // });


  // it("Negative test", async function() {    // ctrl k+c;   ctrl k+u (закомментировать; отменить комментирование)
  //   debugger;
  //   browser.go(App.url);
  //   await page.isLoad();
  //   await browser.keys(page.email(), App.user.login);
  //   await browser.keys(page.password(), "qweqweqweqwe");
  //   await browser.click(page.submit());
  //   await page.isLoad();
  //   await assert.equal(await page.isPage(), true);
  // });


  after(() => driver && driver.quit());
});