const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolve('src')
    };
    config.entry=["babel-polyfill", "./src/index.js"];
    return config;
  };