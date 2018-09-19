const {parseStr} = require('../base')

const select = require('../select')

const parseTaxClassification = require('./tax-classification')

module.exports = (key, node) => ({
  companyLegalName: parseStr(`${key}/CompanyLegalName`, node),
  taxingRegion: parseStr(`${key}/TaxingRegion`, node),
  taxClassifications: select(`${key}/TaxClassifications/TaxClassification`, node).map(n => {
    return parseTaxClassification('.', n)
  })
})
