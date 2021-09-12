const select = require('../select')
const nullable = require('../nullable')
const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseDebtRecoveryItem = require('./debt-recovery-item')
const parseChargeInstrument = require('./charge-instrument')

module.exports = (key, node) => ({
  debtRecoveryType: parseStr(`${key}/finances:DebtRecoveryType`, node),
  recoveryAmount: nullable(parseCurrencyAmount, `${key}/finances:RecoveryAmount`, node),
  overPaymentCredit: nullable(parseCurrencyAmount, `${key}/finances:OverPaymentCredit`, node),
  debtRecoveryItemList: select(`${key}/finances:DebtRecoveryItemList/finances:DebtRecoveryItem`, node).map(n => parseDebtRecoveryItem('.', n)),
  chargeInstrumentList: select(`${key}/finances:ChargeInstrumentList/finances:ChargeInstrument`, node).map(n => parseChargeInstrument('.', n)),
})
