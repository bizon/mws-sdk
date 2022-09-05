const {parseString} = require('../base')

module.exports = (key, node) => ({
  customizedURL: parseString(`${key}/orders:CustomizedURL`, node),
})
