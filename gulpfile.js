var gulp = require("gulp"),
	// 编译less
	less = require("gulp-less"),
	// 编译sass
	sass = require("gulp-sass"),
	// css兼容前缀
	autoprefixer = require('gulp-autoprefixer'),
	// 编译pug
	pug = require("gulp-pug"),
	// 压缩css
	minifycss = require("gulp-minify-css"),
	//压缩js
	uglify = require('gulp-uglify'),
	// 浏览器自动刷新
	browserSync = require("browser-sync"),
	// pug错误处理
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	// 图片压缩
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	smushit = require('gulp-smushit'),
	// 缓存
	cache = require('gulp-cache'),
	// 重命名
	rename = require("gulp-rename");
// 编译压缩less
gulp.task("less", ()=>{
	return gulp.src("src/less/*.less")
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(less())
		// 兼容前缀
		.pipe(autoprefixer({
      browsers: ['last 5 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true
		}))
		// 常规输出
		.pipe(gulp.dest("dist/css"))
		// 输出压缩文件
		.pipe(rename({suffix: '.min'})) 
		// 压缩css
		.pipe(minifycss())
		.pipe(gulp.dest("dist/css"));
});
// 编译sass
gulp.task("sass", ()=>{
	return gulp.src("src/sass/*.sass")
		.pipe(sass())
		// 打印报错
		.on('error', sass.logError)
		// 兼容前缀
		.pipe(autoprefixer({
      browsers: ['last 5 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true
		}))
		// 常规输出
		.pipe(gulp.dest("dist/css"))
		// 输出压缩文件
		.pipe(rename({suffix: '.min'})) 
		// 压缩css
		.pipe(minifycss())
		.pipe(gulp.dest("dist/css"));
});
// 编译pug
gulp.task("pug", ()=>{
	return gulp.src("src/pug/*.pug")
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(pug({pretty: true}))
		// 常规输出
		.pipe(gulp.dest("dist"));
});

//压缩js
gulp.task('minifyjs', ()=>{
	return gulp.src('src/js/*.js')//压缩文件
		// 输出源文件
		.pipe(gulp.dest("dist/js"))
	  .pipe(rename({suffix:'.min'}))//起别名保存
	  .pipe(uglify())//压缩
	  .pipe(gulp.dest('dist/js'));//输出文件
});
// 压缩图片
gulp.task("minImage", ()=>{
	return gulp.src('src/images/*')
    .pipe(cache(imagemin({
    	optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
    	use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/images'));
});
// png图片压缩
gulp.task("minPng", ()=>{
	return gulp.src('src/images/*')
	  .pipe(cache(smushit({
	      verbose: true
	  })))
	  .pipe(gulp.dest('dist/images'));
})
// 开启服务器任务
gulp.task('serve', ['less', 'pug', 'minifyjs'], ()=>{
	browserSync.init({
		server: '.'
	});
	// 监听less编译
	gulp.watch("src/less/*.less", ['less']);
	// 监听pug编译
	gulp.watch("src/pug/*.pug", ['pug']);
	// 监听js
	gulp.watch("src/js/*.js", ['minifyjs']);
	// 实时刷新页面
	gulp.watch("./src/**/*.*").on('change', browserSync.reload);
})

gulp.task("default", ['serve']);