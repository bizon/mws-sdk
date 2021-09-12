const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  promotionType: parseStr(`${key}/finances:PromotionType`, node),
  promotionId: parseStr(`${key}/finances:PromotionId`, node),
  promotionAmount: parseCurrencyAmount(`${key}/finances:PromotionAmount`, node),
})
