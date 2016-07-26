import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component represents a haptic icon that can be previewed, and then
 *  dragged around the screen, and placed in a bin to sort it (per the
 *   task instructions).
 *
 * Author: Ben Clark - July, 2016
 **/

var BinStore = require('./stores/binStore.js');

var Icon = React.createClass({

  props: {
    nIcons: React.PropTypes.number,
    iconID: React.PropTypes.number,
    nBins: React.PropTypes.number
  },

  /**
   * This function generates initial values for the marginLeft
   *  css style properties that put the icon as close as possible to the middle
   *   of the screen without overlapping with another icon.
   **/
  _computeInitialXOffset: function() {
    var minOffset = 700 + 50;
    var maxOffset = window.innerWidth - 100;
    var offset = minOffset + Math.round(Math.random() * (maxOffset-minOffset));
    return(offset.toString() + 'px');
  },

  /**
   * This function generates initial values for the marginTop css style
   *  properties that put the icon as close as possible to the middle
   *   of the screen without overlapping with another icon.
   **/
  _computeInitialYOffset: function() {
    var navBarHeight = 80;
    var minOffset = 100;
    var maxOffset = window.innerHeight - 200;
    var offset = minOffset + Math.round(Math.random()*(maxOffset-minOffset));
    offset += navBarHeight;
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
      _offsetX = parseInt(target.style.left);
      _offsetY = parseInt(target.style.top);
      _iconToDrag = target;

      target.style.zIndex = _oldZIndex++;
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

    var isInBin = this._isIconInABin(e.target);

    if (isInBin) {
      var enclosingBin = this._findEnclosingBin(e.target);
      this._scootchIntoBin(e.target);
      this._highlightBin(enclosingBin);
      this._checkIfTaskCanBeSubmitted();
    }

  },

  /**
   * This function makes the icon follow the cursor during a "drag" action.
   **/
  _dragging: function(e) {
    var newX = (_offsetX + e.clientX) - _startX;
    var newY = (_offsetY + e.clientY) - _startY;
    var newMargLeft = newX.toString() + 'px';
    var newMargTop  = newY.toString() + 'px';
    _iconToDrag.style.left = newMargLeft;
    _iconToDrag.style.top  = newMargTop;
  },

  /**
   * see If Icon Is In A Bin finds out if the most recently moved Icon appears
   *  to be inside a bin.
   **/
  _isIconInABin: function(targetIcon) {

    var isInBin = false;
    var nBins = this.props.nBins;
    var left = parseInt(targetIcon.style.left);

    if (left <= 700) {isInBin = true;}

    return isInBin;
  },

  /**
   * Find Enclosing Bin figures out the ID of the bin that an icon appears to
   *  have been placed in and then gets that element by ID and returns it.
   **/
  _findEnclosingBin: function(targetIcon) {
    // stub
    var x = parseInt(targetIcon.style.left) + 25;
    var y = parseInt(targetIcon.style.top) + 25;
    var nBins = this.props.nBins;

    // Case 1: There's only 1 column of bins.
    if (nBins < 7) {
      var navBarHeight = 80;
      var binHeight = Math.round((window.innerHeight - navBarHeight) / nBins);
      var bID = Math.floor(y / binHeight) - 1;
    }
    //Case 2: there are 2 columns
    else {
      nBins = Math.ceil(nBins / 2);
      var navBarHeight = 80;
      var binHeight = Math.round((window.innerHeight - navBarHeight) / nBins);
      if (x < 370) { // Left Column
        bID = Math.floor(y / binHeight) - 1;
      } else {
        bID = (Math.floor(y / binHeight) + nBins) - 1;
      }
    }

    var actualBinID = bID.toString() + '-bin';
    var bin = document.getElementById(actualBinID);
    return bin;
  },

  /**
   * Scootch Into Bin tweaks the "left" and "top" style properties on
   *  this icon so that if it is mostly but not entirely in a bin, it falls
   *   entirely in a bin.
   **/
  _scootchIntoBin: function(targetIcon) {
    //stub - no scootching. TODO
    return;
  },

  /**
   * Highligh Bin runs a quick animation to show an affirmative glow around
   *  the bin that an icon appears to have been placed in.
   **/
  _highlightBin: function(targetBin) {

    console.log(targetBin);
    var opacity = 1;
    var shadowVal;

    var binGlow = function() {
      if (opacity < 0) { console.log('done'); clearInterval(animID); }
      else {
        shadowVal = '0px 0px 25px rgba(265, 165, 0, '
        shadowVal += opacity.toString() + ')';
        console.log(shadowVal);
        targetBin.style.boxShadow = shadowVal;
        opacity = opacity - 0.01;
        console.log('animating');
      }
    }

    var animID = setInterval(binGlow, 10);
  },

  /**
   * Check If Task Can Be Completed checks to see if the criteria for task
   *  completion are satisfies, and if so, it activates the submit button,
   *   and offers the user a notification that it's complete!
   **/
  _checkIfTaskCanBeSubmitted: function() {
    // stub - no real checking. TODO
    return;
  },

  /**
   * This function finds the url of the desired audio file for a given haptic
   *  icon based on the icon element's ID
   **/
  _getAudioSourceFromID: function() {
    //stub
    var previewURL = '/icons/wave' + this.props.iconID + '.wav';
    return previewURL;
  },


  render: function() {

    var iconID = this.props.iconID.toString() + '-icon';

    var xOffset = this._computeInitialXOffset();
    var yOffset = this._computeInitialYOffset();

    var iconStyle = {
      position: 'absolute',
      width: '50px',
      height: '35px',
      overflow: 'hidden',
      left: xOffset,
      top: yOffset,
      paddingTop: '15px',
      background: 'orange',
      textAlign: 'center',
      cursor: 'pointer',
      boxShadow: "2px 2px 8px #444444",
      border: 'thin solid #888888',
      borderRadius: '50%'
    };

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
        {(parseInt(this.props.iconID) + 1).toString()}
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
