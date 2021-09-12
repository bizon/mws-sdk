const parseIdentifiers = require('./identifiers')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/products:Identifiers`, node),
})
