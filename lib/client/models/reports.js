const parseCsv = require('csv-parse')
const {DOMParser} = require('xmldom')
const iconv = require('iconv-lite')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')
const getCharset = require('../charset')

const parseRequestReportResponse = require('../parsers/reports/request-report-response')
const parseGetReportRequestListResponse = require('../parsers/reports/get-report-request-list-response')
const parseGetReportListResponse = require('../parsers/reports/get-report-list-response')

const RESOURCE = 'Reports'
const VERSION = '2009-01-01'

const _requestReport = Symbol('requestReport')
const _getReportRequestList = Symbol('getReportRequestList')
const _getReportList = Symbol('getReportList')
const _getReport = Symbol('getReport')

class Reports {
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
    marketplaces,
    reportOptions
  }) {
    let params = {
      Action: 'RequestReport',
      ReportType: reportType,
      StartDate: startDate,
      EndDate: endDate,
      ReportOptions: reportOptions
    }

    if (marketplaces) {
      params = {
        ...params,
        ...arrayToObject('MarketplaceIdList.Id', marketplaces)
      }
    } else {
      params = {
        ...params,
        ...arrayToObject('MarketplaceIdList.Id', this.client.settings.region.marketplaces.map(m => m.id))
      }
    }

    const {body} = await this.client.post(RESOURCE, VERSION, params, {
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
    reportId,
    format
  }) {
    const res = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetReport',
      ReportId: reportId
    }, {
      encoding: null,
      retry: {
        retries: 15
      },
      timeout: (60 + Math.random()) * 1000
    })

    const charset = getCharset(res) || 'iso-8859-1'

    const raw = iconv.decode(
      res.body,
      charset
    )

    switch (format) {
      case 'raw':
        return raw

      case 'base64':
        return Buffer.from(raw).toString('base64')

      default:
        return new Promise((resolve, reject) => {
          parseCsv(raw, {
            delimiter: '\t',
            quote: false
          }, (error, output) => {
            if (error) {
              return reject(error)
            }

            resolve(output)
          })
        })
    }
  }

  clearRestores() {
    this.requestReport.abort()
    this.getReportRequestList.abort()
    this.getReportList.abort()
    this.getReport.abort()
  }
}

module.exports = Reports
