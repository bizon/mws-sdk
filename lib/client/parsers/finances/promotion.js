const {parseString} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  promotionType: parseString(`${key}/finances:PromotionType`, node),
  promotionId: parseString(`${key}/finances:PromotionId`, node),
  promotionAmount: parseCurrencyAmount(`${key}/finances:PromotionAmount`, node),
})
