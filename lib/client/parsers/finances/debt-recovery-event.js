const {parseString} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseChargeInstrument = require('./charge-instrument')
const parseCurrencyAmount = require('./currency-amount')
const parseDebtRecoveryItem = require('./debt-recovery-item')

module.exports = (key, node) => ({
  debtRecoveryType: parseString(`${key}/finances:DebtRecoveryType`, node),
  recoveryAmount: nullable(parseCurrencyAmount, `${key}/finances:RecoveryAmount`, node),
  overPaymentCredit: nullable(parseCurrencyAmount, `${key}/finances:OverPaymentCredit`, node),
  debtRecoveryItemList: select(
    `${key}/finances:DebtRecoveryItemList/finances:DebtRecoveryItem`,
    node,
  ).map((n) => parseDebtRecoveryItem('.', n)),
  chargeInstrumentList: select(
    `${key}/finances:ChargeInstrumentList/finances:ChargeInstrument`,
    node,
  ).map((n) => parseChargeInstrument('.', n)),
})
