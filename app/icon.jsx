import React from 'react';
import ReactDOM from 'react-dom';

var Icon = React.createClass({

  props: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    nIcons: React.PropTypes.number
  },

  _generateIconID: function() {
    var id = this.props.x.toString() + '-';
    id += this.props.y.toString() + '-icon';
    return(id);
  },

  _startDrag: function() {
    // stub
    console.log('dragging...');
  },

  _endDrag: function() {
    // stub
    console.log('done dragging!');
  },

  _computeXOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  _computeYOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  render: function() {

    var iconID = this._generateIconID();

    var xOffset = this._computeXOffset();
    var yOffset = this._computeYOffset();

    var iconStyle = {
      position: 'absolute',
      width: '50px',
      height: '50px',
      marginLeft: xOffset,
      marginTop: yOffset,
      borderRadius: '50%',
      background: 'orange',
    }

    // stub
    return(
      <div id={iconID}
           style={iconStyle}
           onMouseDown={this._startDrag}
           onMouseUp={this._endDrag} ></div>
    );
  }

});

module.exports = Icon;
