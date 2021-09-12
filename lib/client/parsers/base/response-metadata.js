const {parseStr} = require('.')

module.exports = (key, node) => ({
  requestId: parseStr(`${key}/*[local-name() = 'RequestId']`, node),
})
