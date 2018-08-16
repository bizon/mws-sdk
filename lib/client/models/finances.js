const {DOMParser} = require('xmldom')

const throttle = require('../throttle')

const parseListFinancialEventsResponse = require('../parsers/finances/list-financial-events-response')
const parseListFinancialEventGroupsResponse = require('../parsers/finances/list-financial-event-groups-response')

const RESOURCE = 'Finances'
const VERSION = '2015-05-01'

const _listFinancialEvents = Symbol('listFinancialEvents')
const _listFinancialEventGroups = Symbol('listFinancialEventGroups')

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
      retries: 30,
      statusCodes: [503],
      maxRetryAfter: 2 * 1000
    })

    return parseListFinancialEventsResponse(
      hasToken ? '/ListFinancialEventsByNextTokenResponse' : '/ListFinancialEventsResponse',
      new DOMParser().parseFromString(body),
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
      retries: 30,
      statusCodes: [503],
      maxRetryAfter: 2 * 1000
    })

    return parseListFinancialEventGroupsResponse(
      hasToken ? '/ListFinancialEventGroupsByNextTokenResponse' : '/ListFinancialEventGroupsResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).listFinancialEventGroupsResult
  }

  clearRestores() {
    this.listFinancialEvents.abort()
    this.listFinancialEventGroups.abort()
  }
}

module.exports = Finances
