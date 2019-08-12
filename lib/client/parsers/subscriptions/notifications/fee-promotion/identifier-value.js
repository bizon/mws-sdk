const {parseStr} = require('../../../base')

module.exports = (key, node) => ({
  identifierValueId: parseStr(`${key}/IdentifierValueId`, node),
  identifierValueFriendlyName: parseStr(`${key}/IdentifierValueFriendlyName`, node)
})
