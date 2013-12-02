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
    try {
      this.queue(Transformers.source(source));
    } catch (e) {
      console.log('File:', file);
      throw e;
    }    
    this.queue(null);
  });
};

module.exports = Transformers;
