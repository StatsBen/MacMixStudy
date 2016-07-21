import React from 'react';
import ReactDOM from 'react-dom';

var Icon = require('./icon.jsx');
var Bin = require('./bin.jsx');

/**
 * The component containing the actual sorting task that is the meat of this
 *  study interface for Macaron Mix.
 *
 * Author: Ben Clark - July, 2016
 **/

var SortingTask = React.createClass({

  propTypes: {
    nBins: React.PropTypes.number.isRequired
  }, // TODO Here's the problem...

  getDefaultProps: function() {
    return {
      nBins: 4
    };
  },

  /**
   *  A function that generates a unique ID attribute for a bin component
   *   based on it's given coordinates
   **/
  _generateBinIDs: function() {
    var nBins = this.props.nBins;
  },

  render: function() {

    var Bins = this._generateBinIDs();

    return(
      <div id="sorting-task-container">
        <Icon nIcons={25} iconID={1} />
        <Icon nIcons={25} iconID={2} />
        <Icon nIcons={25} iconID={3} />
        <Bin x={1} y={1} nBins={4} />
      </div>
    );
  }

});

module.exports = SortingTask;
