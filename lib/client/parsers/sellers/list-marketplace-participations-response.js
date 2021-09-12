const parseResponseMetadata = require('../base/response-metadata')

const parseListMarketplaceParticipationsResult = require('./list-marketplace-participations-result')

module.exports = (key, node, token = false) => ({
  listMarketplaceParticipationsResult: parseListMarketplaceParticipationsResult(
    token
      ? `${key}/sellers:ListMarketplaceParticipationsByNextTokenResult`
      : `${key}/sellers:ListMarketplaceParticipationsResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/sellers:ResponseMetadata`, node),
})
