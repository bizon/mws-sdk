const parseXml = require('../../../../../lib/client/parsers')
const parseGetProductCategoriesForAsinResponse = require('../../../../../lib/client/parsers/products/get-product-categories-for-asin-response')

describe('lib.client.parsers.products.get-product-categories-for-asin-response', () => {
  it('should parse the GetProductCategoriesForASINResponse example response from MWS doc', () => {
    const doc = parseXml(
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

    const res = parseGetProductCategoriesForAsinResponse(
      '/products:GetProductCategoriesForASINResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })

  it('should throw if there are too many levels of category recursion', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetProductCategoriesForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetProductCategoriesForASINResult>
          <Self>
            <ProductCategoryId>1</ProductCategoryId>
            <ProductCategoryName>1</ProductCategoryName>
            <Parent>
              <ProductCategoryId>2</ProductCategoryId>
              <ProductCategoryName>2</ProductCategoryName>
              <Parent>
                <ProductCategoryId>3</ProductCategoryId>
                <ProductCategoryName>3</ProductCategoryName>
                <Parent>
                  <ProductCategoryId>4</ProductCategoryId>
                  <ProductCategoryName>4</ProductCategoryName>
                  <Parent>
                    <ProductCategoryId>5</ProductCategoryId>
                    <ProductCategoryName>5</ProductCategoryName>
                    <Parent>
                      <ProductCategoryId>6</ProductCategoryId>
                      <ProductCategoryName>6</ProductCategoryName>
                      <Parent>
                        <ProductCategoryId>7</ProductCategoryId>
                        <ProductCategoryName>7</ProductCategoryName>
                        <Parent>
                          <ProductCategoryId>8</ProductCategoryId>
                          <ProductCategoryName>8</ProductCategoryName>
                          <Parent>
                            <ProductCategoryId>9</ProductCategoryId>
                            <ProductCategoryName>9</ProductCategoryName>
                            <Parent>
                              <ProductCategoryId>10</ProductCategoryId>
                              <ProductCategoryName>10</ProductCategoryName>
                              <Parent>
                                <ProductCategoryId>11</ProductCategoryId>
                                <ProductCategoryName>11</ProductCategoryName>
                              </Parent>
                            </Parent>
                          </Parent>
                        </Parent>
                      </Parent>
                    </Parent>
                  </Parent>
                </Parent>
              </Parent>
            </Parent>
          </Self>
        </GetProductCategoriesForASINResult>
        <ResponseMetadata>
          <RequestId>e058aabd-b4c3-48ba-9bfa-EXAMPLE9a267</RequestId>
        </ResponseMetadata>
      </GetProductCategoriesForASINResponse>`,
    )

    expect(
      () => parseGetProductCategoriesForAsinResponse(
        '/products:GetProductCategoriesForASINResponse',
        doc,
      ),
    ).toThrow('Failed parsing product category: more than 10 levels of depth')
  })
})
