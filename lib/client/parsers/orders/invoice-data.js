const {parseStr} = require('../base')

module.exports = (key, node) => ({
  invoiceRequirement: parseStr(`${key}/InvoiceRequirement`, node),
  buyerSelectedInvoiceCategory: parseStr(`${key}/BuyerSelectedInvoiceCategory`, node),
  invoiceTitle: parseStr(`${key}/InvoiceTitle`, node),
  invoiceInformation: parseStr(`${key}/InvoiceInformation`, node)
})
