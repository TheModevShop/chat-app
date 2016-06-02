var loaderUtils = require('loader-utils');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var getPrefixString = fs.readdirAsync('./local_modules/less-util')
  .then(function(filenames) {
    return filenames.map(function(filename) {
      if (filename.indexOf('.') === 0) {
        return '';
      }
      return '@import (reference) \'~less-util/' + filename + '\';';
    }).join('\n') + '\n';
  });

module.exports = function(content) {
  var cb = this.async();
  this.cacheable && this.cacheable();

  getPrefixString.then(function(prefix) {
    var result = prefix + content;
    cb(null, result);
  }).catch(console.error.bind(console));
};