import React from 'react';
import ReactDOM from 'react-dom';

var StudyInterface = require('./app/studyinterface.jsx');

main();

function main() {
  ReactDOM.render(<StudyInterface />, document.getElementById('app'));
}
