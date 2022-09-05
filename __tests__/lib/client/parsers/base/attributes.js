const parseXml = require('../../../../../lib/client/parsers')
const {
  parseAttributeString,
  parseAttributeNumber,
  parseAttributeDecimal,
  parseAttributeDate,
} = require('../../../../../lib/client/parsers/base/attributes')

describe('lib.client.parsers.base.attributes', () => {
  describe('parseAttributeString', () => {
    it('should return null when trying to access attributes on a non-existing node', () => {
      const value = parseAttributeNumber('/NotHere', parseXml('<Foo bar="" />'), 'bar')

      expect(value).toBeNull()
    })

    it('should throw when trying accessing attributes from multiple nodes', () => {
      expect(() =>
        parseAttributeString(
          '/Wrapper/Foo',
          parseXml(`
            <Wrapper>
              <Foo bar="a" />
              <Foo bar="b" />'
            </Wrapper>
          `),
          'bar',
        ),
      ).toThrow('Multiple nodes found')
    })

    it('should return null if the attribute does not exist', () => {
      const value = parseAttributeString('.', parseXml('<Foo bar="a" />'), 'notHere')

      expect(value).toBeNull()
    })

    it('should return an empty string if the attribute is empty', () => {
      const value = parseAttributeString('.', parseXml('<Foo bar="" />'), 'bar')

      expect(value).toBe('')
    })

    it('should trim the attribute', () => {
      const value = parseAttributeString(
        '.',
        parseXml('<Foo bar=" with spaces around  " />'),
        'bar',
      )

      expect(value).toBe('with spaces around')
    })
  })

  describe('parseAttributeNumber', () => {
    it('should return null if the input is empty', () => {
      const value = parseAttributeNumber('.', parseXml('<Foo bar="" />'), 'bar')

      expect(value).toBeNull()
    })

    it('should return NaN if the input is not a number', () => {
      const value = parseAttributeNumber('.', parseXml('<Foo bar="not a number" />'), 'bar')

      expect(value).toBeNaN()
    })

    it('should return an integer', () => {
      const value = parseAttributeNumber('.', parseXml('<Foo bar="3.1" />'), 'bar')

      expect(value).toBe(3)
    })
  })

  describe('parseAttributeDecimal', () => {
    it('should return null if the input is empty', () => {
      const value = parseAttributeDecimal('.', parseXml('<Foo bar="" />'), 'bar')

      expect(value).toBeNull()
    })

    it('should return NaN if the input is not a number', () => {
      const value = parseAttributeDecimal('.', parseXml('<Foo bar="not a number" />'), 'bar')

      expect(value).toBeNaN()
    })

    it('should return an decimal number', () => {
      const value = parseAttributeDecimal('.', parseXml('<Foo bar="3.1" />'), 'bar')

      expect(value).toBe(3.1)
    })
  })

  describe('parseAttributeDate', () => {
    it('should return null if the input is empty', () => {
      const value = parseAttributeDate('.', parseXml('<Foo bar="" />'), 'bar')

      expect(value).toBeNull()
    })

    it('should return a NaN date if the input is not a valid date', () => {
      const value = parseAttributeDate('.', parseXml('<Foo bar="not a number" />'), 'bar')

      expect(value.getDate()).toBeNaN()
    })

    it('should return a date', () => {
      const value = parseAttributeDate('.', parseXml('<Foo bar="2019-02-04" />'), 'bar')

      expect(value).toEqual(new Date(2019, 1, 4))
    })
  })
})
