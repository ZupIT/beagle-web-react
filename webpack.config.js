const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: {
    index: path.resolve(__dirname, 'src', 'index.tsx'),
  },

  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    open: true,
  },

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
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
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'react-svg-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      containers: path.resolve(__dirname, 'src/containers'),
      components: path.resolve(__dirname, 'src/components'),
      core: path.resolve(__dirname, 'src/core'),
      routes: path.resolve(__dirname, 'src/routes'),
      store: path.resolve(__dirname, 'src/store'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
  ],
}
