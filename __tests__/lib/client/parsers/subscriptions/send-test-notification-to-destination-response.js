const parseXml = require('../../../../../lib/client/parsers')
const parseSendTestNotificationToDestinationResponse = require('../../../../../lib/client/parsers/subscriptions/send-test-notification-to-destination-response')

describe('lib.client.parsers.subscriptions.send-test-notification-to-destination-response', () => {
  it('should parse the SendTestNotificationToDestination example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <SendTestNotificationToDestinationResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
        <SendTestNotificationToDestinationResult />
        <ResponseMetadata>
          <RequestId>f662dae6-bde0-4e75-a53b-741abEXAMPLE</RequestId>
        </ResponseMetadata>
      </SendTestNotificationToDestinationResponse>`,
    )

    const res = parseSendTestNotificationToDestinationResponse(
      '/subscriptions:SendTestNotificationToDestinationResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })
})
