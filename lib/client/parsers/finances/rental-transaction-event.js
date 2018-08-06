const select = require('../select')

const {parseStr, parseNumber, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseTaxWithheldComponent = require('./tax-withheld-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/AmazonOrderId`, node),
  rentalEventType: parseStr(`${key}/RentalEventType`, node),
  extensionLength: parseNumber(`${key}/ExtensionLength`, node),
  postedDate: parseDate(`${key}/PostedDate`, node),
  rentalChargeList: select(`${key}/RentalChargeList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  rentalFeeList: select(`${key}/RentalFeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  marketplaceName: parseStr(`${key}/MarketplaceName`, node),
  rentalInitialValue: parseCurrencyAmount(`${key}/RentalInitialValue`, node),
  rentalReimbursement: parseCurrencyAmount(`${key}/RentalReimbursement`, node),
  rentalTaxWithheldList: select(`${key}/RentalTaxWithheldList/TaxWithheldComponent`, node).map(n => {
    return parseTaxWithheldComponent('.', n)
  })
})
