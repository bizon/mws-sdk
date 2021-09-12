const select = require('../select')
const nullable = require('../nullable')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseAdjustmentItem = require('./adjustment-item')

module.exports = (key, node) => ({
  adjustmentType: parseStr(`${key}/finances:AdjustmentType`, node),
  adjustmentAmount: nullable(parseCurrencyAmount, `${key}/finances:AdjustmentAmount`, node),
  adjustmentItemList: select(`${key}/finances:AdjustmentItemList/finances:AdjustmentItem`, node).map(n => parseAdjustmentItem('.', n)),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
})
