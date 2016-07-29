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
var BinStore  = require('./stores/binStore.js');
var IconStore = require('./stores/iconStore.js');

var SortingTask = React.createClass({

  propTypes: {
    taskID: React.PropTypes.number.isRequired,
    nBins:  React.PropTypes.number.isRequired,
    nIcons: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {

    return {
      nIcons: 25,
      nBins: 4   //default
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
    var nBins = this.props.nBins;
    var icons = new Array();

    for (var i=0; i<nIcons; i++) {
      var newIconID = i.toString();
      var iconKey = newIconID + '-icon-react-key';
      var newIcon = (<Icon iconID={newIconID}
                           nIcons={nIcons}
                           key={iconKey}
                           nBins={nBins} />);
      icons.push(newIcon);
    }

    return(icons);
  },

  render: function() {

    // decide how many bins there should be...
    var nBins = 1; //default
    switch(this.props.taskID) {
      case 1: nBins = 12; break;
      case 2: nBins = 2; break;
      case 3: nBins = 4; break;
      case 4: nBins = 7; break;
      case 5: nBins = 9; break;
      case 6: nBins = 12; break;
    }
    //this.props.nBins = nBins;

    var Bins  = this._generateBins();
    var Icons = this._generateIcons();
    var nBins = parseInt(this.props.nBins);
    var taskID = 'sorting-task-container-' + this.props.taskID.toString();

    if (this.props.isActive) {
      return(
        <div id={taskID} className="sorting-task-container">
          {Bins}
          {Icons}
        </div>
      );
    }

    else {
      return (<div id={taskID}></div>);
    }
  }

});

module.exports = SortingTask;
