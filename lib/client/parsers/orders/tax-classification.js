const {parseStr} = require('../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/orders:Name`, node),
  value: parseStr(`${key}/orders:Value`, node)
})
