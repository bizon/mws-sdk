const select = require('../select')
const {parseStr} = require('../base')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  taxCollectionModel: parseStr(`${key}/finances:TaxCollectionModel`, node),
  taxesWithheld: select(`${key}/finances:TaxesWithheld/finances:ChargeComponent`, node).map((n) =>
    parseChargeComponent('.', n),
  ),
})
