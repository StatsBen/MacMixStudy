import React from 'react';
import ReactDOM from 'react-dom';

var Icon = require('./icon.jsx');
var Bin = require('./bin.jsx');

var SortingTask = React.createClass({

  propTypes: {
    nBins: React.PropsTypes.number.isRequired
  }, // TODO Here's the problem...

  getDefaultProps: function() {
    return {
      nBins: 4
    };
  },

  _generateBinIDs: function() {
    var nBins = this.props.nBins;
  },

  render: function() {

    var Bins = this._generateBinIDs();

    return(
      <div id="sorting-task-container">
        <Icon x={1} y={1} nIcons={25} />
        <Bin x={1} y={1} nBins={4} />
      </div>
    );
  }

});

module.exports = SortingTask;
