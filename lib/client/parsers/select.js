const namespaces = require('./namespaces')

module.exports = (key, node) => {
  const selected = node.get(key, namespaces)

  if (!selected) {
    return []
  }

  if (!Array.isArray(selected)) {
    return [selected]
  }

  return selected
}
