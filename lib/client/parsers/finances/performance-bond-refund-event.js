const select = require('../select')

const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  marketplaceCountryCode: parseStr(`${key}/finances:MarketplaceCountryCode`, node),
  amount: parseCurrencyAmount(`${key}/finances:Amount`, node),
  productGroupList: select(`${key}/finances:ProductGroupList`, node).map(n => parseStr('.', n)),
})
