let Page = require('./base_page');

Page.prototype.openPrivacyPolicy = function(){
    this.find("//div[@id='footer']//a[contains(text(), 'Privacy Policy')]");
}
module.exports = Page;