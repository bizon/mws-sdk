const parseXml = require('../../../../../lib/client/parsers')
const parseGetProductCategoriesForSkuResponse = require('../../../../../lib/client/parsers/products/get-product-categories-for-sku-response')

describe('lib.client.parsers.products.get-product-categories-for-sku-response', () => {
  it('should parse the GetProductCategoriesForSKUResponse example response from MWS doc', () => {
    const doc = parseXml(
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

    const res = parseGetProductCategoriesForSkuResponse(
      '/products:GetProductCategoriesForSKUResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })

  it('should throw if there are too many levels of category recursion', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetProductCategoriesForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetProductCategoriesForSKUResult>
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
        </GetProductCategoriesForSKUResult>
        <ResponseMetadata>
          <RequestId>e058aabd-b4c3-48ba-9bfa-EXAMPLE9a267</RequestId>
        </ResponseMetadata>
      </GetProductCategoriesForSKUResponse>`,
    )

    expect(
      () => parseGetProductCategoriesForSkuResponse(
        '/products:GetProductCategoriesForSKUResponse',
        doc,
      ),
    ).toThrow('Failed parsing product category: more than 10 levels of depth')
  })
})
