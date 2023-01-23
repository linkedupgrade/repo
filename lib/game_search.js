const { Key } = require('selenium-webdriver');
let Page = require('./base_page');

Page.prototype.searchTheGame = async function(name){
    await this.find("//input[contains(@id, 'store_nav_search_term')]", 50000).sendKeys(name, Key.RETURN);
    let isThisPage = await this.find("//a[@id='sort_by_trigger']").getText();
    if(isThisPage === "Relevance"){
        return true;
    } else{
        return false;
    }
}

Page.prototype.containsSearchedName = async function(name){
    if(await this.find("//input[@id = 'term']", 50000).getAttribute("value") === name)
    {
        return true;
    }else{
        return false;
    }
}

Page.prototype.nameEquals = async function(name){
    let firstName = await this.find("//div[@id='search_result_container']//a[1]//span[@class='title']", 50000).getText();
    if(firstName === name){
        return true;
    } else {
        return false;
    }
}
let obj = {};
let obj2 = {};
Page.prototype.saveInfo = async function(){
    let getPlatform = await this.findAll("//div[@id='search_result_container']//a[1]//span[contains(@class, 'platform_img')]", 50000),
    getName = await this.find("//div[@id='search_result_container']//a[1]//span[@class='title']", 50000).getText(),
    getReleaseDate = await this.find("//div[@id='search_result_container']//a[1]//div[contains(@class, 'search_released')]", 50000).getText(),
    getReviewSummary = await this.find("//div[@id='search_result_container']//a[1]//span[contains(@class, 'search_review_summary')]", 50000).getAttribute("data-tooltip-html"),
    getPrice = await this.find("//div[@id='search_result_container']//a[1]//div[2][contains(@class, 'search_price')]", 50000).getText(),
    getPlatform2 = await this.findAll("//div[@id='search_result_container']//a[2]//span[contains(@class, 'platform_img')]", 50000),
    getName2 = await this.find("//div[@id='search_result_container']//a[2]//span[@class='title']", 50000).getText(),
    getReleaseDate2 = await this.find("//div[@id='search_result_container']//a[2]//div[contains(@class, 'search_released')]", 50000).getText(),
    getReviewSummary2 = await this.find("//div[@id='search_result_container']//a[2]//span[contains(@class, 'search_review_summary')]", 50000).getAttribute("data-tooltip-html"),
    getPrice2 = await this.find("//div[@id='search_result_container']//a[2]//div[2][contains(@class, 'search_price')]", 50000).getText()
    obj.Name = getName;
    obj.ReleaseDate = getReleaseDate;
    obj.ReviewSummary = getReviewSummary;
    obj.Price = getPrice;
    for(let el of getPlatform){
        let element = await el.getAttribute("class");
        obj[`${element.slice(13)}`] = element.slice(13);
    }
    obj2.Name = getName2;
    obj2.ReleaseDate = getReleaseDate2;
    obj2.ReviewSummary = getReviewSummary2;
    obj2.Price = getPrice2;
    for(let el of getPlatform2){
        let element = await el.getAttribute("class");
        let platformName = element.slice(13);
        obj2[`${platformName}`] = platformName;
    }
    return [obj,obj2];
}
Page.prototype.savePreviousInfo = async function(){
    return [obj,obj2];
}
Page.prototype.searchOtherGame = async function(){
    let search = await this.saveInfo();
    await this.searchTheGame(search[1]['Name']);
    if(await this.containsSearchedName(search[1]['Name']) === true){
        return true;
    } else {
        return false;
    }
};

Page.prototype.containsStoredItems = async function(){
    const previousInfo = JSON.parse(JSON.stringify(await this.savePreviousInfo()));
    const storedInfo = await this.saveInfo();
    delete storedInfo[0].win;
    delete storedInfo[0].mac;
    delete storedInfo[0].linux;
    delete storedInfo[1].streamingvideoseries;
    function isEqual(obj, obj2){
        const props = Object.getOwnPropertyNames(obj);
        const props2 = Object.getOwnPropertyNames(obj2);
        if(props.length !== props2.length){
            return false;
        }
        for(let i = 0; i < props.length; i++){
            const prop = props[i];
            if(obj[prop] !== obj2[prop]){
                return false
            }
        }
        return true;
    }
    if (isEqual(previousInfo[1], storedInfo[0]) === true && isEqual(previousInfo[0], storedInfo[1])){
        return true;
    } else{
        return false;
    };
};

module.exports = Page;