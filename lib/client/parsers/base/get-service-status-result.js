const {parseString, parseDate} = require('.')

module.exports = (key, node) => ({
  status: parseString(`${key}/*[local-name() = 'Status']`, node),
  timestamp: parseDate(`${key}/*[local-name() = 'Timestamp']`, node),
})
