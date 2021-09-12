const select = require('../select')
const {parseStr} = require('../base')

const parseParticipation = require('./participation')
const parseMarketplace = require('./marketplace')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/sellers:NextToken`, node),
  participations: select(`${key}/sellers:ListParticipations/sellers:Participation`, node).map(n => parseParticipation('.', n)),
  marketplaces: select(`${key}/sellers:ListMarketplaces/sellers:Marketplace`, node).map(n => parseMarketplace('.', n)),
})
