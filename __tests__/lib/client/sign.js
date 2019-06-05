const sign = require('../../../lib/client/sign')

describe('lib.client.sign', () => {
  it('should generate generate signatures', () => {
    expect(
      sign('secret', {
        method: 'POST',
        domain: 'mws-eu.amazonservices.com',
        path: 'Products/2011-10-01',
        data: {
          Cool: 'Test with spaces'
        }
      })
    ).toMatchSnapshot()

    expect(
      sign('secret', {
        method: 'POST',
        domain: 'mws-eu.amazonservices.com',
        path: 'Products/2011-10-01',
        data: {
          Method: 'Example'
        }
      })
    ).toMatchSnapshot()
  })
})
