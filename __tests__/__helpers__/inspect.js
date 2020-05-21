function inspectError(error) {
  return Object
    .entries(error)
    .reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
}

module.exports = {
  inspectError
}
