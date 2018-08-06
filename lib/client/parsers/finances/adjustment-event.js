const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseAdjustmentItem = require('./adjustment-item')

module.exports = (key, node) => ({
  adjustmentType: parseStr(`${key}/AdjustmentType`, node),
  adjustmentAmount: parseCurrencyAmount(`${key}/AdjustmentAmount`, node),
  adjustmentItemList: select(`${key}/AdjustmentItemList/AdjustmentItem`, node).map(n => {
    return parseAdjustmentItem('.', n)
  }),
  postedDate: parseDate(`${key}/PostedDate`, node)
})
