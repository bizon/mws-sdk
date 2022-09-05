const parseXml = require('../../../../../lib/client/parsers')
const parseListOrderItemsResponse = require('../../../../../lib/client/parsers/orders/list-order-items-response')

describe('lib.client.parsers.orders.list-order-items-response', () => {
  it('should parse the ListOrderItemsResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<ListOrderItemsResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
        <ListOrderItemsResult>
          <NextToken>MRgZW55IGNhcm5hbCBwbGVhc3VyZS6=</NextToken>
          <AmazonOrderId>058-1233752-8214740</AmazonOrderId>
          <OrderItems>
            <OrderItem>
              <ASIN>BT0093TELA</ASIN>
              <OrderItemId>68828574383266</OrderItemId>
              <BuyerCustomizedInfo>
                <CustomizedURL>https://zme-caps.amazon.com/t/bR6qHkzSOxuB/J8nbWhze0Bd3DkajkOdY-XQbWkFralegp2sr_QZiKEE/1
                </CustomizedURL>
              </BuyerCustomizedInfo>
              <SellerSKU>CBA_OTF_1</SellerSKU>
              <Title>Example item name</Title>
              <QuantityOrdered>1</QuantityOrdered>
              <QuantityShipped>1</QuantityShipped>
              <ProductInfo>
                <NumberOfItems>12</NumberOfItems>
              </ProductInfo>
              <PointsGranted>
                <PointsNumber>10</PointsNumber>
                <PointsMonetaryValue>
                  <CurrencyCode>JPY</CurrencyCode>
                  <Amount>10.00</Amount>
                </PointsMonetaryValue>
              </PointsGranted>
              <ItemPrice>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>25.99</Amount>
              </ItemPrice>
              <ShippingPrice>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>1.26</Amount>
              </ShippingPrice>
              <ScheduledDeliveryEndDate>2013-09-09T01:30:00.000-06:00 </ScheduledDeliveryEndDate>
              <ScheduledDeliveryStartDate>2013-09-071T02:00:00.000-06:00 </ScheduledDeliveryStartDate>
              <CODFee>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>10.00</Amount>
              </CODFee>
              <CODFeeDiscount>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>1.00</Amount>
              </CODFeeDiscount>
              <IsGift>false</IsGift>
              <IsTransparency>true</IsTransparency>
              <GiftMessageText>For you!</GiftMessageText>
              <GiftWrapPrice>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>1.99</Amount>
              </GiftWrapPrice>
              <GiftWrapLevel>Classic</GiftWrapLevel>
              <PriceDesignation>BusinessPrice</PriceDesignation>
            </OrderItem>
            <OrderItem>
              <ASIN>BCTU1104UEFB</ASIN>
              <OrderItemId>79039765272157</OrderItemId>
              <SellerSKU>CBA_OTF_5</SellerSKU>
              <Title>Example item name</Title>
              <QuantityOrdered>2</QuantityOrdered>
              <ItemPrice>
                <CurrencyCode>JPY</CurrencyCode>
                <Amount>17.95</Amount>
              </ItemPrice>
              <PromotionIds>
                <PromotionId>FREESHIP</PromotionId>
              </PromotionIds>
              <ConditionId>Used</ConditionId>
              <ConditionSubtypeId>Mint</ConditionSubtypeId>
              <ConditionNote>Example ConditionNote</ConditionNote>
              <IsGift>false</IsGift>
              <IsTransparency>false</IsTransparency>
              <PriceDesignation>BusinessPrice</PriceDesignation>
              <TaxCollection>
                <Model>MarketplaceFacilitator</Model>
                <ResponsibleParty>Amazon Services, Inc.</ResponsibleParty>
              </TaxCollection>
            </OrderItem>
          </OrderItems>
        </ListOrderItemsResult>
        <ResponseMetadata>
          <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
        </ResponseMetadata>
      </ListOrderItemsResponse>`,
    )

    const response = parseListOrderItemsResponse('/orders:ListOrderItemsResponse', doc)

    expect(response).toMatchSnapshot()
  })

  it('should parse the ListOrderItemsByNextTokenResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListOrderItemsByNextTokenResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
        <ListOrderItemsByNextTokenResult>
          <NextToken>MRgZW55IGNhcm5hbCBwbGVhc3VyZS6=</NextToken>
          <AmazonOrderId>058-1233752-8214740</AmazonOrderId>
          <OrderItems>
            <OrderItem>
              <ASIN>BT0093TELA</ASIN>
              <OrderItemId>68828574383266</OrderItemId>
              <SellerSKU>CBA_OTF_1</SellerSKU>
              <Title>Example item name</Title>
              <QuantityOrdered>1</QuantityOrdered>
              <QuantityShipped>1</QuantityShipped>
              <ItemPrice>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>25.99</Amount>
              </ItemPrice>
              <ShippingPrice>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>1.26</Amount>
              </ShippingPrice>
              <ScheduledDeliveryEndDate>2013-09-091T01:30:00.000-06:00
              </ScheduledDeliveryEndDate>
              <ScheduledDeliveryStartDate>2013-09-06T02:00:00.000-06:00
              </ScheduledDeliveryStartDate>
              <CODFee>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>10.00</Amount>
              </CODFee>
              <CODFeeDiscount>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>1.00</Amount>
              </CODFeeDiscount>
              <IsGift>false</IsGift>
              <GiftMessageText>For you!</GiftMessageText>
              <GiftWrapPrice>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>1.99</Amount>
              </GiftWrapPrice>
              <GiftWrapLevel>Classic</GiftWrapLevel>
              <PriceDesignation>BusinessPrice</PriceDesignation>
            </OrderItem>
            <OrderItem>
              <ASIN>BCTU1104UEFB</ASIN>
              <OrderItemId>79039765272157</OrderItemId>
              <SellerSKU>CBA_OTF_5</SellerSKU>
              <Title>Example item name</Title>
              <QuantityOrdered>2</QuantityOrdered>
              <ItemPrice>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>17.95</Amount>
              </ItemPrice>
              <PromotionIds>
                <PromotionId>FREESHIP</PromotionId>
              </PromotionIds>
              <ConditionId>Used</ConditionId>
              <ConditionSubtypeId>Mint</ConditionSubtypeId>
              <ConditionNote>Example ConditionNote</ConditionNote>
              <IsGift>false</IsGift>
              <IsTransparency>true</IsTransparency>
              <PriceDesignation>BusinessPrice</PriceDesignation>
            </OrderItem>
          </OrderItems>
        </ListOrderItemsByNextTokenResult>
        <ResponseMetadata>
          <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
        </ResponseMetadata>
      </ListOrderItemsByNextTokenResponse>`,
    )

    const response = parseListOrderItemsResponse(
      '/orders:ListOrderItemsByNextTokenResponse',
      doc,
      true,
    )

    expect(response).toMatchSnapshot()
  })
})
