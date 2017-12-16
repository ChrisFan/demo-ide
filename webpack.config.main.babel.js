import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { join } from 'path';

const packageJson = require('./app/package.json');

const dependencies = Object.keys(packageJson.dependencies);
const outputPath = join(__dirname, 'app', 'dist');

const mainConfig = {
  entry: {
    main: './src/main/index.js',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  externals(context, request, callback) {
    callback(null, (dependencies.indexOf(request) > -1) ? `require("${request}")` : false);
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
        },
      },
      {
        test: /\.(css|less)$/,
        loader: ['css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
        transform(content) {
          return content.toString().replace(
            /"object"==typeof module&&"object"==typeof module.exports/gm,
            'false',
          );
        },
      },
    ]),
  ],
  target: 'electron',
};

export default mainConfig;
