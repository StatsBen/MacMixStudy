import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

/**
 * The Study Interface Store will control which phase of the user study the
 *  participant is in with some input from the researcher at the beginning
 *   of the task.
 *
 * Author: Ben Clark - July 2016
 **/

var SortingTaskStore = require('./sortingTaskStore.js');
var StudyInterface = require('./../studyinterface.jsx');

var StudyInterfaceActions = Reflux.createActions(

  [
    'displayPopUpPrompt',
    'setNBins',
    'setMustUseAllBins',
    'setIsReady',
    'getNBins',
    'getAllBinsNeeded',
    'getIsReady'
  ]

);

var StudyInterfaceStore = Reflux.createStore({

  listenables: [StudyInterfaceActions],

  init: function() {
    this._nBins = 4;
    this._mustUseAllBins = true;
    this._isReady = false;
  },

  setNBins: function(n) {
    this._nBins = n;
  },

  setMustUseAllBins: function(m) {
    this._mustUseAllBins = m;
  },

  setIsReady: function(m) {
    this._isReady = m;
  },

  getNBins: function() {
    return this._nBins;
  },

  getAllBinsNeeded: function() {
    return this._mustUseAllBins;
  },

  getIsReady: function() {
    return this._isReady;
  }

});

module.exports = {
  actions: StudyInterfaceActions,
  store: StudyInterfaceStore
};
