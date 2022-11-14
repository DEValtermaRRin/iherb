// пакет собирает 1 файл html из нескольких
import fileinclude from 'gulp-file-include';
// пакет устанавливает для картинок формат webp, если это возможно
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
// пакет позволяет избежать ситуаций с кешированием
import versionNumber from 'gulp-version-number';

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.gulpPlumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json'
      }
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}