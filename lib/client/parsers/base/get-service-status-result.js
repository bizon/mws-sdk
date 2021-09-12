const {parseStr, parseDate} = require('.')

module.exports = (key, node) => ({
  status: parseStr(`${key}/*[local-name() = 'Status']`, node),
  timestamp: parseDate(`${key}/*[local-name() = 'Timestamp']`, node),
})
