const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin'); //引入compression-webpack-plugin
const resolve = (dir) => path.join(__dirname, dir);
const createThemeColorReplacerPlugin = require('./config/theme.plugin.js');
const { NODE_ENV, gzip } = process.env;
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
          globalVars: {
            hack: `true; @import (reference) "${resolve('src/assets/css/global/index.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack() {
    const plugins = [createThemeColorReplacerPlugin()];
    //生产环境
    if (NODE_ENV === 'production' && gzip) {
      plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          //压缩算法
          algorithm: 'gzip',
          //匹配文件
          test: /\.js$|\.css$|\.html$/,
          //压缩超过此大小的文件,以字节为单位
          threshold: 1024,
          //删除原始文件只保留压缩后的文件
          //deleteOriginalAssets: false
        }),
      );
    }
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
      plugins: plugins,
    };
  },
};
