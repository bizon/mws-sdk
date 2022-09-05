const {parseString, parseDate} = require('../base')

module.exports = (key, node) => ({
  timepointType: parseString(`${key}/fulfillmentInventory:TimepointType`, node),
  dateTime: parseDate(`${key}/fulfillmentInventory:DateTime`, node),
})
