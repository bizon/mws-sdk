const {parseStr} = require('../base')

module.exports = (key, node) => ({
  model: parseStr(`${key}/Model`, node),
  responsibleParty: parseStr(`${key}/ResponsibleParty`, node)
})
