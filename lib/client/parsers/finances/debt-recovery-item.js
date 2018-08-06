const {parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  recoveryAmount: parseCurrencyAmount(`${key}/RecoveryAmount`, node),
  originalAmount: parseCurrencyAmount(`${key}/OriginalAmount`, node),
  groupBeginDate: parseDate(`${key}/GroupBeginDate`, node),
  groupEndDate: parseDate(`${key}/GroupEndDate`, node)
})
