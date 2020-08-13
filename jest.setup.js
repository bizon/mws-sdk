const nock = require('nock')

process.env.DEBUG = 'bizon:mws-sdk:*'

async function setup() {
  nock.disableNetConnect()
}

module.exports = setup
