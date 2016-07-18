'use strict';

var moment = require('moment');
var BluebirdPromise = require('bluebird');
var _ = require('lodash');

// Actions
var StripeActions = require('./stripe');

// Models
var Transactions = require('../models/transactions');
var Roles = require('../models/roles');
var Sessions = require('../models/sessions');
var proccessorFee = require('../utils/proccessorFee');
var appFee = require('../utils/appFee');

var transactions = {};

transactions.getAll = function(limit, offset) {
  return Transactions.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, transactions) {
      return transactions;
    });
};

transactions.getById = function(id) {
  return Transactions.findOne({
    _id: id
  })
  .populate('instructor userCharged session')
  .deepPopulate('session.instructor').exec(function(err, transaction) {
    return transaction;
  });
};

transactions.add = function(params) {
  var transaction = new Transactions({ 
    date: Date.now(),
    status: 'pending',
    stripe: params.stripe,
    session: params.session,
    amount: params.amount,
    amountAfterProcessor: proccessorFee(params.amount),
    amountAfterProcessorAndApp: appFee(params.amount, params.session.location), //Takes original amount gets processor fee and subtracts app fee
    gym: params.session.location,
    userCharged: params.userCharged,
    instructor: params.instructor,
    failed: params.failed || null,
    type: params.type || 'session'
  });

  return transaction.save(function(err) {
    if (err) {
      return { 'Error': 'There was an error saving transaction'};
    }else{
      return { transaction: transaction };
    }
  });
};


transactions.getTransactions = function(id, limit, offset, start, end, isGym, onlyFailed, orInstructed, student, instructor) {
  var params = {}
  if (isGym) {
    params.gym = id;
  } else if(orInstructed) {
    params.$or = [ 
      { instructor: id }, 
      { userCharged: id } 
    ]
  } else if(id) {
    params.userCharged = id;
  }

  if (student) {
    params.userCharged = student;
  } else if(instructor) {
    params.instructor = instructor;
  }

  if(start && end) {
    params.date = {
      $gte: start,
      $lte: end
    }
  }

  if (onlyFailed) {
    params.failed = {
      $ne: null
    }
  }

  return Transactions.find(params)
  .limit(limit || 10)
  .skip(offset || 0)
  .populate('instructor userCharged session')
  .deepPopulate('session.listing.instructor')
  .sort({date: 1})
  .exec(function(err, sessions) {
    return sessions;
  });
};

transactions.getTransactionsForSession = function(sessionId, userId, notRefunded) {  
  return new BluebirdPromise(function(resolve, reject) {
    var params = {
      session: sessionId
    }
    if (userId) {
      params.userCharged = userId;
    }
    if (notRefunded) {
      params.type = 'session';
      params.refunded = {
        $exists: false 
      }
    }
    Transactions.find(params).populate('userCharged')
    .exec(function(err, transaction) {
      if (err) {
        reject(err);
      } else {
        resolve(transaction);
      } 
    });
  });
};

transactions.refundById = function(id, amount) {
  return new BluebirdPromise(function(resolve, reject) {
    Transactions.findOne({
      _id: id
    }).populate('session')
    .exec(function(err, transaction) {
      if(err || !transaction) {
        throw err;
      } else {
        transactions.refundUserForSession(transaction, transaction.session, amount).then(function(result) {
          resolve(result);
        }).catch(function(err) {
          reject(err);
        })
      }
    });
  });
};


transactions.refundUserForSession = function(transaction, session, amount) {
  return new BluebirdPromise(function(resolve, reject) {
    StripeActions.refundTransaction(transaction.stripe.id, amount, session, transaction.userCharged)
    .then(function(refund) {
      transaction.refunded = {
        refund: refund,
        amount: amount || transaction.amount,
        date: Date.now()
      };

      transaction.save().then(function(transaction) {
        resolve(transaction);
      }).catch(function(err) {
        reject(err)
      });
    })
    .catch(function(err) {
      reject(err)
    });
  });
}


transactions.retryTransactionCharge = function(transactionId, user) {
  return new BluebirdPromise(function(resolve, reject) {    
    transactions.getById(transactionId).then(function(transaction) {
        if (!transaction.failed || !transaction.session || !transaction.amount) {
          reject({error: 'session not eligable to be retried'})
        }
        var description = 'Retry Charge to: ' + user.name.first + ' ' + user.name.last;
        StripeActions.chargeCard(user.paymentMethod.customer, transaction.amount, description, transaction.session, 'charge', user._id).then(function(charge) {
          transaction.failed = null;
          transaction.stripe = charge;
          transaction.status = 'successful';  
          updateSessionAfterRetry(transaction.session._id)        
          saveTransaction(transaction, 0).then(function(t) {
            resolve(transaction)
          }).catch(function(err) {
            reject(err)
          })
        }).catch(function(err) {
          console.log(err)
          reject(err);
        });
      }).catch(function(err) {
        reject(err);
      });
  });
}

function saveTransaction(transaction, retry) {
  return new BluebirdPromise(function(resolve, reject) {
    transaction.save().then(function(trans) {
      resolve(trans)    
    }).catch(function(err) {
      if (retry < 2) {
        saveTransaction(transaction, retry+1)
      } else {
        reject(err)
      }
    });
  });
}

function updateSessionAfterRetry(sessionId) {
  Sessions.findOne({_id: sessionId}).then(function(session) {
    if (session && session.sessionTransactions) {
      session.sessionTransactions.failed = session.sessionTransactions.failed - 1;
      session.sessionTransactions.successful = session.sessionTransactions.successful + 1;
      if (session.sessionTransactions.failed === 0 && session.sessionTransactions.successful === session.sessionTransactions.total) {
        session.sessionTransactions.passing = true;
      }
    }
    session.save();
  });
}

module.exports = transactions;
