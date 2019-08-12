const select = require('../../../select')

const {parseStr} = require('../../../base')

const parseIdentifier = require('./identifier')
const parsePromotionActiveTimeRange = require('./promotion-active-time-range')
const parsePromotionInformation = require('./promotion-information')

module.exports = (key, node) => ({
  feePromotionType: parseStr(`${key}/FeePromotionType`, node),
  feePromotionTypeDescription: parseStr(`${key}/FeePromotionTypeDescription`, node),
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  merchantId: parseStr(`${key}/MerchantId`, node),
  identifierList: select(`${key}/IdentifierList/Identifier`, node).map(n => {
    return parseIdentifier('.', n)
  }),
  promotionActiveTimeRange: parsePromotionActiveTimeRange(`${key}/PromotionActiveTimeRange`, node),
  promotionInformation: parsePromotionInformation(`${key}/PromotionInformation`, node)
})
