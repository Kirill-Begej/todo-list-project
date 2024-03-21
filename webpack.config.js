const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]',
    },
  };

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              browsers: 'last 4 versions',
            },
          ],
        ],
      },
    },
  };

  const scssLoader = {
    test: /\.s?(c|a)ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      isProd && postCssLoader,
      'sass-loader',
    ],
  };

  const babelLoader = {
    test: /\.(?:js|mjs|cjs)$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
        ],
      },
    },
  };

  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'pages', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      port: env.port ?? 8080,
      open: true,
      hot: true,
    },
    devtool: isDev && 'inline-source-map',
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      isDev && new ESLintPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        fontsLoader,
        scssLoader,
        babelLoader,
      ],
    },
  };
};
