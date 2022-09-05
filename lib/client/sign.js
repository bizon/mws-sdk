const crypto = require('crypto')

const {normalizeSearchParameters} = require('./utils')

function sign(secretKey, {method, domain, path, data}) {
  const hmac = crypto.createHmac('sha256', secretKey)
  const searchParameters = normalizeSearchParameters(data)

  hmac.update(`${method}\n${domain}\n${path}\n`)
  hmac.update(searchParameters)

  return hmac.digest('base64')
}

module.exports = sign
