var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var minifyCss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var paths = {
  sass: ['./scss/**/*.scss'],
  js:['./js/**/*.js'],
};

/*编译sass*/
gulp.task('sass', function(done) {
  gulp.src('./scss/main.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(gulp.dest('./www/css/'))
  .pipe(livereload())
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./www/css/'))
  .on('end', done);
});

gulp.task('html',function(){
  gulp.src('./www/**/*.html')
  .pipe(livereload());
})

/*合并js到app.js*/
gulp.task('scripts',function(){
  return gulp.src(paths.js)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./www/js/'))
  .pipe(livereload());
});


gulp.task('serve', function (cb) {
  nodemon({
    script  : 'app.js',
    watch   : 'app.js'
  }).on('start',function(){
    setTimeout(function(){
      livereload.changed();
    },2000);
  })
});

/*监控*/
gulp.task('watch',function(){
  livereload.listen();
  watch(paths.sass,function(event){
    gulp.start('sass');
  });
  watch(paths.js,function(event){
    gulp.start('scripts');
  });
  watch(['./www/**/*.html'],function(event){
    gulp.start('html');
  })

});

gulp.task('default', ['watch','serve']);



