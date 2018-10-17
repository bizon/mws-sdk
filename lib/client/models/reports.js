const {DOMParser} = require('xmldom')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseRequestReportResponse = require('../parsers/reports/request-report-response')

const RESOURCE = 'Reports'
const VERSION = '2009-01-01'

const _requestReport = Symbol('requestReport')

class Products {
  constructor(client) {
    this.client = client

    this.requestReport = throttle(this[_requestReport].bind(this), 1, 15, {
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

    const {getMatchingProductForIdResults} = parseRequestReportResponse(
      '/RequestReportResponse',
      new DOMParser().parseFromString(body),
    )

    return getMatchingProductForIdResults
  }

  clearRestores() {
    this.requestReport.abort()
  }
}

module.exports = Products
