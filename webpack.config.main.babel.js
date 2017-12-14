import webpack from 'webpack';
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
  plugins: [
    new webpack.DefinePlugin({
      $dirname: '__dirname',
    }),
  ],
  target: 'electron',
};

export default mainConfig;
