const {parseBool} = require('../../base')

module.exports = (key, node) => ({
  isNationalPrime: parseBool(`${key}/products:IsNationalPrime`, node),
  isPrime: parseBool(`${key}/products:IsPrime`, node),
})
