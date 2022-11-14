import svgSprite from 'gulp-svg-sprite';

export const svgSprites = () => {
  return app.gulp.src(app.path.src.svgicons, {})
    .pipe(app.plugins.gulpPlumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // Создаем страницк с перечнем иконок
          example: true
        }
      }
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`))
}