const parseXml = require('../../../../../lib/client/parsers')
const parseGetReportListResponse = require('../../../../../lib/client/parsers/reports/get-report-list-response')

describe('lib.client.parsers.reports.get-report-list-response', () => {
  it('should parse the GetReportListResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetReportListResponse xmlns="http://mws.amazonaws.com/doc/2009-01-01/">
        <GetReportListResult>
          <NextToken>2YgYW55IPQhvu5hbCBwbGVhc3VyZS4=</NextToken>
          <HasNext>true</HasNext>
          <ReportInfo>
            <ReportId>898899473</ReportId>
            <ReportType>_GET_MERCHANT_LISTINGS_DATA_</ReportType>
            <ReportRequestId>2278662938</ReportRequestId>
            <AvailableDate>2009-02-10T09:22:33+00:00</AvailableDate>
            <Acknowledged>false</Acknowledged>
          </ReportInfo>
        </GetReportListResult>
        <ResponseMetadata>
          <RequestId>fbf677c1-dcee-4110-bc88-2ba3702e331b</RequestId>
        </ResponseMetadata>
      </GetReportListResponse>`,
    )

    const res = parseGetReportListResponse(
      '/reports:GetReportListResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the GetReportListByNextTokenResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetReportListByNextTokenResponse xmlns="http://mws.amazonaws.com/doc/2009-01-01/">
        <GetReportListByNextTokenResult>
          <NextToken>none</NextToken>
          <HasNext>false</HasNext>
          <ReportInfo>
            <ReportId>898899473</ReportId>
            <ReportType>_GET_MERCHANT_LISTINGS_DATA_</ReportType>
            <ReportRequestId>2278662938</ReportRequestId>
            <AvailableDate>2009-02-10T09:22:33+00:00</AvailableDate>
            <Acknowledged>false</Acknowledged>
          </ReportInfo>
        </GetReportListByNextTokenResult>
        <ResponseMetadata>
          <RequestId>fbf677c1-dcee-4110-bc88-2ba3702e331b</RequestId>
        </ResponseMetadata>
      </GetReportListByNextTokenResponse>`,
    )

    const res = parseGetReportListResponse(
      '/reports:GetReportListByNextTokenResponse',
      doc,
      true,
    )

    expect(res).toMatchSnapshot()
  })
})
