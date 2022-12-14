import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        app.plugins.gulpPlumber(
          app.plugins.notify.onError({
            title: 'IMAGES',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(app.plugins.if( app.isBuild, webp()))
      .pipe(app.plugins.if( app.isBuild, app.gulp.src(app.path.src.images)))
      .pipe(app.plugins.if( app.isBuild, app.plugins.newer(app.path.build.images)))
      .pipe(app.plugins.if( app.isBuild, 
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interplaced: true,
          optimizationLevel: 5, // от 0 до 7
        })),
      )
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.plugins.browserSync.stream())
  );
};
