const parseXml = require('../../../../lib/client/parsers')

describe('lib.client.parsers.index', () => {
  it('should throw for invalid documents', () => {
    expect(
      () => parseXml('<Order stuff="3"')
    ).toThrow('Couldn\'t find end of Start Tag Order')
  })
})
