const {parseStr} = require('../base')

module.exports = (key, node) => ({
  customizedURL: parseStr(`${key}/orders:CustomizedURL`, node)
})
