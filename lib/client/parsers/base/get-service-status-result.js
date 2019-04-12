const {parseStr, parseDate} = require('.')

module.exports = (key, node) => ({
  status: parseStr(`${key}/Status`, node),
  timestamp: parseDate(`${key}/Timestamp`, node)
})
