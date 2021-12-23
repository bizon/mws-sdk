const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListMarketplaceParticipationsResponse = require('../parsers/sellers/list-marketplace-participations-response')

const RESOURCE = 'Sellers'
const VERSION = '2011-07-01'

const _listMarketplaceParticipations = Symbol('listMarketplaceParticipations')
const _getServiceStatus = Symbol('getServiceStatus')

class Sellers {
  constructor(client) {
    Object.defineProperty(this, 'client', {value: client})

    this.listMarketplaceParticipations = throttle(
      this[_listMarketplaceParticipations].bind(this),
      1,
      15,
      {
        amount: 1,
        interval: 60 * 1000,
      },
    )

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000,
    })
  }

  async [_listMarketplaceParticipations]({nextToken} = {}) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(
      RESOURCE,
      VERSION,
      hasToken
        ? {
            Action: 'ListMarketplaceParticipationsByNextToken',
            NextToken: nextToken,
          }
        : {
            Action: 'ListMarketplaceParticipations',
          },
      {
        retry: {
          retries: 15,
        },
      },
    )

    const {listMarketplaceParticipationsResult} = parseListMarketplaceParticipationsResponse(
      hasToken
        ? '/sellers:ListMarketplaceParticipationsByNextTokenResponse'
        : '/sellers:ListMarketplaceParticipationsResponse',
      parseXml(body),
    )

    return listMarketplaceParticipationsResult
  }

  async [_getServiceStatus]() {
    const {body} = await this.client.get(
      RESOURCE,
      VERSION,
      {
        Action: 'GetServiceStatus',
      },
      {
        retry: {
          retries: 2,
        },
      },
    )

    const {getServiceStatusResult} = parseGetServiceStatusResponse(
      '/sellers:GetServiceStatusResponse',
      parseXml(body),
    )

    return getServiceStatusResult
  }

  clearRestores() {
    this.listMarketplaceParticipations.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Sellers
