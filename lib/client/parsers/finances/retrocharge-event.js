const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseCurrencyAmount = require('./currency-amount')
const parseTaxWithheldComponent = require('./tax-withheld-component')

module.exports = (key, node) => ({
  retrochargeEventType: parseString(`${key}/finances:RetrochargeEventType`, node),
  amazonOrderId: parseString(`${key}/finances:AmazonOrderId`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  baseTax: parseCurrencyAmount(`${key}/finances:BaseTax`, node),
  shippingTax: parseCurrencyAmount(`${key}/finances:ShippingTax`, node),
  marketplaceName: parseString(`${key}/finances:MarketplaceName`, node),
  retrochargeTaxWithheldComponentList: select(
    `${key}/finances:RetrochargeTaxWithheldComponentList`,
    node,
  ).map((n) => parseTaxWithheldComponent('.', n)),
})
