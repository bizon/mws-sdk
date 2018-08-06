const select = require('../select')
const {parseStr} = require('../base')

const parseTaxClassification = require('./tax-classification')

module.exports = (key, node) => ({
  companyLegalName: parseStr(`${key}/CompanyLegalName`, node),
  taxingRegion: parseStr(`${key}/TaxingRegion`, node),
  taxClassifications: select(`${key}/TaxClassifications/TaxClassification`, node).map(n => {
    return parseTaxClassification('.', n)
  })
})
