import { readFileSync } from 'fs';
import { resolve, join, isAbsolute } from 'path';
import os from 'os';

const BUILD_TYPE = process.argv[2] || 'all';
const appPkg = JSON.parse(readFileSync(join(__dirname, 'app/package.json'), 'utf-8'));

const nodeAndElectronExternals = [
  'electron',
  'fs',
  'path',
  'os',
  'url',
  'child_process'
];

const thirdPartExternals = [
  ...Object.keys(appPkg.dependencies || {}),
];

const antd = [
  "import",
  [
    {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": true
    }
  ]
];

export default {
  entry: {
    index: './src/renderer/index.js',
  },
  outputPath: "./app/dist",
  publicPath: "./",
  define: {
    $dirname: "__dirname",
  },
  env: {
    development: {
      devtool: "#cheap-module-source-map",
      extraBabelPlugins: [
        antd,
        "babel-plugin-dva-hmr",
        "transform-runtime"
      ]
    },
    production: {
      devtool: '',
      extraBabelPlugins: [
        antd,
        "transform-runtime"
      ]
    }
  },
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    if (nodeAndElectronExternals.indexOf(request) !== -1) {
      isExternal = `require('${request}')`;
    }
    if (thirdPartExternals.indexOf(request) !== -1) {
      const orininalPath = join(__dirname, 'app/node_modules', request);
      const requireAbsolute = `require('${os.platform() === 'win32' ? orininalPath.replace(/\\/g, '//') : orininalPath}')`
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    if (isAbsolute(request)) {
      isExternal = `require('${request}')`;
    }
    callback(null, isExternal);
  },
};
