/**
 * Module Dependencies
 */

var path          = require('path')
var tools         = path.dirname(require.resolve('react-tools'))
var visitors      = require(path.join(tools, 'vendor/fbtransform/visitors')).transformVisitors;
var transform     = require(path.join(tools, 'vendor/fbtransform/lib/transform')).transform;
var through       = require('through')

/**
 * Exports
 */

var Transformers = {};

Transformers.source = function(source) {
  return transform(visitors.react, source).code;
};

Transformers.browserify = function(file) {
  var source  = '';

  return through(function(data) {
    source += data;
  }, function() {
    this.queue(Transformers.source(source));
    this.queue(null);
  });
};

module.exports = Transformers;
