const contentType = require('content-type')

function getCharset(response) {
  try {
    const ct = contentType.parse(response)
    if (ct.parameters.charset) {
      return ct.parameters.charset
    }
  } catch {
    // Go on.
  }

  // The MWS doc specifies this as the default charset.
  return 'iso-8859-1'
}

module.exports = getCharset
