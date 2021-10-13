const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const createThemeColorReplacerPlugin = require('./config/theme.plugin.js');
const { publicPath, assetsDir, outputDir, devPort } = require('./config');

module.exports = {
  // 开发以及部署时的URL
  publicPath: publicPath,
  // 生产环境构建文件的目录名
  outputDir: outputDir,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: assetsDir,
  devServer: {
    hot: true,
    port: devPort,
    // open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/assets/css/global/index.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '#': resolve('src/framework'),
          src: resolve('src'),
          static: resolve('public/static'),
          config: resolve('config'),
        },
      },
      plugins: [createThemeColorReplacerPlugin()],
    };
  },
};
