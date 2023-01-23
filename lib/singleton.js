const fs = require('fs');
let config = JSON.parse(fs.readFileSync('./json/config.json', 'utf8'));
const {Builder, Browser} = require(config["driverConfig"]["webDriver"]);
let chrome = require(config["driverConfig"]["chrome"]);
let options = new chrome.Options();
options.addArguments(config["driverConfig"]["arguments"]);
let driver = null;
// class Singleton {
//     constructor () {
//       if (!Singleton.instance) {
//         Singleton.instance = this;
//       }
//       return Singleton.instance
//     }
//     getDriver(){
//         if(!driver){
//             return driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
//         }
//     }
//     visit(url, time){
//         this.getDriver().get(url);
//     }
//     quit(){
//         return driver.quit();
//     }
//   }
  
//   const instance = new Singleton()
//   Object.freeze(instance)
//   instance.visit("https://store.steampowered.com/");
// const Singleton = (function(){
//     let instance = null, driver = null;
//     function getDriver(){
//       this.driver = driver;
//       let browserName = "Chrome";
//       switch (browserName)
//       {
//         case "Safari":
//             if (this.driver == null)
//             {
//                 this.driver = new Builder().forBrowser(Browser.SAFARI).setChromeOptions(options).build();
//             }
//             break;
    
//         case "Chrome":
//             if (this.driver == null)
//             {
//                 this.driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
//             }
//             break;
//           }
//     };
//     function quit() {
//       return this.driver.quit();
//     };
//     function createInstance(){
//       return instance = {getDriver, quit};
//     }
//     function getInstance(){
//       if(instance) return instance 
//       else return createInstance();
//     }
//     return { getInstance }
//   })()
//   Object.freeze(Singleton);

module.exports = Singleton;