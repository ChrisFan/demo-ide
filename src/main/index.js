import { app } from 'electron';
import is from 'electron-is';
import log from 'electron-log';
import * as mainWindow from './mainWindow';

log.transports.file.level = 'info';
log.info('(main/index) >>>>>>>>>>>>>>>>>>');
log.info('(main/index) app start');

if (is.dev()) {
  require('electron-debug')();
  process.env.IDE_DEV = 1;
}

app.on('ready', () => {
  log.info('(main/index) app ready');
  mainWindow.open();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {});
