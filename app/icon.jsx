import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component represents a haptic icon that can be previewed, and then
 *  dragged around the screen, and placed in a bin to sort it (per the
 *   task instructions).
 *
 * Author: Ben Clark - July, 2016
 **/

var Icon = React.createClass({

  props: {
    nIcons: React.PropTypes.number,
    iconID: React.PropTypes.number
  },

  /**
   * This function generates initial values for the marginLeft
   *  css style properties that put the icon as close as possible to the middle
   *   of the screen without overlapping with another icon.
   **/
  _computeInitialXOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  /**
   * This function generates initial values for the marginTop css style
   *  properties that put the icon as close as possible to the middle
   *   of the screen without overlapping with another icon.
   **/
  _computeInitialYOffset: function() {
    // stub
    var offset = 0;
    return(offset.toString() + 'px');
  },

  /**
   * This function begins the process of allowing an icon to be "dragged"
   *  about the screen following the cursor. It's linked to the onMouseDown
   *   javascript event.
   **/
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

  /**
   * This function stops the "drag" process when the user releases their
   *  mouse (when the icon should stop folowing the cursor).
   **/
  _endDrag: function(e) {
    if (_iconToDrag != null) {
      onmousemove = null;
      document.onselectstart = null;
    }
  },

  /**
   * This function makes the icon follow the cursor during a "drag" action.
   **/
  _dragging: function(e) {
    //stub
    var newX = (_offsetX + e.clientX) - _startX;
    var newY = (_offsetY + e.clientY) - _startY;
    var newMargLeft = newX.toString() + 'px';
    var newMargTop  = newY.toString() + 'px';
    _iconToDrag.style.marginLeft = newMargLeft;
    _iconToDrag.style.marginTop  = newMargTop;
  },

  /**
   * This function finds the url of the desired audio file for a given haptic
   *  icon based on the icon element's ID
   **/
  _getAudioSourceFromID: function() {
    //stub
    return "/icons/wave1.wav";
  },


  render: function() {

    var iconID = this.props.iconID.toString() + '-icon';

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

    var audioSource = this._getAudioSourceFromID();
    var audioID = 'audio-' + iconID;

    var playPreview = function() {
      document.getElementById(audioID).play();
    };


    return(
      <div id={iconID}
           style={iconStyle}
           onMouseDown={this._startDrag}
           onMouseUp={this._endDrag}
           onDoubleClick={playPreview} >
        <audio id={audioID}>
          <source src={audioSource} type="audio/wav" />
        </audio>
      </div>
    );
  }

});

/**
 * Some global variables for the drag/drop functionality which was implemented
 *  by closely following this tutorial:
 *     http://luke.breuer.com/tutorial/javascript-drag-and-drop-tutorial.aspx
 *       (but without the IE support.)
 **/
var _startX;
var _startY;
var _offsetX;
var _offsetY;
var _oldZIndex = 10;
var _iconToDrag;

module.exports = Icon;
