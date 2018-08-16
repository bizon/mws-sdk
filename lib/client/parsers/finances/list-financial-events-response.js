const parseResponseMetadata = require('../base/response-metadata')

const parseListFinancialEventsResult = require('./list-financial-events-result')

module.exports = (key, node, token = false) => ({
  listFinancialEventsResult: parseListFinancialEventsResult(
    token ? `${key}/ListFinancialEventsByNextTokenResult` : `${key}/ListFinancialEventsResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
