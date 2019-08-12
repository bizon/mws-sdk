const {parseDate} = require('../../../base')

module.exports = (key, node) => ({
  effectiveFromDate: parseDate(`${key}/EffectiveFromDate`, node),
  effectiveThroughDate: parseDate(`${key}/EffectiveThroughDate`, node)
})
