/**
 * @description 子配置，通用配置|网络配置导出
 */
const setting = require('./setting.config.js')
const network = require('./net.config.js')
const theme = require('./theme.config.js')
module.exports = Object.assign({}, setting, network, theme)
