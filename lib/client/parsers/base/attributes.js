const {parseISO} = require('date-fns')

const select = require('../select')

function parseAttributeString(key, node, attribute) {
  const selected = select(key, node)

  if (!selected || selected.length === 0) {
    return null
  }

  if (selected.length === 1) {
    const attr = selected[0].attr(attribute)
    if (!attr) {
      return null
    }

    return attr.value().trim()
  }

  throw new Error('Multiple nodes found')
}

function parseAttributeNumber(key, node, attribute) {
  const value = parseAttributeString(key, node, attribute)

  if (value) {
    return Number.parseInt(value, 10)
  }

  return null
}

function parseAttributeDecimal(key, node, attribute) {
  const value = parseAttributeString(key, node, attribute)

  if (value) {
    return Number.parseFloat(value)
  }

  return null
}

function parseAttributeDate(key, node, attribute) {
  const value = parseAttributeString(key, node, attribute)

  if (value) {
    return parseISO(decodeURIComponent(value))
  }

  return null
}

module.exports = {
  parseAttributeString,
  parseAttributeNumber,
  parseAttributeDecimal,
  parseAttributeDate,
}
