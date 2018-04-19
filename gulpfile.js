var gulp = require('gulp');
var exec = require('child_process').exec;
var argv = require('yargs').argv;
var replace = require('gulp-replace');

gulp.task('default',function(){
	gulp.src('views/**').pipe(gulp.dest('distviews'));
})

gulp.task('mkdir',function(){
	exec('mkdir mygulp')
})

//删除文件
// gulp.task('default',function(){
// 	exec('rm -R mygulp',function(error,stdout,stderr){
// 		if (error !== null) {
// 			console.log("error:" + error)
// 		}else{
// 			console.log("ok")
// 		}
// 	})
// })

//执行gulp传入参数\接收参数
gulp.task('hello_task',function(){
	if (argv.test) {
		var info = argv.test;
		console.log("收到的参数："+info)
	}else{
		console.log("输入错误 请输入 gulp hello_task --test hellotest")
	}
})

//监听文件
gulp.task('watch',function(){
	gulp.watch('views/index.ejs',function(file){
		console.log(file.type);
		console.log(file.path);
	})
})

//替换
gulp.task('replace_code',function(){
	return gulp.src('views/**')
	.pipe(replace('jing','aijing'))
	.pipe(gulp.dest('distviews'))
	.on('end',function(){
		console.log("替换完成")
	})
})

//合并task
gulp.task('gulp_two',['mkdir','replace_code'],function(){console.log("两个task执行完毕")})

//采用callback
gulp.task('one',function(cb){
	console.log("开始执行one")
	setTimeout(function(){
		console.log("执行oneOK")
		cb()
	},2000)
})

//先后顺序
// gulp.task('two',['one'],function(){
// 	console.log("开始执行two")
// })

//先后顺序  stream流
gulp.task('two',['replace_code'],function(){
	console.log("开始执行two")
})



























