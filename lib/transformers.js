/**
 * Module Dependencies
 */

var path      = require('path');
var transform = require('react-tools').transform;
var through   = require('through');

/**
 * Exports
 */

var Transformers = {};

Transformers.source = transform;

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
