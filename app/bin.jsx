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
    //stub
    var bID = this.props.binID;
    var xOffset = 20;
    return(xOffset.toString() + 'px');
  },
  _generateRightOffset: function() {
    //stub
    return null;
  },
  _generateTopOffset: function() {
    //stub
    var bID = this.props.binID;
    var navBarHeight = 80;
    var yOffset = navBarHeight + 20;
    return(yOffset.toString() + 'px');
  },
  _generateBottomOffset: function() {
    //stub
    return null;
  },


  render: function() {

    var binID = this._getBinID();

    var binStyle = {
      position: 'absolute',
      width: '25%',
      height: '100%',
      background: '#888888',
      border: 'thin solid #888888',
      borderRadius: '8px',
      zIndex: '-10'
    }

    var leftOffset   = this._generateLeftOffset();
    var rightOffset  = this._generateRightOffset();
    var topOffset    = this._generateTopOffset();
    var bottomOffset = this._generateBottomOffset();
    binStyle.left   = leftOffset;
    binStyle.right  = rightOffset;
    binStyle.top    = topOffset;
    binStyle.bottom = bottomOffset;

    return(
      <div id={binID} style={binStyle}></div>
    );
  }

});

module.exports = Bin;
