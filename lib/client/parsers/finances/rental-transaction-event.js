const select = require('../select')

const {parseStr, parseNumber, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseTaxWithheldComponent = require('./tax-withheld-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
  rentalEventType: parseStr(`${key}/finances:RentalEventType`, node),
  extensionLength: parseNumber(`${key}/finances:ExtensionLength`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  rentalChargeList: select(`${key}/finances:RentalChargeList/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  rentalFeeList: select(`${key}/finances:RentalFeeList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  marketplaceName: parseStr(`${key}/finances:MarketplaceName`, node),
  rentalInitialValue: parseCurrencyAmount(`${key}/finances:RentalInitialValue`, node),
  rentalReimbursement: parseCurrencyAmount(`${key}/finances:RentalReimbursement`, node),
  rentalTaxWithheldList: select(`${key}/finances:RentalTaxWithheldList/finances:TaxWithheldComponent`, node).map(n => {
    return parseTaxWithheldComponent('.', n)
  })
})
