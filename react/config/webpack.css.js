const autoprefixer = require('autoprefixer');

exports.cssLoader = (browserlist) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules:true,
              localIdentName: '[path]_[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: browserlist,
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ],
  },
});