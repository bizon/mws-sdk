# mws-sdk

> SDK for Amazon Marketplace Web Services

[![npm version](https://badgen.net/npm/v/@bizon/mws-sdk)](https://www.npmjs.com/package/@bizon/mws-sdk)
[![codecov](https://badgen.net/codecov/c/github/bizon/mws-sdk)](https://codecov.io/gh/bizon/mws-sdk)
[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

## CI

[![Tests](https://github.com/bizon/mws-sdk/actions/workflows/tests.yml/badge.svg)](https://github.com/bizon/mws-sdk/actions/workflows/tests.yml)
[![Release](https://github.com/bizon/mws-sdk/actions/workflows/release.yml/badge.svg)](https://github.com/bizon/mws-sdk/actions/workflows/release.yml)

## Getting started

```bash
npm install --save @bizon/mws-sdk
```

## Usage

```js
const MWSClient = require('@bizon/mws-sdk')

const client = new MWSClient({
  accessKeyId: '', // defaults to process.env.MWS_ACCESS_KEY_ID
  secretAccessKey: '', // defaults to process.env.MWS_SECRET_ACCESS_KEY
  sellerId: '',
  mwsToken: '',
  mwsRegion: ''
})
```

### Region and Marketplaces

[The MWS documentation](https://github.com/bizon/mws-api-doc/blob/master/doc/en_FR/dev_guide/DG_Endpoints.md) defines a list of regions and marketplaces available in each region.

The marketplaces in a region do not all share a common API endpoint, so this library defines a new concept of *MWS region*, based on the API endpoint. Here’s the list of the available MWS regions:

**Generic MWS regions:**

Region | API Endpoint | Name
-------|--------------|-----
na | mws.amazonservices.com | North America
eu | mws-eu.amazonservices.com | Europe
fe | mws-fe.amazonservices.com | Far East

**Country specific MWS regions:**

Region | API Endpoint | Name
-------|--------------|-----
ca | mws.amazonservices.ca | Canada
mx | mws.amazonservices.com.mx | Mexico
ae | mws.amazonservices.ae | United Arab Emirates
in | mws.amazonservices.in | India
jp | mws.amazonservices.jp | Japan
au | mws.amazonservices.com.au | Australia

This library also allows to specify a list of marketplaces (either 2 letter country codes, marketplace IDs or domains) so you can restrict API calls to your marketplace participations:

```js
const client = new MWSClient({
  accessKeyId: '',
  secretAccessKey: '',
  sellerId: '',
  mwsToken: '',
  marketplaces: [
    'A1F83G8C2ARO7P', // UK
    'fr',
    'Amazon.it'
  ]
})
```

Keep in mind that the specified marketplaces will have to be in the same MWS region, otherwise an error will be thrown.

## Pagination

The MWS API defines multiple API calls for pagination. They have been abstracted in this SDK. Whenever there are more retrievable results, a `nextToken` property will be available in the operation’s result. The `nextToken` can then be used as an option of that same operation to fetch an additional page.

```js
let nextToken

do {
  const result = await client.orders.listOrders({
    nextToken, // If nextToken is truthy, all the other options are ignored.
    lastUpdatedAfter: new Date(2020, 0, 1)
  })

  nextToken = result.nextToken
} while (nextToken)
```

## Error handling

Whenever the MWS API returns a non-OK HTTP status, a `MWSError` will be thrown. Use `error.body` to inspect the contents of the error, and `error.response` to access the raw HTTP response.

```js
const {MWSError} = require('@bizon/mws-sdk')

try {
  const result = await client.products.getLowestPricedOffersForSku({
    marketplaceId: 'A1F83G8C2ARO7P',
    sellerSku: 'some-sku',
    itemCondition: 'new'
  })
} catch (error) {
  if (error instanceof MWSError) {
    console.log(error.sellerId)
    console.log(error.marketplaces)
    console.log(error.body) // This will contain the parsed XML body
    console.log(error.response.statusCode)
  }
}
```

## API

### Finances ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listFinancialEventGroups</summary>

  **Example:**

  ```js
  const result = await client.finances.listFinancialEventGroups({
    financialEventGroupStartedAfter: new Date(2015, 2, 1),
    financialEventGroupStartedBefore: new Date(2015, 4, 1)
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  maxResultsPerPage | `Number` | `100`
  financialEventGroupStartedAfter | `Date` |
  financialEventGroupStartedBefore | `Date` |
  nextToken | `String` |
</details>

<details>
  <summary>listFinancialEvents</summary>

  **Example:**

  ```js
  const result = await client.finances.listFinancialEvents({
    amazonOrderId: '333-7777777-7777777'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  maxResultsPerPage | `Number` | `100`
  amazonOrderId | `String` |
  financialEventGroupId | `String` |
  postedAfter | `Date` |
  postedBefore | `Date` |
  nextToken | `String` |
</details>

### FulfillmentInboundShipment

<details>
  <summary>getBillOfLading</summary>

  **Example:**

  ```js
  const result = await client.fulfillmentInboundShipment.getBillOfLading({
    shipmentId: 'FBAQFGQZ'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  shipmentId | `String` |
</details>

<details>
  <summary>listInboundShipments</summary>

  **Example:**

  ```js
  const result = await client.fulfillmentInboundShipment.listInboundShipments({
    lastUpdatedAfter: '2015-10-02T12:00:54Z',
    lastUpdatedBefore: '2015-11-02T12:00:54Z',
    shipmentStatusList: [
      'WORKING',
      'CLOSED'
    ],
    shipmentIdList: [
      'FBA44JV8R',
      'FBA4X8YLS',
      'FBA4X9FML'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  shipmentStatusList | `Array<String>` |
  shipmentIdList | `Array<String>` |
  lastUpdatedAfter | `Date` |
  lastUpdatedBefore | `Date` |
  nextToken | `String` |
</details>

<details>
  <summary>listInboundShipmentItems</summary>

  **Example:**

  ```js
  const result = await client.fulfillmentInboundShipment.listInboundShipmentItems({
    shipmentId: 'SSF85DGIZZ3OF1'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  shipmentId | `Array<String>` |
  lastUpdatedAfter | `Date` |
  lastUpdatedBefore | `Date` |
  nextToken | `String` |
</details>


### FulfillmentInventory ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listInventorySupply</summary>

  **Example:**

  ```js
  const result = await client.fulfillmentInventory.listInventorySupply({
    sellerSkus: [
      'SampleSKU1',
      'SampleSKU2'
    ],
    responseGroup: 'Basic',
    marketplaceId: 'ATVPDKIKX0DER'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  sellerSkus | `Array<String>` |
  queryStartDateTime | `Date` |
  responseGroup | `String` |
  marketplaceId | `String` |
  nextToken | `String` |
</details>


### Orders ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listOrders</summary>

  **Example:**

  ```js
  const result = await client.orders.listOrders({
    lastUpdatedAfter: '2017-02-01T18:12:21',
    marketplaceId: [
      'ATVPDKIKX0DER',
      'A2Q3Y263D00KWC',
      'A1VC38T7YXB528'
    ],
    fulfillmentChannel: [
      'MFN'
    ],
    paymentMethod: [
      'COD',
      'Other'
    ],
    orderStatus: [
      'Unshipped',
      'PendingAvailability'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  createdAfter | `Date` |
  createdBefore | `Date` |
  lastUpdatedAfter | `Date` |
  lastUpdatedBefore | `Date` |
  orderStatus | `String` |
  marketplaceId | `Array<String>` | Selected region’s marketplaces
  fulfillmentChannel | `Array<String>` |
  paymentMethod | `Array<String>` |
  buyerEmail | `String` |
  sellerOrderId | `String` |
  maxResultsPerPage | `Number` | `100`
  easyShipShipmentStatus | `Array<String>` |
  nextToken | `String` |
</details>

<details>
  <summary>getOrder</summary>

  **Example:**

  ```js
  const result = await client.orders.getOrder({
    amazonOrderId: [
      '902-3159896-1390916'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  amazonOrderId | `Array<String>` |
</details>

<details>
  <summary>listOrderItems</summary>

  ```js
  const result = await client.orders.listOrderItems({
    amazonOrderId: '058-1233752-8214740'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  amazonOrderId | `String` |
  nextToken | `String` |
</details>

### Products

<details>
  <summary>listMatchingProducts</summary>

  **Example:**

  ```js
  const result = await client.products.listMatchingProducts({
    marketplaceId: 'ATVPDKIKX0DER',
    query: '0439708184'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  query | `String` |
  queryContextId | `String` |
</details>

<details>
  <summary>getMatchingProduct</summary>

  **Example:**

  ```js
  const result = await client.products.getMatchingProduct({
    marketplaceId: 'ATVPDKIKX0DER',
    asinList: [
      'B002KT3XRQ'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asinList | `Array<String>` |
</details>

<details>
  <summary>getMatchingProductForId</summary>

  **Example:**

  ```js
  const result = await client.products.getMatchingProductForId({
    marketplaceId: 'ATVPDKIKX0DER',
    idType: 'ISBN',
    idList: [
      '9781933988665',
      '0439708184'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  idType | `String` |
  idList | `Array<String>` |
</details>

<details>
  <summary>getLowestPricedOffersForSku</summary>

  **Example:**

  ```js
  const result = await client.products.getLowestPricedOffersForSku({
    marketplaceId: 'ATVPDKIKX0DER',
    sellerSku: '24478624',
    itemCondition: 'New'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sellerSku | `String` |
  itemCondition | `String` |
</details>

<details>
  <summary>getLowestPricedOffersForAsin</summary>

  **Example:**

  ```js
  const result = await client.products.getLowestPricedOffersForAsin({
    marketplaceId: 'ATVPDKIKX0DER',
    asin: 'B00COK3FD8',
    itemCondition: 'New'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asin | `String` |
  itemCondition | `String` |
</details>

<details>
  <summary>getMyPriceForSku</summary>

  **Example:**

  ```js
  const result = await client.products.getMyPriceForSku({
    marketplaceId: 'ATVPDKIKX0DER',
    sellerSkuList: [
      'SKU2468'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sellerSkuList | `Array<String>` |
  itemCondition | `String` |
</details>

<details>
  <summary>getMyPriceForAsin</summary>

  **Example:**

  ```js
  const result = await client.products.getMyPriceForAsin({
    marketplaceId: 'ATVPDKIKX0DER',
    asinList: [
      '1933890517'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asinList | `Array<String>` |
  itemCondition | `String` |
</details>

<details>
  <summary>getProductCategoriesForSku</summary>

  **Example:**

  ```js
  const result = await client.products.getProductCategoriesForSku({
    marketplaceId: 'ATVPDKIKX0DER',
    sellerSku: 'SKU2468'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sellerSku | `String` |
</details>

<details>
  <summary>getProductCategoriesForAsin</summary>

  **Example:**

  ```js
  const result = await client.products.getProductCategoriesForAsin({
    marketplaceId: 'ATVPDKIKX0DER',
    asin: 'B002KT3XQM'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asin | `String` |
</details>

### Reports

<details>
  <summary>requestReport</summary>

  **Example:**

  ```js
  const result = await client.reports.requestReport({
    reportType: '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_',
    startDate: '2009-01-03T18:12:21',
    endDate: '2008-06-26T18:12:21',
    marketplaceIdList: [
      'ATVPDKIKX0DER'
    ],
    reportOptions: {
      custom: true
    }
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  reportType | `String` |
  startDate | `Date` |
  endDate | `Date` |
  marketplaceIdList | `Array<String>` |
  reportOptions | `String` or `Object` |

  **Caveats:**

  When defining `reportOptions` as an object, keep in mind that the options’ casing must match the [MWS documentation](https://github.com/bizon/mws-api-doc/blob/master/doc/en_FR/reports/Reports_ReportType.md).
</details>

<details>
  <summary>getReportRequestList</summary>

  **Example:**

  ```js
  const result = await client.reports.getReportRequestList({
    reportRequestIdList: [
      '2291326454'
    ],
    reportTypeList: [
      '_GET_ORDERS_DATA_',
      '_GET_MERCHANT_LISTINGS_DATA_'
    ],
    reportProcessingStatusList: [
      '_DONE_'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  reportRequestIdList | `Array<String>` |
  reportTypeList | `Array<String>` |
  reportProcessingStatusList | `Array<String>` |
  maxCount | `Number` | `100`
  requestedFromDate | `Date` |
  requestedToDate | `Date` |
  nextToken | `String` |
</details>

<details>
  <summary>getReportList</summary>

  **Example:**

  ```js
  const result = await client.reports.getReportList({
    reportTypeList: [
      '_GET_ORDERS_DATA_'
    ],
    acknowledged: false,
    reportRequestIdList: [
      '2291326454',
      '2294446454'
    ]
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  maxCount | `Number` | `100`
  reportTypeList | `Array<String>` |
  acknowledged | `Boolean`
  reportRequestIdList | `Array<String>` |
  availableFromDate | `Date` |
  availableToDate | `Date` |
  nextToken | `String` |
</details>

<details>
  <summary>getReport</summary>

  **Example:**

  ```js
  const result = await client.reports.getReport({
    reportId: '624169093',
    format: 'raw'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  reportId | `String` |
  format | `Enum[raw, base64]`
</details>

### Sellers ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listMarketplaceParticipations</summary>

  **Example:**

  ```js
  const result = await client.sellers.listMarketplaceParticipations()
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  nextToken | `String` |
</details>

### Subscriptions

<details>
  <summary>registerDestination</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.registerDestination({
    marketplaceId: 'AKIAEEXAMPLESA',
    sqsQueueUrl: 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>deregisterDestination</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.deregisterDestination({
    marketplaceId: 'AKIAEEXAMPLESA',
    sqsQueueUrl: 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>sendTestNotificationToDestination</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.sendTestNotificationToDestination({
    marketplaceId: 'AKIAEEXAMPLESA',
    sqsQueueUrl: 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>createSubscription</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.createSubscription({
    marketplaceId: 'AKIAEEXAMPLESA',
    sqsQueueUrl: 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications',
    isEnabled: true,
    notificationType: 'AnyOfferChanged'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
  isEnabled | `Boolean` | `true`
  notificationType | `String` |
</details>

<details>
  <summary>deleteSubscription</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.deleteSubscription({
    marketplaceId: 'AKIAEEXAMPLESA',
    sqsQueueUrl: 'https://sqs.us-east-1.amazonaws.com/51471EXAMPLE/mws_notifications',
    notificationType: 'AnyOfferChanged'
  })
  ```

  **Options:**

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
  notificationType | `String` |
</details>

<details>
  <summary>parseNotification</summary>

  **Example:**

  ```js
  const result = await client.subscriptions.parseNotification(
    `<Notification>
      <NotificationMetaData>
        <NotificationType>Test</NotificationType>
        <PayloadVersion>1.0</PayloadVersion>
        <UniqueId>0123456789-ca3b-4127-abe7-82cfbe19a032</UniqueId>
        <PublishTime>2019-07-01T10:46:29Z</PublishTime>
        <SellerId>XXXXXXXXXXTest</SellerId>
      </NotificationMetaData>
      <NotificationPayload>
        <TestNotification />
      </NotificationPayload>
    </Notification>`
  )
  ```

  **Options:** Takes an XML string.

  The following notifications are supported:

  - `Test`
  - `AnyOfferChanged`
  - `FeedProcessingFinished`
  - `ReportProcessingFinished`
</details>


### Common

All entities except `reports` support a `getServiceStatus` method to retrieve the API status.

## License

MIT

## Miscellaneous

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```
