const { defineConfig } = require("karma");

module.exports = defineConfig({
   frameworks: ["jasmine"],
   files: ["src/**/*.test.js"],
   preprocessors: {
      "src/**/*.test.js": ["webpack", "sourcemap"],
   },
   webpack: require("./webpack.config.js"),
   reporters: ["progress", "kjhtml"],
   browsers: ["ChromeHeadless"],
   singleRun: true,
   concurrency: Infinity,
});
