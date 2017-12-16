import { remote } from 'electron';
import { join } from 'path';

const monacoLoader = require('monaco-editor/min/vs/loader');

const dirname = remote.getGlobal('getVars')('dirname');

let editorInstance = null;

const getUri = (path) => {
  const p = path.length > 0 && path.charAt(0) !== '/' ? `/${path}` : path;
  return `file://${p}`;
};

const loadMonaco = () => {
  if (window.monaco) return Promise.resolve(window.monaco);
  return new Promise(
    (resolve) => {
      monacoLoader.require.config({
        baseUrl: getUri(join(dirname.replace(/\\/g, '/'), '..', 'dist')),
      });
      monacoLoader.require(['./vs/editor/editor.main'], () => {
        resolve(window.monaco);
      });
    },
  );
};

export const init = contaier =>
  loadMonaco().then(
    (monaco) => {
      editorInstance = monaco.editor.create(contaier);
    },
  );

export const exec = (method, ...args) => {
  if (editorInstance) { return editorInstance[method](...args); }
  return null;
};
