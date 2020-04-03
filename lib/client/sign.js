const crypto = require('crypto')

const {normalizeSearchParams} = require('./utils')

function sign(secretKey, {method, domain, path, data}) {
  const hmac = crypto.createHmac('sha256', secretKey)
  const searchParams = normalizeSearchParams(data)

  hmac.update(`${method}\n${domain}\n${path}\n`)
  hmac.update(searchParams)

  return hmac.digest('base64')
}

module.exports = sign
