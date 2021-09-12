const {parseXml} = require('libxmljs2')

module.exports = input => parseXml(input, {
  noblanks: true,
})
