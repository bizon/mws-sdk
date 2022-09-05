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

describe('lib.client.models.products', () => {
  beforeAll(() => {
    MockDate.set('2019-12-04')
  })

  afterAll(() => {
    MockDate.reset()
    client.products.clearRestores()
  })

  it('should call ListMatchingProducts', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'ListMatchingProducts',
      MarketplaceId: 'ATVPDKIKX0DER',
      Query: '0439708184',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <ListMatchingProductsResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <ListMatchingProductsResult>
            <Products xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
              xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
              <Product>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>059035342X</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <AttributeSets>
                  <ns2:ItemAttributes xml:lang="en-US">
                    <ns2:Author>Rowling, J.K.</ns2:Author>
                    <ns2:Binding>Paperback</ns2:Binding>
                    <ns2:Brand>Scholastic Press</ns2:Brand>
                    <ns2:Creator Role="Illustrator">GrandPrÃ©, Mary</ns2:Creator>
                    <ns2:Edition>1st</ns2:Edition>
                    <ns2:Feature>Recommended Age: 9 years and up</ns2:Feature>
                    <ns2:ItemDimensions>
                      <ns2:Height Units="inches">0.80</ns2:Height>
                      <ns2:Length Units="inches">7.50</ns2:Length>
                      <ns2:Width Units="inches">5.20</ns2:Width>
                      <ns2:Weight Units="pounds">0.50</ns2:Weight>
                    </ns2:ItemDimensions>
                    <ns2:IsAutographed>false</ns2:IsAutographed>
                    <ns2:IsMemorabilia>false</ns2:IsMemorabilia>
                    <ns2:Label>Scholastic Paperbacks</ns2:Label>
                    <ns2:Languages>
                      <ns2:Language>
                        <ns2:Name>english</ns2:Name>
                        <ns2:Type>Unknown</ns2:Type>
                      </ns2:Language>
                      <ns2:Language>
                        <ns2:Name>english</ns2:Name>
                        <ns2:Type>Original Language</ns2:Type>
                      </ns2:Language>
                      <ns2:Language>
                        <ns2:Name>english</ns2:Name>
                        <ns2:Type>Published</ns2:Type>
                      </ns2:Language>
                    </ns2:Languages>
                    <ns2:ListPrice>
                      <ns2:Amount>10.99</ns2:Amount>
                      <ns2:CurrencyCode>USD</ns2:CurrencyCode>
                    </ns2:ListPrice>
                    <ns2:Manufacturer>Scholastic Paperbacks</ns2:Manufacturer>
                    <ns2:NumberOfItems>1</ns2:NumberOfItems>
                    <ns2:NumberOfPages>320</ns2:NumberOfPages>
                    <ns2:PackageDimensions>
                      <ns2:Height Units="inches">1.00</ns2:Height>
                      <ns2:Length Units="inches">7.50</ns2:Length>
                      <ns2:Width Units="inches">5.20</ns2:Width>
                      <ns2:Weight Units="pounds">0.50</ns2:Weight>
                    </ns2:PackageDimensions>
                    <ns2:PackageQuantity>1</ns2:PackageQuantity>
                    <ns2:PartNumber>9780590353427</ns2:PartNumber>
                    <ns2:ProductGroup>Book</ns2:ProductGroup>
                    <ns2:ProductTypeName>ABIS_BOOK</ns2:ProductTypeName>
                    <ns2:PublicationDate>1999-10-01</ns2:PublicationDate>
                    <ns2:Publisher>Scholastic Paperbacks</ns2:Publisher>
                    <ns2:ReleaseDate>1999-09-08</ns2:ReleaseDate>
                    <ns2:SmallImage>
                      <ns2:URL>
                        http://ecx.images-amazon.com/images/I/51MU5VilKpL._SL75_.jpg
                      </ns2:URL>
                      <ns2:Height Units="pixels">75</ns2:Height>
                      <ns2:Width Units="pixels">51</ns2:Width>
                    </ns2:SmallImage>
                    <ns2:Studio>Scholastic Paperbacks</ns2:Studio>
                    <ns2:Title>Harry Potter and the Sorcerer's Stone (Book 1)</ns2:Title>
                  </ns2:ItemAttributes>
                </AttributeSets>
                <Relationships />
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
              </Product>
            </Products>
          </ListMatchingProductsResult>
          <ResponseMetadata>
            <RequestId>3b805a12-689a-4367-ba86-EXAMPLE91c0b</RequestId>
          </ResponseMetadata>
        </ListMatchingProductsResponse>`,
      )

    const result = await client.products.listMatchingProducts({
      marketplaceId: 'ATVPDKIKX0DER',
      query: '0439708184',
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetLowestPricedOffersForSKU', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSKU: 'SKU2468',
      ItemCondition: 'new',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0" encoding="UTF-8"?>
        <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetLowestPricedOffersForSKUResult MarketplaceID="ATVPDKIKX0DER" SKU="SKU2468" ItemCondition="new"
            status="NoOfferDueToMissingShippingCharge">
            <Identifier>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <SellerSKU>SKU2468</SellerSKU>
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
        </GetLowestPricedOffersForSKUResponse>`,
      )

    const result = await client.products.getLowestPricedOffersForSku({
      marketplaceId: 'ATVPDKIKX0DER',
      sellerSku: 'SKU2468',
      itemCondition: 'new',
    })

    expect(result).toMatchSnapshot()
  })

  it('should handle GetLowestPricedOffersForSKU errors', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSKU: 'SKU2468',
      ItemCondition: 'new',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        400,
        `<?xml version="1.0"?>
        <ErrorResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <Error MarketplaceID="ATVPDKIKX0DER" SKU="SKU2468" ItemCondition="new" status="ClientError">
            <Code>InvalidParameterValue</Code>
            <Type>Sender</Type>
            <Message>SKU2468 is an invalid SKU for marketplace ATVPDKIKX0DER</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`,
      )

    expect.assertions(2)

    try {
      await client.products.getLowestPricedOffersForSku({
        marketplaceId: 'ATVPDKIKX0DER',
        sellerSku: 'SKU2468',
        itemCondition: 'new',
      })
    } catch (error) {
      expect(error.message).toBe(
        'Products.GetLowestPricedOffersForSKU error: Response code 400 (Bad Request)',
      )
      expect(error.body).toMatchSnapshot()
    }
  })

  it('should call GetLowestPricedOffersForASIN', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForASIN',
      MarketplaceId: 'ATVPDKIKX0DER',
      ASIN: '1933890517',
      ItemCondition: 'new',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetLowestPricedOffersForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetLowestPricedOffersForASINResult MarketplaceID="ATVPDKIKX0DER" ItemCondition="New" ASIN="1933890517"
            status="NoBuyableOffers">
            <Identifier>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <ASIN>1933890517</ASIN>
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

    const result = await client.products.getLowestPricedOffersForAsin({
      marketplaceId: 'ATVPDKIKX0DER',
      asin: '1933890517',
      itemCondition: 'new',
    })

    expect(result).toMatchSnapshot()
  })

  it('should handle GetLowestPricedOffersForASIN errors', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForASIN',
      MarketplaceId: 'ATVPDKIKX0DER',
      ASIN: '1933890517',
      ItemCondition: 'new',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        400,
        `<?xml version="1.0"?>
        <ErrorResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <Error MarketplaceID="ATVPDKIKX0DER" ASIN="1933890517" ItemCondition="new" status="ClientError">
            <Code>InvalidParameterValue</Code>
            <Type>Sender</Type>
            <Message>1933890517 is an invalid ASIN for marketplace ATVPDKIKX0DER</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`,
      )

    expect.assertions(2)

    try {
      await client.products.getLowestPricedOffersForAsin({
        marketplaceId: 'ATVPDKIKX0DER',
        asin: '1933890517',
        itemCondition: 'new',
      })
    } catch (error) {
      expect(error.message).toBe(
        'Products.GetLowestPricedOffersForASIN error: Response code 400 (Bad Request)',
      )
      expect(error.body).toMatchSnapshot()
    }
  })

  it('should call GetMyPriceForASIN', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetMyPriceForASIN',
      MarketplaceId: 'ATVPDKIKX0DER',
      'ASINList.ASIN.1': '1933890517',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetMyPriceForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetMyPriceForASINResult ASIN="1933890517" status="Success">
            <Product xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
              xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933890517</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <Offers>
                <Offer>
                  <BuyingPrice>
                    <LandedPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>303.99</Amount>
                    </LandedPrice>
                    <ListingPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>300.00</Amount>
                    </ListingPrice>
                    <Shipping>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>3.99</Amount>
                    </Shipping>
                  </BuyingPrice>
                  <RegularPrice>
                    <CurrencyCode>USD</CurrencyCode>
                    <Amount>300.00</Amount>
                  </RegularPrice>
                  <FulfillmentChannel>MERCHANT</FulfillmentChannel>
                  <ItemCondition>Used</ItemCondition>
                  <ItemSubCondition>Acceptable</ItemSubCondition>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </Offer>
              </Offers>
            </Product>
          </GetMyPriceForASINResult>
          <ResponseMetadata>
            <RequestId>a3381684-87bd-416e-9b95-EXAMPLE9c236</RequestId>
          </ResponseMetadata>
        </GetMyPriceForASINResponse>`,
      )

    const result = await client.products.getMyPriceForAsin({
      marketplaceId: 'ATVPDKIKX0DER',
      asinList: ['1933890517'],
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetMyPriceForSKU', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetMyPriceForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      'SellerSKUList.SellerSKU.1': 'SKU2468',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetMyPriceForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetMyPriceForSKUResult SellerSKU="SKU2468" status="Success">
            <Product xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
              xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933890517</ASIN>
                </MarketplaceASIN>
                <SKUIdentifier>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </SKUIdentifier>
              </Identifiers>
              <Offers>
                <Offer>
                  <BuyingPrice>
                    <LandedPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>303.99</Amount>
                    </LandedPrice>
                    <ListingPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>300.00</Amount>
                    </ListingPrice>
                    <Shipping>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>3.99</Amount>
                    </Shipping>
                  </BuyingPrice>
                  <RegularPrice>
                    <CurrencyCode>USD</CurrencyCode>
                    <Amount>300.00</Amount>
                  </RegularPrice>
                  <FulfillmentChannel>MERCHANT</FulfillmentChannel>
                  <ItemCondition>Used</ItemCondition>
                  <ItemSubCondition>Acceptable</ItemSubCondition>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </Offer>
              </Offers>
            </Product>
          </GetMyPriceForSKUResult>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </GetMyPriceForSKUResponse>`,
      )

    const result = await client.products.getMyPriceForSku({
      marketplaceId: 'ATVPDKIKX0DER',
      sellerSkuList: ['SKU2468'],
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetProductCategoriesForSKU', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetProductCategoriesForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSKU: 'SKU2468',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetProductCategoriesForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetProductCategoriesForSKUResult>
            <Self>
              <ProductCategoryId>271578011</ProductCategoryId>
              <ProductCategoryName>Project Management</ProductCategoryName>
              <Parent>
                <ProductCategoryId>2675</ProductCategoryId>
                <ProductCategoryName>Management &#x26; Leadership</ProductCategoryName>
                <Parent>
                  <ProductCategoryId>3</ProductCategoryId>
                  <ProductCategoryName>Business &#x26; Investing</ProductCategoryName>
                  <Parent>
                    <ProductCategoryId>1000</ProductCategoryId>
                    <ProductCategoryName>Subjects</ProductCategoryName>
                    <Parent>
                      <ProductCategoryId>283155</ProductCategoryId>
                      <ProductCategoryName>Subjects</ProductCategoryName>
                    </Parent>
                  </Parent>
                </Parent>
              </Parent>
            </Self>
            <Self>
              <ProductCategoryId>684248011</ProductCategoryId>
              <ProductCategoryName>Management</ProductCategoryName>
              <Parent>
                <ProductCategoryId>468220</ProductCategoryId>
                <ProductCategoryName>Business &#x26; Finance</ProductCategoryName>
                <Parent>
                  <ProductCategoryId>465600</ProductCategoryId>
                  <ProductCategoryName>New, Used &#x26; Rental Textbooks</ProductCategoryName>
                  <Parent>
                    <ProductCategoryId>2349030011</ProductCategoryId>
                    <ProductCategoryName>Specialty Boutique</ProductCategoryName>
                    <Parent>
                      <ProductCategoryId>283155</ProductCategoryId>
                      <ProductCategoryName>Specialty Boutique</ProductCategoryName>
                    </Parent>
                  </Parent>
                </Parent>
              </Parent>
            </Self>
          </GetProductCategoriesForSKUResult>
          <ResponseMetadata>
            <RequestId>e058aabd-b4c3-48ba-9bfa-EXAMPLE9a267</RequestId>
          </ResponseMetadata>
        </GetProductCategoriesForSKUResponse>`,
      )

    const result = await client.products.getProductCategoriesForSku({
      marketplaceId: 'ATVPDKIKX0DER',
      sellerSku: 'SKU2468',
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetProductCategoriesForASIN', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetProductCategoriesForASIN',
      MarketplaceId: 'ATVPDKIKX0DER',
      ASIN: 'B002KT3XQM',
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetProductCategoriesForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetProductCategoriesForASINResult>
            <Self>
              <ProductCategoryId>2420095011</ProductCategoryId>
              <ProductCategoryName>Compression Shorts</ProductCategoryName>
              <Parent>
                <ProductCategoryId>2419332011</ProductCategoryId>
                <ProductCategoryName>Men</ProductCategoryName>
                <Parent>
                  <ProductCategoryId>2371051011</ProductCategoryId>
                  <ProductCategoryName>Clothing</ProductCategoryName>
                  <Parent>
                    <ProductCategoryId>3403201</ProductCategoryId>
                    <ProductCategoryName>Bikes &#x26; Accessories</ProductCategoryName>
                    <Parent>
                      <ProductCategoryId>2232464011</ProductCategoryId>
                      <ProductCategoryName>Bikes &#x26; Scooters</ProductCategoryName>
                      <Parent>
                        <ProductCategoryId>3375301</ProductCategoryId>
                        <ProductCategoryName>Categories</ProductCategoryName>
                        <Parent>
                          <ProductCategoryId>3375251</ProductCategoryId>
                          <ProductCategoryName>Categories</ProductCategoryName>
                        </Parent>
                      </Parent>
                    </Parent>
                  </Parent>
                </Parent>
              </Parent>
            </Self>
          </GetProductCategoriesForASINResult>
          <ResponseMetadata>
            <RequestId>fbce5b62-67cc-4ab8-86f3-EXAMPLE22e4e</RequestId>
          </ResponseMetadata>
        </GetProductCategoriesForASINResponse>`,
      )

    const result = await client.products.getProductCategoriesForAsin({
      marketplaceId: 'ATVPDKIKX0DER',
      asin: 'B002KT3XQM',
    })

    expect(result).toMatchSnapshot()
  })
})
