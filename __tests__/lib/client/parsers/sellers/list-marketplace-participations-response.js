const parseXml = require('../../../../../lib/client/parsers')
const parseListMarketplaceParticipationsResponse = require('../../../../../lib/client/parsers/sellers/list-marketplace-participations-response')

describe('lib.client.parsers.sellers.list-marketplace-participations-response', () => {
  it('should parse the ListMarketplaceParticipationsResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListMarketplaceParticipationsResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01">
        <ListMarketplaceParticipationsResult>
          <NextToken>MRgZW55IGNhcm5hbCBwbGVhc3VyZS6=</NextToken>
          <ListParticipations>
            <Participation>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <SellerId>A135KKEKJAIBJ56</SellerId>
              <HasSellerSuspendedListings>No</HasSellerSuspendedListings>
            </Participation>
          </ListParticipations>
          <ListMarketplaces>
            <Marketplace>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <Name>Amazon.com</Name>
              <DefaultCountryCode>US</DefaultCountryCode>
              <DefaultCurrencyCode>USD</DefaultCurrencyCode>
              <DefaultLanguageCode>en_US</DefaultLanguageCode>
              <DomainName>www.amazon.com</DomainName>
            </Marketplace>
          </ListMarketplaces>
        </ListMarketplaceParticipationsResult>
        <ResponseMetadata>
          <RequestId>efeab958-74e2-45d4-9018-2323084413b5</RequestId>
        </ResponseMetadata>
      </ListMarketplaceParticipationsResponse>`,
    )

    const response = parseListMarketplaceParticipationsResponse(
      '/sellers:ListMarketplaceParticipationsResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })

  it('should parse the ListMarketplaceParticipationsByNextTokenResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListMarketplaceParticipationsByNextTokenResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01">
        <ListMarketplaceParticipationsByNextTokenResult>
          <NextToken>MRgZW55IGNhcm5hbCBwbGVhc3VyZS6=</NextToken>
          <ListParticipations>
            <Participation>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <SellerId>A135KKEKWF1JAI6</SellerId>
              <HasSellerSuspendedListings>No</HasSellerSuspendedListings>
            </Participation>
          </ListParticipations>
          <ListMarketplaces>
            <Marketplace>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <Name>Amazon.com</Name>
              <DefaultCountryCode>US</DefaultCountryCode>
              <DefaultCurrencyCode>USD</DefaultCurrencyCode>
              <DefaultLanguageCode>en_US</DefaultLanguageCode>
              <DomainName>www.amazon.com</DomainName>
            </Marketplace>
          </ListMarketplaces>
        </ListMarketplaceParticipationsByNextTokenResult>
        <ResponseMetadata>
          <RequestId>efeab958-74e2-45d4-9018-2323084413b5</RequestId>
        </ResponseMetadata>
      </ListMarketplaceParticipationsByNextTokenResponse>`,
    )

    const response = parseListMarketplaceParticipationsResponse(
      '/sellers:ListMarketplaceParticipationsByNextTokenResponse',
      doc,
      true,
    )

    expect(response).toMatchSnapshot()
  })
})
