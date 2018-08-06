const select = require('../select')
const {parseStr} = require('../base')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  taxCollectionModel: parseStr(`${key}/taxCollectionModel`, node),
  TaxesWithheld: select(`${key}/TaxesWithheld/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  })
})
