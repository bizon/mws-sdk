const {
  dateToISOString,
  normalizeSearchParams,
  reportOptionsToString,
} = require('../../../lib/client/utils')

describe('lib.client.utils', () => {
  describe('dateToISOString', () => {
    it('should return undefined if the input is not truthy', () => {
      const tests = [
        '',
        Number.NaN,
        undefined,
        null,
        0,
      ]

      for (const test of tests) {
        expect(dateToISOString(test)).toBeUndefined()
      }
    })

    it('should throw if the date is invalid', () => {
      const tests = [
        'foo',
        {a: 1},
        Number.NEGATIVE_INFINITY,
        new Error('what'),
        new Date('no'),
      ]

      for (const test of tests) {
        expect(() => dateToISOString(test)).toThrow(`${String(test)} is not a valid date`)
      }
    })

    it('should transform dates to ISO string', () => {
      const tests = [
        1_546_300_800_000,
        new Date(2019, 0, 1),
        '2019',
        '2019-01',
        '2019-01-01',
        '2019-01-01T00:00',
        '2019-01-01T00:00.000',
        '2019-01-01T00:00.000Z',
        '2019-01-01T00:00.000+000',
      ]

      for (const test of tests) {
        expect(dateToISOString(test)).toBe('2019-01-01T00:00:00.000Z')
      }
    })
  })

  describe('reportOptionsToString', () => {
    it('should serialize ReportOptions', () => {
      const tests = [
        [
          null,
          null,
        ],
        [
          'custom=true',
          'custom=true',
        ],
        [
          {custom: true},
          'custom=true',
        ],
        [
          {MarketplaceId: 'ATVPDKIKX0DER', BrowseNodeId: '15706661'},
          'MarketplaceId=ATVPDKIKX0DER;BrowseNodeId=15706661',
        ],
      ]

      for (const [test, expected] of tests) {
        expect(reportOptionsToString(test)).toBe(expected)
      }
    })

    it('should serialize ReportOptions search param', () => {
      const tests = [
        [
          'custom=true',
          'ReportOptions=custom%3Dtrue',
        ],
        [
          {custom: true},
          'ReportOptions=custom%3Dtrue',
        ],
        [
          {MarketplaceId: 'ATVPDKIKX0DER', BrowseNodeId: '15706661'},
          'ReportOptions=MarketplaceId%3DATVPDKIKX0DER%3BBrowseNodeId%3D15706661',
        ],
      ]

      for (const [test, expected] of tests) {
        expect(
          normalizeSearchParams({
            ReportOptions: reportOptionsToString(test),
          }),
        ).toBe(expected)
      }
    })
  })
})
