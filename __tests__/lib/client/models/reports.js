const nock = require('nock')
const MockDate = require('mockdate')

const MWSClient = require('../../../..')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  sellerRegion: 'eu'
})

const apiUrl = `https://${client.settings.region.mwsDomain}`

describe('lib.client.models.reports', () => {
  beforeAll(() => {
    MockDate.set('2019-12-30')
  })

  afterAll(() => {
    MockDate.reset()
    client.reports.clearRestores()
  })

  it('should call GetReport and return a raw string', async () => {
    const {pathname, data} = client.signData('POST', 'Reports', '2009-01-01', {
      Action: 'GetReport',
      ReportId: 'REPORT-1'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(200, Buffer.from('Hello world!'))

    const result = await client.reports.getReport({
      reportId: 'REPORT-1',
      format: 'raw'
    })

    expect(result).toEqual('Hello world!')
  })

  it('should call GetReport and return a base64 string', async () => {
    const {pathname, data} = client.signData('POST', 'Reports', '2009-01-01', {
      Action: 'GetReport',
      ReportId: 'REPORT-1'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(200, Buffer.from('Hello world!'))

    const result = await client.reports.getReport({
      reportId: 'REPORT-1',
      format: 'base64'
    })

    expect(result).toEqual('SGVsbG8gd29ybGQh')
  })

  it('should call GetReport and return a parsed CSV', async () => {
    const {pathname, data} = client.signData('POST', 'Reports', '2009-01-01', {
      Action: 'GetReport',
      ReportId: 'REPORT-1'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(200, Buffer.from('asin,title\nA1,cool product\nA2,other product'))

    const result = await client.reports.getReport({
      reportId: 'REPORT-1'
    })

    expect(result).toMatchSnapshot()
  })
})
