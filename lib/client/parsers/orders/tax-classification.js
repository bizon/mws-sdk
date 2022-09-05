const {parseString} = require('../base')

module.exports = (key, node) => ({
  name: parseString(`${key}/orders:Name`, node),
  value: parseString(`${key}/orders:Value`, node),
})
