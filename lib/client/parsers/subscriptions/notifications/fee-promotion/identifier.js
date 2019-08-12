const select = require('../../../select')

const {parseStr} = require('../../../base')

const parseIdentifierValue = require('./identifier-value')

module.exports = (key, node) => ({
  identifierType: parseStr(`${key}/IdentifierType`, node),
  identifierValueList: select(`${key}/IdentifierValueList`, node).map(n => {
    return parseIdentifierValue('.', n)
  })
})
