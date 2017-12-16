import { BrowserWindow } from 'electron';
import is from 'electron-is';
import { join } from 'path';

const getUrl = () => {
  if (is.dev()) {
    return 'http://127.0.0.1:8000/index.html';
  }
  return `file://${join($dirname)}/index.html`;
};

let mainWindow = null;

export function open() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    title: 'A simple IDE',
    webPreferences: { webSecurity: false },
  });
  mainWindow.on('close', () => { mainWindow = null; });
  mainWindow.loadURL(getUrl());
}
