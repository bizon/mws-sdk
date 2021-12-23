const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseRegisterDestinationResponse = require('../parsers/subscriptions/register-destination-response')
const parseDeregisterDestinationResponse = require('../parsers/subscriptions/deregister-destination-response')
const parseCreateSubscriptionResponse = require('../parsers/subscriptions/create-subscription-response')
const parseDeleteSubscriptionResponse = require('../parsers/subscriptions/delete-subscription-response')
const parseSendTestNotificationToDestinationResponse = require('../parsers/subscriptions/send-test-notification-to-destination-response')
const parseNotification = require('../parsers/subscriptions/notifications')

const RESOURCE = 'Subscriptions'
const VERSION = '2013-07-01'

const _registerDestination = Symbol('registerDestination')
const _deregisterDestination = Symbol('deregisterDestination')
const _createSubscription = Symbol('createSubscription')
const _deleteSubscription = Symbol('deleteSubscription')
const _sendTestNotificationToDestination = Symbol('sendTestNotificationToDestination')
const _getServiceStatus = Symbol('getServiceStatus')

class Subscriptions {
  constructor(client) {
    Object.defineProperty(this, 'client', {value: client})

    this.registerDestination = throttle(this[_registerDestination].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000,
    })

    this.deregisterDestination = throttle(this[_deregisterDestination].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000,
    })

    this.createSubscription = throttle(this[_createSubscription].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000,
    })

    this.deleteSubscription = throttle(this[_deleteSubscription].bind(this), 1, 25, {
      amount: 2,
      interval: 1 * 1000,
    })

    this.sendTestNotificationToDestination = throttle(
      this[_sendTestNotificationToDestination].bind(this),
      1,
      25,
      {
        amount: 2,
        interval: 1 * 1000,
      },
    )

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000,
    })
  }

  async [_registerDestination]({marketplaceId, sqsQueueUrl}) {
    const {body} = await this.client.post(
      RESOURCE,
      VERSION,
      {
        Action: 'RegisterDestination',
        MarketplaceId: marketplaceId,
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value': sqsQueueUrl,
        'Destination.DeliveryChannel': 'SQS',
      },
      {
        retry: {
          retries: 25,
        },
      },
    )

    return parseRegisterDestinationResponse(
      '/subscriptions:RegisterDestinationResponse',
      parseXml(body),
    ).registerDestinationResult
  }

  async [_deregisterDestination]({marketplaceId, sqsQueueUrl}) {
    const {body} = await this.client.post(
      RESOURCE,
      VERSION,
      {
        Action: 'DeregisterDestination',
        MarketplaceId: marketplaceId,
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value': sqsQueueUrl,
        'Destination.DeliveryChannel': 'SQS',
      },
      {
        retry: {
          retries: 25,
        },
      },
    )

    return parseDeregisterDestinationResponse(
      '/subscriptions:DeregisterDestinationResponse',
      parseXml(body),
    ).deregisterDestinationResult
  }

  async [_createSubscription]({marketplaceId, sqsQueueUrl, isEnabled = true, notificationType}) {
    const {body} = await this.client.post(
      RESOURCE,
      VERSION,
      {
        Action: 'CreateSubscription',
        MarketplaceId: marketplaceId,
        'Subscription.Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Subscription.Destination.AttributeList.member.1.Value': sqsQueueUrl,
        'Subscription.Destination.DeliveryChannel': 'SQS',
        'Subscription.IsEnabled': isEnabled,
        'Subscription.NotificationType': notificationType,
      },
      {
        retry: {
          retries: 25,
        },
      },
    )

    return parseCreateSubscriptionResponse(
      '/subscriptions:CreateSubscriptionResponse',
      parseXml(body),
    ).createSubscriptionResult
  }

  async [_deleteSubscription]({marketplaceId, sqsQueueUrl, notificationType}) {
    const {body} = await this.client.post(
      RESOURCE,
      VERSION,
      {
        Action: 'DeleteSubscription',
        MarketplaceId: marketplaceId,
        NotificationType: notificationType,
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value': sqsQueueUrl,
        'Destination.DeliveryChannel': 'SQS',
      },
      {
        retry: {
          retries: 25,
        },
      },
    )

    return parseDeleteSubscriptionResponse(
      '/subscriptions:DeleteSubscriptionResponse',
      parseXml(body),
    ).deleteSubscriptionResult
  }

  async [_sendTestNotificationToDestination]({marketplaceId, sqsQueueUrl}) {
    const {body} = await this.client.post(
      RESOURCE,
      VERSION,
      {
        Action: 'SendTestNotificationToDestination',
        MarketplaceId: marketplaceId,
        'Destination.AttributeList.member.1.Key': 'sqsQueueUrl',
        'Destination.AttributeList.member.1.Value': sqsQueueUrl,
        'Destination.DeliveryChannel': 'SQS',
      },
      {
        retry: {
          retries: 25,
        },
      },
    )

    return parseSendTestNotificationToDestinationResponse(
      '/subscriptions:SendTestNotificationToDestinationResponse',
      parseXml(body),
    ).sendTestNotificationToDestinationResult
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

    return parseGetServiceStatusResponse('/subscriptions:GetServiceStatusResponse', parseXml(body))
      .getServiceStatusResult
  }

  parseNotification(body) {
    return parseNotification('/Notification', parseXml(body))
  }

  clearRestores() {
    this.registerDestination.abort()
    this.createSubscription.abort()
    this.sendTestNotificationToDestination.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Subscriptions
