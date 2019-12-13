const nock = require('nock')

async function setup() {
  nock.disableNetConnect()
}

module.exports = setup
