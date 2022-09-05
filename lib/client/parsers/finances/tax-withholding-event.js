const {parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')
const parseTaxWithholdingPeriod = require('./tax-withholding-period')

module.exports = (key, node) => ({
  baseAmount: nullable(parseCurrencyAmount, `${key}/finances:BaseAmount`, node),
  withheldAmount: nullable(parseCurrencyAmount, `${key}/finances:WithheldAmount`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  taxWithholdingPeriod: nullable(
    parseTaxWithholdingPeriod,
    `${key}/finances:TaxWithholdingPeriod`,
    node,
  ),
})
