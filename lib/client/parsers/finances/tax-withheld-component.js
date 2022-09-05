const {parseString} = require('../base')
const select = require('../select')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  taxCollectionModel: parseString(`${key}/finances:TaxCollectionModel`, node),
  taxesWithheld: select(`${key}/finances:TaxesWithheld/finances:ChargeComponent`, node).map((n) =>
    parseChargeComponent('.', n),
  ),
})
