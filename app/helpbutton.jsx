import React from 'react';
import ReactDOM from 'react-dom';

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
