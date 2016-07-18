import React from 'react';
import ReactDOM from 'react-dom';

var NavBar = React.createClass({

  render: function() {

    var navBarStyle = {
      display: "block",
      position: "relative",
      width: "100%",
      height: "50px",
      margin: "0",
      padding: "0",
      backgroundColor: "yellow",
    }

    return(
      <div id="nav-bar-container" style={navBarStyle} >
        <h2>NavBar</h2>
      </div>
    );
  }

});

module.exports = NavBar;
