const system = require('./system.js')
const setting = {
  // baseURL: "http://10.219.86.102:8091/HydrometeorAPI/",
  baseURL: "http://113.240.224.29:38091/HydrometeorAPI/"
}

module.exports = Object.assign({}, setting, system)