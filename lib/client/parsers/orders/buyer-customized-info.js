const {parseStr} = require('../base')

module.exports = (key, node) => ({
  customizedURL: parseStr(`${key}/customizedURL`, node)
})
