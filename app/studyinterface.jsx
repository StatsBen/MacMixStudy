import React from 'react';

var NavBar = require('./navbar.jsx');
var SortingTask = require('./sortingtask.jsx');
var SortingTaskStore = require('./stores/sortingTaskStore.js');

/**
 * Outermost "container component" for the Macaron Mix User Study interface
 *
 * Author: Ben Clark - July, 2016
 **/

var StudyInterface = React.createClass({

  render: function() {

    //stub
    var activeClass = 1;

    var task1Active = false;
    var task2Active = false;
    var task3Active = false;
    var task4Active = false;
    var task5Active = false;
    var task6Active = false;

    switch (activeClass) {
      case 1:
        task1Active = true;
        SortingTaskStore.actions.setNBins(11);
        break;
      case 2:
        task2Active = true;
        SortingTaskStore.actions.setNBins(2);
        break;
      case 3:
        task3Active = true;
        SortingTaskStore.actions.setNBins(4);
        break;
      case 4:
        task4Active = true;
        SortingTaskStore.actions.setNBins(7);
        break;
      case 5:
        task5Active = true;
        SortingTaskStore.actions.setNBins(9);
        break;
      case 6:
        task6Active = true;
        SortingTaskStore.actions.setNBins(12);
        break;
      default:
        task1Active = true;
        SortingTaskStore.actions.setNBins(7);
    }

    return(
      <div id="app">
        <NavBar />
        <SortingTask taskID={1} isActive={task1Active} nBins={11} />
        <SortingTask taskID={2} isActive={task2Active} nBins={2} />
        <SortingTask taskID={3} isActive={task3Active} nBins={4} />
        <SortingTask taskID={4} isActive={task4Active} nBins={7} />
        <SortingTask taskID={5} isActive={task5Active} nBins={9} />
        <SortingTask taskID={6} isActive={task6Active} nBins={12} />
      </div>
    );
  }

});

module.exports = StudyInterface;
