module.exports = (properties, filter) =>
  Object.fromEntries(Object.entries(properties).filter(([_, value]) => filter(value)))
