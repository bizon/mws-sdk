const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  state: parseStr(`${key}/products:State`, node),
  country: parseStr(`${key}/products:Country`, node),
})
