const parseResponseMetadata = require('../base/response-metadata')

const parseListFinancialEventsResult = require('./list-financial-events-result')

module.exports = (key, node) => ({
  listFinancialEventsResult: parseListFinancialEventsResult(`${key}/ListFinancialEventsResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
