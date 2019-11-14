const select = require('./select')

module.exports = (parser, key, node, selfClosingAsNull) => {
  const n = select(key, node)

  switch (n.length) {
    case 1:
      if (selfClosingAsNull && n[0].attrs().length === 0 && n[0].childNodes().length === 0) {
        return null
      }

      return parser('.', n[0])
    case 0:
      return null

    default:
      throw new Error('There was more than one match')
  }
}
