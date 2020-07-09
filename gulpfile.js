//在这里书写项目zhangsanshop的打包配置文件

/*
gulp里面的方法
    1 src()
        =>用来找到你要打包的文件的
        =>gulp.src('你要打包的文件路径')
        =>返回值:就是一个二进制流,就可以继续去调用gulp的方法

    2 pipe()
        =>用来帮你做事情的
        =>pipe(你需要做的事情)
        =>返回值:就是一个二进制流,就可以继续去调用gulp的方法
    
    3 dest()
        =>用来写入文件的
        =>你要把已经压缩的代码放在另一个文件夹里面
        =>如果没有指定文件夹,会自动创建

    4 parallel()
        =>用来执行多个任务的
        =>gulp.parallel(定义好的任务1,定义好的任务2,.....)
        =>他就会给你把这些任务都执行了,是并行执行,同时开始执行
        =>返回值:是一个任务流

    5 series()
        =>用来执行多个任务的
        =>gulp.series(定义好的任务1,定义好的任务2,.....)
        =>他就会给你把这些任务都执行了,是逐个执行,一个执行完了再执行下一个
        =>返回值:是一个任务流

    6 watch()
        =>用来监控文件变化的
        =>gulp.watch('你要监控的文件目录',你要执行的任务)
*/

//1 导入gulp
const gulp = require('gulp');
//2 导入del
const del = require('del'); 
//3 导入gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer')
//4 导入gulp-cssmin
const cssmin = require('gulp-cssmin')
//5 导入gulp-htmlmin
const htmlmin = require('gulp-htmlmin')
//6 导入gulp-babel
const babel = require('gulp-babel')
//7 导入gulp-uglify
const uglify = require('gulp-uglify')
//8 导入gulp-webserver
// const webserver = require('gulp-webserver')

//书写关于css压缩的规则
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

//书写关于html压缩的规则
const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        removeAttributeQuotes:true,//移除属性上的双引号
        removeComments:true,//移除注释
        collapseWhitespace:true,//移除所有空格,会变成一行代码
        minifyCSS:true,//把页面里面style标签里面的css样式也去空格
        minifyJS:true,//把页面里面script标签里面的js代码也去空格
        collapseBooleanAttributes:true//把值为布尔值的属性简写
    }))
    .pipe(gulp.dest('./dist/pages'))
}

//书写关于js压缩的规则
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())  //uglify不认识es6,一定要先转语法,再压缩
    .pipe(gulp.dest('./dist/js'))
}
//书写关于lib的移动的规则
const libHandler = ()=>{
    //我打算把src处理完成以后,都放到dist文件夹下
    return gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'))
}
//书写关于images的移动的规则
const imagesHandler = ()=>{
    return gulp.src('./src/images/**') //"**"表示images下面的所有文件
    .pipe(gulp.dest('./dist/images'))  
}
//书写关于删除的规则
const delHandler = ()=>{
    return del(['./dist'])
}

//书写webserver的规则
// const webserverHandler = ()=>{
//     return gulp.src('./dist')   //找到要作为服务器根目录的文件夹
//     .pipe(webserver({
//         port:8090,//端口号,0-6635之间,尽量不要用0-1023
//         open:'./pages/index.html',//你默认打开的首页,路径从dist开始书写
//         livereload:true,//热更新,就是当dist里面代码有变化的时候自动刷新浏览器
//         proxies:[ //这个第三方模块还可以帮助我们配置代理
//             //直接在使用webserver的时候添加一个配置项:   proxies:[]
//             {
//                 source: '/abc', //表示请求的地址
//                 target: 'http://127.0.0.1/json.php'//你要代理的地址
//             },
//             {
//                 source: '/eee', //表示请求的地址
//                 target: 'http://127.0.0.1/json.php'//你要代理的地址
//             }
//         ]
//     }))
// }

//书写自动监控任务
// const watchHandler = ()=>{
//     /*
//         当我在src里面书写代码的时候,只要我修改我的代码,就会被gulp监听到,
//         一旦监听到,就重新帮我删除以前的和压缩现在的,一旦压缩,dist文件夹里面内容就变化了
//         变化了以后服务器就会热更新
//     */
//     gulp.watch('./src/css/*.css',cssHandler);
//     gulp.watch('./src/js/*.js',jsHandler);
//     gulp.watch('./src/pages/*.html',htmlHandler);
//     gulp.watch('./src/images/**',imagesHandler);
//     gulp.watch('./src/lib/**',libHandler)
// }


/*
    如images里面有一个2.jpg,后来重命名成了222.jpg,
    执行gulp images,会把222.jpg拷贝到dist/images里面,但是他不知道其实222.jpg就是原来的2.jpg
    重命名的,就会有多余的文件,为了防止这种问题,要先删除,再拷贝就可以
*/
//1 原始的导出成一个任务
// module.exports.default = libHandler;
// module.exports.images = imagesHandler;
// module.exports.del = delHandler;
// module.exports.css = cssHandler;
// module.exports.html = htmlHandler;
// module.exports.js = jsHandler;
//上面的任务除了del,其他的没有先后顺序
//导出的任务可以在命令行运行:gulp 任务名,如果任务名是default可以省略

//2 初步优化任务导出
// module.exports.default = gulp.series(
//     delHandler,
//     gulp.parallel(libHandler,imagesHandler,cssHandler,htmlHandler,jsHandler)
// )
// module.exports.server = webserverHandler;


//3 最终优化任务导出
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler,imagesHandler,cssHandler,htmlHandler,jsHandler),
    // webserverHandler,
    // watchHandler
)
/*
    提出一个小问题:jquery这个包和gulp这个包有什么区别
    1 juqery这种模块
        +后期我的项目打包完成后,还需要使用,因为我的代码运行要依赖他
        +npm install 包名@版本 --save
        +npm install 包名@版本 -S
        +npm install 包名@版本
        +这些包信息放在:"dependencies"里面
    2 gulp这种模块
        +他是一种打包工具,打包完成以后,就不需要他了
        +npm install 包名@版本 --save-dev
        +npm install 包名@版本 -D
        +这些包信息放在:"devDependencies"里面
    3 在配置文件里面要体现出这种不同来        
    4 require('模块名'):会去node_modules里面查找这个模块

*/