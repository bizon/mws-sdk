const {parseString} = require('.')

module.exports = (key, node) => ({
  type: parseString(`${key}/*[local-name() = 'Type']`, node),
  code: parseString(`${key}/*[local-name() = 'Code']`, node),
  message: parseString(`${key}/*[local-name() = 'Message']`, node),
  detail: parseString(`${key}/*[local-name() = 'Detail']`, node),
})
