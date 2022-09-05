const {parseString} = require('../base')

module.exports = (key, node) => ({
  pdfDocument: parseString(`${key}/fulfillmentInboundShipment:PdfDocument`, node),
  checksum: parseString(`${key}/fulfillmentInboundShipment:Checksum`, node),
})
