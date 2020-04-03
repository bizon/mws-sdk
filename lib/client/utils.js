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

module.exports = {
  cleanData,
  arrayToObject,
  normalizeSearchParams
}
