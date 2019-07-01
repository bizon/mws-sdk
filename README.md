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

## API

### Finances

Version: `2015-05-01`

#### `listFinancialEvents(options)`

Options:

Name | Type | Default
-----|------|--------
maxResultsPerPage | `Number` | 100
amazonOrderId | `String` |
financialEventGroupId | `String` |
postedAfter | `Date` |
postedBefore | `Date` |
nextToken | `String` |

#### `listFinancialEventGroups(options)`

Options:

Name | Type | Default
-----|------|--------
maxResultsPerPage | `Number` | 100
financialEventGroupStartedAfter | `Date` |
financialEventGroupStartedBefore | `Date` |
nextToken | `String` |

### Orders

Version: `2013-09-01`

#### `getOrders(options)`

Options:

Name | Type | Default
-----|------|--------
amazonOrderIds | `Array<String>` |

#### `listOrders(options)`

Options:

Name | Type | Default
-----|------|--------
createdAfter | `Date` |
createdBefore | `Date` |
lastUpdatedAfter | `Date` |
lastUpdatedBefore | `Date` |
orderStatus | `String` |
fulfillmentChannel | `String` |
paymentMethod | `String` |
buyerEmail | `String` |
sellerOrderId | `String` |
maxResultsPerPage | `Number` | 100
tfmShipmentStatus | `String` |
nextToken | `String` |

#### `listOrderItems(options)`

Options:

Name | Type | Default
-----|------|--------
amazonOrderId | `String` |
nextToken | `String` |

### Products

Version: `2011-10-01`

#### `getMatchingProductForId(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
idType | `String` |
idList | `Array<String>` |

#### `getMyPriceForAsin(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
asinList | `Array<String>` |
itemCondition | `String` |

### Reports

Version: `2009-01-01`

#### `requestReport(options)`

Options:

Name | Type | Default
-----|------|--------
reportType | `String` |
startDate | `Date` |
endDate | `Date` |
marketplaces | `Array<String>` |
reportOptions | `String` |

#### `getReportRequestList(options)`

Options:

Name | Type | Default
-----|------|--------
reportRequestIdList | `Array<String>` |
reportTypeList | `Array<String>` |
reportProcessingStatusList | `Array<String>` |
maxCount | `Number` | 100
requestedFromDate | `Date` |
requestedToDate | `Date` |
nextToken | `String` |

#### `getReportList(options)`

Options:

Name | Type | Default
-----|------|--------
maxCount | `Number` | 100
reportTypeList | `Array<String>` |
acknowledged | Boolean
reportRequestIdList | `Array<String>` |
availableFromDate | `Date` |
availableToDate | `Date` |
nextToken | `String` |

#### `getReport(options)`

Options:

Name | Type | Default
-----|------|--------
reportId | `String` |
format | `Enum[raw, base64]`

### Subscriptions

Version: `2013-07-01`

#### `registerDestination(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |

#### `createSubscription(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |
isEnabled | `Boolean` | `true`
notificationType | `String` |

#### `sendTestNotificationToDestination(options)`

Options:

Name | Type | Default
-----|------|--------
marketplaceId | `String` |
sqsQueueUrl | `String` |

#### `parseNotification(xml)`

Parse an XML notification. Only `Test` and `AnyOfferChanged` notifications are supported.

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
