const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const js = require('./webpack.javascript.js');
const css = require('./webpack.css.js');
const html = require('./webpack.html.js');

const appDirectory = fs.realpathSync(process.cwd());

const PATHS = {
  app: path.join(appDirectory, 'src'),
  build: path.join(appDirectory, 'build'),
  appHtml: path.join(appDirectory, 'public', 'index.html'),
};

const browserlist = ['ie >= 9'];

const coreConfig =     {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  entry: {
    app: [require.resolve('./polyfills'), PATHS.app],
  },
  output: {
    path: PATHS.build,
    filename: 'static/js/[name].js',
//    publicPath: "/",
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
  },
};

const debugConfig = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],  
};



const commonConfig = merge([
  coreConfig,
  debugConfig,

  /* loaders are processed bottom to top, right to left */
  js.babelLoader(browserlist),
  js.eslintLoader(browserlist),
  css.cssLoader(browserlist),

  /* plugins */
  html.appHtmlPlugin(PATHS.appHtml, ['manifest', 'vendor', 'app']),
  js.vendorChunkPlugin(),
  js.manifestChunkPlugin(),
]);


const productionConfig = () => commonConfig;

const developmentConfig = () => commonConfig;

module.exports = (env) => {
  console.log('env', env);  
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
};

