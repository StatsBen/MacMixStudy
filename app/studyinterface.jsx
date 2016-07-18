import React from 'react';

var NavBar = require('./navbar.jsx');
var SortingTask = require('./sortingtask.jsx');

var StudyInterface = React.createClass({

  render: function() {
    return(
      <div id="app">
        <NavBar />
        <SortingTask />
      </div>
    );
  }

});

module.exports = StudyInterface;
