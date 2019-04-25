const namespaces = require('./namespaces')

module.exports = (key, node) => {
  return node.find(key, namespaces)
}
