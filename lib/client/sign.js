const crypto = require('crypto')
const {URLSearchParams} = require('url')

function sign(secretKey, {method, domain, path, data}) {
  const hmac = crypto.createHmac('sha256', secretKey)

  hmac.update(`${method}\n${domain}\n${path}\n`)

  const sp = new URLSearchParams(data)
  sp.sort()

  hmac.update(sp.toString())

  return hmac.digest('base64')
}

module.exports = sign
