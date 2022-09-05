const {parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  recoveryAmount: nullable(parseCurrencyAmount, `${key}/finances:RecoveryAmount`, node),
  originalAmount: nullable(parseCurrencyAmount, `${key}/finances:OriginalAmount`, node),
  groupBeginDate: parseDate(`${key}/finances:GroupBeginDate`, node),
  groupEndDate: parseDate(`${key}/finances:GroupEndDate`, node),
})
