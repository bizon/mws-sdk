const parseXml = require('../../../../../lib/client/parsers')
const parseGetLowestPricedOffersForAsinResponse = require('../../../../../lib/client/parsers/products/get-lowest-priced-offers-for-asin-response')

describe('lib.client.parsers.products.get-lowest-priced-offers-for-asin-response', () => {
  it('should parse the GetLowestPricedOffersForASINResponse success example response from MWS doc (updated)', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForASINResult MarketplaceID="ATVPDKIKX0DER" ItemCondition="New" ASIN="B0002GTTRC"
          status="Success">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <ASIN>B0002GTTRC</ASIN>
            <ItemCondition>New</ItemCondition>
            <TimeOfOfferChange>2015-07-19T23:15:11.859Z</TimeOfOfferChange>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
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
            <SalesRankings>
              <SalesRank>
                <ProductCategoryId>book_display_on_website</ProductCategoryId>
                <Rank>401</Rank>
              </SalesRank>
              <SalesRank>
                <ProductCategoryId>15356791</ProductCategoryId>
                <Rank>5</Rank>
              </SalesRank>
              <SalesRank>
                <ProductCategoryId>3153</ProductCategoryId>
                <Rank>8</Rank>
              </SalesRank>
              <SalesRank>
                <ProductCategoryId>17468</ProductCategoryId>
                <Rank>16</Rank>
              </SalesRank>
            </SalesRankings>
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
              <SellerId>SELLERID</SellerId>
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
              <ConditionNotes>Some notes!</ConditionNotes>
              <PrimeInformation>
                <IsNationalPrime>false</IsNationalPrime>
                <IsPrime>false</IsPrime>
              </PrimeInformation>
            </Offer>
          </Offers>
        </GetLowestPricedOffersForASINResult>
        <ResponseMetadata>
          <RequestId>21534f03-e7e3-4d9a-9bea-0e15add3326d</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForASINResponse>`,
    )

    const response = parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForASINResponse success with no offers example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForASINResult MarketplaceID="ATVPDKIKX0DER" ItemCondition="New" ASIN="B000EVPGSQ"
          status="NoBuyableOffers">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <ASIN>B000EVPGSQ</ASIN>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForASINResult>
        <ResponseMetadata>
          <RequestId>2bb867cd-8fa3-406c-adba-eb84c1796d21</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForASINResponse>`,
    )

    const response = parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForASINResponse missing shipping charge example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0" encoding="UTF-8"?>
      <GetLowestPricedOffersForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForASINResult MarketplaceID="ATVPDKIKX0DER" ItemCondition="New" ASIN="B000EVPGSQ"
          status="NoOfferDueToMissingShippingCharge">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <ASIN>B000EVPGSQ</ASIN>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForASINResult>
        <ResponseMetadata>
          <RequestId>2bb867cd-8fa3-406c-adba-eb84c1796d21</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForASINResponse>`,
    )

    const response = parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })

  it('should parse the GetLowestPricedOffersForASINResponse active but too soon for processing example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetLowestPricedOffersForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetLowestPricedOffersForASINResult MarketplaceID="ATVPDKIKX0DER" ItemCondition="New" ASIN="B01DL3WCPI"
          status="ActiveButTooSoonForProcessing">
          <Identifier>
            <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
            <ASIN>B01DL3WCPI</ASIN>
            <ItemCondition>New</ItemCondition>
          </Identifier>
          <Summary>
            <TotalOfferCount>0</TotalOfferCount>
            <OffersAvailableTime>2017-03-08T06:21:05.330Z</OffersAvailableTime>
          </Summary>
          <Offers />
        </GetLowestPricedOffersForASINResult>
        <ResponseMetadata>
          <RequestId>1212334</RequestId>
        </ResponseMetadata>
      </GetLowestPricedOffersForASINResponse>`,
    )

    const response = parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })
})
