const {parseISO, isValid} = require('date-fns')

function dateToISOString(input) {
  if (!input) {
    return undefined
  }

  const source = input

  if (typeof input === 'number') {
    input = new Date(input)
  } else if (typeof input === 'string') {
    input = parseISO(input)
  }

  if (input instanceof Date && isValid(input)) {
    return input.toISOString()
  }

  throw new TypeError(`${source} is not a valid date`)
}

function cleanData(data) {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => typeof v !== 'undefined'))
}

function arrayToObject(key, data) {
  if (!Array.isArray(data)) {
    data = [data]
  }

  return Object.fromEntries(data.map((element, index) => [`${key}.${index + 1}`, element]))
}

function normalizeSearchParameters(data) {
  const sp = new URLSearchParams(data)
  sp.sort()
  return sp.toString().replace(/\+/g, '%20')
}

function reportOptionsToString(data) {
  if (data && typeof data === 'object') {
    return Object.entries(data)
      .map(([key, value]) => `${key}=${String(value)}`)
      .join(';')
  }

  return data
}

module.exports = {
  cleanData,
  dateToISOString,
  arrayToObject,
  normalizeSearchParameters,
  reportOptionsToString,
}
