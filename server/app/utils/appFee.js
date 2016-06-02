var proccessorFee = require('./proccessorFee');
var _ = require('lodash');

function appFee(amount, gym) {
  if (amount && amount > 0) {
    amount = proccessorFee(amount);
    return Math.round(amount - _.get(gym, 'appFee.flatFee', 0));
  } else {
    return 0;
  }
}


module.exports = appFee;


