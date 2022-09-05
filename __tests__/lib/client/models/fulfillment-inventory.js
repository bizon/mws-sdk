const MockDate = require('mockdate')
const nock = require('nock')

const MWSClient = require('../../../..')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  mwsRegion: 'eu',
})

const apiUrl = `https://${client.settings.mwsDomain}`

describe('lib.client.models.fulfillment-inventory', () => {
  beforeAll(() => {
    MockDate.set('2019-11-22')
  })

  afterAll(() => {
    MockDate.reset()
    client.fulfillmentInventory.clearRestores()
  })

  it('should call ListInventorySupply', async () => {
    const {pathname, data} = client.signData('GET', 'FulfillmentInventory', '2010-10-01', {
      Action: 'ListInventorySupply',
      QueryStartDateTime: new Date().toISOString(),
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <ListInventorySupplyResponse xmlns="http://mws.amazonaws.com/FulfillmentInventory/2010-10-01/">
          <ListInventorySupplyResult>
            <NextToken>H4sIAAAAAAAAADXQzW6CMAAA4FcxXD3AgE5J5pLSiBTQ8ScSblCB0Ap2LSL49O6y7xGr05WbPW8ip3SlDdZK6t3CmuKTH8d9B/0mhCR7gcVE3gpuDaR8850n239tjC17Z3Gg2PmsZJNa14izwUtQAMYp6tOH4NHl/gN492SYVU0P5F0OYwUwmYI0d/YHnMSgDPUF0mvxTPNofZkXr6ww39SIBYJUTlUMNwIWaduUNr/MZYmaySPqugvxiQaTs2Rxgs1gFENKcUV7Ry/8BSUECjcj2sQ7bLTnBvYPd9/ksLbmV5ydt+HUWFx1QMQgD7O5Ey96mZzNZypKo7V9nBUtPNp/AztF/X4Di21K/SkBAAA=</NextToken>
            <InventorySupplyList>
              <member>
                <SellerSKU>SampleSKU3</SellerSKU>
                <ASIN>BT008FQ92Q</ASIN>
                <TotalSupplyQuantity>18</TotalSupplyQuantity>
                <FNSKU>X0000000EY</FNSKU>
                <Condition>NewItem</Condition>
                <SupplyDetail>
                  <member>
                    <EarliestAvailableToPick>
                      <TimepointType>Immediately</TimepointType>
                    </EarliestAvailableToPick>
                    <Quantity>5</Quantity>
                    <LatestAvailableToPick>
                      <TimepointType>Immediately</TimepointType>
                    </LatestAvailableToPick>
                    <SupplyType>InStock</SupplyType>
                  </member>
                  <member>
                    <EarliestAvailableToPick>
                      <TimepointType>DateTime</TimepointType>
                      <DateTime>2011-05-04T23:00:00Z</DateTime>
                    </EarliestAvailableToPick>
                    <Quantity>13</Quantity>
                    <LatestAvailableToPick>
                      <TimepointType>DateTime</TimepointType>
                      <DateTime>2011-05-04T23:00:00Z</DateTime>
                    </LatestAvailableToPick>
                    <SupplyType>InStock</SupplyType>
                  </member>
                </SupplyDetail>
                <InStockSupplyQuantity>4</InStockSupplyQuantity>
              </member>
            </InventorySupplyList>
          </ListInventorySupplyResult>
          <ResponseMetadata>
            <RequestId>e26d8d21-8e5c-11df-9acb-230ae7a8b736</RequestId>
          </ResponseMetadata>
        </ListInventorySupplyResponse>`,
      )

    const result = await client.fulfillmentInventory.listInventorySupply({
      queryStartDateTime: new Date(),
    })

    expect(result).toMatchSnapshot()
  })
})
