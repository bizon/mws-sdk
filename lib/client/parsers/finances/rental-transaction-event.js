const {parseString, parseNumber, parseDate} = require('../base')
const select = require('../select')

const parseChargeComponent = require('./charge-component')
const parseCurrencyAmount = require('./currency-amount')
const parseFeeComponent = require('./fee-component')
const parseTaxWithheldComponent = require('./tax-withheld-component')

module.exports = (key, node) => ({
  amazonOrderId: parseString(`${key}/finances:AmazonOrderId`, node),
  rentalEventType: parseString(`${key}/finances:RentalEventType`, node),
  extensionLength: parseNumber(`${key}/finances:ExtensionLength`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  rentalChargeList: select(`${key}/finances:RentalChargeList/finances:ChargeComponent`, node).map(
    (n) => parseChargeComponent('.', n),
  ),
  rentalFeeList: select(`${key}/finances:RentalFeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
  marketplaceName: parseString(`${key}/finances:MarketplaceName`, node),
  rentalInitialValue: parseCurrencyAmount(`${key}/finances:RentalInitialValue`, node),
  rentalReimbursement: parseCurrencyAmount(`${key}/finances:RentalReimbursement`, node),
  rentalTaxWithheldList: select(
    `${key}/finances:RentalTaxWithheldList/finances:TaxWithheldComponent`,
    node,
  ).map((n) => parseTaxWithheldComponent('.', n)),
})
