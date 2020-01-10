const nullable = require('../nullable')
const {parseStr, parseBool, parseDate} = require('../base')

const parseAddress = require('./address')
const parseBoxContentsSource = require('./box-contents-source')
const parseBoxContentsFeeDetails = require('./box-contents-fee-details')

module.exports = (key, node) => ({
  shipmentId: parseStr(`${key}/fulfillmentInboundShipment:ShipmentId`, node),
  shipmentName: parseStr(`${key}/fulfillmentInboundShipment:ShipmentName`, node),
  shipFromAddress: parseAddress(`${key}/fulfillmentInboundShipment:ShipFromAddress`, node),
  destinationFulfillmentCenterId: parseStr(`${key}/fulfillmentInboundShipment:DestinationFulfillmentCenterId`, node),
  labelPrepType: parseStr(`${key}/fulfillmentInboundShipment:LabelPrepType`, node),
  shipmentStatus: parseStr(`${key}/fulfillmentInboundShipment:ShipmentStatus`, node),
  areCasesRequired: parseBool(`${key}/fulfillmentInboundShipment:AreCasesRequired`, node),
  confirmedNeedByDate: parseDate(`${key}/fulfillmentInboundShipment:ConfirmedNeedByDate`, node),
  boxContentsSource: nullable(parseBoxContentsSource, `${key}/fulfillmentInboundShipment:BoxContentsSource`, node),
  estimatedBoxContentsFee: nullable(parseBoxContentsFeeDetails, `${key}/fulfillmentInboundShipment:EstimatedBoxContentsFee`, node)
})
