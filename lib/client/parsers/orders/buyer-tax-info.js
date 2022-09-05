const {parseString} = require('../base')
const select = require('../select')

const parseTaxClassification = require('./tax-classification')

module.exports = (key, node) => ({
  companyLegalName: parseString(`${key}/orders:CompanyLegalName`, node),
  taxingRegion: parseString(`${key}/orders:TaxingRegion`, node),
  taxClassifications: select(`${key}/orders:TaxClassifications/orders:TaxClassification`, node).map(
    (n) => parseTaxClassification('.', n),
  ),
})
