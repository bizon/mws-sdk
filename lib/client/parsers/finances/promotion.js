const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  promotionType: parseStr(`${key}/PromotionType`, node),
  promotionId: parseStr(`${key}/PromotionId`, node),
  promotionAmount: parseCurrencyAmount(`${key}/PromotionAmount`, node)
})
