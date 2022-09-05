const {parseString} = require('../../../base')

module.exports = (key, node) => ({
  state: parseString(`${key}/State`, node),
  country: parseString(`${key}/Country`, node),
})
