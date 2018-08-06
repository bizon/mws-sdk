const {parse} = require('xpath')

module.exports = (key, node) => parse(key).select({
  node,
  isHtml: true // Ignore namespaces for base.
})

