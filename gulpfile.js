const gulp = require('gulp');
const { src, dest, watch, parallel, series } = gulp;
const plugins = {
	scss: require('gulp-sass')(require('sass')),
	concat: require('gulp-concat'),
	uglify: require('gulp-uglify-es').default,
	browserSync: require('browser-sync').create(),
	autoprefixer: require('gulp-autoprefixer'),
	clean: require('gulp-clean'),
	webp: require('gulp-webp'),
	imagemin: require('gulp-imagemin'),
	newer: require('gulp-newer'),
	fonter: require('gulp-fonter'),
	ttf2woff2: require('gulp-ttf2woff2'),
	include: require('gulp-file-include'),
	sourcemaps: require('gulp-sourcemaps'),
	notify: require('gulp-notify'),
	csslint: require('gulp-csslint'),
	replace: require('gulp-replace'),
};

// Include pages html with components
function pages() {
	return src('app/pages/*.html')
		.pipe(
			plugins.include({
				prefix: '@@',
				basepath: 'app/components/',
			})
		)
		.pipe(
			plugins.replace(/<title>.*<\/title>/, (match, filePath) => {
				if (match) {
					return match;
				}
				const pageName = filePath.split('/').pop().replace('.html', '');
				return `<title>Taxus - ${
					pageName.charAt(0).toUpperCase() + pageName.slice(1)
				}</title>`;
			})
		)
		.pipe(
			plugins.replace('@@header', () => {
				return '<!-- Вставляємо header.html -->';
			})
		)
		.pipe(
			plugins.replace('@@footer', () => {
				return '<!-- Вставляємо footer.html -->';
			})
		)
		.pipe(dest('app'))
		.pipe(plugins.browserSync.stream());
}

// Fonts optimization
function fonts() {
	return src('app/fonts/src/*.*')
		.pipe(
			plugins.fonter({
				formats: ['woff', 'ttf'],
			})
		)
		.pipe(src('app/fonts/*.ttf'))
		.pipe(plugins.ttf2woff2())
		.pipe(dest('app/fonts'));
}

// Convert images (jpg, png to webp)
function images() {
	return src(['app/images/src/*.{jpg,png}'])
		.pipe(plugins.newer('app/images'))
		.pipe(plugins.webp().on('error', console.log))
		.pipe(dest('app/images'))
		.pipe(src('app/images/src/*.webp'))
		.pipe(dest('app/images'));
}

// Optimize SVG files
function svgImages() {
	return src('app/images/src/*.svg')
		.pipe(
			plugins.imagemin([
				plugins.imagemin.svgo({
					plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('app/images'));
}

// Scripts
function scripts() {
	return src(['app/js/main.js'])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('main.min.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(dest('app/js'))
		.pipe(plugins.browserSync.stream());
}

// Styles
function styles() {
	return src('app/scss/style.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(
			plugins
				.scss({ outputStyle: 'compressed' })
				.on('error', plugins.notify.onError())
		)
		.pipe(plugins.autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(plugins.concat('style.min.css'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(dest('app/css'))
		.pipe(plugins.browserSync.stream());
}

// Watching and Browsersync
function watching() {
	plugins.browserSync.init({
		server: {
			baseDir: 'app/',
		},
		cache: false,
	});
	watch(
		['app/scss/**/*.scss', 'app/components/*', 'app/pages/*'],
		parallel(styles, pages)
	);
	watch('app/js/*.js', scripts);
	watch(['app/images/src/*.{jpg,png,svg}'], series(images, svgImages));
}

// Clean
function cleanDist() {
	return src('dist', { allowEmpty: true }) // Додаємо allowEmpty: true
		.pipe(plugins.clean());
}

// Building
function building() {
	return src(
		[
			'app/css/style.min.css',
			'app/images/*.*',
			'app/images/icons/*.*',
			'app/images/*.svg',
			'app/fonts/*.*',
			'app/js/main.min.js',
			'app/*.html',
		],
		{
			base: 'app',
		}
	).pipe(dest('dist'));
}

exports.styles = styles;
exports.images = images;
exports.svgImages = svgImages;
exports.fonts = fonts;
exports.pages = pages;
exports.scripts = scripts;
exports.watching = watching;
exports.build = series(cleanDist, building);
exports.default = parallel(
	styles,
	fonts,
	images,
	svgImages,
	scripts,
	pages,
	watching
);
