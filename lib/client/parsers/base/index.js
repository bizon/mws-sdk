const {parseISO} = require('date-fns')

const select = require('../select')

function parseStr(key, node) {
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
  const str = parseStr(key, node)

  if (str) {
    return parseInt(str, 10)
  }

  return str
}

function parseDecimal(key, node) {
  const str = parseStr(key, node)

  if (str) {
    return parseFloat(str)
  }

  return str
}

function parseBool(key, node) {
  const str = parseStr(key, node)

  if (str) {
    return str === 'true'
  }

  return str
}

function parseDate(key, node) {
  const str = parseStr(key, node)

  if (str) {
    return parseISO(
      decodeURIComponent(str)
    )
  }

  return str
}

module.exports = {
  parseStr,
  parseNumber,
  parseDecimal,
  parseBool,
  parseDate
}
