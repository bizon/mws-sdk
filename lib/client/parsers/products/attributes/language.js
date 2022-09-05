const {parseString} = require('../../base')

module.exports = (key, node) => ({
  name: parseString(`${key}/products2:Name`, node),
  type: parseString(`${key}/products2:Type`, node),
  audioFormat: parseString(`${key}/products2:AudioFormat`, node),
})
