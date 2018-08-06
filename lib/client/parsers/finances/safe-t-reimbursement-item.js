const select = require('../select')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  itemChargeList: select(`${key}/ItemChargeList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  })
})
