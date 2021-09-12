const {parseStr} = require('../base')

const select = require('../select')

const parseTaxClassification = require('./tax-classification')

module.exports = (key, node) => ({
  companyLegalName: parseStr(`${key}/orders:CompanyLegalName`, node),
  taxingRegion: parseStr(`${key}/orders:TaxingRegion`, node),
  taxClassifications: select(`${key}/orders:TaxClassifications/orders:TaxClassification`, node).map(n => parseTaxClassification('.', n)),
})
