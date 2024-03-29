const parseXml = require('../../../../../lib/client/parsers')
const parseRequestReportResponse = require('../../../../../lib/client/parsers/reports/request-report-response')

describe('lib.client.parsers.reports.request-report-response', () => {
  it('should parse the RequestReportResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <RequestReportResponse xmlns="http://mws.amazonaws.com/doc/2009-01-01/">
        <RequestReportResult>
          <ReportRequestInfo>
            <ReportRequestId>2291326454</ReportRequestId>
            <ReportType>_GET_MERCHANT_LISTINGS_DATA_</ReportType>
            <StartDate>2009-01-21T02:10:39+00:00</StartDate>
            <EndDate>2009-02-13T02:10:39+00:00</EndDate>
            <Scheduled>false</Scheduled>
            <SubmittedDate>2009-02-20T02:10:39+00:00</SubmittedDate>
            <ReportProcessingStatus>_SUBMITTED_</ReportProcessingStatus>
          </ReportRequestInfo>
        </RequestReportResult>
        <ResponseMetadata>
          <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
        </ResponseMetadata>
      </RequestReportResponse>`,
    )

    const response = parseRequestReportResponse('/reports:RequestReportResponse', doc)

    expect(response).toMatchSnapshot()
  })
})
