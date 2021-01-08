const {parseNumber} = require('../base')

module.exports = (key, node) => ({
  startDateMillis: parseNumber(`${key}/finances:StartDateMillis`, node),
  endDateMillis: parseNumber(`${key}/finances:EndDateMillis`, node)
})
