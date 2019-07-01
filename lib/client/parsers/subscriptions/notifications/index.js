const parseNotificationMetadata = require('./notification-metadata')

const parseTestNotification = require('./test')
const parseAnyOfferChanged = require('./any-offer-changed')

module.exports = (key, node) => {
  const notificationMetadata = parseNotificationMetadata(`${key}/NotificationMetaData`, node)

  switch (notificationMetadata.notificationType) {
    case 'Test':
      return {
        notificationMetadata,
        notificationPayload: parseTestNotification(`${key}/NotificationPayload/TestNotification`, node)
      }

    case 'AnyOfferChanged':
      return {
        notificationMetadata,
        notificationPayload: parseAnyOfferChanged(`${key}/NotificationPayload/AnyOfferChangedNotification`, node)
      }

    default:
      throw new Error(`Unknown notification type ${notificationMetadata.notificationType}`)
  }
}
