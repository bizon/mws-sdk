const {parseBool} = require('../../../base')

module.exports = (key, node) => ({
  isNationalPrime: parseBool(`${key}/IsNationalPrime`, node),
  isPrime: parseBool(`${key}/IsPrime`, node)
})
