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
    nBins:  React.PropTypes.number.isRequired,
    nIcons: React.PropTypes.number.isRequired
  },

  getDefaultProps: function() {
    return {
      nBins: 8,
      nIcons: 25
    };
  },

  /**
   *  A function that generates the desired number of Bin componenets.
   **/
  _generateBins: function() {
    var nBins = this.props.nBins;
    var bins = new Array();

    for (var i=0; i<nBins; i++) {
      var newBinID = i.toString();
      var binKey = newBinID + '-bin-react-key';
      var newBin = (<Bin binID={newBinID} nBins={nBins} key={binKey} />);
      bins.push(newBin);
    }

    return(bins);
  },

  /**
   * generateIcons will create the desired number of Icons for the current
   *  sorting task. These will be React componenets with IDs that produce
   *   useful icons for the sorting task.
   **/
  _generateIcons: function() {
    var nIcons = this.props.nIcons;
    var icons = new Array();

    for (var i=0; i<nIcons; i++) {
      var newIconID = i.toString();
      var iconKey = newIconID + '-icon-react-key';
      var newIcon = (<Icon iconID={newIconID} nIcons={nIcons} key={iconKey} />);
      icons.push(newIcon);
    }

    return(icons);
  },

  render: function() {

    var Bins  = this._generateBins();
    var Icons = this._generateIcons();

    return(
      <div id="sorting-task-container">
        {Bins}
        {Icons}
      </div>
    );
  }

});

module.exports = SortingTask;
