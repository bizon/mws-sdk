const parseNotificationMetadata = require('./notification-metadata')

const parseTestNotification = require('./test')
const parseAnyOfferChanged = require('./any-offer-changed')
const parseFeedProcessingFinished = require('./feed-processing-finished')

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

    case 'FeedProcessingFinished':
      return {
        notificationMetadata,
        notificationPayload: parseFeedProcessingFinished(`${key}/NotificationPayload/FeedProcessingFinishedNotification`, node)
      }

    default:
      throw new Error(`Unknown notification type ${notificationMetadata.notificationType}`)
  }
}
