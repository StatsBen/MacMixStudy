import React from 'react';
import ReactDOM from 'react-dom';

var Icon = React.createClass({

  props: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    nIcons: React.PropTypes.number,
  },

  _generateIconID: function() {
    var id = this.props.x.toString() + '-';
    id += this.props.y.toString() + '-icon';
    return(id);
  },

  _computeInitialXOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  _computeInitialYOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  _startDrag: function(e) {

    var target = e.target;

    if (e.button == 0) {
      _startX = e.clientX;
      _startY = e.clientY;
      _offsetX = parseInt(target.style.marginLeft);
      _offsetY = parseInt(target.style.marginTop);
      _iconToDrag = target;

      target.zIndex = _oldZIndex++;
      onmousemove = this._dragging;

      // Try to prevent text selection
      document.body.focus();
      document.onselectstart = function () { return false; };

      return false;
    }
  },

  _endDrag: function(e) {
    if (_iconToDrag != null) {
      onmousemove = null;
      document.onselectstart = null;
    }
  },

  _dragging: function(e) {
    //stub
    var newX = (_offsetX + e.clientX) - _startX;
    var newY = (_offsetY + e.clientY) - _startY;
    var newMargLeft = newX.toString() + 'px';
    var newMargTop  = newY.toString() + 'px';
    _iconToDrag.style.marginLeft = newMargLeft;
    _iconToDrag.style.marginTop  = newMargTop;
  },

  render: function() {

    var iconID = this._generateIconID();

    var xOffset = this._computeInitialXOffset();
    var yOffset = this._computeInitialYOffset();

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
           onMouseUp={this._endDrag} >
      </div>
    );
  }

});

var _startX;
var _startY;
var _offsetX;
var _offsetY;
var _oldZIndex = 10;
var _iconToDrag;

module.exports = Icon;
