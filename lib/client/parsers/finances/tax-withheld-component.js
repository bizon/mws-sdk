const select = require('../select')
const {parseStr} = require('../base')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  taxCollectionModel: parseStr(`${key}/finances:taxCollectionModel`, node),
  TaxesWithheld: select(`${key}/finances:TaxesWithheld/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  })
})
