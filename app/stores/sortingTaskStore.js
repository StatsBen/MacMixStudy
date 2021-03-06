import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

/**
 * Sorting Task Store is where all the data recorded in a sorting task is
 *  stored and managed.
 *
 *   Author: Ben Clark - July 2016
 **/

var SubmitButton = require('./../submitbutton.jsx');

var SortingTaskActions = Reflux.createActions(

  [
    'setNIcons',
    'setNBins',
    'setNeedAll',
    'registerBin',
    'registerIcon',
    'sortIcon',
    'unsortIcon',
    'seeIfTaskIsComplete',
    'submitTask',
    'saveTask',
    'clearData'
  ]

);


var SortingTaskStore = Reflux.createStore({

  listenables: [SortingTaskActions],


  init: function() {

    this._nBins;
    this._nIcons;
    this._needAllBins;

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

  /** Set Need All sets whether or not every bin needs to be used for a task
   *   to be complete.  **/
  setNeedAll: function(n) {
    this._needAllBins = n;
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

      if ((fullBinIndex >= 0) && (this._binRecords[prevBinID].length < 2)) {
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
      var binID = this._connections[conIDInd].binID;
      this._connections.splice(conIDInd, 1);

      // Remove that icon from it's bin record
      var recInd = this._findIconByID(iconID, this._binRecords[binID]);
      this._binRecords[binID].splice(recInd, 1);

      // demote the bin that icon was in if necessary.
      var fullBinIndex = this._findBinByID(binID, this._filledBins);
      var halfBinIndex = this._findBinByID(binID, this._halfFilledBins);

      if ((fullBinIndex >= 0) && (this._binRecords[binID].length < 2)) {
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
   * Complete task will take all the data in this store and drop it into
   *  some sort of CSV-esque file for analysis if the task is complete,
   *   and produce an alert otherwise.
   **/
  submitTask: function() {

    var taskComplete = this._seeIfTaskIsComplete();

    if (taskComplete) {

      // Make the dissimilarity matrix
      var dissimilarityMatrix = this._computeSimilarityMatrix();

      // puke all the data out to the console!
      var data = new Array();
      data.push('Unsorted Icons:  ');
      data.push(this._unsortedIcons);
      data.push('Sorted Icons:  ');
      data.push(this._sortedIcons);
      data.push('Unfilled Bins:  ');
      data.push(this._unfilledBins);
      data.push('Half Filled Bins:  ');
      data.push(this._halfFilledBins);
      data.push('Filled Bins:  ');
      data.push(this._filledBins);
      data.push('Connections:  ');
      data.push(this._connections);
      data.push('Bin Records:  ');
      data.push(this._binRecords);
      data.push('Similarity Matrix:  ');
      data.push(dissimilarityMatrix);
      var newBlob = new Blob([JSON.stringify(data,null,2)],{type: 'text/JSON'});
      newBlob.name = 'results-' + this._nBins.toString() + '-';
      newBlob.name += this._needAllBins.toString() + '.txt';
      var dataURL = URL.createObjectURL(newBlob);

      /** Display the link!  **/
      document.getElementById("curtain").style.display = "inline";
      var box = document.getElementById("settings-box");
      var dataLink = document.createElement("a");
  		dataLink.setAttribute("value", "Download");
  		dataLink.setAttribute("href", dataURL);
  		dataLink.setAttribute("download", newBlob.name);
      dataLink.innerHTML = "Results";
      box.style.display = "inline";
      box.innerHTML = "";
      box.appendChild(dataLink);

    } else {

      // Icons remain unsorted
      if (this._unsortedIcons.length != 0) {
        alert('there appear to be unsorted icons that need to be placed into bins before the task may be submitted.');
      } // A bin isn't full...
      else if ((this._halfFilledBins.length != 0) || (this._unfilledBins.length != 0)) {
        alert('it looks like one of the available bins has less than 2 icons in it. Every bin must have at least 2 icons for the task to be submitted.');
      } // Unidentified error... :(
      else {
        alert('an unidentified error has occurred. Please contact your study facilitator for assistance.');
      }
    }
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

  /**
   * See If Task Is Complete looks at the list of filled and unfilled bins
   *  in combination with the task ID and determines if the task is complete!
   *   returns a boolean...
   **/
  _seeIfTaskIsComplete: function() {

    var allIconsSorted = (this._unsortedIcons.length == 0);
    allIconsSorted = allIconsSorted && (this._sortedIcons.length == this._nIcons);
    var allBinsFilled  = (this._unfilledBins.length == 0);
    allBinsFilled = allBinsFilled && ((this._filledBins.length + this._halfFilledBins.length) == this._nBins);

    if (this._needAllBins) {
      return(allIconsSorted && allBinsFilled);
    } else {
      return(allIconsSorted);
    }
  },

  /**
   * Compute Similarity Matrix creates the dissimilarity matrix for the
   *  individual task at hand.
   **/
  _computeSimilarityMatrix: function() {

    var n2 = this._nIcons * this._nIcons;   // n squared

    var similarityMatrix = new Array(n2);
    for (var i=0; i<n2; i++) {similarityMatrix[i] = 0;}

    // make the similarity matrix
    for (var i=0; i<this._nBins; i++) { //  i is the bin number
      var j = 0;                        //  j is the position in that bin record
      var icons = [];
      if (this._binRecords[i]) {
        while(this._binRecords[i][j]) {
          icons.push(parseInt(this._binRecords[i][j].iconID));
          j++;
        }
      }
      for (var m=0; m<icons.length; m++) {
        for(var n=0; n<icons.length; n++) {
          var ind = this._index(icons[m],icons[n]);
          similarityMatrix[ind] = this._nBins;
        }
      }
    }

    //  Write the similarity matrix to csv format
    var output = "";
    for (var i=1; i<(this._nIcons+1); i++) {
      output += ("icon " + i.toString() + ","); }
    output += " \n";

    for (var i=0; i<this._nIcons; i++) {    //  i is the row
      for (var j=0; j<this._nIcons; j++) {  //  j is the column
        var ind = this._index(i,j)
        if (j == (this._nIcons-1)) {
          output += (similarityMatrix[ind].toString() + ',\n ');
        } else {
          output += (similarityMatrix[ind].toString() + ',');
        }
      }
    }

    console.log(output);

    return output;  //stub
  },

  /**
   * Clear Data empties all the data
   **/
  clearData: function() {
    this._data = [];
    this.init();
  },


  /**  Some useful internal functions...   **/

  _index: function(i, j) {
    return((this._nIcons * i) + j);
  },


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
  },

  /**
   *  Name Unscrambler converts the represented iconID to the actual icon
   *   number via the key called 'naming_scheme.txt' in the icons folder.
   *      Note: Key was generated using random.org
   **/
  _nameUnscrambler: function(id) {
    var actualID;
    switch (id) {
      case 1:  actualID = 11; break;
      case 2:  actualID = 12; break;
      case 3:  actualID = 7;  break;
      case 4:  actualID = 9;  break;
      case 5:  actualID = 17; break;
      case 6:  actualID = 2;  break;
      case 7:  actualID = 3;  break;
      case 8:  actualID = 8;  break;
      case 9:  actualID = 4;  break;
      case 10: actualID = 1;  break;
      case 11: actualID = 18; break;
      case 12: actualID = 20; break;
      case 13: actualID = 5;  break;
      case 14: actualID = 14; break;
      case 15: actualID = 6;  break;
      case 16: actualID = 15; break;
      case 17: actualID = 16; break;
      case 18: actualID = 21; break;
      case 19: actualID = 13; break;
      case 20: actualID = 19; break;
      case 21: actualID = 10; break;
    }
    return actualID;
  }

});

var _newIDNum = 1;

module.exports = {
  actions:SortingTaskActions,
  store:SortingTaskStore
};
