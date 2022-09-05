const {parseString} = require('../base')
const select = require('../select')

const parseMarketplace = require('./marketplace')
const parseParticipation = require('./participation')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/sellers:NextToken`, node),
  participations: select(`${key}/sellers:ListParticipations/sellers:Participation`, node).map((n) =>
    parseParticipation('.', n),
  ),
  marketplaces: select(`${key}/sellers:ListMarketplaces/sellers:Marketplace`, node).map((n) =>
    parseMarketplace('.', n),
  ),
})
