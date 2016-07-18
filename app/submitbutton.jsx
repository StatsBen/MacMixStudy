import React from 'react';
import ReactDOM from 'react-dom';

var SubmitButton = React.createClass({

  propTypes: {
    taskComplete: React.PropTypes.bool.isRequired
  },

  _handleSubmitClick: function() {
    //stub
    alert('you clicked the submit button!');
  },

  render: function() {
    return(
      <button onClick={this._handleSubmitClick}
              disabled={!this.props.taskComplete}>Submit Task</button>
    );
  }

});

module.exports = SubmitButton;
