const select = require('../../../select')

const parseOffer = require('./offer')
const parseOfferChangeTrigger = require('./offer-change-trigger')
const parseSummary = require('./summary')

module.exports = (key, node) => ({
  offerChangeTrigger: parseOfferChangeTrigger(`${key}/OfferChangeTrigger`, node),
  summary: parseSummary(`${key}/Summary`, node),
  offers: select(`${key}/Offers/Offer`, node).map((n) => parseOffer('.', n)),
})
