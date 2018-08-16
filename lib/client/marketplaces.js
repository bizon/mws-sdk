const marketplaces = {
  // Europe
  de: {
    id: 'A1PA6795UKMFR9',
    name: 'Germany',
    domain: 'mws-eu.amazonservices.com'
  },
  es: {
    id: 'A1RKKUPIHCS9HS',
    name: 'Spain',
    domain: 'mws-eu.amazonservices.com'
  },
  fr: {
    id: 'A13V1IB3VIYZZH',
    name: 'France',
    domain: 'mws-eu.amazonservices.com'
  },
  it: {
    id: 'APJ6JRA9NG5V4',
    name: 'Italy',
    domain: 'mws-eu.amazonservices.com'
  },
  uk: {
    id: 'A1F83G8C2ARO7P',
    name: 'United Kingdom',
    domain: 'mws-eu.amazonservices.com'
  },

  // North America
  ca: {
    id: 'A2EUQ1WTGCTBG2',
    name: 'Canada',
    domain: 'mws.amazonservices.com'
  },
  mx: {
    id: 'A1AM78C64UM0Y8',
    name: 'Mexico',
    domain: 'mws.amazonservices.com'
  },
  us: {
    id: 'ATVPDKIKX0DER',
    name: 'United States',
    domain: 'mws.amazonservices.com'
  },

  // Other
  au: {
    id: 'A39IBJ37TRP1C6',
    name: 'Australia',
    domain: 'mws.amazonservices.com.au'
  },
  br: {
    id: 'A2Q3Y263D00KWC',
    name: 'Brazil',
    domain: 'mws.amazonservices.com'
  },
  cn: {
    id: 'AAHKV2X7AFYLW',
    name: 'China',
    domain: 'mws.amazonservices.com.cn'
  },
  in: {
    id: 'A21TJRUUN4KGV',
    name: 'India',
    domain: 'mws.amazonservices.in'
  },
  jp: {
    id: 'A1VC38T7YXB528',
    name: 'Japan',
    domain: 'mws.amazonservices.jp'
  }
}

const regions = {
  eu: {
    domain: 'mws-eu.amazonservices.com',
    marketplaces: [
      marketplaces.de,
      marketplaces.es,
      marketplaces.fr,
      marketplaces.it,
      marketplaces.uk
    ]
  }
}

module.exports = {marketplaces, regions}
