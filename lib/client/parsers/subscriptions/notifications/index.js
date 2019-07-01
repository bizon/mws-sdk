const parseNotificationMetadata = require('./notification-metadata')

const parseTestNotification = require('./test')

module.exports = (key, node) => {
  const notificationMetadata = parseNotificationMetadata(`${key}/NotificationMetaData`, node)

  switch (notificationMetadata.notificationType) {
    case 'Test':
      return {
        notificationMetadata,
        notificationPayload: parseTestNotification(`${key}/NotificationPayload/TestNotification`, node)
      }

    default:
      throw new Error(`Unknown notification type ${notificationMetadata.notificationType}`)
  }
}
