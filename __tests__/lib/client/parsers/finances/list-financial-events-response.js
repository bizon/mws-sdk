const parseXml = require('../../../../../lib/client/parsers')
const parseListFinancialEventsResponse = require('../../../../../lib/client/parsers/finances/list-financial-events-response')

describe('lib.client.parsers.finances.list-financial-event-groups-response', () => {
  it('should throw when getting an invalid XML', () => {
    expect(() => parseXml(
      `<?xml version="1.0"?>
      <ListFinancialEventsResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <ListFinancialEventsResult>
          <FinancialEvents>
            <ProductAdsPaymentEventList />
            <RentalTransactionEventList />
            <PayWithAmazonEventList />
            <ServiceFeeEventList />
            <ServiceProviderCreditEventList />
            <SellerDealPaymentEventList>
              <SellerDealPaymentEvent>
                <PostedDate>2016-11-21T16:18:15.000Z</PostedDate>
                <DealDescription>test fees</DealDescription>
                <DealId>fec11097c1f4379426a7de68bf938b684f677de2</DealId>
                <EventType>SellerDealComplete</EventType>
                <FeeType>RunLightningDealFee</FeeType>
                <FeeAmount>
                  <CurrencyAmount>16.38</CurrencyAmount>
                  <Curr`
    )).toThrow('Premature end of data in tag ListFinancialEventsResponse')
  })

  it('should parse the ListFinancialEvents example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListFinancialEventsResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <ListFinancialEventsResult>
          <FinancialEvents>
            <ProductAdsPaymentEventList />
            <RentalTransactionEventList />
            <PayWithAmazonEventList />
            <ServiceFeeEventList />
            <ServiceProviderCreditEventList />
            <SellerDealPaymentEventList>
              <SellerDealPaymentEvent>
                <PostedDate>2016-11-21T16:18:15.000Z</PostedDate>
                <DealDescription>test fees</DealDescription>
                <DealId>fec11097c1f4379426a7de68bf938b684f677de2</DealId>
                <EventType>SellerDealComplete</EventType>
                <FeeType>RunLightningDealFee</FeeType>
                <FeeAmount>
                  <CurrencyAmount>16.38</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </FeeAmount>
                <TaxAmount>
                  <CurrencyAmount>3.18</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </TaxAmount>
              </SellerDealPaymentEvent>
            </SellerDealPaymentEventList>
            <ProductAdsPaymentEventList>
              <ProductAdsPaymentEvent>
                <PostedDate>2017-01-11T13:17:15.000Z</PostedDate>
                <transactionType>Charge</transactionType>
                <invoiceId>TR1W0B4YB-6</invoiceId>
                <baseValue>
                  <CurrencyAmount>115.34</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </baseValue>
                <taxValue>
                  <CurrencyAmount>21.91</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </taxValue>
                <transactionValue>
                  <CurrencyAmount>137.25</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </transactionValue>
              </ProductAdsPaymentEvent>
            </ProductAdsPaymentEventList>
            <DebtRecoveryEventList />
            <ShipmentEventList>
              <ShipmentEvent>
                <ShipmentItemList>
                  <ShipmentItem>
                    <ItemChargeList>
                      <ChargeComponent>
                        <ChargeType>Principal</ChargeType>
                        <ChargeAmount>
                          <CurrencyAmount>25.99</CurrencyAmount>
                          <CurrencyCode>USD</CurrencyCode>
                        </ChargeAmount>
                      </ChargeComponent>
                      <ChargeComponent>
                        <ChargeType>Tax</ChargeType>
                        <ChargeAmount>
                          <CurrencyAmount>0.0</CurrencyAmount>
                          <CurrencyCode>USD</CurrencyCode>
                        </ChargeAmount>
                      </ChargeComponent>
                    </ItemChargeList>
                    <ItemFeeList>
                      <FeeComponent>
                        <FeeType>ShippingChargeback</FeeType>
                        <FeeAmount>
                          <CurrencyAmount>0.0</CurrencyAmount>
                          <CurrencyCode>USD</CurrencyCode>
                        </FeeAmount>
                      </FeeComponent>
                      <FeeComponent>
                        <FeeType>VariableClosingFee</FeeType>
                        <FeeAmount>
                          <CurrencyAmount>0.0</CurrencyAmount>
                          <CurrencyCode>USD</CurrencyCode>
                        </FeeAmount>
                      </FeeComponent>
                    </ItemFeeList>
                    <OrderItemId>46432915698730</OrderItemId>
                    <QuantityShipped>1</QuantityShipped>
                    <SellerSKU>HS223A-C00</SellerSKU>
                  </ShipmentItem>
                </ShipmentItemList>
                <AmazonOrderId>105-0457358-1245022</AmazonOrderId>
                <PostedDate>2017-01-23T01:31:25Z</PostedDate>
                <MarketplaceName>Amazon.com</MarketplaceName>
                <SellerOrderId>105-0457358-1245022</SellerOrderId>
              </ShipmentEvent>
            </ShipmentEventList>
            <AffordabilityExpenseEventList>
              <AffordabilityExpenseEvent>
                <PostedDate>2018-02-08T13:17:15.000Z</PostedDate>
                <TransactionType>Charge</TransactionType>
                <AmazonOrderId>931-2463294-5740665</AmazonOrderId>
                <MarketplaceId>A2XZLSVIQ0F4JT</MarketplaceId>
                <BaseExpense>
                  <CurrencyAmount>-100.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </BaseExpense>
                <TaxTypeIGST>
                  <CurrencyAmount>-18.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeIGST>
                <TaxTypeSGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeSGST>
                <TaxTypeCGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeCGST>
                <TotalExpense>
                  <CurrencyAmount>-118.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TotalExpense>
              </AffordabilityExpenseEvent>
            </AffordabilityExpenseEventList>
            <RetrochargeEventList />
            <GuaranteeClaimEventList />
            <ChargebackEventList />
            <LoanServicingEventList />
            <RefundEventList />
            <AdjustmentEventList />
            <PerformanceBondRefundEventList />
            <AffordabilityExpenseReversalEventList>
              <AffordabilityExpenseReversalEvent>
                <PostedDate>2018-02-08T13:17:15.000Z</PostedDate>
                <TransactionType>Refund</TransactionType>
                <AmazonOrderId>931-2463294-5740665</AmazonOrderId>
                <MarketplaceId>A2XZLSVIQ0F4JT</MarketplaceId>
                <BaseExpense>
                  <CurrencyAmount>100.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </BaseExpense>
                <TaxTypeIGST>
                  <CurrencyAmount>18.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeIGST>
                <TaxTypeSGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeSGST>
                <TaxTypeCGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeCGST>
                <TotalExpense>
                  <CurrencyAmount>118.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TotalExpense>
              </AffordabilityExpenseReversalEvent>
            </AffordabilityExpenseReversalEventList>
          </FinancialEvents>
        </ListFinancialEventsResult>
        <ResponseMetadata>
          <RequestId>6a2929e5-5c77-470e-ad71-36f30bfaffcc</RequestId>
        </ResponseMetadata>
      </ListFinancialEventsResponse>`
    )

    const res = parseListFinancialEventsResponse(
      '/finances:ListFinancialEventsResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the ListFinancialEventsByNextToken example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListFinancialEventsByNextTokenResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <ListFinancialEventsByNextTokenResult>
          <NextToken>
            e21hcmtldHBsYWNlSWQ6bnVsbCxtYXhSZXN1bHRzUGVyUGFnZTowLHNlYXJjaFF1ZXJ5Q2hlY2tzdW06bnVsbCxxdWVyeVBhZ2luYXRpb25Ub2tlbjoidDB3V25MNXFLWkRIZ2p5ZzB3ZHRWODVnV0htVExVMkM0XzlsMHpRMG9HVXFZOVhTdjFyWUNWUE8teGxWRnF3N0ZyaDIyY3lQX0VTOXYxendQNUVvc0t0V1NKM1YyQkRJdWcyWFpXdm1KVmdPVktBdzNIMXUyVHBiTGoxVmRmY3Z6ZlU1WlpNaEpsQ0RKUnYxRk16am13Y1YyQ1BoOXNWMU1xNUZqamxUMlRCeFBkSjdEa3BkbENISElVZ094aHVTN3ZfZlFCUWYyWWJYZ2l3NHNxZXkwNnQyaVBucm5PdnAzRTdKbW4xcnc1UTlaTGV1Ymk5WUV6UGJ6UnhjRmh2VUFKdlQ5U2U3eERIdHVMUzNJVWFRODBubVhja3JLeWt3dVZKeWZXQm5CY3p0bjZTbVRHenJmZ1VOanFMWFFNT2giLHNlYXJjaFF1ZXJ5Om51bGwsdG9rZW5DcmVhdGlvbkRhdGU6MTQ4NTg2MjY5ODI1NCxzZWxsZXJJZDoiQTM1SlMxREpITjdGViJ9
          </NextToken>
          <FinancialEvents>
            <ProductAdsPaymentEventList />
            <RentalTransactionEventList />
            <PayWithAmazonEventList />
            <SellerDealPaymentEventList>
              <SellerDealPaymentEvent>
                <PostedDate>2016-11-21T16:18:15.000Z</PostedDate>
                <DealDescription>test fees</DealDescription>
                <DealId>fec11097c1f4379426a7de68bf938b684f677de2</DealId>
                <EventType>SellerDealComplete</EventType>
                <FeeType>RunLightningDealFee</FeeType>
                <FeeAmount>
                  <CurrencyAmount>16.38</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </FeeAmount>
                <TaxAmount>
                  <CurrencyAmount>3.18</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </TaxAmount>
              </SellerDealPaymentEvent>
            </SellerDealPaymentEventList>
            <ProductAdsPaymentEventList>
              <ProductAdsPaymentEvent>
                <PostedDate>2017-01-11T13:17:15.000Z</PostedDate>
                <transactionType>Charge</transactionType>
                <invoiceId>TR1W0B4YB-6</invoiceId>
                <baseValue>
                  <CurrencyAmount>115.34</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </baseValue>
                <taxValue>
                  <CurrencyAmount>21.91</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </taxValue>
                <transactionValue>
                  <CurrencyAmount>137.25</CurrencyAmount>
                  <CurrencyCode>USD</CurrencyCode>
                </transactionValue>
              </ProductAdsPaymentEvent>
            </ProductAdsPaymentEventList>
            <AffordabilityExpenseEventList>
              <AffordabilityExpenseEvent>
                <PostedDate>2018-02-08T13:17:15.000Z</PostedDate>
                <TransactionType>Charge</TransactionType>
                <AmazonOrderId>931-2463294-5740665</AmazonOrderId>
                <MarketplaceId>A2XZLSVIQ0F4JT</MarketplaceId>
                <BaseExpense>
                  <CurrencyAmount>-100.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </BaseExpense>
                <TaxTypeIGST>
                  <CurrencyAmount>-18.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeIGST>
                <TaxTypeSGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeSGST>
                <TaxTypeCGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeCGST>
                <TotalExpense>
                  <CurrencyAmount>-118.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TotalExpense>
              </AffordabilityExpenseEvent>
            </AffordabilityExpenseEventList>
            <ServiceFeeEventList>
              <ServiceFeeEvent>
                <FeeDescription>Shacke Luggage Tags with Full Back Privacy Cover w/ Steel Loops - Set of 2
                  (Green)</FeeDescription>
                <SellerSKU>FH-REED-16DX</SellerSKU>
              </ServiceFeeEvent>
              <ServiceFeeEvent>
                <FeeDescription>Shacke Luggage Tags with Full Back Privacy Cover w/ Steel Loops - Set of 2
                  (Green)</FeeDescription>
                <SellerSKU>FH-REED-16DX</SellerSKU>
                <FeeList>
                  <FeeComponent>
                    <FeeType>FBACustomerReturnPerOrderFee</FeeType>
                    <FeeAmount>
                      <CurrencyAmount>-1.0</CurrencyAmount>
                      <CurrencyCode>USD</CurrencyCode>
                    </FeeAmount>
                  </FeeComponent>
                  <FeeComponent>
                    <FeeType>FBACustomerReturnPerUnitFee</FeeType>
                    <FeeAmount>
                      <CurrencyAmount>-1.06</CurrencyAmount>
                      <CurrencyCode>USD</CurrencyCode>
                    </FeeAmount>
                  </FeeComponent>
                  <FeeComponent>
                    <FeeType>FBACustomerReturnWeightBasedFee</FeeType>
                    <FeeAmount>
                      <CurrencyAmount>-0.5</CurrencyAmount>
                      <CurrencyCode>USD</CurrencyCode>
                    </FeeAmount>
                  </FeeComponent>
                </FeeList>
              </ServiceFeeEvent>
            </ServiceFeeEventList>
            <AffordabilityExpenseReversalEventList>
              <AffordabilityExpenseReversalEvent>
                <PostedDate>2018-02-08T13:17:15.000Z</PostedDate>
                <TransactionType>Refund</TransactionType>
                <AmazonOrderId>931-2463294-5740665</AmazonOrderId>
                <MarketplaceId>A2XZLSVIQ0F4JT</MarketplaceId>
                <BaseExpense>
                  <CurrencyAmount>100.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </BaseExpense>
                <TaxTypeIGST>
                  <CurrencyAmount>18.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeIGST>
                <TaxTypeSGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeSGST>
                <TaxTypeCGST>
                  <CurrencyAmount>0.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TaxTypeCGST>
                <TotalExpense>
                  <CurrencyAmount>118.00</CurrencyAmount>
                  <CurrencyCode>INR</CurrencyCode>
                </TotalExpense>
              </AffordabilityExpenseReversalEvent>
            </AffordabilityExpenseReversalEventList>
            <ServiceProviderCreditEventList />
            <SellerDealPaymentEventList />
            <DebtRecoveryEventList />
            <AdjustmentEventList>
              <AdjustmentEvent>
                <AdjustmentItemList>
                  <AdjustmentItem>
                    <PerUnitAmount>
                      <CurrencyAmount>3.38</CurrencyAmount>
                      <CurrencyCode>USD</CurrencyCode>
                    </PerUnitAmount>
                    <TotalAmount>
                      <CurrencyAmount>3.38</CurrencyAmount>
                      <CurrencyCode>USD</CurrencyCode>
                    </TotalAmount>
                    <Quantity>1</Quantity>
                    <SellerSKU>KL-BPYA-C1VH</SellerSKU>
                    <ProductDescription>Shacke Metal Shoe Horn 7.5&quot; inches - Double Sided Stainless
                      Steel (Silver)</ProductDescription>
                  </AdjustmentItem>
                </AdjustmentItemList>
                <AdjustmentType>REVERSAL_REIMBURSEMENT</AdjustmentType>
              </AdjustmentEvent>
            </AdjustmentEventList>
            <PerformanceBondRefundEventList />
          </FinancialEvents>
        </ListFinancialEventsByNextTokenResult>
        <ResponseMetadata>
          <RequestId>c07d1dd2-12f9-415f-a167-8ab5f7726dbf</RequestId>
        </ResponseMetadata>
      </ListFinancialEventsByNextTokenResponse>`
    )

    const res = parseListFinancialEventsResponse(
      '/finances:ListFinancialEventsByNextTokenResponse',
      doc,
      true
    )

    expect(res).toMatchSnapshot()
  })
})
