import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';

/**
 * The Icon Store contains info for all the Icon components at play in the
 *  sorting task.
 **/
var IconStoreActions = Reflux.createActions(
  [
    'registerAnIcon',
    'getListOfIcons',
    'getIconByID'
  ]
);

var IconStore = Reflux.createStore({

  listenables: [IconStoreActions],

  /**
   * Register an Icon is called whenever an Icon is rendered.
   **/
  registerAnIcon: function() {
    //stub  TODO
    return;
  },

  /**
   * Get List of Icons returns all the icons in the task as a list
   **/
  getListOfIcons: function() {
    //stub  TODO
    return;
  },

  /**
   * Get Icon by ID returns an individual icon's data corresponding to the
   *  icon with the ID given to this function.
   **/
  getIconByID: function() {
    //stub   TODO
    return;
  }

});

module.exports = {
  actions:IconStoreActions,
  store:IconStore
};
