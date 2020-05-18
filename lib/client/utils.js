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
  return Object
    .entries(data)
    .filter(([_, v]) => typeof v !== 'undefined')
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
}

function arrayToObject(key, data) {
  if (!Array.isArray(data)) {
    data = [data]
  }

  return data.reduce((acc, el, index) => {
    acc[`${key}.${index + 1}`] = el
    return acc
  }, {})
}

function normalizeSearchParams(data) {
  const sp = new URLSearchParams(data)
  sp.sort()
  return sp.toString().replace(/\+/g, '%20')
}

function reportOptionsToString(data) {
  if (data && typeof data === 'object') {
    return Object
      .entries(data)
      .map(([key, value]) => `${key}=${String(value)}`)
      .join(';')
  }

  return data
}

module.exports = {
  cleanData,
  dateToISOString,
  arrayToObject,
  normalizeSearchParams,
  reportOptionsToString
}
