const parseNotificationMetadata = require('./notification-metadata')

const parseTestNotification = require('./test')
const parseAnyOfferChanged = require('./any-offer-changed')
const parseFeedProcessingFinished = require('./feed-processing-finished')
const parseReportProcessingFinished = require('./report-processing-finished')

module.exports = (key, node) => {
  const notificationMetadata = parseNotificationMetadata(`${key}/NotificationMetaData`, node)

  switch (notificationMetadata.notificationType) {
    case 'Test':
    case 'TestNotification':
      return {
        notificationMetadata,
        notificationPayload: parseTestNotification(`${key}/NotificationPayload/TestNotification`, node),
      }

    case 'AnyOfferChanged':
    case 'AnyOfferChangedNotification':
      return {
        notificationMetadata,
        notificationPayload: parseAnyOfferChanged(`${key}/NotificationPayload/AnyOfferChangedNotification`, node),
      }

    case 'FeedProcessingFinished':
    case 'FeedProcessingFinishedNotification':
      return {
        notificationMetadata,
        notificationPayload: parseFeedProcessingFinished(`${key}/NotificationPayload/FeedProcessingFinishedNotification`, node),
      }

    case 'ReportProcessingFinished':
    case 'ReportProcessingFinishedNotification':
      return {
        notificationMetadata,
        notificationPayload: parseReportProcessingFinished(`${key}/NotificationPayload/ReportProcessingFinishedNotification`, node),
      }

    default:
      throw new Error(`Unknown notification type ${notificationMetadata.notificationType}`)
  }
}
