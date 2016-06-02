var onesignal = require('node-opensignal-api');
var onesignal_client = onesignal.createClient();
var Promise = require('bluebird');

var PUSH_KEY = process.env.PUSH_KEY;
var PUSH_ID = process.env.PUSH_ID;

// In App use sendTag "_id", "1234"

// Create Notification
function createNotification(_id, body) {
	var params = {
    app_id: PUSH_ID,
    contents: {
      'en': body
    },
    tags: [{"key": "_id", "relation": "=", "value": _id}]
	};

	sendPush(params);
}

// Send Push
function sendPush(params) {
	return new Promise(function(resolve, reject) {
		onesignal_client.notifications.create(PUSH_KEY, params, function (err, response) {
			if (err) {
			  reject({'Encountered error': err});
			} else {
				resolve(response);
			}
		});
	});
}


module.exports = createNotification;