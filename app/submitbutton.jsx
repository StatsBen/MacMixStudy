import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This component is a button that allows users to notify the app that they've
 *  completed a sorting task when all the bins have at least 2 icons in them,
 *   and every icon is in a bin.
 *
 * Author: Ben Clark - July, 2016
 **/

var SortingTaskStore = require('./stores/sortingTaskStore.js');

var SubmitButton = React.createClass({

  propTypes: {
    taskComplete: React.PropTypes.bool.isRequired
  },

  _handleSubmitClick: function() {
    SortingTaskStore.actions.submitTask();
  },

  render: function() {
    return(
      <button onClick={this._handleSubmitClick}>Submit Task</button>
    );
  }

});

module.exports = SubmitButton;
