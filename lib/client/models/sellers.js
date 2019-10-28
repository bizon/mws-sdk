const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseListMarketplaceParticipationsResponse = require('../parsers/sellers/list-marketplace-participations-response')

const RESOURCE = 'Sellers'
const VERSION = '2011-07-01'

const _listMarketplaceParticipations = Symbol('listMarketplaceParticipations')

class Orders {
  constructor(client) {
    this.client = client

    this.listMarketplaceParticipations = throttle(this[_listMarketplaceParticipations].bind(this), 1, 15, {
      amount: 1,
      interval: 60 * 1000
    })
  }

  async [_listMarketplaceParticipations]({
    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListMarketplaceParticipationsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListMarketplaceParticipations'
    }, {
      retry: {
        retries: 15
      },
      timeout: (60 + Math.random()) * 1000
    })

    const {listMarketplaceParticipationsResult} = parseListMarketplaceParticipationsResponse(
      hasToken ?
        '/sellers:ListMarketplaceParticipationsByNextTokenResponse' :
        '/sellers:ListMarketplaceParticipationsResponse',
      parseXml(body),
    )

    return listMarketplaceParticipationsResult
  }

  clearRestores() {
    this.listMarketplaceParticipations.abort()
  }
}

module.exports = Orders
