const {parseStr} = require('../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/Name`, node),
  value: parseStr(`${key}/Value`, node)
})
