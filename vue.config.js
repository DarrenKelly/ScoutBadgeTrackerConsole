const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // By default, babel-loader ignores files in node_modules.
  // Firebase packages are pre-compiled and including them in transpileDependencies
  // can lead to build errors by interfering with webpack's module resolution.
  transpileDependencies: [],
});
