import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component represents the bins used in the sorting metaphor. Icons are
 *  dragged over this component and dropped here to sort the icons.
 *
 * Author: Ben Clark - July, 2016
 **/

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
    var bID = this.props.binID;
    var xOffset = 20;
    return(xOffset.toString() + 'px');
  },

  _generateTopOffset: function() {
    var bID = this.props.binID;
    var navBarHeight = 80;
    var yOffset = navBarHeight + (bID * this._generateBinHeight()) + (bID * 20) + 20;
    return(yOffset.toString() + 'px');
  },

  /**
   * Generate Bin Height determines how many pixels high each bin should be
   *  so they all stack nicely in the window.
   **/
  _generateBinHeight: function() {
    //stub
    var navBarHeight = 80;
    var sortingTaskHeight = window.innerHeight - navBarHeight;
    var nBins = this.props.nBins;
    var binGap = 20;
    var leftovers = Math.ceil(binGap / nBins);
    var extra = leftovers + binGap;
    var binHeight = Math.round((sortingTaskHeight / nBins) - extra);
    return binHeight;
  },


  render: function() {

    var binID = this._getBinID();

    var binStyle = {
      position: 'absolute',
      width: '700px',
      background: '#888888',
      border: 'thin solid #888888',
      borderRadius: '8px',
      zIndex: '-10'
    }

    var leftOffset   = this._generateLeftOffset();
    var topOffset    = this._generateTopOffset();
    var binHeight    = this._generateBinHeight();
    binStyle.left   = leftOffset;
    binStyle.top    = topOffset;
    binStyle.height = binHeight;

    var binLabel = 'bin ' + (parseInt(this.props.binID)+1).toString();

    return(
      <div id={binID} style={binStyle}>
        <i>{binLabel}</i>
      </div>
    );
  }

});

module.exports = Bin;
