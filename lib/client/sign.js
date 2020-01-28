const crypto = require('crypto')

function sign(secretKey, {method, domain, path, data}) {
  const hmac = crypto.createHmac('sha256', secretKey)

  hmac.update(`${method}\n${domain}\n${path}\n`)
  const sp = new URLSearchParams(data)
  sp.sort()

  hmac.update(
    sp
      .toString()
      .replace(/\+/g, '%20')
  )

  return hmac.digest('base64')
}

module.exports = sign
