const fs = require("fs");
let config = JSON.parse(fs.readFileSync("./json/config.json", "utf8"));
let testFiles = JSON.parse(fs.readFileSync("./json/test_files.json", "utf8"));
let info = fs.readFileSync(
    config["driverConfig"]["filePath"],
    config["driverConfig"]["fileExtension"]
  );

  module.exports = {fs, config, info, testFiles};