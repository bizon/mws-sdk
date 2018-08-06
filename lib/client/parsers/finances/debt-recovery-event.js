const select = require('../select')

const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseDebtRecoveryItem = require('./debt-recovery-item')
const parseChargeInstrument = require('./charge-instrument')

module.exports = (key, node) => ({
  debtRecoveryType: parseStr(`${key}/DebtRecoveryType`, node),
  recoveryAmount: parseCurrencyAmount(`${key}/RecoveryAmount`, node),
  overPaymentCredit: parseCurrencyAmount(`${key}/OverPaymentCredit`, node),
  debtRecoveryItemList: select(`${key}/DebtRecoveryItemList/DebtRecoveryItem`, node).map(n => {
    return parseDebtRecoveryItem('.', n)
  }),
  chargeInstrumentList: select(`${key}/ChargeInstrumentList/ChargeInstrument`, node).map(n => {
    return parseChargeInstrument('.', n)
  })
})
