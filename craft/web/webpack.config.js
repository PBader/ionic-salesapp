const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/main.js',
  mode: 'development',
  output: {
    filename: 'assets/[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, './src/scss'),
      path.resolve(__dirname, './src/js'),
      path.resolve(__dirname, './src/assets/images'),
      path.resolve(__dirname, './src/assets/fonts'),
      path.resolve(__dirname, './node_modules'),
    ],
    alias: {
      scss: path.resolve(__dirname, 'src/scss/'),
      js: path.resolve(__dirname, 'src/js/'),
      assets: path.resolve(__dirname, 'src/assets/'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/assets/style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [
              'babel-plugin-syntax-dynamic-import',
              'babel-plugin-transform-runtime',
              'babel-plugin-transform-object-assign',
            ]
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
            publicPath: '/',
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
            publicPath: '/',
          },
        },
      },
    ],
  },
};

