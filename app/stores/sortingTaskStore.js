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
    'setNIcons',
    'setNBins',
    'registerBin',
    'registerIcon',
    'sortIcon',
    'unsortIcon',
    'seeIfTaskIsComplete',
    'completeTask',
    'saveTask'
  ]

);


var SortingTaskStore = Reflux.createStore({

  listenables: [SortingTaskActions],


  init: function() {

    this._nBins;
    this._nIcons;

    // Here's the list of all icons and bins.
    this._icons = [];
    this._bins = [];

    // Relationships between bins and icons
    this._connections = [];

    // Bin Records
    this._binRecords = [];

    // Finally, records of how close the user is to complete.
    this._unsortedIcons = [];
    this._sortedIcons = [];

    this._unfilledBins = [];
    this._halfFilledBins = [];
    this._filledBins = [];
  },

  /**  Set nIcons just sets the value of nIcons.  **/
  setNIcons: function(nIcons) {
    this._nIcons = nIcons;
  },

  /** Set nBins just sets the value of nBins.   **/
  setNBins: function(nBins) {
    this._nBins = nBins;
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
  registerIcon: function(iconID) {

    var iconItem = {iconID: parseInt(iconID)};
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

    // Remove the icon from the list of unsorted Icons
    var unsortedInd = this._findIconByID(iconID, this._unsortedIcons);
    if (unsortedInd >= 0) { this._unsortedIcons.splice(unsortedInd, 1); }

    if (iconIndex >= 0) {
      // first find the relationship involving that icon and break it
      var prevBinConIndex = this._findIconByID(iconID, this._connections);
      var prevBinConID = this._connections[prevBinConIndex].conID;
      var prevBinID = this._connections[prevBinConIndex].binID;
      this._connections.splice(prevBinConIndex, 1);

      // List the icon in the bin's record
      if (!this._binRecords[binID]) {
        this._binRecords[binID] = []; }
      this._binRecords[binID].push({iconID:iconID});

      // Remove the icon from the previous bin's record.
      var prevBinRecInd = this._findIconByID(iconID, this._binRecords[prevBinID]);
      this._binRecords[prevBinID].splice(prevBinRecInd, 1);

      // make a new connection with the new bins
      var newConnection = {conID: _newIDNum, binID: binID, iconID: iconID};
      this._connections.push(newConnection);
      _newIDNum++;

      // see if that new bin gets to be promoted to the satisfied list
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);
      var unfilledBindex = this._findBinByID(binID, this._unfilledBins);

      if (fullBinIndex >= 0) {
        // the bin is still full, no change needed :)
      } else if (halfBinIndex >= 0) {
        this._halfFilledBins.splice(halfBinIndex, 1);
        this._filledBins.push({binID: binID});
      } else {
        this._unfilledBins.splice(unfilledBindex, 1);
        this._halfFilledBins.push({binID: binID});
      }

      // demote the previous bin if need be...
      var fullBinIndex = this._findBinByID(prevBinID, this._filledBins);
      var halfBinIndex = this._findBinByID(prevBinID, this._halfFilledBins);

      if ((fullBinIndex >= 0) && (this._binRecords[binID].length < 3)) {
        this._filledBins.splice(fullBinIndex, 1);
        this._halfFilledBins.push({binID: prevBinID});
      } else if (halfBinIndex >= 0) {
        this._halfFilledBins.splice(halfBinIndex, 1);
        this._unfilledBins.push({binID: prevBinID});
      }
    }

    else {
      // add icon to the sorted icons list
      this._sortedIcons.push({iconID: iconID});

      // List the icon in the bin's record
      if (!this._binRecords[binID]) {
        this._binRecords[binID] = []; }
      this._binRecords[binID].push({iconID:iconID});

      // create a relationship between the icon and bin
      var newConnection = {conID: _newIDNum, binID: binID, iconID: iconID};
      this._connections.push(newConnection);
      _newIDNum++;

      // see if that bin gets to be promoted to the satisfied list
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);
      var unfilledBindex = this._findBinByID(binID, this._unfilledBins);

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

    this._logStatus();

    return;
  },

  /**
   * Unsort Icon removes an icon from a bin if a user takes an icon out
   *  of a bin and doesn't place it in a new one.
   **/
  unsortIcon(iID) {

    var iconID = parseInt(iID);

    if (this._findIconByID(iconID, this._sortedIcons) >= 0) {

      // First move the icon from the sorted to the unsorted list
      var toRemoveInd = this._findIconByID(iconID, this._sortedIcons);
      if (toRemoveInd >=0 ) { this._sortedIcons.splice(toRemoveInd, 1); }
      this._unsortedIcons.push({iconID: iconID});

      // remove the connection involving that icon
      var conIDInd = this._findIconByID(iconID, this._connections);
      console.log('cID: ' + conIDInd);
      var binID = this._connections[conIDInd].binID;
      console.log('bID: ' + binID);
      this._connections.splice(conIDInd, 1);

      // Remove that icon from it's bin record
      var recInd = this._findIconByID(iconID, this._binRecords[binID]);
      this._binRecords[binID].splice(recInd, 1);

      // demote the bin that icon was in if necessary.
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);
      console.log('FBInd: ' + fullBinIndex);
      console.log('HBInd: ' + halfBinIndex);

      if ((fullBinIndex >= 0) && (this._binRecords[binID].length < 3)) {
        this._filledBins.splice(fullBinIndex, 1);
        this._halfFilledBins.push({binID: binID});
      } else if (halfBinIndex >= 0) {
        this._halfFilledBins.splice(halfBinIndex, 1);
        this._unfilledBins.push({binID: binID});
      }
    }

    this._logStatus();

    return;
  },

  /**
   * See If Task Is Complete looks at the list of filled and unfilled bins
   *  in combination with the task ID and determines if the task is complete!
   *   returns a boolean...
   **/
  seeIfTaskIsComplete: function() {

    var allIconsSorted = (this._unsortedIcons.length == 0);
    allIconsSorted = allIconsSorted && (this._sortedIcons.length == this._nIcons);
    var allBinsFilled  = (this._unfilledBins.length == 0);
    allBinsFilled = allBinsFilled && (this._filledBins.length == this._nBins);

    return false;
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
  },

  _logStatus: function() {
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('');
    console.log('unsorted icons: ');
    console.log(this._unsortedIcons);
    console.log('empty bins: ');
    console.log(this._unfilledBins);
    console.log('sorted icons: ');
    console.log(this._sortedIcons);
    console.log('half filled bins: ');
    console.log(this._halfFilledBins);
    console.log('filled bins: ');
    console.log(this._filledBins);
    console.log('connections: ');
    console.log(this._connections);
    console.log('Bin Records: ');
    console.log(this._binRecords);
  }

});

var _newIDNum = 1;

module.exports = {
  actions:SortingTaskActions,
  store:SortingTaskStore
};
