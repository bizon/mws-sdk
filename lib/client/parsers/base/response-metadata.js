const {parseStr} = require('.')

module.exports = (key, node) => ({
  requestId: parseStr(`${key}/RequestId`, node)
})
