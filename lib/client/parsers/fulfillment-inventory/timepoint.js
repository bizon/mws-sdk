const {parseStr, parseDate} = require('../base')

module.exports = (key, node) => ({
  timepointType: parseStr(`${key}/fulfillmentInventory:TimepointType`, node),
  dateTime: parseDate(`${key}/fulfillmentInventory:DateTime`, node),
})
