const {parseStr} = require('../base')

module.exports = (key, node) => ({
  model: parseStr(`${key}/orders:Model`, node),
  responsibleParty: parseStr(`${key}/orders:ResponsibleParty`, node),
})
