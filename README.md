# mws-sdk [![CircleCI](https://circleci.com/gh/bizon/mws-sdk.svg?style=svg&circle-token=8b71f3bda43c211cd12d978bde3a70170ae4dbce)](https://circleci.com/gh/bizon/mws-sdk)

> SDK for MWS APIs

[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

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
