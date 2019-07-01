const {parseStr} = require('../../../base')

module.exports = (key, node) => ({
  state: parseStr(`${key}/State`, node),
  country: parseStr(`${key}/Country`, node)
})
