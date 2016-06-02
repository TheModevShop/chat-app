'use strict';

var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var Promise = require('bluebird');

handlebars.registerHelper('firstName', function(Name) {
  return Name.split(' ')[0];
});

handlebars.registerHelper('listImage', function(List) {
  if (List.ImgUrl) {
  	return List.ImgUrl;
  } else {
  	return List.Recommendation.RecommendationsPlaces[0].ImgUrl;
  }
});

handlebars.registerHelper('bgImage', function(url) {
	return url.split('?')[0] + '?width=850';
});

function htmlTemplate(templateName, data) {
	var filePath = path.join(__dirname, 'templates/compiled/' + templateName + '.html');

	return new Promise(function(resolve, reject) {
		fs.readFile(filePath, 'utf-8', function (err, html) {
			if (err) {
				reject(err);
			}

			var template = handlebars.compile(html);
	  	resolve(template(data));
		});
	});
}

module.exports = function(data, template) {
	switch(template) {
		case 'TransactionEmail':
			// webhook done
			return htmlTemplate('TransactionEmail', data)
				.then(function(template) {
					return {
						"subject": "Session Completed",
						"html": template
					}
				});
		case 'TransactionErrorEmail':
			return htmlTemplate('TransactionErrorEmail', data)
				.then(function(template) {
					return {
						"subject": "Error Charging Your Card",
						"html": template
					}
				});
	}
};