const csv = require('fast-csv')
const {DOMParser} = require('xmldom')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseRequestReportResponse = require('../parsers/reports/request-report-response')
const parseGetReportRequestListResponse = require('../parsers/reports/get-report-request-list-response')
const parseGetReportListResponse = require('../parsers/reports/get-report-list-response')

const RESOURCE = 'Reports'
const VERSION = '2009-01-01'

const _requestReport = Symbol('requestReport')
const _getReportRequestList = Symbol('getReportRequestList')
const _getReportList = Symbol('getReportList')
const _getReport = Symbol('getReport')

class Products {
  constructor(client) {
    this.client = client

    this.requestReport = throttle(this[_requestReport].bind(this), 1, 15, {
      amount: 1,
      interval: 60 * 1000
    })

    this.getReportRequestList = throttle(this[_getReportRequestList].bind(this), 1, 10, {
      amount: 1,
      interval: 45 * 1000
    })

    this.getReportList = throttle(this[_getReportList].bind(this), 1, 10, {
      amount: 1,
      interval: 60 * 1000
    })

    this.getReport = throttle(this[_getReport].bind(this), 1, 15, {
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
      Action: 'RequestReport',
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

  async [_getReportRequestList]({
    reportRequestIdList,
    reportTypeList,
    reportProcessingStatusList,
    maxCount = 100,
    requestedFromDate,
    requestedToDate,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.post(RESOURCE, VERSION, hasToken ? {
      Action: 'GetReportRequestListByNextToken',
      NextToken: nextToken
    } : {
      Action: 'GetReportRequestList',
      MaxCount: maxCount,
      RequestedFromDate: requestedFromDate,
      RequestedToDate: requestedToDate,

      ...arrayToObject('ReportRequestIdList.Id', reportRequestIdList),
      ...arrayToObject('ReportTypeList.Type', reportTypeList),
      ...arrayToObject('ReportProcessingStatusList.Status', reportProcessingStatusList)
    }, {
      retry: {
        retries: 10
      },
      timeout: (45 + Math.random()) * 1000
    })

    return parseGetReportRequestListResponse(
      hasToken ? '/GetReportRequestListByNextTokenResponse' : '/GetReportRequestListResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).getReportRequestListResult
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

  async [_getReport]({
    reportId
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetReport',
      ReportId: reportId
    }, {
      retry: {
        retries: 15
      },
      timeout: (60 + Math.random()) * 1000
    })

    return new Promise((resolve, reject) => {
      const result = []

      csv
        .fromString(body, {
          delimiter: '\t',
          headers: true
        })
        .on('data', data => {
          result.push(data)
        })
        .on('error', error => {
          reject(error)
        })
        .on('end', () => {
          resolve(result)
        })
    })
  }

  clearRestores() {
    this.requestReport.abort()
    this.getReportRequestList.abort()
    this.getReportList.abort()
    this.getReport.abort()
  }
}

module.exports = Products
