const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = function (env, argv) {
  const isDevelopmentEnv = argv.mode === 'development';
  const isProductionEnv = argv.mode === 'production';

  const config = {
    mode: isProductionEnv ? 'production' : isDevelopmentEnv && 'development',
    entry: './src/index',
    devtool: isProductionEnv ? false : isDevelopmentEnv && 'source-map',
    output: {
      path: isProductionEnv
        ? path.join(__dirname, '/dist')
        : isDevelopmentEnv && path.join(__dirname, '/dist-dev'),
      filename: isProductionEnv
        ? 'static/js/[name].[contenthash:8].js'
        : isDevelopmentEnv && 'static/js/bundle.js',
      chunkFilename: isProductionEnv
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isDevelopmentEnv && 'static/js/[name].chunk.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: isDevelopmentEnv
                    ? '[name]_[local]_[hash:base64:5]'
                    : undefined,
                },
              },
            },
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /\.module\.css$/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          collapseWhitespace: isProductionEnv,
          collapseInlineTagWhitespace: isProductionEnv,
          removeComments: isProductionEnv,
        },
      }),
    ],
  };

  if (isDevelopmentEnv) {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'source-map-loader',
      },
      enforce: 'pre',
    });
  }

  return config;
};
