const {parseStr} = require('.')

module.exports = (key, node) => ({
  type: parseStr(`${key}/*[local-name() = 'Type']`, node),
  code: parseStr(`${key}/*[local-name() = 'Code']`, node),
  message: parseStr(`${key}/*[local-name() = 'Message']`, node),
  detail: parseStr(`${key}/*[local-name() = 'Detail']`, node)
})
