const {parseString, parseNumber} = require('../base')
const select = require('../select')

const parseChargeComponent = require('./charge-component')

module.exports = (key, node) => ({
  itemChargeList: select(
    [
      `${key}/finances:itemChargeList/finances:ChargeComponent`,
      `${key}/finances:ItemChargeList/finances:ChargeComponent`,
    ],
    node,
  ).map((n) => parseChargeComponent('.', n)),

  productDescription: parseString(
    [`${key}/finances:productDescription`, `${key}/finances:ProductDescription`],
    node,
  ),

  quantity: parseNumber([`${key}/finances:quantity`, `${key}/finances:Quantity`], node),
})
