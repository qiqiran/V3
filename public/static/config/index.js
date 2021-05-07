const system = require('./system.js')
const setting = {
  baseURL: "http://113.240.224.29:38091/HydrometeorAPI/"
}

module.exports = Object.assign({}, setting, system)