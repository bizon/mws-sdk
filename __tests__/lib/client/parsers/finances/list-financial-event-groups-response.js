const parseXml = require('../../../../../lib/client/parsers')
const parseListFinancialEventGroupsResponse = require('../../../../../lib/client/parsers/finances/list-financial-event-groups-response')

describe('lib.client.parsers.finances.list-financial-event-groups-response', () => {
  it('should parse the ListFinancialEventGroupsResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListFinancialEventGroupsResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <ListFinancialEventGroupsResult>
          <NextToken>2YgYW55IGNhcm5hbCBwbGVhcEXAMPLE</NextToken>
          <FinancialEventGroupList>
            <FinancialEventGroup>
              <FinancialEventGroupId>
                22YgYW55IGNhcm5hbCBwbGVhEXAMPLE
              </FinancialEventGroupId>
              <ProcessingStatus>Closed</ProcessingStatus>
              <FundTransferStatus>Successful</FundTransferStatus>
              <OriginalTotal>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>19.00</Amount>
              </OriginalTotal>
              <ConvertedTotal>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>19.00</Amount>
              </ConvertedTotal>
              <FundTransferDate>2014-09-09T01:30:00.000-06:00</FundTransferDate>
              <TraceId>128311029381HSADJEXAMPLE</TraceId>
              <AccountTail>1212</AccountTail>
              <BeginningBalance>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>0.00</Amount>
              </BeginningBalance>
              <FinancialEventGroupStart>
                2014-09-01T01:30:00.000-06:00
              </FinancialEventGroupStart>
              <FinancialEventGroupEnd>
                2014-09-09T01:30:00.000-06:00
              </FinancialEventGroupEnd>
            </FinancialEventGroup>
          </FinancialEventGroupList>
        </ListFinancialEventGroupsResult>
        <ResponseMetadata>
          <RequestId>1105b931-6f1c-4480-8e97-f3b46EXAMPLE</RequestId>
        </ResponseMetadata>
      </ListFinancialEventGroupsResponse>`
    )

    const res = parseListFinancialEventGroupsResponse(
      '/finances:ListFinancialEventGroupsResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the ListFinancialEventGroupsByNextTokenResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListFinancialEventGroupsByNextTokenResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <ListFinancialEventGroupsByNextTokenResult>
          <NextToken>2YgYW55IGNhcm5hbCBwbGVhcEXAMPLE</NextToken>
          <FinancialEventGroupList>
            <FinancialEventGroup>
              <FinancialEventGroupId>
                22YgYW55IGNhcm5hbCBwbGVhEXAMPLE
              </FinancialEventGroupId>
              <ProcessingStatus>Closed</ProcessingStatus>
              <FundTransferStatus>Successful</FundTransferStatus>
              <OriginalTotal>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>19.00</Amount>
              </OriginalTotal>
              <ConvertedTotal>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>19.00</Amount>
              </ConvertedTotal>
              <FundTransferDate>2014-09-09T01:30:00.000-06:00</FundTransferDate>
              <TraceId>128311029381HSADJEXAMPLE</TraceId>
              <AccountTail>1212</AccountTail>
              <BeginningBalance>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>0.00</Amount>
              </BeginningBalance>
              <FinancialEventGroupStart>
                2014-09-01T01:30:00.000-06:00
              </FinancialEventGroupStart>
              <FinancialEventGroupEnd>
                2014-09-09T01:30:00.000-06:00
              </FinancialEventGroupEnd>
            </FinancialEventGroup>
          </FinancialEventGroupList>
        </ListFinancialEventGroupsByNextTokenResult>
        <ResponseMetadata>
          <RequestId>1105b931-6f1c-4480-8e97-f3b46EXAMPLE</RequestId>
        </ResponseMetadata>
      </ListFinancialEventGroupsByNextTokenResponse>`
    )

    const res = parseListFinancialEventGroupsResponse(
      '/finances:ListFinancialEventGroupsByNextTokenResponse',
      doc,
      true
    )

    expect(res).toMatchSnapshot()
  })
})
