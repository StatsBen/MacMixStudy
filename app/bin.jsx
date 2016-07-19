import React from 'react';
import ReactDOM from 'react-dom';

var Bin = React.createClass({

  props: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    nBins: React.PropTypes.number
  },

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
