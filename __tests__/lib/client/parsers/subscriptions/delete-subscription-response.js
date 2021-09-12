const parseXml = require('../../../../../lib/client/parsers')
const parseDeleteSubscriptionResponse = require('../../../../../lib/client/parsers/subscriptions/delete-subscription-response')

describe('lib.client.parsers.subscriptions.delete-subscription-response', () => {
  it('should parse the DeleteSubscriptionResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<DeleteSubscriptionResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
         <DeleteSubscriptionResult />
         <ResponseMetadata>
           <RequestId>2d7db8a1-8974-4541-9c9b-f882dEXAMPLE</RequestId>
         </ResponseMetadata>
       </DeleteSubscriptionResponse>`,
    )

    const res = parseDeleteSubscriptionResponse(
      '/subscriptions:DeleteSubscriptionResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })
})
