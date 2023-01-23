let Page = require("../lib/privacy_policy");
let Page2 = require("../lib/game_search");
let Page3 = require("../lib/base_page");
const assert = require("chai").assert;
const testFiles = require("../json/test_files.json");
let page;
let base; 
describe("Privacy policy", function () {
  before(async () => {
    page = new Page();
  });
  it("Opening Privacy Policy", async function () {
    this.timeout(50000);
    page.visit("https://store.steampowered.com/", 50000);
    // assert.isNotEmpty(page3)
    assert.equal(
      await page.openPrivacyPolicy(),
      true,
      "Error in Privacy Policy"
    );
  });
  it("Check languages", async function () {
    this.timeout(50000);
    for(const[key, value] of Object.entries(testFiles[0])){
      assert.equal(await page.findAllLanguages(value),true,`${value} is not shown`);
    }
  });
  it("Signed year check", async function () {
    this.timeout(50000);
    assert.equal(await page.signedYear(),true,"Not this year");
  });
  after(()=>{
    page.quit();
  });
});
describe("Game search", function(){
    before(() => {
      this.timeout(50000);
        page = new Page2();
        page.visit("https://store.steampowered.com/");
      });
    it("Searching Dota 2", async function(){
      this.timeout(50000);
        assert.equal(await page.searchTheGame("Dota 2"), true, "Not this page");
        assert.equal(await page.containsSearchedName("Dota 2"), true, "The game name is not in the search box");
        assert.equal(await page.nameEquals("Dota 2"), true, "The first name is not equal to searched game");
        await page.saveInfo();
    });

    it("Searching seconds element", async function(){
    this.timeout(50000);
        assert.equal(await page.searchOtherGame(), true, "Misspeled or other game name written");
    });
    it("Contains stored items", async function(){
    this.timeout(50000);
        assert.equal(await page.containsStoredItems(), true, "Stored items are not equal");
    });
    after(()=>{
        page.quit();
      });
});