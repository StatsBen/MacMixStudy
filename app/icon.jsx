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

  _startDrag: function(e) {
    // stub

    var elementToDrag = e.target.id;
    onmousemove = this._dragging;
    console.log('dragging...  ' + e.clientX);
  },

  _endDrag: function(e) {
    // stub
    onmousemove = null;
    console.log('done dragging!');
  },

  _dragging: function(e) {
    //stub
    var eToDragID = e.target.id;
    var eToDrag = document.getElementById(eToDragID);
    var originalXOffset = parseInt(eToDrag.style.marginLeft);
    var originalYOffset = parseInt(eToDrag.style.marginTop);
    console.log(eToDragID);
    console.log(e.screenX + '-' + e.screenY);
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
