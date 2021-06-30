let project_folder = "dist"
let source_folder = "src"
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        sass: [source_folder + "/sass/*.sass", "!" + source_folder + "/_*.sass"],
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf ",
    },
    watch: {
        html: source_folder + "/*.html",
        sass: source_folder + "/sass/*.sass",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/"
}

let {src, dest, series, watch} = require('gulp'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    include = require('gulp-file-include'),
    del = require('del');
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'), 
    rename = require('gulp-rename'),
    group_media = require('gulp-group-css-media-queries'),
    image = require('gulp-imagemin') ,
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    uglify = require('gulp-uglify-es').default,
    sync = require('browser-sync').create()

function html() {
    return src(path.src.html) 
                .pipe(include({  
                   prefix: '@@'
                }))
                .pipe(dest(path.build.html)) 
}

function toSass() {
    return src(path.src.sass) 
        .pipe(sass())
        .pipe(group_media())
        .pipe(autoprefixer({ 
            cascade: false
        }))
        .pipe(concat('style.css')) 
        .pipe(dest(path.build.css))
        .pipe(csso()) 
        .pipe(rename({
            extname: ".min.css",
            allowEmpty: true 
        }))
        .pipe(dest(path.build.css)) 
}

function js(){
    return src(path.src.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js",
            allowEmpty: true
        }))
        .pipe(dest(path.build.js))
}

function images() {
    return src(path.src.img)
        .pipe(image({
            progressive:true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3 
        }))
        .pipe(dest(path.build.img))
}

function fonts() {
        return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(src(path.src.fonts))
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
        .pipe(src(path.src.fonts))
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}

function clear(){
    return del(path.clean)
}

function serve() {
    sync.init({
        server: './' + project_folder
    })
}

exports.build = series(clear, toSass, js, html, images,fonts)

watch(path.watch.html, series(html)).on('change', sync.reload)
watch(path.watch.sass, series(toSass)).on('change', sync.reload)
watch(path.watch.js, series(js)).on('change', sync.reload)
watch(path.watch.img, series(images)).on('change', sync.reload)

exports.serve = series(clear, toSass, js, html,images, fonts, serve)