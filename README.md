# mws-sdk [![CircleCI](https://circleci.com/gh/bizon/mws-sdk.svg?style=svg)](https://circleci.com/gh/bizon/mws-sdk)

> SDK for Amazon Marketplace Web Services

[![npm version](https://badgen.net/npm/v/@bizon/mws-sdk)](https://www.npmjs.com/package/@bizon/mws-sdk)
[![codecov](https://badgen.net/codecov/c/github/bizon/mws-sdk)](https://codecov.io/gh/bizon/mws-sdk)
[![dependencies Status](https://badgen.net/david/dep/bizon/mws-sdk)](https://david-dm.org/bizon/mws-sdk)
[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

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

This library also allows to specify a list of marketplaces (either 2 letter country codes or Marketplaces IDs) so you can restrict API calls to your marketplace participations:

```js
const client = new MWSClient({
  accessKeyId: '',
  secretAccessKey: '',
  sellerId: '',
  mwsToken: '',
  marketplaces: [
    'A1F83G8C2ARO7P', // UK
    'fr'
  ]
})
```

Keep in mind that the specified marketplaces will have to be in the same MWS region, otherwise an error will be thrown.

## Error handling

Whenever the MWS API returns a non 200 HTTP status, a `MWSError` will be thrown. Use `error.body` to inspect the contents of the error, and `error.response` to access the raw HTTP response.

```js
const {MWSError} = '@bizon/mws-sdk'

try {
  const result = await client.products.getLowestPricedOffersForSku({
    marketplaceId: 'A1F83G8C2ARO7P',
    sellerSku: 'some-sku',
    itemCondition: 'new'
  })
} catch (error) {
  if (error instanceof MWSError) {
    console.log(error.body) // This will contain the parsed XML body
    console.log(error.response.statusCode)
  }
}
```

## API

### Finances ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listFinancialEvents</summary>

  ```js
  const result = await client.finances.listFinancialEvents({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  maxResultsPerPage | `Number` | `100`
  amazonOrderId | `String` |
  financialEventGroupId | `String` |
  postedAfter | `Date` |
  postedBefore | `Date` |
  nextToken | `String` |
</details>

<details>
  <summary>listFinancialEventGroups</summary>

  ```js
  const result = await client.finances.listFinancialEventGroups({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  maxResultsPerPage | `Number` | `100`
  financialEventGroupStartedAfter | `Date` |
  financialEventGroupStartedBefore | `Date` |
  nextToken | `String` |
</details>

### FulfillmentInboundShipment

<details>
  <summary>getBillOfLading</summary>

  ```js
  const result = await client.fulfillmentInboundShipment.getBillOfLading({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  shipmentId | `String` |
</details>

<details>
  <summary>listInboundShipments</summary>

  ```js
  const result = await client.fulfillmentInboundShipment.listInboundShipments({
    // Options
  })
  ```

  Options:

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

  ```js
  const result = await client.fulfillmentInboundShipment.listInboundShipmentItems({
    // Options
  })
  ```

  Options:

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

  ```js
  const result = await client.fulfillmentInventory.listInventorySupply({
    // Options
  })
  ```

  Options:

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
  <summary>getOrders</summary>

  ```js
  const result = await client.orders.getOrders({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  amazonOrderIds | `Array<String>` |
</details>

<details>
  <summary>listOrders</summary>

  ```js
  const result = await client.orders.listOrders({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  createdAfter | `Date` |
  createdBefore | `Date` |
  lastUpdatedAfter | `Date` |
  lastUpdatedBefore | `Date` |
  orderStatus | `String` |
  marketplaceId | `Array<String>` | Selected region’s marketplaces
  fulfillmentChannel | `String` |
  paymentMethod | `String` |
  buyerEmail | `String` |
  sellerOrderId | `String` |
  maxResultsPerPage | `Number` | `100`
  tfmShipmentStatus | `String` |
  nextToken | `String` |
</details>

<details>
  <summary>listOrderItems</summary>

  ```js
  const result = await client.orders.listOrderItems({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  amazonOrderId | `String` |
  nextToken | `String` |
</details>

### Products

<details>
  <summary>listMatchingProducts</summary>

  ```js
  const result = await client.products.listMatchingProducts({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  query | `String` |
  queryContextId | `String` |
</details>

<details>
  <summary>getMatchingProduct</summary>

  ```js
  const result = await client.products.getMatchingProduct({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asinList | `Array<String>` |
</details>

<details>
  <summary>getMatchingProductForId</summary>

  ```js
  const result = await client.products.getMatchingProductForId({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  idType | `String` |
  idList | `Array<String>` |
</details>

<details>
  <summary>getMyPriceForAsin</summary>

  ```js
  const result = await client.products.getMyPriceForAsin({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asinList | `Array<String>` |
  itemCondition | `String` |
</details>

<details>
  <summary>getMyPriceForSku</summary>

  ```js
  const result = await client.products.getMyPriceForSku({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sellerSkuList | `Array<String>` |
  itemCondition | `String` |
</details>

<details>
  <summary>getLowestPricedOffersForAsin</summary>

  ```js
  const result = await client.products.getLowestPricedOffersForAsin({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  asin | `String` |
  itemCondition | `String` |
</details>

<details>
  <summary>getLowestPricedOffersForSku</summary>

  ```js
  const result = await client.products.getLowestPricedOffersForSku({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sellerSku | `String` |
  itemCondition | `String` |
</details>

### Reports

<details>
  <summary>requestReport</summary>

  ```js
  const result = await client.reports.requestReport({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  reportType | `String` |
  startDate | `Date` |
  endDate | `Date` |
  marketplaces | `Array<String>` |
  reportOptions | `String` |
</details>

<details>
  <summary>getReportRequestList</summary>

  ```js
  const result = await client.reports.getReportRequestList({
    // Options
  })
  ```

  Options:

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

  ```js
  const result = await client.reports.getReportList({
    // Options
  })
  ```

  Options:

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

  ```js
  const result = await client.reports.getReport({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  reportId | `String` |
  format | `Enum[raw, base64]`
</details>

### Sellers ![](https://badgen.net/badge/status/complete?label&color=green)

<details>
  <summary>listMarketplaceParticipations</summary>

  ```js
  const result = await client.sellers.listMarketplaceParticipations({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  nextToken | `String` |
</details>

### Subscriptions

<details>
  <summary>registerDestination</summary>

  ```js
  const result = await client.subscriptions.registerDestination({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>deregisterDestination</summary>

  ```js
  const result = await client.subscriptions.deregisterDestination({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>sendTestNotificationToDestination</summary>

  ```js
  const result = await client.subscriptions.sendTestNotificationToDestination({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
</details>

<details>
  <summary>createSubscription</summary>

  ```js
  const result = await client.subscriptions.createSubscription({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
  isEnabled | `Boolean` | `true`
  notificationType | `String` |
</details>

<details>
  <summary>deleteSubscription</summary>

  ```js
  const result = await client.subscriptions.deleteSubscription({
    // Options
  })
  ```

  Options:

  Name | Type | Default
  -----|------|--------
  marketplaceId | `String` |
  sqsQueueUrl | `String` |
  notificationType | `String` |
</details>

<details>
  <summary>parseNotification</summary>

  ```js
  const result = await client.subscriptions.parseNotification('<any-xml />')
  ```

  Options: Takes an XML string.
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
