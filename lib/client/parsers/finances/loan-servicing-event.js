const {parseString} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  loanAmount: parseCurrencyAmount(`${key}/finances:LoanAmount`, node),
  sourceBusinessEventType: parseString(`${key}/finances:SourceBusinessEventType`, node),
})
