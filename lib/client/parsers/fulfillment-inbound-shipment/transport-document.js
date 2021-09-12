const {parseStr} = require('../base')

module.exports = (key, node) => ({
  pdfDocument: parseStr(`${key}/fulfillmentInboundShipment:PdfDocument`, node),
  checksum: parseStr(`${key}/fulfillmentInboundShipment:Checksum`, node),
})
