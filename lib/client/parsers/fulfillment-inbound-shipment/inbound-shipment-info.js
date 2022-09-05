const {parseString, parseBool, parseDate} = require('../base')
const nullable = require('../nullable')

const parseAddress = require('./address')
const parseBoxContentsFeeDetails = require('./box-contents-fee-details')
const parseBoxContentsSource = require('./box-contents-source')

module.exports = (key, node) => ({
  shipmentId: parseString(`${key}/fulfillmentInboundShipment:ShipmentId`, node),
  shipmentName: parseString(`${key}/fulfillmentInboundShipment:ShipmentName`, node),
  shipFromAddress: parseAddress(`${key}/fulfillmentInboundShipment:ShipFromAddress`, node),
  destinationFulfillmentCenterId: parseString(
    `${key}/fulfillmentInboundShipment:DestinationFulfillmentCenterId`,
    node,
  ),
  labelPrepType: parseString(`${key}/fulfillmentInboundShipment:LabelPrepType`, node),
  shipmentStatus: parseString(`${key}/fulfillmentInboundShipment:ShipmentStatus`, node),
  areCasesRequired: parseBool(`${key}/fulfillmentInboundShipment:AreCasesRequired`, node),
  confirmedNeedByDate: parseDate(`${key}/fulfillmentInboundShipment:ConfirmedNeedByDate`, node),
  boxContentsSource: nullable(
    parseBoxContentsSource,
    `${key}/fulfillmentInboundShipment:BoxContentsSource`,
    node,
  ),
  estimatedBoxContentsFee: nullable(
    parseBoxContentsFeeDetails,
    `${key}/fulfillmentInboundShipment:EstimatedBoxContentsFee`,
    node,
  ),
})
