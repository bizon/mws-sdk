const parseResponseMetadata = require('../base/response-metadata')

const parseListFinancialEventGroupsResult = require('./list-financial-event-groups-result')

module.exports = (key, node, token = false) => ({
  listFinancialEventGroupsResult: parseListFinancialEventGroupsResult(
    token ? `${key}/ListFinancialEventGroupsByNextTokenResult` : `${key}/ListFinancialEventGroupsResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
