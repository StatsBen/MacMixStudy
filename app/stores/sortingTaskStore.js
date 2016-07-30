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
    'unsortIcon',
    'completeTask',
    'saveTask'
  ]

);


var SortingTaskStore = Reflux.createStore({

  listenables: [SortingTaskActions],


  init: function() {
    // Here's the list of all icons and bins.
    this._icons = [];
    this._bins = [];

    // Relationships between bins and icons
    this._connections = [];

    // Finally, records of how close the user is to complete.
    this._unsortedIcons = [];
    this._sortedIcons = [];

    this._unfilledBins = [];
    this._halfFilledBins = [];
    this._filledBins = [];
  },

  /**
   * Register Bin is called when a bin renders, and adds that bin to the list
   *  of all the bins kept in this store.
   **/
  registerBin: function(binID) {

   var binItem = {binID: parseInt(binID)};
   this._bins.push(binItem);
   this._unfilledBins.push(binItem);

   return;
  },

  /**
   * Register Icon adds an Icon component to the list of all icons kept in
   *  this store; it's called when an Icon component is rendered.
   **/
  registerIcon: function(iconID, audioID) {
    //stub TODO
    console.log('an icon was registered!');

    var iconItem = {iconID: parseInt(iconID), audioID: audioID};
    this._icons.push(iconItem);
    this._unsortedIcons.push(iconItem);

    return;
  },

  /**
   * Sort Icon records that an Icon was sorted into a Bin by:
   *   - first marking that Icon as sorted (so that if it's position changes
   *      later it's not sorted into multiple bins),
   *   - Adding that Icon to the Bin's list of Icon's in it,
   *   - Creating a record of the relationship between that Bin and Icon.
   **/
  sortIcon: function(iID, bID) {

    var iconID = parseInt(iID);
    var binID = parseInt(bID);

    var iconIndex = this._findIconByID(iconID, this._sortedIcons);
    console.log(iconIndex);

    if (iconIndex >= 0) {
      console.log('this icon was previously in a bin');
      // first find the relationship involving that icon and break it

      // make a new relationship with the new bins
      // see if that new bin gets to be promoted to the satisfied list
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);
      var unfilledBindex = this._findBinByID(binID, this._unfilledBins);
      console.log('fbi: ' + fullBinIndex);
      console.log('hbi: ' + halfBinIndex);
      console.log('ufi: ' + unfilledBindex);

      if (fullBinIndex >= 0) {
        // the bin is still full, no change needed :)
      } else if (halfBinIndex >= 0) {
        this._halfFilledBins.splice(halfBinIndex, 1);
        this._filledBins.push({binID: binID});
      } else {
        this._unfilledBins.splice(unfilledBindex, 1);
        this._halfFilledBins.push({binID: binID});
      }
    }

    else {
      // add icon to the sorted icons list
      this._sortedIcons.push({iconID: iconID});

      // create a relationship between the icon and bin
      var newConnection = {conID: _newIDNum, binID: binID, iconID: iconID};
      this._connections.push(newConnection);
      _newIDNum++;

      // see if that bin gets to be promoted to the satisfied list
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);
      var unfilledBindex = this._findBinByID(binID, this._unfilledBins);
      console.log('fbi: ' + fullBinIndex);
      console.log('hbi: ' + halfBinIndex);
      console.log('ufi: ' + unfilledBindex);

      if (fullBinIndex >= 0) {
        // the bin is still full, no change needed :)
      } else if (halfBinIndex >= 0) {
        this._halfFilledBins.splice(halfBinIndex, 1);
        this._filledBins.push({binID: binID});
      } else {
        this._unfilledBins.splice(unfilledBindex, 1);
        this._halfFilledBins.push({binID: binID});
      }
    }

    console.log(this._sortedIcons);
    console.log(this._filledBins);
    console.log(this._halfFilledBins);

    return;
  },

  /**
   * Unsort Icon removes an icon from a bin if a user takes an icon out
   *  of a bin and doesn't place it in a new one.
   **/
  unsortIcon(iconID) {
    //stub  TODO
    console.log('unsorted icon :(');
    return;
  },

  /**
   * Complete task will take all the data in this store and drop it into
   *  some sort of CSV-esque file for analysis when the task is complete.
   **/
  completeTask: function() {
    //stub  TODO
    console.log('task complete...');
    return;
  },

  /**
   * Save Task makes a recoverable record of the task any time something
   *  in the data changes so that the task can be recovered in the event
   *   of a total meltdown... Which hopefully won't happen.
   **/
  saveTask: function() {
    //stub  TODO
    console.log('task saved!');
    return;
  },




  /**  Some useful internal functions...   **/

  _findBinByID: function(binID, list) {

    var outputIndex = -1;

    for (var i=0; i<list.length; i++) {
      if (list[i].binID == binID) {
        outputIndex = i;
        break;
      }
    }

    return (outputIndex);
  },

  _findIconByID: function(iconID, list) {

    var outputIndex = -1;

    for (var i=0; i<list.length; i++) {
      if (list[i].iconID == iconID) {
        outputIndex = i;
        break;
      }
    }

    return (outputIndex);
  },

  _findConnectionByID: function(connectionID, list) {

    var outputIndex = -1;

    for (var i=0; i<list.length; i++) {
      if (list[i].conID == connectionID) {
        outputIndex = i;
        break;
      }
    }

    return (outputIndex);
  }

});

var _newIDNum = 1;

module.exports = {
  actions:SortingTaskActions,
  store:SortingTaskStore
};
