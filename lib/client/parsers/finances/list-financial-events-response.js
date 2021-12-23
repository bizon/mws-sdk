const parseResponseMetadata = require('../base/response-metadata')

const parseListFinancialEventsResult = require('./list-financial-events-result')

module.exports = (key, node, token = false) => ({
  listFinancialEventsResult: parseListFinancialEventsResult(
    token
      ? `${key}/finances:ListFinancialEventsByNextTokenResult`
      : `${key}/finances:ListFinancialEventsResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/finances:ResponseMetadata`, node),
})
