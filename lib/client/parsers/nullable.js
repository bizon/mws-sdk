const select = require('./select')

module.exports = (parser, key, node) => {
  const n = select(key, node)

  switch (n.length) {
    case 1:
      return parser('.', n[0])
    case 0:
      return null

    default:
      throw new Error('There was more than one match')
  }
}
