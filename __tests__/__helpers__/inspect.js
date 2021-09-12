function inspectError(error) {
  return Object.fromEntries(Object.entries(error))
}

module.exports = {
  inspectError,
}
