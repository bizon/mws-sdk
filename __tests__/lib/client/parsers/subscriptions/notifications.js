const parseXml = require('../../../../../lib/client/parsers')
const parseNotification = require('../../../../../lib/client/parsers/subscriptions/notifications')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse a Test notification', () => {
    const doc = parseXml(
      `<Notification>
        <NotificationMetaData>
          <NotificationType>Test</NotificationType>
          <PayloadVersion>1.0</PayloadVersion>
          <UniqueId>0123456789-ca3b-4127-abe7-82cfbe19a032</UniqueId>
          <PublishTime>2019-07-01T10:46:29Z</PublishTime>
          <SellerId>XXXXXXXXXXTest</SellerId>
        </NotificationMetaData>
        <NotificationPayload>
          <TestNotification />
        </NotificationPayload>
      </Notification>`,
    )

    const res = parseNotification('/Notification', doc)

    expect(res).toMatchSnapshot()
  })

  it('should parse an AnyOfferChanged notification', () => {
    const doc = parseXml(
      `<Notification>
        <NotificationMetaData>
          <NotificationType>AnyOfferChanged</NotificationType>
          <PayloadVersion>1.0</PayloadVersion>
          <UniqueId>4e3a2c04-5f63-4afb-8666-e480e83fae47</UniqueId>
          <PublishTime>2015-01-06T14:15:55.708Z</PublishTime>
          <SellerId>A2H6E05OPYV8CQ</SellerId>
          <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
        </NotificationMetaData>
        <NotificationPayload>
          <AnyOfferChangedNotification>
            <OfferChangeTrigger>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <ASIN>B001BXLZUO</ASIN>
              <ItemCondition>new</ItemCondition>
              <TimeOfOfferChange>2015-01-06T14:15:54.699Z</TimeOfOfferChange>
            </OfferChangeTrigger>
            <Summary>
              <NumberOfOffers>
                <OfferCount condition="new" fulfillmentChannel="Amazon">4</OfferCount>
                <OfferCount condition="new" fulfillmentChannel="Merchant">4</OfferCount>
              </NumberOfOffers>
              <LowestPrices>
                <LowestPrice condition="new" fulfillmentChannel="Amazon">
                  <LandedPrice>
                    <Amount>32.55</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </LandedPrice>
                  <ListingPrice>
                    <Amount>32.55</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </ListingPrice>
                  <Shipping>
                    <Amount>0.00</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </Shipping>
                  <Points>
                    <PointsNumber>13</PointsNumber>
                  </Points>
                </LowestPrice>
                <LowestPrice condition="new" fulfillmentChannel="Merchant">
                  <LandedPrice>
                    <Amount>32.95</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </LandedPrice>
                  <ListingPrice>
                    <Amount>32.95</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </ListingPrice>
                  <Shipping>
                    <Amount>0.00</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </Shipping>
                </LowestPrice>
              </LowestPrices>
              <BuyBoxPrices>
                <BuyBoxPrice condition="new">
                  <LandedPrice>
                    <Amount>32.95</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </LandedPrice>
                  <ListingPrice>
                    <Amount>32.95</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </ListingPrice>
                  <Shipping>
                    <Amount>0.00</Amount>
                    <CurrencyCode>USD</CurrencyCode>
                  </Shipping>
                </BuyBoxPrice>
              </BuyBoxPrices>
              <ListPrice>
                <Amount>42.00</Amount>
                <CurrencyCode>USD</CurrencyCode>
              </ListPrice>


              <SalesRankings>
                <SalesRank>
                  <ProductCategoryId>beauty_display_on_website</ProductCategoryId>
                  <Rank>26563</Rank>
                </SalesRank>
              </SalesRankings>

              <BuyBoxEligibleOffers>
                <OfferCount condition="new" fulfillmentChannel="Amazon">4</OfferCount>
                <OfferCount condition="new" fulfillmentChannel="Merchant">4</OfferCount>
              </BuyBoxEligibleOffers>
            </Summary>
            <Offers>
              <Offer>
                <SellerId>A2TU82NH1RX1NZ</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>96</SellerPositiveFeedbackRating>
                  <FeedbackCount>15400</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="0" maximumHours="0" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>32.55</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <IsFulfilledByAmazon>true</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>false</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A3SE0BD58ZZU8T</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>97</SellerPositiveFeedbackRating>
                  <FeedbackCount>33837</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="0" maximumHours="0" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>32.55</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <IsFulfilledByAmazon>true</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>false</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A37V740TK9YOGL</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>93</SellerPositiveFeedbackRating>
                  <FeedbackCount>2402</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="24" maximumHours="48" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>32.95</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <ShipsFrom>
                  <Country>US</Country>
                  <State>CA</State>
                </ShipsFrom>
                <IsFulfilledByAmazon>false</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>true</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A2H6E05OPYV8CQ</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>100</SellerPositiveFeedbackRating>
                  <FeedbackCount>1082</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="0" maximumHours="0" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>32.95</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <IsFulfilledByAmazon>true</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>false</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A19NVE4G6SOT2C</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>99</SellerPositiveFeedbackRating>
                  <FeedbackCount>189569</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="0" maximumHours="0" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>33.56</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <IsFulfilledByAmazon>true</IsFulfilledByAmazon>
                <IsBuyBoxWinner>true</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>false</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A2P9RBMWEEISS4</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <FeedbackCount>2016</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="24" maximumHours="48" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>42.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <ShipsFrom>
                  <Country></Country>
                  <State></State>
                </ShipsFrom>
                <IsFulfilledByAmazon>false</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>true</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>true</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A1JZL1L8ARSOYB</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>94.7</SellerPositiveFeedbackRating>
                  <FeedbackCount>15138</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="24" maximumHours="48" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>45.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <ShipsFrom>
                  <Country>US</Country>
                  <State>CA</State>
                </ShipsFrom>
                <IsFulfilledByAmazon>false</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>true</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
              <Offer>
                <SellerId>A2N1A581RPHNSW</SellerId>
                <SubCondition>new</SubCondition>
                <SellerFeedbackRating>
                  <SellerPositiveFeedbackRating>95</SellerPositiveFeedbackRating>
                  <FeedbackCount>13662</FeedbackCount>
                </SellerFeedbackRating>
                <ShippingTime minimumHours="24" maximumHours="48" availabilityType="NOW" />
                <ListingPrice>
                  <Amount>45.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </ListingPrice>
                <Shipping>
                  <Amount>0.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
                </Shipping>
                <ShipsFrom>
                  <Country></Country>
                  <State></State>
                </ShipsFrom>
                <IsFulfilledByAmazon>false</IsFulfilledByAmazon>
                <IsBuyBoxWinner>false</IsBuyBoxWinner>
                <IsExpeditedShippingAvailable>false</IsExpeditedShippingAvailable>
                <IsFeaturedMerchant>true</IsFeaturedMerchant>
                <ShipsDomestically>true</ShipsDomestically>
                <ShipsInternationally>false</ShipsInternationally>
              </Offer>
            </Offers>
          </AnyOfferChangedNotification>
        </NotificationPayload>
      </Notification>`,
    )

    const res = parseNotification('/Notification', doc)

    expect(res).toMatchSnapshot()
  })

  it('should parse a FeedProcessingFinished notification', () => {
    const doc = parseXml(
      `<Notification>
        <NotificationMetaData>
          <NotificationType>FeedProcessingFinished</NotificationType>
          <PayloadVersion>1.0</PayloadVersion>
          <UniqueId>0123456789-ca3b-4127-abe7-82cfbe19a032</UniqueId>
          <PublishTime>2019-07-01T10:46:29Z</PublishTime>
          <SellerId>XXXXXXXXXXTest</SellerId>
        </NotificationMetaData>
        <NotificationPayload>
          <FeedProcessingFinishedNotification>
            <SellerId>XXXXXXXXXXTest</SellerId>
            <FeedSubmissionId>2291326430</FeedSubmissionId>
            <FeedType>_POST_PRODUCT_DATA_</FeedType>
            <FeedProcessingStatus>_DONE_</FeedProcessingStatus>
          </FeedProcessingFinishedNotification>
        </NotificationPayload>
      </Notification>`,
    )

    const res = parseNotification('/Notification', doc)

    expect(res).toMatchSnapshot()
  })

  it('should parse a ReportProcessingFinished notification', () => {
    const doc = parseXml(
      `<Notification>
        <NotificationMetaData>
          <NotificationType>ReportProcessingFinishedNotification</NotificationType>
          <PayloadVersion>1.0</PayloadVersion>
          <UniqueId>0123456789-ca3b-4127-abe7-82cfbe19a032</UniqueId>
          <PublishTime>2019-07-01T10:46:29Z</PublishTime>
          <SellerId>XXXXXXXXXXTest</SellerId>
        </NotificationMetaData>
        <NotificationPayload>
          <ReportProcessingFinishedNotification>
            <SellerId>XXXXXXXXXXTest</SellerId>
            <ReportRequestId>1234</ReportRequestId>
            <ReportId>1234</ReportId>
            <ReportType>_GET_FBA_FULFILLMENT_REMOVAL_ORDER_DETAIL_DATA_</ReportType>
            <ReportProcessingStatus>DONE_NO_DATA</ReportProcessingStatus>
          </ReportProcessingFinishedNotification>
        </NotificationPayload>
      </Notification>`,
    )

    const res = parseNotification('/Notification', doc)

    expect(res).toMatchSnapshot()
  })
})
