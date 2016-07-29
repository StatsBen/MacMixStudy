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
        <SortingTask taskID={1} isActive={true} nBins={11} />
        <SortingTask taskID={2} isActive={false} nBins={2} />
        <SortingTask taskID={3} isActive={false} nBins={4} />
        <SortingTask taskID={4} isActive={false} nBins={7} />
        <SortingTask taskID={5} isActive={false} nBins={9} />
      </div>
    );
  }

});

module.exports = StudyInterface;
