import { WebDriver, By } from "selenium-webdriver";
import { SeleniumUtils } from "../utils/se.utils";

export class CertificatePage {
    constructor(private browser: WebDriver) { }

    private seleniumUtils = new SeleniumUtils(this.browser);

    private find = (cssPath: string) => { 
        return this.browser.findElement(By.css(cssPath));
    }

    isPage() {
        let blockOnLoginPage = this.find('.v-alert.alert.alert-danger');
        return this.seleniumUtils.existElement(blockOnLoginPage);
    }
    
    isLoad = () => this.seleniumUtils.wait('form[action="/verify"]');
}