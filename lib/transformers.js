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

Transformers.browserify = function(file, includeSourceMap) {
  var source  = '';

  return through(function(data) {
    source += data;
  }, function() {
    var result;

    try {
      result = Transformers.source(source, {
        sourceMap: includeSourceMap,
        sourceFilename: file
      });
    } catch (error) {
      error.message += ' in "' + file + '"';

      this.emit('error', error);
    }

    this.queue(result);
    this.queue(null);
  });
};

Transformers.browserify.withSourceMaps = function(file) {
  return Transformers.browserify(file, true);
};

module.exports = Transformers;
