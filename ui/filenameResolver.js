// Based on https://github.com/webpack/enhanced-resolve/blob/master/lib/DirectoryDefaultFilePlugin.js
// Relevant doc: http://webpack.github.io/docs/plugins.html

var path = require('path');

function UseDirectoryAsMainFilenameResolverPlugin() {}

UseDirectoryAsMainFilenameResolverPlugin.prototype.apply = function apply(resolver) {

  function handler(request, callback) {
    if (!request.request || request.path.indexOf('node_modules') > -1) {
      return callback();
    }

    var fs = this.fileSystem;
    var directory = this.join(request.path, request.request);
    fs.stat(directory, function(err, stat) {
      if (err || !stat || !stat.isDirectory()) {
        return callback();
      }

      var lastPathComponent = path.basename(directory);
      this.doResolve('file', {
        path: directory,
        query: request.query,
        request: lastPathComponent
      }, function(err, result) {
        if (!err && result) {
          return callback(null, result);
        }
        return callback();
      });
    }.bind(this));
  }
  resolver.plugin('file', handler);
};

function UseDirectoryAsMainFilenamePlugin() {
}

UseDirectoryAsMainFilenamePlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('after-resolvers', function(compiler) {
    compiler.resolvers.normal.apply(new UseDirectoryAsMainFilenameResolverPlugin());
  });
};


module.exports = UseDirectoryAsMainFilenamePlugin;