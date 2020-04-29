const {parseDate} = require('../../../lib/client/utils')

describe('lib.client.utils', () => {
  describe('parseDate', () => {
    it('should return undefined if the input is not truthy', () => {
      const tests = [
        '',
        Number.NaN,
        undefined,
        null,
        0
      ]

      for (const test of tests) {
        expect(parseDate(test)).toBeUndefined()
      }
    })

    it('should throw if the date is invalid', () => {
      const tests = [
        'foo',
        {a: 1},
        Number.NEGATIVE_INFINITY,
        new Error('what'),
        new Date('no')
      ]

      for (const test of tests) {
        expect(() => parseDate(test)).toThrow(`${String(test)} is not a valid date`)
      }
    })

    it('should transform dates to ISO string', () => {
      const tests = [
        1546300800000,
        new Date(2019, 0, 1),
        '2019',
        '2019-01',
        '2019-01-01',
        '2019-01-01T00:00',
        '2019-01-01T00:00.000',
        '2019-01-01T00:00.000Z',
        '2019-01-01T00:00.000+000'
      ]

      for (const test of tests) {
        expect(parseDate(test)).toBe('2019-01-01T00:00:00.000Z')
      }
    })
  })
})
