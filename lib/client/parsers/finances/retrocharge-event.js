const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseTaxWithheldComponent = require('./tax-withheld-component')

module.exports = (key, node) => ({
  retrochargeEventType: parseStr(`${key}/finances:RetrochargeEventType`, node),
  amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  baseTax: parseCurrencyAmount(`${key}/finances:BaseTax`, node),
  shippingTax: parseCurrencyAmount(`${key}/finances:ShippingTax`, node),
  marketplaceName: parseStr(`${key}/finances:MarketplaceName`, node),
  retrochargeTaxWithheldComponentList: select(
    `${key}/finances:RetrochargeTaxWithheldComponentList`,
    node,
  ).map((n) => parseTaxWithheldComponent('.', n)),
})
