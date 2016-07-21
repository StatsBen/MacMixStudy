import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component is a button that users can click on that will notify the
 *  study facilitator that the user requires in-person assistance
 *
 * Author: Ben Clark - July, 2016
 **/

var HelpButton = React.createClass({

  _onHelpButtonClick: function() {
    // stub
    alert("You've clicked on the help button!");
  },


  render: function() {

    var helpButtonStyle = {
      position: "relative",
    };

    return(
      <button type="button"
              style={helpButtonStyle}
              onClick={this._onHelpButtonClick}> Help </button>
    );
  }

});

module.exports = HelpButton;
