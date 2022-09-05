const {parseString} = require('../base')
const select = require('../select')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  marketplaceCountryCode: parseString(`${key}/finances:MarketplaceCountryCode`, node),
  amount: parseCurrencyAmount(`${key}/finances:Amount`, node),
  productGroupList: select(`${key}/finances:ProductGroupList`, node).map((n) =>
    parseString('.', n),
  ),
})
