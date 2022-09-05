const {parseString} = require('../base')

module.exports = (key, node) => ({
  model: parseString(`${key}/orders:Model`, node),
  responsibleParty: parseString(`${key}/orders:ResponsibleParty`, node),
})
