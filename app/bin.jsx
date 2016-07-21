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
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    nBins: React.PropTypes.number
  },

  /**
   * This function generates a unique ID attribute for a given bin based
   *  on its x and y coordinates passed in as props.
   **/
  _getBinID: function() {
    var id = this.props.x + '-';
    id += this.props.y + '-bin';
    return(id);
  },

  render: function() {

    var binID = this._getBinID();

    var binStyle = {
      position: 'absolute',
      width: '25%',
      height: '300px',
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
