const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseAdjustmentItem = require('./adjustment-item')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  adjustmentType: parseString(`${key}/finances:AdjustmentType`, node),
  adjustmentAmount: nullable(parseCurrencyAmount, `${key}/finances:AdjustmentAmount`, node),
  adjustmentItemList: select(
    `${key}/finances:AdjustmentItemList/finances:AdjustmentItem`,
    node,
  ).map((n) => parseAdjustmentItem('.', n)),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
})
