// node.js server used to serve assets bundled by Webpack
// use `npm start` command to launch the server.
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config')('development');
console.log('Starting the dev web server...');
const port = 8080;
const path = require('path');

const options = {
  publicPath: "/",
  hot: false,
  inline: true,
  stats: { colors: true },
  watchOptions: {
  	ignored: /node_modules/
  },
  overlay: {
	  warnings: true,
	  errors: true
  }
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});