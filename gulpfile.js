var autoprefixer = require('gulp-autoprefixer'),
  gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  browserify = require('gulp-browserify'),
  fs = require('fs'), 
  jade = require('gulp-jade'),
  yaml = require('js-yaml'), 
  sourcemaps   = require('gulp-sourcemaps'),
  runSequence = require('run-sequence'),
  del = require('del'),
  stylus = require('gulp-stylus'),
  watch = require('gulp-watch'),
  minify = require('gulp-minify-css');

//Tâches 

gulp.task('locals', function() {
  return gulp.src('locals/**/*')
  .pipe(gulp.dest('build/locals'))
})

//Scripts Task
gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(browserify({
      nobuiltins: 'events querystring'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Styles Task
gulp.task('style', function () {
  return gulp.src('css/styles.styl')
    .pipe(stylus())
    .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'))
    
});

//Build
gulp.task('build', function(callback) {
  runSequence('delete',
  'locals', 'style', ['templates','scripts'] ,callback);
});

//Browser-sync
gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      baseDir: "build"
    },
    ghostMode : false,
    lockSnippets : false,
    open : false,

  });
});


//Watch Task
// Watches JS
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('css/**/*.styl', ['style']);
  gulp.watch('pages/**/*.jade', ['templates']);
  gulp.watch('locals/**/*.yaml', ['templates','locals']);
});


//Delete
gulp.task('delete', function() {
  del('build');
});

//Jade
gulp.task('templates', function() {
  gulp.src('pages/*.jade')
    .pipe(jade({
      locals: yaml.safeLoad(fs.readFileSync('locals/datas.yaml', 'utf8')),
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('default', ['watch']);