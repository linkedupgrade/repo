const { Key } = require('selenium-webdriver');
let Page = require('./base_page');

Page.prototype.openPrivacyPolicy = async function(){
    let privacyPolicy = await this.find("//div[@id='footer']//a[contains(text(), 'Privacy Policy')]", 50000);
    privacyPolicy.sendKeys(Key.PAGE_DOWN);
    privacyPolicy.sendKeys(Key.RETURN);
    return await this.switch();
}
Page.prototype.findAllLanguages = async function(language){
    let obj = {};
    let langList = await this.findAll("//div[@id='languages']//a[contains(@href, 'privacy_agreement')]", 50000);
    langList.forEach(async (el, idx)=>{
            let element = await el.getAttribute("href");
            let lang = await this.getJsonContent()[0][idx+1];
            if(element.includes(lang)){
                obj[lang] = true;
            } else {
                obj[lang] = false; 
            };
    });
    for(let el of langList){
        let element = await el.getAttribute("href");
    }
    delete obj.undefined;
    if(obj[language] == true){
        return obj[language];
    } else {
        return false;
    };
}
Page.prototype.signedYear = async function(){
    let singedText = await this.find("//i[contains(text(), 'Revision Date: February 16, 2022')]", 50000).getText();
    let signedYear = await singedText.slice(-5);
    let date = await new Date().getFullYear();
    if (parseInt(signedYear) === date){
        return true;
    } else {
        return false;
    }
    
}
module.exports = Page;