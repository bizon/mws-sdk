const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  loanAmount: parseCurrencyAmount(`${key}/finances:LoanAmount`, node),
  sourceBusinessEventType: parseStr(`${key}/finances:SourceBusinessEventType`, node)
})
