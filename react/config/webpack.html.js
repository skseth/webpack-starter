const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.appHtmlPlugin = (appHtmlPath, scriptorder) => ({
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtmlPath,
      chunksSortMode: (c1, c2) => {
        let o1 = scriptorder.indexOf(c1.names[0]);
        let o2 = scriptorder.indexOf(c2.names[0]);
        return o1 - o2;
      },
    }),
  ],
});