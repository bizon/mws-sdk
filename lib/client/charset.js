const contentType = require('content-type')
const chardet = require('jschardet')

function getCharset(res) {
  try {
    const ct = contentType.parse(res)
    if (ct.parameters.charset) {
      return ct.parameters.charset
    }
  } catch (_) {
    // Go on.
  }

  const det = chardet.detect(res.body)
  if (det.confidence >= 0.8) {
    return det.encoding
  }
}

module.exports = getCharset
