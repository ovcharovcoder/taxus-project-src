const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const include = require("gulp-include");
const sourcemaps = require('gulp-sourcemaps');
const notify = require("gulp-notify");
const csslint = require('gulp-csslint');

// Include pages html
function pages() {
  return src("app/pages/*.html").pipe(
    include({
      includePaths: "app/components"
    }))
  .pipe(dest("app"))
  .pipe(browserSync.stream())
}

// Fonts optimization
function fonts() {
  return src("app/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

// Convert images
function images() {
  return src(["app/images/src/*.*", "!app/images/src/*.svg"])
    .pipe(newer("app/images"))
    .pipe(avif({ quality: 50 }))
    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(webp())
    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(imagemin())
    .pipe(dest("app/images"));
}

// Clean image cache
function cleanImages() {
  return src("app/images/**/*", { read: false })
    .pipe(clean());
}

// Optimize SVG files
function svgImages() {
  return src("app/images/src/*.svg")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest("app/images"));
}

// Scripts
function scripts() {
  return src(["app/js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

// Styles with sourcemaps and error notifications
function styles() {
  return src("app/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: "compressed" }).on("error", notify.onError())) // Notify on error
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"] }))
    .pipe(concat("style.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

// CSS Lint
function lintCss() {
  return src("app/css/style.min.css")
    .pipe(csslint())
    .pipe(csslint.formatter());
}

// Watching and Browsersync with cache disabled
function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    cache: false, // Disable caching
  });
  watch(["app/scss/*.scss"], styles);
  watch(["app/images/src"], series(cleanImages, images));
  watch(["app/images/src/*.svg"], svgImages); // Added SVG watcher
  watch(["app/js/main.js"], scripts);
  watch(["app/components/*", "app/pages/*"], pages);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

// Clean
function cleanDist() {
  return src("dist").pipe(clean());
}

// Building (with added SVG files)
function building() {
  return src(
    [
      "app/css/style.min.css",
      "app/images/*.*",
      "app/images/icons/*.*",
      "app/images/*.svg", // Added SVG files to build
      "app/fonts/*.*",
      "app/js/main.min.js",
      "app/*.html",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

exports.styles = styles;
exports.images = images;
exports.cleanImages = cleanImages; // Exporting the cleanImages function
exports.svgImages = svgImages; // Exporting the new svgImages function
exports.fonts = fonts;
exports.pages = pages;
exports.building = building;
exports.scripts = scripts;
exports.lintCss = lintCss; // Exporting CSS lint function
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, fonts, images, svgImages, scripts, pages, watching); // Added svgImages to default task
