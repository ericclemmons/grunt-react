'use strict';

var grunt = require('grunt');

exports.react = {
  setUp: function(done) {
    done();
  },
  default_options_js: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/default_options/js/fixture.js');
    var expected  = grunt.file.read('test/fixtures/js/fixture.js');

    test.equal(actual, expected, 'should leave vanilla JS alone');
    test.done();
  },
  default_options_jsx_as_js: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/default_options/js/fixture-jsx.js');
    var expected  = grunt.file.read('test/expected/default_options');

    test.equal(actual, expected, 'should convert JSX into JS');
    test.done();
  },

  extension_option_js_as_jsx: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/extension_option/jsx/nested/fixture-js.js');
    var expected  = grunt.file.read('test/fixtures/jsx/nested/fixture-js.jsx');

    test.equal(actual, expected, 'should leave vanilla JS alone');
    test.done();
  },

  extension_option_jsx: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/extension_option/jsx/fixture.js');
    var expected  = grunt.file.read('test/expected/extension_option');

    test.equal(actual, expected, 'should convert JSX into JS');
    test.done();
  }
};
