const parseXml = require('../../../../../lib/client/parsers')
const parseGetReportRequestListReponse = require('../../../../../lib/client/parsers/reports/get-report-request-list-response')

describe('lib.client.parsers.reports.get-report-request-list-response', () => {
  it('should parse the GetReportRequestListResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetReportRequestListResponse xmlns="http://mws.amazonaws.com/doc/2009-01-01/">
        <GetReportRequestListResult>
          <NextToken>2YgYW55IPQhcm5hbCBwbGVhc3VyZS4=</NextToken>
          <HasNext>true</HasNext>
          <ReportRequestInfo>
            <ReportRequestId>2291326454</ReportRequestId>
            <ReportType>_GET_MERCHANT_LISTINGS_DATA_</ReportType>
            <StartDate>2011-01-21T02:10:39+00:00</StartDate>
            <EndDate>2011-02-13T02:10:39+00:00</EndDate>
            <Scheduled>false</Scheduled>
            <SubmittedDate>2011-02-17T23:44:09+00:00</SubmittedDate>
            <ReportProcessingStatus>_DONE_</ReportProcessingStatus>
            <GeneratedReportId>3538561173</GeneratedReportId>
            <StartedProcessingDate>
              2011-02-17T23:44:43+00:00
            </StartedProcessingDate>
            <CompletedDate>2011-02-17T23:44:48+00:00</CompletedDate>
          </ReportRequestInfo>
        </GetReportRequestListResult>
        <ResponseMetadata>
          <RequestId>732480cb-84a8-4c15-9084-a46bd9a0889b</RequestId>
        </ResponseMetadata>
      </GetReportRequestListResponse>`,
    )

    const response = parseGetReportRequestListReponse('/reports:GetReportRequestListResponse', doc)

    expect(response).toMatchSnapshot()
  })

  it('should parse the GetReportRequestListByNextTokenResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetReportRequestListByNextTokenResponse xmlns="http://mws.amazonaws.com/doc/2009-01-01/">
        <GetReportRequestListByNextTokentResult>
          <NextToken>none</NextToken>
          <HasNext>false</HasNext>
          <ReportRequestInfo>
            <ReportRequestId>2291326454</ReportRequestId>
            <ReportType>_GET_MERCHANT_LISTINGS_DATA_</ReportType>
            <StartDate>2009-01-21T02:10:39+00:00</StartDate>
            <EndDate>2009-02-13T02:10:39+00:00</EndDate>
            <Scheduled>false</Scheduled>
            <SubmittedDate>2009-02-20T02:10:39+00:00</SubmittedDate>
            <ReportProcessingStatus>_SUBMITTED_</ReportProcessingStatus>
          </ReportRequestInfo>
        </GetReportRequestListByNextTokentResult>
        <ResponseMetadata>
          <RequestId>732480cb-84a8-4c15-9084-a46bd9a0889b</RequestId>
        </ResponseMetadata>
      </GetReportRequestListByNextTokenResponse>`,
    )

    const response = parseGetReportRequestListReponse(
      '/reports:GetReportRequestListByNextTokenResponse',
      doc,
      true,
    )

    expect(response).toMatchSnapshot()
  })
})
