const parseXml = require('../../../../../lib/client/parsers')
const parseGetMatchingProductForIdResponse = require('../../../../../lib/client/parsers/products/get-matching-product-for-id-response')

describe('lib.client.parsers.products.get-matching-product-for-id-response', () => {
  it('should parse the GetMatchingProductForIdResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetMatchingProductForIdResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetMatchingProductForIdResult Id="9781933988665" IdType="ISBN" status="Success">
          <Products xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
            xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
            <Product>
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933988665</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <AttributeSets>
                <ns2:ItemAttributes xml:lang="en-US">
                  <ns2:Author>Marmanis, Haralambos</ns2:Author>
                  <ns2:Author>Babenko, Dmitry</ns2:Author>
                  <ns2:Binding>Paperback</ns2:Binding>
                  <ns2:Edition>1</ns2:Edition>
                  <ns2:ItemDimensions>
                    <ns2:Height Units="inches">9.17</ns2:Height>
                    <ns2:Length Units="inches">7.36</ns2:Length>
                    <ns2:Width Units="inches">0.75</ns2:Width>
                    <ns2:Weight Units="pounds">1.40</ns2:Weight>
                  </ns2:ItemDimensions>
                  <ns2:IsEligibleForTradeIn>true</ns2:IsEligibleForTradeIn>
                  <ns2:Label>Manning Publications</ns2:Label>
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
                    <ns2:Amount>44.99</ns2:Amount>
                    <ns2:CurrencyCode>USD</ns2:CurrencyCode>
                  </ns2:ListPrice>
                  <ns2:Manufacturer>Manning Publications</ns2:Manufacturer>
                  <ns2:NumberOfItems>1</ns2:NumberOfItems>
                  <ns2:NumberOfPages>368</ns2:NumberOfPages>
                  <ns2:PackageDimensions>
                    <ns2:Height Units="inches">0.80</ns2:Height>
                    <ns2:Length Units="inches">9.10</ns2:Length>
                    <ns2:Width Units="inches">7.30</ns2:Width>
                    <ns2:Weight Units="pounds">1.35</ns2:Weight>
                  </ns2:PackageDimensions>
                  <ns2:ProductGroup>Book</ns2:ProductGroup>
                  <ns2:ProductTypeName>ABIS_BOOK</ns2:ProductTypeName>
                  <ns2:PublicationDate>2009-07-05</ns2:PublicationDate>
                  <ns2:Publisher>Manning Publications</ns2:Publisher>
                  <ns2:SmallImage>
                    <ns2:URL>
                      http://ecx.images-amazon.com/images/I/51EEz05N2HL._SL75_.jpg
                    </ns2:URL>
                    <ns2:Height Units="pixels">75</ns2:Height>
                    <ns2:Width Units="pixels">60</ns2:Width>
                  </ns2:SmallImage>
                  <ns2:Studio>Manning Publications</ns2:Studio>
                  <ns2:Title>Algorithms of the Intelligent Web</ns2:Title>
                </ns2:ItemAttributes>
              </AttributeSets>
              <Relationships />
              <SalesRankings>
                <SalesRank>
                  <ProductCategoryId>book_display_on_website</ProductCategoryId>
                  <Rank>59485</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>377886011</ProductCategoryId>
                  <Rank>32</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3887</ProductCategoryId>
                  <Rank>66</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3870</ProductCategoryId>
                  <Rank>82</Rank>
                </SalesRank>
              </SalesRankings>
            </Product>
          </Products>
        </GetMatchingProductForIdResult>
        <GetMatchingProductForIdResult Id="0439708184" IdType="ISBN" status="Success">
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
                  <Rank>362</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>15356791</ProductCategoryId>
                  <Rank>6</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3153</ProductCategoryId>
                  <Rank>9</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3045</ProductCategoryId>
                  <Rank>14</Rank>
                </SalesRank>
              </SalesRankings>
            </Product>
            <Product>
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>0439708184</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <AttributeSets>
                <ns2:ItemAttributes xml:lang="en-US">
                  <ns2:Author>J.K. Rowling, Mary GrandPrÃƒÂ©</ns2:Author>
                  <ns2:Binding>Paperback</ns2:Binding>
                  <ns2:Label>Scholastic Paperbacks</ns2:Label>
                  <ns2:Languages>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Unknown</ns2:Type>
                    </ns2:Language>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Published</ns2:Type>
                    </ns2:Language>
                  </ns2:Languages>
                  <ns2:Manufacturer>Scholastic Paperbacks</ns2:Manufacturer>
                  <ns2:NumberOfItems>1</ns2:NumberOfItems>
                  <ns2:NumberOfPages>784</ns2:NumberOfPages>
                  <ns2:PackageDimensions>
                    <ns2:Height Units="inches">0.73</ns2:Height>
                    <ns2:Length Units="inches">8.43</ns2:Length>
                    <ns2:Width Units="inches">5.85</ns2:Width>
                    <ns2:Weight Units="pounds">0.79</ns2:Weight>
                  </ns2:PackageDimensions>
                  <ns2:ProductGroup>Book</ns2:ProductGroup>
                  <ns2:ProductTypeName>BOOKS_1973_AND_LATER</ns2:ProductTypeName>
                  <ns2:PublicationDate>1999-09-08</ns2:PublicationDate>
                  <ns2:Publisher>Scholastic Paperbacks</ns2:Publisher>
                  <ns2:SmallImage>
                    <ns2:URL>
                      http://ecx.images-amazon.com/images/I/51STfI7UiCL._SL75_.jpg
                    </ns2:URL>
                    <ns2:Height Units="pixels">75</ns2:Height>
                    <ns2:Width Units="pixels">52</ns2:Width>
                  </ns2:SmallImage>
                  <ns2:Studio>Scholastic Paperbacks</ns2:Studio>
                  <ns2:Title>Harry Potter and the Sorcerer's Stone</ns2:Title>
                </ns2:ItemAttributes>
              </AttributeSets>
              <Relationships />
              <SalesRankings>
                <SalesRank>
                  <ProductCategoryId>book_display_on_website</ProductCategoryId>
                  <Rank>2091024</Rank>
                </SalesRank>
              </SalesRankings>
            </Product>
          </Products>
        </GetMatchingProductForIdResult>
        <ResponseMetadata>
          <RequestId>7ba3245e-a213-430a-bea9-EXAMPLE38d76</RequestId>
        </ResponseMetadata>
      </GetMatchingProductForIdResponse>`
    )

    const res = parseGetMatchingProductForIdResponse(
      '/products:GetMatchingProductForIdResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the GetMatchingProductForIdResponse error example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetMatchingProductForIdResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetMatchingProductForIdResult Id="0439708623" IdType="ISBN" status="ClientError">
          <Error>
            <Type>Sender</Type>
            <Code>InvalidParameterValue</Code>
            <Message>Invalid ISBN identifier 0439708623 for marketplace ATVPDKIKX0DER</Message>
          </Error>
        </GetMatchingProductForIdResult>
        <GetMatchingProductForIdResult Id="9781933988665" IdType="ISBN" status="Success">
          <Products xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
            xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
            <Product>
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933988665</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <AttributeSets>
                <ns2:ItemAttributes xml:lang="en-US">
                  <ns2:Author>Marmanis, Haralambos</ns2:Author>
                  <ns2:Author>Babenko, Dmitry</ns2:Author>
                  <ns2:Binding>Paperback</ns2:Binding>
                  <ns2:Brand>Marmanis, Haralambos/ Babenko, Dmitry</ns2:Brand>
                  <ns2:Edition>1</ns2:Edition>
                  <ns2:ItemDimensions>
                    <ns2:Height Units="inches">9.25</ns2:Height>
                    <ns2:Length Units="inches">7.38</ns2:Length>
                    <ns2:Width Units="inches">0.73</ns2:Width>
                    <ns2:Weight Units="pounds">1.38</ns2:Weight>
                  </ns2:ItemDimensions>
                  <ns2:Label>Manning Publications</ns2:Label>
                  <ns2:Languages>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Published</ns2:Type>
                    </ns2:Language>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Original Language</ns2:Type>
                    </ns2:Language>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Unknown</ns2:Type>
                    </ns2:Language>
                  </ns2:Languages>
                  <ns2:ListPrice>
                    <ns2:Amount>44.99</ns2:Amount>
                    <ns2:CurrencyCode>USD</ns2:CurrencyCode>
                  </ns2:ListPrice>
                  <ns2:Manufacturer>Manning Publications</ns2:Manufacturer>
                  <ns2:NumberOfItems>1</ns2:NumberOfItems>
                  <ns2:NumberOfPages>368</ns2:NumberOfPages>
                  <ns2:PackageDimensions>
                    <ns2:Height Units="inches">0.80</ns2:Height>
                    <ns2:Length Units="inches">9.10</ns2:Length>
                    <ns2:Width Units="inches">7.30</ns2:Width>
                    <ns2:Weight Units="pounds">1.35</ns2:Weight>
                  </ns2:PackageDimensions>
                  <ns2:PackageQuantity>1</ns2:PackageQuantity>
                  <ns2:PartNumber>9781933988665</ns2:PartNumber>
                  <ns2:ProductGroup>Book</ns2:ProductGroup>
                  <ns2:ProductTypeName>ABIS_BOOK</ns2:ProductTypeName>
                  <ns2:PublicationDate>2009-07-08</ns2:PublicationDate>
                  <ns2:Publisher>Manning Publications</ns2:Publisher>
                  <ns2:SmallImage>
                    <ns2:URL>http://ecx.images-amazon.com/images/I/51EEz05N2HL._SL75_.jpg</ns2:URL>
                    <ns2:Height Units="pixels">75</ns2:Height>
                    <ns2:Width Units="pixels">60</ns2:Width>
                  </ns2:SmallImage>
                  <ns2:Studio>Manning Publications</ns2:Studio>
                  <ns2:Title>Algorithms of the Intelligent Web</ns2:Title>
                </ns2:ItemAttributes>
              </AttributeSets>
              <Relationships />
              <SalesRankings>
                <SalesRank>
                  <ProductCategoryId>book_display_on_website</ProductCategoryId>
                  <Rank>689405</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>491298</ProductCategoryId>
                  <Rank>150</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3870</ProductCategoryId>
                  <Rank>375</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3887</ProductCategoryId>
                  <Rank>836</Rank>
                </SalesRank>
              </SalesRankings>
            </Product>
          </Products>
        </GetMatchingProductForIdResult>
        <ResponseMetadata>
          <RequestId>a34b6cca-d7dc-4939-b226-b13ea3ac1d88</RequestId>
        </ResponseMetadata>
      </GetMatchingProductForIdResponse>`
    )

    const res = parseGetMatchingProductForIdResponse(
      '/products:GetMatchingProductForIdResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
