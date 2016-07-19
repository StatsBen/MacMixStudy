import React from 'react';
import ReactDOM from 'react-dom';

var Icon = require('./icon.jsx');
var Bin = require('./bin.jsx');

var SortingTask = React.createClass({

  render: function() {

    var containerStyle = {

    };

    return(
      <div id="sorting-task-container">
        <h3>Sorting Task Area</h3>
        <Icon x={1} y={1} nIcons={25} />
        <Bin x={1} y={1} nBins={4} />
      </div>
    );
  }

})

module.exports = SortingTask;
