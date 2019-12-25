import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";

export class LoginPage {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);
    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }

    isPage() {
        let blockOnLoginPage = this.find('[data-qa="search-input"]');
        return this.seleniumUtils.existElement(blockOnLoginPage);
    }

    isLoad = () => this.seleniumUtils.wait('[data-qa="account-login-form"]');
}