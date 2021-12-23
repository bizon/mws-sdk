const parseXml = require('../../../../../lib/client/parsers')
const parseCreateSubscriptionResponse = require('../../../../../lib/client/parsers/subscriptions/create-subscription-response')

describe('lib.client.parsers.subscriptions.create-subscription-response', () => {
  it('should parse the CreateSubscriptionResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <CreateSubscriptionResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
        <CreateSubscriptionResult />
        <ResponseMetadata>
          <RequestId>c9bb2e77-2425-4e1a-9c85-36d00EXAMPLE</RequestId>
        </ResponseMetadata>
      </CreateSubscriptionResponse>`,
    )

    const res = parseCreateSubscriptionResponse('/subscriptions:CreateSubscriptionResponse', doc)

    expect(res).toMatchSnapshot()
  })
})
