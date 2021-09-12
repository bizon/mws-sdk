const {parseStr, parseDate} = require('../../base')

module.exports = (key, node) => ({
  notificationType: parseStr(`${key}/NotificationType`, node),
  payloadVersion: parseStr(`${key}/PayloadVersion`, node),
  uniqueId: parseStr(`${key}/UniqueId`, node),
  publishTime: parseDate(`${key}/PublishTime`, node),
  sellerId: parseStr(`${key}/SellerId`, node),
})
