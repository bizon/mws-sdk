const {parseString, parseDate} = require('../../base')

module.exports = (key, node) => ({
  notificationType: parseString(`${key}/NotificationType`, node),
  payloadVersion: parseString(`${key}/PayloadVersion`, node),
  uniqueId: parseString(`${key}/UniqueId`, node),
  publishTime: parseDate(`${key}/PublishTime`, node),
  sellerId: parseString(`${key}/SellerId`, node),
})
