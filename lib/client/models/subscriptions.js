const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseRegisterDestinationResponse = require('../parsers/subscriptions/register-destination-response')
const parseCreateSubscriptionResponse = require('../parsers/subscriptions/create-subscription-response')

const RESOURCE = 'Subscriptions'
const VERSION = '2013-07-01'

const _registerDestination = Symbol('registerDestination')
const _createSubscription = Symbol('createSubscription')

class Subscriptions {
  constructor(client) {
    this.client = client

    this.registerDestination = throttle(this[_registerDestination].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000
    })

    this.createSubscription = throttle(this[_createSubscription].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000
    })
  }

  async [_registerDestination]({
    marketplaceId,
    sqsQueueUrl
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'RegisterDestination',
      MarketplaceId: marketplaceId,
      'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
      'Destination.AttributeList.member.1.Value': sqsQueueUrl,
      'Destination.DeliveryChannel': 'SQS'
    }, {
      retry: {
        retries: 25
      },
      timeout: (1 + Math.random()) * 1000
    })

    const {registerDestinationResult} = parseRegisterDestinationResponse(
      '/subscriptions:RegisterDestinationResponse',
      parseXml(body)
    )

    return registerDestinationResult
  }

  async [_createSubscription]({
    marketplaceId,
    sqsQueueUrl,
    isEnabled = true,
    notificationType
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'CreateSubscription',
      MarketplaceId: marketplaceId,
      'Subscription.Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
      'Subscription.Destination.AttributeList.member.1.Value': sqsQueueUrl,
      'Subscription.Destination.DeliveryChannel': 'SQS',
      'Subscription.IsEnabled': isEnabled,
      'Subscription.NotificationType': notificationType
    }, {
      retry: {
        retries: 25
      },
      timeout: (1 + Math.random()) * 1000
    })

    const {createSubscriptionResult} = parseCreateSubscriptionResponse(
      '/subscriptions:CreateSubscriptionResponse',
      parseXml(body)
    )

    return createSubscriptionResult
  }

  clearRestores() {
    this.registerDestination.abort()
    this.createSubscription.abort()
  }
}

module.exports = Subscriptions
