const {parseXml} = require('libxmljs')

module.exports = input => parseXml(input, {
  noblanks: true
})
