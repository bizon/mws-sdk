const namespaces = require('./namespaces')

module.exports = (key, node) => {
  return node.get(key, namespaces) || []
}
