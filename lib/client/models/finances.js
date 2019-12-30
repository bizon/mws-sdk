const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListFinancialEventsResponse = require('../parsers/finances/list-financial-events-response')
const parseListFinancialEventGroupsResponse = require('../parsers/finances/list-financial-event-groups-response')

const RESOURCE = 'Finances'
const VERSION = '2015-05-01'

const _listFinancialEvents = Symbol('listFinancialEvents')
const _listFinancialEventGroups = Symbol('listFinancialEventGroups')
const _getServiceStatus = Symbol('getServiceStatus')

class Finances {
  constructor(client) {
    this.client = client

    this.listFinancialEvents = throttle(this[_listFinancialEvents].bind(this), 1, 30, {
      amount: 1,
      interval: 2 * 1000
    })

    this.listFinancialEventGroups = throttle(this[_listFinancialEventGroups].bind(this), 1, 30, {
      amount: 1,
      interval: 2 * 1000
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_listFinancialEvents]({
    maxResultsPerPage = 100,
    amazonOrderId,
    financialEventGroupId,
    postedAfter,
    postedBefore,
    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.post(RESOURCE, VERSION, hasToken ? {
      Action: 'ListFinancialEventsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListFinancialEvents',
      MaxResultsPerPage: maxResultsPerPage,
      AmazonOrderId: amazonOrderId,
      FinancialEventGroupId: financialEventGroupId,
      PostedAfter: postedAfter,
      PostedBefore: postedBefore
    }, {
      retry: {
        retries: 30
      }
    })

    return parseListFinancialEventsResponse(
      hasToken ? '/finances:ListFinancialEventsByNextTokenResponse' : '/finances:ListFinancialEventsResponse',
      parseXml(body),
      hasToken
    ).listFinancialEventsResult
  }

  async [_listFinancialEventGroups]({
    maxResultsPerPage = 100,
    financialEventGroupStartedAfter,
    financialEventGroupStartedBefore,
    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.post(RESOURCE, VERSION, hasToken ? {
      Action: 'ListFinancialEventGroupsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListFinancialEventGroups',
      MaxResultsPerPage: maxResultsPerPage,
      FinancialEventGroupStartedAfter: financialEventGroupStartedAfter,
      FinancialEventGroupStartedBefore: financialEventGroupStartedBefore
    }, {
      retry: {
        retries: 30
      }
    })

    return parseListFinancialEventGroupsResponse(
      hasToken ? '/finances:ListFinancialEventGroupsByNextTokenResponse' : '/finances:ListFinancialEventGroupsResponse',
      parseXml(body),
      hasToken
    ).listFinancialEventGroupsResult
  }

  async [_getServiceStatus]() {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetServiceStatus'
    }, {
      retry: {
        retries: 2
      }
    })

    return parseGetServiceStatusResponse(
      '/finances:GetServiceStatusResponse',
      parseXml(body),
    ).getServiceStatusResult
  }

  clearRestores() {
    this.listFinancialEvents.abort()
    this.listFinancialEventGroups.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Finances
