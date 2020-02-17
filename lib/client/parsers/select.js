const namespaces = require('./namespaces')

module.exports = (key, node) => {
  if (Array.isArray(key)) {
    key = key.join('|')
  }

  return node.find(key, namespaces)
}
