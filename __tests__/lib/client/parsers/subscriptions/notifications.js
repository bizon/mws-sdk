const parseXml = require('../../../../../lib/client/parsers')
const parseNotification = require('../../../../../lib/client/parsers/subscriptions/notifications')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse a test notification', () => {
    const doc = parseXml(
      `<Notification>
        <NotificationMetaData>
          <NotificationType>Test</NotificationType>
          <PayloadVersion>1.0</PayloadVersion>
          <UniqueId>0123456789-ca3b-4127-abe7-82cfbe19a032</UniqueId>
          <PublishTime>2019-07-01T10:46:29Z</PublishTime>
          <SellerId>XXXXXXXXXXTest</SellerId>
        </NotificationMetaData>
        <NotificationPayload>
          <TestNotification />
        </NotificationPayload>
      </Notification>`
    )

    const res = parseNotification(
      '/Notification',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
