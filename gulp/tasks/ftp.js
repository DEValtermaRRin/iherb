import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
  // Добавление лога в конфигурационный файл для вывода состояния
  configFTP.log = util.log;
  // Создаем подключение и записываем в константу, основываясь на файле конфиги
  const ftpConnect = vinylFTP.create(configFTP);
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.gulpPlumber(
      app.plugins.notify.onError({
        title: "FTP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}