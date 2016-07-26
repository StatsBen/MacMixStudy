import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

/**
 * This store records all information relevant to the Bin components.
 *
 * Author: Ben Clark - July 2016
 **/

var BinActions = Reflux.createActions(
  [ 'registerBin',
    'getAllBins'   ]
);

var BinStore = Reflux.createStore({

  listenables: [BinActions],

  init: function() {
    this._data = {
      nBins: 5,
      icons: {}
    };
  },

  /**
   * Register Bin records some data about a Bin when that Bin is rendered.
   **/
  registerBin: function() {
    // stub  TODO
    return;
  },

  /**
   * Get All Bins returns data about all the recorded Bins.
   **/
  getAllBins: function() {
    //stub   TODO
    return;
  }

});

module.exports = {
  actions: BinActions,
  store: BinStore
};
