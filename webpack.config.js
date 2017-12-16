import CopyWebpackPlugin from 'copy-webpack-plugin';
import { join } from 'path';

export default function (webpackConfig, env) {
  const distPath = env === 'development' ? '/' : './';

  function transform(content) {
    return content.toString()
      .replace(/\{\{distPath\}\}/g, distPath);
  }

  webpackConfig.resolve.modules = [  // eslint-disable-line
    ...webpackConfig.resolve.modules,
    join(__dirname, 'app/node_modules'),
  ];

  if (webpackConfig.entry.index) {
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from: 'src/renderer/index.html',
          to: '[name].[ext]',
          transform,
        },
      ]),
    );
  }

  webpackConfig.module.rules[0].options.name = 'static/[name].[ext]'; // eslint-disable-line

  Object.assign(webpackConfig.node, { Buffer: false });
  return webpackConfig;
}
