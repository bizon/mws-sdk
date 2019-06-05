const qs = require('querystring')
const crypto = require('crypto')
const {URLSearchParams} = require('url')

function sign(secretKey, {method, domain, path, data}) {
  const hmac = crypto.createHmac('sha256', secretKey)

  hmac.update(`${method}\n${domain}\n${path}\n`)
  const sp = new URLSearchParams(data)
  sp.sort()

  const q = [...sp.entries()].reduce((acc, [k, v]) => {
    acc[k] = v
    return acc
  }, {})

  hmac.update(qs.stringify(q))

  return hmac.digest('base64')
}

module.exports = sign
