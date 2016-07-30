import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

/**
 * Sorting Task Store is where all the data recorded in a sorting task is
 *  stored and managed.
 *
 *   Author: Ben Clark - July 2016
 **/

var SortingTaskActions = Reflux.createActions(

  [
    'registerBin',
    'registerIcon',
    'sortIcon',
    'completeTask',
    'saveTask'
  ]

);

var SortingTaskStore = Reflux.createStore({

  listenables: [SortingTaskActions],

  /**
   * Register Bin is called when a bin renders, and adds that bin to the list
   *  of all the bins kept in this store.
   **/
  registerBin: function(bin) {
   //stub  TODO
   return;
  },

  /**
   * Register Icon adds an Icon component to the list of all icons kept in
   *  this store; it's called when an Icon component is rendered.
   **/
  registerIcon: function(icon) {
    //stub TODO
    return;
  },

  /**
   * Sort Icon records that an Icon was sorted into a Bin by:
   *   - first marking that Icon as sorted (so that if it's position changes
   *     later it's not sorted into multiple bins),
   *   - Adding that Icon to the Bin's list of Icon's in it,
   *   - Creating a record of the relationship between that Bin and Icon.
   **/
  sortIcon: function(bin, icon) {
    //stub  TODO
    return;
  },

  /**
   * Complete task will take all the data in this store and drop it into
   *  some sort of CSV-esque file for analysis when the task is complete.
   **/
  completeTask: function() {
    //stub  TODO
    return;
  },

  /**
   * Save Task makes a recoverable record of the task any time something
   *  in the data changes so that the task can be recovered in the event
   *   of a total meltdown... Which hopefully won't happen.
   **/
  saveTask: function() {
    //stub  TODO
    return;
  }

});

module.exports = {
  actions:SortingTaskActions,
  store:SortingTaskStore
};
