const parseXml = require('../../../../../lib/client/parsers')
const parseListInventorySupplyResponse = require('../../../../../lib/client/parsers/fulfillment-inventory/list-inventory-supply-response')

describe('lib.client.parsers.fulfillment-inventory.list-inventory-supply-response', () => {
  it('should parse the ListInventorySupply example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListInventorySupplyResponse xmlns="http://mws.amazonaws.com/FulfillmentInventory/2010-10-01/">
        <ListInventorySupplyResult>
          <InventorySupplyList>
            <member>
              <SellerSKU>SampleSKU1</SellerSKU>
              <ASIN>B00000K3CQ</ASIN>
              <TotalSupplyQuantity>20</TotalSupplyQuantity>
              <FNSKU>X0000000FM</FNSKU>
              <Condition>NewItem</Condition>
              <SupplyDetail />
              <InStockSupplyQuantity>15</InStockSupplyQuantity>
              <EarliestAvailability>
                <TimepointType>Immediately</TimepointType>
              </EarliestAvailability>
            </member>
            <member>
              <SellerSKU>SampleSKU2</SellerSKU>
              <ASIN>B00004RWQR</ASIN>
              <TotalSupplyQuantity>0</TotalSupplyQuantity>
              <FNSKU>X00008FZR1</FNSKU>
              <Condition>UsedLikeNew</Condition>
              <SupplyDetail />
              <InStockSupplyQuantity>0</InStockSupplyQuantity>
            </member>
          </InventorySupplyList>
        </ListInventorySupplyResult>
        <ResponseMetadata>
          <RequestId>e8698ffa-8e59-11df-9acb-230ae7a8b736</RequestId>
        </ResponseMetadata>
      </ListInventorySupplyResponse>`
    )

    const res = parseListInventorySupplyResponse(
      '/fulfillmentInventory:ListInventorySupplyResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the ListInventorySupplyByNextToken example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListInventorySupplyByNextTokenResponse xmlns="http://mws.amazonaws.com/FulfillmentInventory/2010-10-01/">
        <ListInventorySupplyByNextTokenResult>
          <NextToken>2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=</NextToken>
          <InventorySupplyList>
            <member>
              <SellerSKU>SampleSKU5</SellerSKU>
              <ASIN>B00008UI0R</ASIN>
              <TotalSupplyQuantity>0</TotalSupplyQuantity>
              <FNSKU>B00008UI0R</FNSKU>
              <Condition />
              <SupplyDetail />
              <InStockSupplyQuantity>0</InStockSupplyQuantity>
            </member>
            <member>
              <SellerSKU>SampleSKU6</SellerSKU>
              <ASIN>B00000K3CQ</ASIN>
              <TotalSupplyQuantity>5259</TotalSupplyQuantity>
              <FNSKU>X0000000FM</FNSKU>
              <Condition>NewItem</Condition>
              <SupplyDetail />
              <InStockSupplyQuantity>5259</InStockSupplyQuantity>
              <EarliestAvailability>
                <TimepointType>Immediately</TimepointType>
              </EarliestAvailability>
            </member>
          </InventorySupplyList>
        </ListInventorySupplyByNextTokenResult>
        <ResponseMetadata>
          <RequestId>b3a020ac-8e5e-11df-9acb-230ae7a8b736</RequestId>
        </ResponseMetadata>
      </ListInventorySupplyByNextTokenResponse>`
    )

    const res = parseListInventorySupplyResponse(
      '/fulfillmentInventory:ListInventorySupplyByNextTokenResponse',
      doc,
      true
    )

    expect(res).toMatchSnapshot()
  })
})
