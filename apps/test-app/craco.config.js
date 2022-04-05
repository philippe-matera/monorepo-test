
//const CracoEsbuildPlugin = require('craco-esbuild')
//const { ProvidePlugin } = require('webpack')
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../../packages/test-common"));
packages.push(path.join(__dirname, "../../packages/utils"));

module.exports = {
  webpack: {
    configure : (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
  
        match.loader.include = include.concat(packages);
      }
      console.log(match.loader.include)
  
      return webpackConfig;
    }
  }
}
