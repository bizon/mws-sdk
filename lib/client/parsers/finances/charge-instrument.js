const {parseString} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  description: parseString(`${key}/finances:Description`, node),
  tail: parseString(`${key}/finances:Tail`, node),
  amount: nullable(parseCurrencyAmount, `${key}/finances:Amount`, node),
})
