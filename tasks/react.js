/*
 * grunt-react
 * https://github.com/ericclemmons/grunt-react
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies
 */

var fs      = require('fs');
var glob    = require('glob');
var mkdirp  = require('mkdirp');
var path    = require('path');

/**
 * React dependencies
 */

var visitors  = require('react-tools/vendor/fbtransform/visitors').transformVisitors;
var transform = require('react-tools/vendor/fbtransform/lib/transform').transform;

module.exports = function(grunt) {

  grunt.registerMultiTask('react', 'Compile Facebook React .jsx templates into .js', function() {
    var done    = grunt.task.current.async();
    var options = this.options({
      extension:    'js',
      ignoreMTime:  false
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

        var source  = path.resolve(dir);
        var target  = path.resolve(f.dest);

        // Find all of the files to transform.
        glob(path.join(source, '**', '*.' + options.extension), {}, function(er, files) {
          files.map(function(srcFile) {
            var destFile = target + srcFile.substring(source.length, srcFile.length - options.extension.length) + 'js';

            if (!options.ignoreMTime) {
              var srcStat = fs.statSync(srcFile);
              var destStat = fs.existsSync(destFile) && fs.statSync(destFile);

              if (destStat && Date.parse(srcStat.mtime) < Date.parse(destStat.mtime)) {
                return;
              }
            }

            grunt.log.writeln("[react] "+srcFile+" --> "+destFile);

            var src     = fs.readFileSync(srcFile).toString();
            var newSrc  = transform(visitors.react, src).code;
            var destDir = path.dirname(destFile);

            mkdirp.sync(destDir);

            fs.writeFileSync(destFile, newSrc);
          });
          done();
        });
      });
    });
  });

};
