module.exports = (properties, filter) => {
  return Object
    .entries(properties)
    .filter(([_, value]) => filter(value))
    .reduce((picked, [key, value]) => {
      picked[key] = value
      return picked
    }, {})
}
