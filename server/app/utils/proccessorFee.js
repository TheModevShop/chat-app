function proccessorFee(amount) {
  return amount && amount > 0 ? Math.round(amount - ((amount * 0.029) + 30)) : 0
}

module.exports = proccessorFee;


