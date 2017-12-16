import React from 'react';
import Editor from './Editor';
import styles from './Main.less';

export default function MainPage() {
  return (
    <div className={styles.normal}>
      <div className={styles.fileTree}>
        FileTree
      </div>
      <div className={styles.editor}>
        <Editor />
      </div>
      <div className={styles.simulator}>
        Simulator
      </div>
    </div>
  );
}
