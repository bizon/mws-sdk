const select = require('../select')

function parseStr(key, node) {
  const res = select(`${key}/text()`, node)

  if (res.length === 1) {
    const [{data}] = res
    return data ? data.trim() : null
  }
  if (res.length === 0) {
    return null
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
    return new Date(str)
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
