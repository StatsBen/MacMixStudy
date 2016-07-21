import React from 'react';

var NavBar = require('./navbar.jsx');
var SortingTask = require('./sortingtask.jsx');

/**
 * Outermost "container component" for the Macaron Mix User Study interface
 *
 * Author: Ben Clark - July, 2016
 **/

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
