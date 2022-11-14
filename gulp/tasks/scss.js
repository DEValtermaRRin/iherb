import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import GulpCleanCss from 'gulp-clean-css'; // сжатие css файла
import webpcss from 'gulp-webpcss'; // вывод webp изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
// группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.sourcemaps.init())
    .pipe(
      app.plugins.gulpPlumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(app.plugins.if( app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.if( app.isBuild, webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    })))
    .pipe(app.plugins.if( app.isBuild, autoPrefixer({
      grid: true,
      overrideBrowserslist: ["last 3 versions"],
      cascade: true
    })))
    // Закомментировать если не нужен несжатый дубль файла стилей
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if( app.isBuild, GulpCleanCss()))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.plugins.sourcemaps.write())
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
