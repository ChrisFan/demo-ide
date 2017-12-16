import React from 'react';
import * as editorService from '../services/editor';

const containerStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

class Editor extends React.Component {
  componentDidMount() {
    editorService.init(this.container);
  }
  render() {
    return (
      <div
        style={containerStyle}
        ref={(c) => { this.container = c; }}
      />
    );
  }
}

export default Editor;
