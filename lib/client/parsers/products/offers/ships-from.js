const {parseString} = require('../../base')

module.exports = (key, node) => ({
  state: parseString(`${key}/products:State`, node),
  country: parseString(`${key}/products:Country`, node),
})
