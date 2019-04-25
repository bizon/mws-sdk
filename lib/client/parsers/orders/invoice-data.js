const {parseStr} = require('../base')

module.exports = (key, node) => ({
  invoiceRequirement: parseStr(`${key}/orders:InvoiceRequirement`, node),
  buyerSelectedInvoiceCategory: parseStr(`${key}/orders:BuyerSelectedInvoiceCategory`, node),
  invoiceTitle: parseStr(`${key}/orders:InvoiceTitle`, node),
  invoiceInformation: parseStr(`${key}/orders:InvoiceInformation`, node)
})
