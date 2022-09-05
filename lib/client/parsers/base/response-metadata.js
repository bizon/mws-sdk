const {parseString} = require('.')

module.exports = (key, node) => ({
  requestId: parseString(`${key}/*[local-name() = 'RequestId']`, node),
})
