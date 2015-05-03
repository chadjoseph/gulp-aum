var concat = require('gulp-concat');
var exports = require('gulp-aum-export');
var gulp = require('gulp');
var imports = require('gulp-aum-import');
var particle = require('gulp-aum-particle');
var register = require('gulp-aum-register');
var uglify = require('gulp-uglify');

module.exports = function (options) {
  'use strict';

  var bundle = gulp.src(
      [
        'node_modules/gulp-aum/node_modules/aum/*.js',
        'node_modules/gulp-aum/node_modules/aum/node_modules/*/*.js'
      ].concat(options.src)
  )
      .pipe(imports())
      .pipe(exports())
      .pipe(register())
      .pipe(concat(options.name));

  bundle.pipe(particle(options.main));

  if (options.min) {
    bundle.pipe(uglify());
  }

  bundle.pipe(gulp.dest(options.dest));

  return bundle;
};

