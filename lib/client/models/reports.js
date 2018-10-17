const {DOMParser} = require('xmldom')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseRequestReportResponse = require('../parsers/reports/request-report-response')
const parseGetReportListResponse = require('../parsers/reports/get-report-list-response')

const RESOURCE = 'Reports'
const VERSION = '2009-01-01'

const _requestReport = Symbol('requestReport')
const _getReportList = Symbol('getReportList')

class Products {
  constructor(client) {
    this.client = client

    this.requestReport = throttle(this[_requestReport].bind(this), 1, 15, {
      amount: 1,
      interval: 60 * 1000
    })

    this.getReportList = throttle(this[_getReportList].bind(this), 1, 10, {
      amount: 1,
      interval: 60 * 1000
    })
  }

  async [_requestReport]({
    reportType,
    startDate,
    endDate,
    reportOptions
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetMatchingProductForId',
      ReportType: reportType,
      StartDate: startDate,
      EndDate: endDate,
      ReportOptions: reportOptions,

      ...arrayToObject('MarketplaceIdList.Id', this.client.settings.region.marketplaces.map(m => m.id))
    }, {
      retry: {
        retries: 15
      },
      timeout: (60 + Math.random()) * 1000
    })

    const {requestReportResult} = parseRequestReportResponse(
      '/RequestReportResponse',
      new DOMParser().parseFromString(body),
    )

    return requestReportResult.reportRequestInfo
  }

  async [_getReportList]({
    maxCount = 100,
    reportTypeList,
    acknowledged,
    reportRequestIdList,
    availableFromDate,
    availableToDate,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.post(RESOURCE, VERSION, hasToken ? {
      Action: 'GetReportListByNextToken',
      NextToken: nextToken
    } : {
      Action: 'GetReportList',
      MaxCount: maxCount,
      Acknowledged: acknowledged,
      AvailableFromDate: availableFromDate,
      AvailableToDate: availableToDate,

      ...arrayToObject('ReportTypeList.Type', reportTypeList),
      ...arrayToObject('ReportRequestIdList.Id', reportRequestIdList)
    }, {
      retry: {
        retries: 10
      },
      timeout: (60 + Math.random()) * 1000
    })

    return parseGetReportListResponse(
      hasToken ? '/GetReportListByNextTokenResponse' : '/GetReportListResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).getReportListResult
  }

  clearRestores() {
    this.requestReport.abort()
    this.getReportList.abort()
  }
}

module.exports = Products
