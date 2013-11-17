/*
 * grunt-react
 * https://github.com/ericclemmons/grunt-react
 *
 * Copyright (c) 2013 Eric Clemmons, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    react: {
      single_js_files: {
        files: {
          'tmp/default_options/js/fixture.js': 'test/fixtures/js/fixture.js',
          'tmp/default_options/js/fixture-jsx.js': 'test/fixtures/js/fixture-jsx.js'
        }
      },
      single_jsx_files: {
        files: {
          'tmp/extension_option/jsx/fixture.js': 'test/fixtures/jsx/fixture.jsx',
          'tmp/extension_option/jsx/nested/fixture-js.js': 'test/fixtures/jsx/nested/fixture-js.jsx'
        }
      },
      multiple_jsx_files: {
        files: {
          'tmp/extension_option/jsx/fixture-combined.js': ['test/fixtures/jsx/fixture.jsx', 'test/fixtures/jsx/nested/fixture-js.jsx']
        }
      },
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures',
            src: ['**/*.js'],
            dest: 'tmp/default_options',
            ext: '.js'
          },
          {
            expand: true,
            cwd: 'test/fixtures',
            src: ['**/*.jsx'],
            dest: 'tmp/extension_option',
            ext: '.js'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('testdynamic', ['clean', 'react:dynamic_mappings', 'nodeunit']);
  grunt.registerTask('testsingle', ['clean', 'react:single_js_files', 'react:single_jsx_files', 'nodeunit']);
  grunt.registerTask('testarray', ['clean', 'react:multiple_jsx_files', 'nodeunit']);
  grunt.registerTask('test', ['clean', 'testdynamic', 'testsingle']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
