const {parseISO} = require('date-fns')

const select = require('../select')

function parseAttributeStr(key, node, attribute) {
  const selected = select(key, node)

  if (!selected || selected.length === 0) {
    return null
  }

  if (selected.length === 1) {
    const attr = selected[0].attr(attribute)
    if (!attr) {
      return null
    }

    return decodeURIComponent(
      attr.value()
    ).trim()
  }

  throw new Error('Multiple nodes found')
}

function parseAttributeNumber(key, node, attribute) {
  const str = parseAttributeStr(key, node, attribute)

  if (str) {
    return parseInt(str, 10)
  }

  return str
}

function parseAttributeDecimal(key, node, attribute) {
  const str = parseAttributeStr(key, node, attribute)

  if (str) {
    return parseFloat(str)
  }

  return str
}

function parseAttributeDate(key, node, attribute) {
  const str = parseAttributeStr(key, node, attribute)

  if (str) {
    return parseISO(str)
  }

  return str
}

module.exports = {
  parseAttributeStr,
  parseAttributeNumber,
  parseAttributeDecimal,
  parseAttributeDate
}
