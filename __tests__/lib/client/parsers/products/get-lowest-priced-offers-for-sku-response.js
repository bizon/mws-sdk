const parseXml = require('../../../../../lib/client/parsers')
const parseGetLowestPricedOffersForSkuResponse = require('../../../../../lib/client/parsers/products/get-lowest-priced-offers-for-sku-response')

describe('lib.client.parsers.products.get-lowest-priced-offers-for-sku-response', () => {
  it('should parse the GetLowestPricedOffersForSKUResponse success example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForSKUResult MarketplaceID="ATVPDKIKX0DER" SKU="GE Product" ItemCondition="New"
          status="Success">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <SellerSKU>GE Product</SellerSKU>
            <ItemCondition>New</ItemCondition>
            <TimeOfOfferChange>2015-07-19T23:15:11.859Z</TimeOfOfferChange>
          </Identifier>
          <Summary>
            <TotalOfferCount>1</TotalOfferCount>
            <NumberOfOffers>
              <OfferCount condition="new" fulfillmentChannel="Amazon">1</OfferCount>
            </NumberOfOffers>
            <LowestPrices>
              <LowestPrice condition="new" fulfillmentChannel="Amazon">
                <LandedPrice>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>32.99</Amount>
                </LandedPrice>
                <ListingPrice>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>32.99</Amount>
                </ListingPrice>
                <Shipping>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>0.00</Amount>
                </Shipping>
              </LowestPrice>
            </LowestPrices>
            <BuyBoxPrices>
              <BuyBoxPrice condition="New">
                <LandedPrice>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>32.99</Amount>
                </LandedPrice>
                <ListingPrice>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>32.99</Amount>
                </ListingPrice>
                <Shipping>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>0.00</Amount>
                </Shipping>
              </BuyBoxPrice>
            </BuyBoxPrices>
            <ListPrice>
              <CurrencyCode>USD</CurrencyCode>
              <Amount>58.34</Amount>
            </ListPrice>
            <SuggestedLowerPricePlusShipping>
              <CurrencyCode>USD</CurrencyCode>
              <Amount>32.99</Amount>
            </SuggestedLowerPricePlusShipping>
            <BuyBoxEligibleOffers>
              <OfferCount condition="new" fulfillmentChannel="Amazon">1</OfferCount>
            </BuyBoxEligibleOffers>
          </Summary>
          <Offers>
            <Offer>
              <MyOffer>false</MyOffer>
              <SubCondition>new</SubCondition>
              <SellerFeedbackRating>
                <SellerPositiveFeedbackRating>100.0</SellerPositiveFeedbackRating>
                <FeedbackCount>1</FeedbackCount>
              </SellerFeedbackRating>
              <ShippingTime minimumHours="0" maximumHours="0" availabilityType="NOW" />
              <ListingPrice>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>32.99</Amount>
              </ListingPrice>
              <Shipping>
                <CurrencyCode>USD</CurrencyCode>
                <Amount>0.00</Amount>
              </Shipping>
              <IsFulfilledByAmazon>true</IsFulfilledByAmazon>
              <IsBuyBoxWinner>true</IsBuyBoxWinner>
              <IsFeaturedMerchant>true</IsFeaturedMerchant>
            </Offer>
          </Offers>
        </GetLowestPricedOffersForSKUResult>
        <ResponseMetadata>
          <RequestId>fd2e6c6d-0b6d-499b-9fea-074175c0547a</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForSKUResponse>`
    )

    const res = parseGetLowestPricedOffersForSkuResponse(
      '/products:GetLowestPricedOffersForSKUResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForSKUResponse success with no offers example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForSKUResult MarketplaceID="ATVPDKIKX0DER" SKU="0I-RIAS-6UA0" ItemCondition="new"
          status="NoBuyableOffers">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <SellerSKU>0I-RIAS-6UA0</SellerSKU>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForSKUResult>
        <ResponseMetadata>
          <RequestId>75621aa7-9c8b-40be-9bf9-3ac1efdcdb87</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForSKUResponse>`
    )

    const res = parseGetLowestPricedOffersForSkuResponse(
      '/products:GetLowestPricedOffersForSKUResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForSKUResponse missing shipping charge example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0" encoding="UTF-8"?>
      <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForSKUResult MarketplaceID="ATVPDKIKX0DER" SKU="0I-RIAS-6UA0" ItemCondition="new"
          status="NoOfferDueToMissingShippingCharge">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <SellerSKU>0I-RIAS-6UA0</SellerSKU>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForSKUResult>
        <ResponseMetadata>
          <RequestId>75621aa7-9c8b-40be-9bf9-3ac1efdcdb87</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForSKUResponse>`
    )

    const res = parseGetLowestPricedOffersForSkuResponse(
      '/products:GetLowestPricedOffersForSKUResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForSKUResponse too soon for processing example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForSKUResult MarketplaceID="A2EUQ1WTGCTBG2" SKU="ACA-8039-6PK-DL57" ItemCondition="New"
          status="ActiveButTooSoonForProcessing">
          <Identifier>
            <MarketplaceId>A2EUQ1WTGCTBG2</MarketplaceId>
            <SellerSKU>ACA-8039-6PK-DL57</SellerSKU>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
            <OffersAvailableTime>2017-03-08T07:13:21.763Z</OffersAvailableTime>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForSKUResult>
        <ResponseMetadata>
          <RequestId>1212334</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForSKUResponse>`
    )

    const res = parseGetLowestPricedOffersForSkuResponse(
      '/products:GetLowestPricedOffersForSKUResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
