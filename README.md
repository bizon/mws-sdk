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

### Finances

Version: `2015-05-01`

#### `finances.listFinancialEvents(options)`

Options:

Name | Type | Default
-----|------|--------
maxResultsPerPage | `Number` | `100`
amazonOrderId | `String` |
financialEventGroupId | `String` |
postedAfter | `Date` |
postedBefore | `Date` |
nextToken | `String` |

#### `finances.listFinancialEventGroups(options)`

Options:

Name | Type | Default
-----|------|--------
maxResultsPerPage | `Number` | `100`
financialEventGroupStartedAfter | `Date` |
financialEventGroupStartedBefore | `Date` |
nextToken | `String` |

### FulfillmentInboundShipment

Version: `2010-10-01`

#### `fulfillmentInboundShipment.listInboundShipments(options)`

Options:

Name | Type | Default
-----|------|--------
shipmentStatusList | `Array<String>` |
shipmentIdList | `Array<String>` |
lastUpdatedAfter | `Date` |
lastUpdatedBefore | `Date` |
nextToken | `String` |

#### `fulfillmentInboundShipment.listInboundShipmentItems(options)`

Options:

Name | Type | Default
-----|------|--------
shipmentId | `Array<String>` |
lastUpdatedAfter | `Date` |
lastUpdatedBefore | `Date` |
nextToken | `String` |

### FulfillmentInventory

Version: `2010-10-01`

#### `fulfillmentInventory.listInventorySupply(options)`

Options:

Name | Type | Default
-----|------|--------
sellerSkus | `Array<String>` |
queryStartDateTime | `Date` |
responseGroup | `String` |
marketplaceId | `String` |
nextToken | `String` |

### Orders

Version: `2013-09-01`

#### `orders.getOrders(options)`

Options:

Name | Type | Default
-----|------|--------
amazonOrderIds | `Array<String>` |

#### `orders.listOrders(options)`

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

#### `orders.listOrderItems(options)`

Options:

Name | Type | Default
-----|------|--------
amazonOrderId | `String` |
nextToken | `String` |

### Products

Version: `2011-10-01`

#### `products.getMatchingProduct(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
asinList | `Array<String>` |

#### `products.getMatchingProductForId(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
idType | `String` |
idList | `Array<String>` |

#### `products.getMyPriceForAsin(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
asinList | `Array<String>` |
itemCondition | `String` |

#### `products.getMyPriceForSku(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sellerSkuList | `Array<String>` |
itemCondition | `String` |

#### `products.getLowestPricedOffersForAsin(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
asin | `String` |
itemCondition | `String` |

#### `products.getLowestPricedOffersForSku(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sellerSku | `String` |
itemCondition | `String` |

### Reports

Version: `2009-01-01`

#### `reports.requestReport(options)`

Options:

Name | Type | Default
-----|------|--------
reportType | `String` |
startDate | `Date` |
endDate | `Date` |
marketplaces | `Array<String>` |
reportOptions | `String` |

#### `reports.getReportRequestList(options)`

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

#### `reports.getReportList(options)`

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

#### `reports.getReport(options)`

Options:

Name | Type | Default
-----|------|--------
reportId | `String` |
format | `Enum[raw, base64]`

### Sellers

Version: `2011-07-01`

#### `sellers.listMarketplaceParticipations(options)`

Options:

Name | Type | Default
-----|------|--------
nextToken | `String` |

### Subscriptions

Version: `2013-07-01`

#### `subscriptions.registerDestination(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |

#### `subscriptions.deregisterDestination(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |

#### `subscriptions.createSubscription(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |
isEnabled | `Boolean` | `true`
notificationType | `String` |

#### `subscriptions.deleteSubscription(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |
notificationType | `String` |

#### `subscriptions.sendTestNotificationToDestination(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |

#### `subscriptions.parseNotification(xml)`

Parse an XML notification. The following notifications are supported:

- `Test`
- `AnyOfferChanged`
- `FeedProcessingFinished`
- `ReportProcessingFinished`

### Common

All entities except `Reports` support a `getServiceStatus` method to retrieve the API status.

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
