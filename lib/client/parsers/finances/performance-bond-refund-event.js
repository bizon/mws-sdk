const select = require('../select')

const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  marketplaceCountryCode: parseStr(`${key}/MarketplaceCountryCode`, node),
  amount: parseCurrencyAmount(`${key}/Amount`, node),
  productGroupList: select(`${key}/ProductGroupList`, node).map(n => {
    return parseStr('.', n)
  })
})
