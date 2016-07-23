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
   * Generate X Offset determines how the bin should be displaced so that all
   *  the bins are evenly spread about the edges of the screen and placed
   *   in order by ID
   **/
  _generateXOffset: function() {
    //stub
    var bID = this.props.binID;
    var xOffset = 100;
    return(xOffset.toString() + 'px');
  },

  /**
   * Generate Y Offset determines the vertical displacement of the current
   *  bin that keeps all the bins spaced out around the screen
   **/
  _generateYOffset: function() {
    //stub
    var bID = this.props.binID;
    var yOffset = 50;
    return(yOffset.toString() + 'px');
  },


  render: function() {

    var binID = this._getBinID();

    var xOffset = this._generateXOffset();
    var yOffset = this._generateYOffset();

    var binStyle = {
      position: 'absolute',
      width: '25%',
      height: '300px',
      marginLeft: xOffset,
      marginTop:  yOffset,
      background: '#888888',
      borderRadius: '8px',
      zIndex: '-10'
    }

    return(
      <div id={binID} style={binStyle}></div>
    );
  }

});

module.exports = Bin;
