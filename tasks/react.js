/*
 * grunt-react
 * https://github.com/ericclemmons/grunt-react
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var Path  = require('path');
var path  = Path.dirname(require.resolve('react-tools'));
var jsx   = Path.join(path, 'bin', 'jsx');
var spawn = require('child_process').spawn;

module.exports = function(grunt) {

  grunt.registerMultiTask('react', 'Compile Facebook React .jsx templates into .js', function() {
    var done    = grunt.task.current.async();
    var options = this.options({
      extension: 'js'
    });

    this.files.forEach(function(f) {
      var src = f.src.filter(function(dir) {
        if (!grunt.file.exists(dir)) {
          grunt.log.warn('Directory "' + dir + '" not found.');

          return false;
        } else if (!grunt.file.isDir(dir)) {
          grunt.log.warn(dir + ' is not a directory.');

          return false;
        }

        return true;
      }).map(function(dir) {
        var source  = Path.resolve(dir);
        var target  = Path.resolve(f.dest);
        var args    = [source, target];

        if (options.extension) {
          args.unshift('--extension=' + options.extension);
        }

        if (options.relative) {
          args.unshift('--relative');
        }

        var conversion = spawn(jsx, args, { stdio: 'inherit'});

        conversion.on('close', done);
      });
    });
  });

};
