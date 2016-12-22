'use strict';


var gulp = require('gulp');                        //获取gulp
var uglify = require('gulp-uglify');               //js压缩插件
var concat = require('gulp-concat');               //js合并插件
var browsersync = require('browser-sync').create();

var del=require('del');
gulp.task('clean',function(cb){
	del(['dist/*']);
	cb();
})
gulp.task('scripts', function() {
	gulp.src('js/*.js')               //需要操作的源文件
		.pipe(uglify())               //压缩js文件
		.pipe(concat('app.js'))       //把js文件合并成app.js文件
		.pipe(gulp.dest('dist/js'))   //把操作好的文件放到dist/js目录下
		.pipe(browsersync.stream());  //文件有更新自动执行
});

var cssnano = require('gulp-cssnano');
gulp.task('style', function() {
	gulp.src('style/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/style'))
		.pipe(browsersync.stream());
});

var imagemin = require('gulp-imagemin');
gulp.task('image', function() {
	gulp.src('images/*.{png,jpg,jpeg,gif}')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
		.pipe(browsersync.stream());
});

var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,            //压缩html
			collapseBooleanAttributes: true,     //省略布尔属性的值，<input checked="true" /> ==> <input />
			removeComments: true,                //清除html注释
			removeEmptyAttributes: true,         //删除所有空格作为属性值
			removeScriptTypeAttributes: true,    //删除type=text/javascript
			removeStyleLinkTypeAttributes: true, //删除type=text/css
			minifyJS:true,                       //压缩页面js
			minifyCSS:true                       //压缩页面css
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browsersync.stream());
});

gulp.task('serve', ['clean'], function() {
	gulp.start('scripts','style','image','html');
	browsersync.init({
		port: 2016,
		server: {
			baseDir: ['dist']
		}
	});
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('style/*.css', ['style']);
	gulp.watch('images/*.*', ['image']);
	gulp.watch('*.html', ['html']);
});

gulp.task('default',['serve']);