const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/products2:Name`, node),
  type: parseStr(`${key}/products2:Type`, node),
  audioFormat: parseStr(`${key}/products2:AudioFormat`, node)
})
