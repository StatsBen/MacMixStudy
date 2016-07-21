import React from 'react';
import ReactDOM from 'react-dom';

var HelpButton = require('./helpbutton.jsx');
var SubmitButton = require('./submitbutton.jsx');

/**
 * One of the higher level components containing all the elements at the
 *  top of the screen that allows users to navigate through the study interface.
 *
 * Author: Ben Clark - July, 2016
 **/

var NavBar = React.createClass({

  propTypes: {
    currentTask: React.PropTypes.number,
    taskComplete: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return{
      currentTask: 1,
      taskComplete: false
    };
  },

  getCurrentStudyProgress: function() {
    // stub
    return "task 1 of 10";
  },

  render: function() {

    var progressIndicatorStyle = {
      display: "block",
      position: "relative",
      float: "left",
      marginLeft: "15%",
      marginTop: "40px",
    };

    var currentProgress = this.getCurrentStudyProgress();

    return(
      <div id="nav-bar-container">
        <h1 id="page-title"> Macaron Mix User Study </h1>
        <p id="progress-indicator" style={progressIndicatorStyle}>
          {currentProgress}
        </p>
        <div id="nav-buttons-container">
          <SubmitButton taskComplete={this.props.taskComplete}/>
          <HelpButton />
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
