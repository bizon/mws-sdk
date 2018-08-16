const {DOMParser} = require('xmldom')

const Throttler = require('../throttler')

const parseListFinancialEventsResponse = require('../parsers/finances/list-financial-events-response')
const parseListFinancialEventGroupsResponse = require('../parsers/finances/list-financial-event-groups-response')

const RESOURCE = 'Finances'
const VERSION = '2015-05-01'

const _listFinancialEvents = Symbol('listFinancialEvents')
const _listFinancialEventGroups = Symbol('listFinancialEventGroups')

class Finances {
  constructor(client) {
    this.client = client

    const listFinancialEventsThrottler = new Throttler(30, {
      amount: 1,
      interval: 2 * 1000
    })
    this.listFinancialEvents = listFinancialEventsThrottler.proxy(this[_listFinancialEvents].bind(this))

    const listFinancialEventGroupsThrottler = new Throttler(30, {
      amount: 1,
      interval: 2 * 1000
    })
    listFinancialEventGroupsThrottler.proxy(this[_listFinancialEventGroups].bind(this))

    this.throttlers = [listFinancialEventsThrottler, listFinancialEventGroupsThrottler]
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
}

module.exports = Finances
