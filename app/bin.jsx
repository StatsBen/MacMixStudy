import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component represents the bins used in the sorting metaphor. Icons are
 *  dragged over this component and dropped here to sort the icons.
 *
 * Author: Ben Clark - July, 2016
 **/

var SortingTaskStore = require('./stores/sortingTaskStore.js');

var Bin = React.createClass({

  props: {
    binID: React.PropTypes.number.isRequired,
    nBins: React.PropTypes.number.isRequired
  },

  /**
   * This function generates a unique ID attribute for a given bin based
   *  on its x and y coordinates passed in as props.
   **/
  _getBinID: function() {
    var id = this.props.binID;
    id += '-bin';
    return(id);
  },

  /**
   * Generate Offset determines how the bin should be displaced so that all
   *  the bins are evenly spread about the edges of the screen and placed
   *   in order by ID
   **/
  _generateLeftOffset: function() {
    var bID = parseInt(this.props.binID) + 1;
    var nBins = parseInt(this.props.nBins);
    var cutoff = Math.ceil(nBins / 2);

    if ((nBins < 7) || (bID <= cutoff)) {
      var xOffset = 20;
    }
    else {
      var xOffset = 380;
    }
    return(xOffset.toString() + 'px');
  },

  _generateTopOffset: function() {
    var bID = parseInt(this.props.binID);
    var nBins = parseInt(this.props.nBins);
    var cutoff = Math.ceil(nBins / 2);
    var navBarHeight = 80;

    if ((nBins < 7) || (bID < cutoff)) {
      var yOffset = navBarHeight + (bID * this._generateBinHeight());
      yOffset += (bID * 20) + 20;
    }
    else {
      var yOffset = navBarHeight + ((bID-cutoff) * this._generateBinHeight());
      yOffset += ((bID - cutoff) * 20) + 20;
    }
    return(yOffset.toString() + 'px');
  },

  /**
   * Generate Bin Height determines how many pixels high each bin should be
   *  so they all stack nicely in the window.
   **/
  _generateBinHeight: function() {
    var navBarHeight = 80;
    var sortingTaskHeight = window.innerHeight - navBarHeight;
    var nBins = parseInt(this.props.nBins);
    var binGap = 20;

    // Case 1: There's less than 7 bins and they fit in 1 column
    if (nBins < 7) {
      var leftovers = Math.ceil(binGap / nBins);
      var extra = leftovers + binGap;
      var binHeight = Math.round((sortingTaskHeight / nBins) - extra);
      return binHeight;
    }

    // Case 2: The bins need to overflow into 2 columns
    else {
      var binsPerColumn = Math.ceil(nBins / 2);
      var leftovers = Math.ceil(binGap / binsPerColumn);
      var extra = leftovers + binGap;
      var binHeight = Math.round((sortingTaskHeight / binsPerColumn) - extra);
      return binHeight;
    }
  },

  /**
   * Generate Bin Width decides how wide the bins should be as a css property
   *  in pixels.
   **/
  _generateBinWidth: function() {
    var nBins = this.props.nBins;
    if (nBins < 7) { return 700; }
    else { return 340; }
  },


  render: function() {

    var binID = this._getBinID();

    SortingTaskStore.actions.registerBin(binID);

    var binStyle = {
      position: 'absolute',
      background: '#888888',
      border: 'thin solid #888888',
      borderRadius: '8px',
      zIndex: '-10'
    }

    var leftOffset   = this._generateLeftOffset();
    var topOffset    = this._generateTopOffset();
    var binHeight    = this._generateBinHeight();
    var binWidth     = this._generateBinWidth();
    binStyle.left   = leftOffset;
    binStyle.top    = topOffset;
    binStyle.height = binHeight;
    binStyle.width  = binWidth;

    var binLabel = 'bin ' + (parseInt(this.props.binID)+1).toString();

    return(
      <div id={binID} style={binStyle}>
        <i>{binLabel}</i>
      </div>
    );
  }

});

module.exports = Bin;
