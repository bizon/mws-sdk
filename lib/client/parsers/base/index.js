const {parseISO} = require('date-fns')

const select = require('../select')

function parseString(key, node) {
  if (Array.isArray(key)) {
    key = key.join('|')
  }

  const selected = select(key, node)

  if (!selected || selected.length === 0) {
    return null
  }

  if (selected.length === 1) {
    return selected[0].text().trim()
  }

  throw new Error('Multiple nodes found')
}

function parseNumber(key, node) {
  const value = parseString(key, node)

  if (value) {
    return Number.parseInt(value, 10)
  }

  return value
}

function parseDecimal(key, node) {
  const value = parseString(key, node)

  if (value) {
    return Number.parseFloat(value)
  }

  return value
}

function parseBool(key, node) {
  const value = parseString(key, node)

  if (value) {
    return value === 'true'
  }

  return value
}

function parseDate(key, node) {
  const value = parseString(key, node)

  if (value) {
    return parseISO(decodeURIComponent(value))
  }

  return value
}

module.exports = {
  parseString,
  parseNumber,
  parseDecimal,
  parseBool,
  parseDate,
}
