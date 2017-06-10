const webpack = require('webpack');

exports.babelLoader = (browserlist, uglify = false) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: browserlist,
                  uglify: uglify,
                },
                useBuiltIns: false,
                modules: false,
              }],
            ],
            plugins: [
              require.resolve('babel-plugin-transform-class-properties'),
              [
                require('babel-plugin-transform-object-rest-spread'),
                { useBuiltIns: true},
              ],
              require.resolve('babel-plugin-syntax-dynamic-import'),
              // following needed for async/await and generators
              [
                // Async functions are converted to generators by babel-preset-env
                require.resolve('babel-plugin-transform-regenerator'),
                { async: false },
              ],
              [
                require.resolve('babel-plugin-transform-runtime'),
                {
                  helpers: false,
                  polyfill: false,
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
});


exports.eslintLoader = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.vendorChunkPlugin = () => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }

            // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],
});

exports.manifestChunkPlugin = () => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      minChunks: Infinity,
    }),
  ],
});
