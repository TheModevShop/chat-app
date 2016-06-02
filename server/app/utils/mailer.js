'use strict';

var mailcomposer = require('mailcomposer');
var Promise = require("bluebird");
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAIL_KEY,
  domain: process.env.MAIL_DOMAIN
});

module.exports = function(Email, subject, text, html) {
  if (Email) {
    if (process.env.NODE_ENV !== 'production') {
      Email = 'vincent@modevshop.com';
    }

    var mail = mailcomposer({
      from: 'Tang <noreply@thetangapp.com>',
      to: Email,
      subject: subject,
      text: text,
      html: html
    });

    return new Promise(function(resolve, reject) {
      mail.build(function(mailBuildError, message) {
        var dataToSend = {
          to: Email,
          message: message.toString('ascii')
        };

        mailgun
          .messages()
          .sendMime(dataToSend, function (sendError, body) {
            if(sendError) {
              reject(sendError);
            }else{
              resolve(body);
            }
          });
      });
    });
        
  } else {
    return;
  }
};
