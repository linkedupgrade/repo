const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./json/config.json', 'utf8'));
const {Builder, Browser, By, until} = require(config["driverConfig"]["webDriver"]);
let chrome = require(config["driverConfig"]["chrome"]);
let options = new chrome.Options();
options.addArguments(config["driverConfig"]["arguments"]);
let info = fs.readFileSync(config["driverConfig"]["filePath"], config["driverConfig"]["fileExtension"]);

let Page = function () {
  let browserName = "Chrome";
  switch (browserName)
  {
    case "Safari":
        if (this.driver == null)
        {
            this.driver = new Builder().forBrowser(Browser.SAFARI).setChromeOptions(options).build();
        }
        break;

    case "Chrome":
        if (this.driver == null)
        {
          this.driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
        }
        break;
      }
    let driver = this.driver;

    this.visit = function(url, time){
        driver.get(url);
    }
    this.quit = function(){
        return driver.quit();
    }

    this.find =  function(url, time){
        driver.wait(until.elementLocated(By.xpath(url)), time);
        return driver.findElement(By.xpath(url));
    }

    this.findAll = async function(url, time){
        await driver.wait(until.elementLocated(By.xpath(url)), time);
        return await driver.findElements(By.xpath(url));
    }


    this.switch = async function(){
        const originalWindow = await driver.getWindowHandle();
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
          );
        const windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
          if (handle !== originalWindow) {
            await driver.switchTo().window(handle);
          }
        });
        return await driver.wait(until.titleIs('Privacy Policy Agreement'), 10000);
    }
    this.getUrl = function(){
        return driver.getCurrentUrl();
    }

    this.getJsonContent = () =>{
        return eval(info);
    }
};

module.exports = Page;