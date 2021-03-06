const select = require('../select')

const {parseStr, parseNumber} = require('../base')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  itemChargeList: select([
    `${key}/finances:itemChargeList/finances:ChargeComponent`,
    `${key}/finances:ItemChargeList/finances:ChargeComponent`
  ], node).map(n => {
    return parseChargeComponent('.', n)
  }),

  productDescription: parseStr([
    `${key}/finances:productDescription`,
    `${key}/finances:ProductDescription`
  ], node),

  quantity: parseNumber([
    `${key}/finances:quantity`,
    `${key}/finances:Quantity`
  ], node)
})
