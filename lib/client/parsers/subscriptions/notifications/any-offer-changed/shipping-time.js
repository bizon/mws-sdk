const {
  parseAttributeString,
  parseAttributeNumber,
  parseAttributeDate,
} = require('../../../base/attributes')

module.exports = (key, node) => ({
  minimumHours: parseAttributeNumber(key, node, 'minimumHours'),
  maximumHours: parseAttributeNumber(key, node, 'maximumHours'),
  availableDate: parseAttributeDate(key, node, 'availableDate'),
  availabilityType: parseAttributeString(key, node, 'availabilityType'),
})
