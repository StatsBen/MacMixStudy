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

  /**
   * Display Pop Up Prompt just makes a pop up box with a few input fields
   *  that will determine how this phase of the task is conducted.
   **/
  displayPopUpPrompt: function() {
    // stub  TODO
    console.log('you called the "displayPopUpPrompt" function');

    // darken the rest of the app...
    var curtain = document.createElement("div");
    curtain.id = "curtain";
    curtain.style.position = "absolute";
    curtain.style.width = "100%";
    curtain.style.height = "100%";
    curtain.style.top = "0";
    curtain.style.left = "0";
    curtain.style.background = "rgba(0,0,0,0.8)";
    curtain.style.zIndex = "9999";
    document.getElementById("app").appendChild(curtain);

    // Make the container for the pop-up
    var settingsBox = document.createElement("div");
    settingsBox.id = "settings-box";
    settingsBox.style.position = "absolute";
    settingsBox.style.width = "400px";
    settingsBox.style.height = "300px";
    settingsBox.style.left = "300px";
    settingsBox.style.top = "200px";
    settingsBox.style.padding = "15px";
    settingsBox.style.background = "white";
    settingsBox.style.zIndex = "10000";
    settingsBox.style.borderRadius = "5px";
    settingsBox.style.boxShadow = "2px 2px 10px #000000";
    document.getElementById("app").appendChild(settingsBox);

    // Add the welcome text.
    var wT = "Welcome to the Macaron Mix User Study. ";
    wT += "Your study facilitator will now set up your sorting task. ";
    var settingsWelcomeText = document.createElement("p");
    settingsWelcomeText.innerHTML = wT
    document.getElementById("settings-box").appendChild(settingsWelcomeText);

    // Add the "select number of bins" input field.
    var nBinText = document.createElement("p");
    nBinText.id = "bin-number-selector-text";
    nBinText.innerHTML = "How many bins should be in this task? ";
    document.getElementById("settings-box").appendChild(nBinText);
    var selectOptions = document.createElement("select");
    selectOptions.id = "nBins-selector";
    selectOptions.setAttribute("name", "number-of-bins");
    document.getElementById("bin-number-selector-text").appendChild(selectOptions);

    // Add all the bin number options to the selector
    var op2 = document.createElement("option");
    op2.setAttribute("value", "2");
    op2.innerHTML = "2";
    document.getElementById("nBins-selector").appendChild(op2);
    var op4 = document.createElement("option");
    op4.setAttribute("value", "4");
    op4.innerHTML = "4";
    document.getElementById("nBins-selector").appendChild(op4);
    var op7 = document.createElement("option");
    op7.setAttribute("value", "7");
    op7.innerHTML = "7";
    document.getElementById("nBins-selector").appendChild(op7);
    var op9 = document.createElement("option");
    op9.setAttribute("value", "9");
    op9.innerHTML = "9";
    document.getElementById("nBins-selector").appendChild(op9);
    var op12 = document.createElement("option");
    op12.setAttribute("value", "12");
    op12.innerHTML = "12";
    document.getElementById("nBins-selector").appendChild(op12);

    // make the "Use All Bins?" radio button
    var allBinsText = document.createElement("p");
    allBinsText.id = "all-bins-text";
    allBinsText.innerHTML = "Do all the bins need to be used? ";
    document.getElementById("settings-box").appendChild(allBinsText);
    var binOptions = document.createElement("select");
    binOptions.id = "bin-options-selector";
    binOptions.setAttribute("name", "bin-options-selector");
    document.getElementById("all-bins-text").appendChild(binOptions);
    var bO1 = document.createElement("option");
    bO1.setAttribute("value", "yes");
    bO1.innerHTML = "yes";
    document.getElementById("bin-options-selector").appendChild(bO1);
    var bO2 = document.createElement("option");
    bO2.setAttribute("value", "no");
    bO2.innerHTML = "no";
    document.getElementById("bin-options-selector").appendChild(bO2);

    // Create the "Begin Task" button
    var beginButton = document.createElement("button");
    beginButton.id = "begin-button";
    beginButton.innerHTML = "Begin Task";
    beginButton.addEventListener("click", function(){
      StudyInterfaceStore._beginTask();
    });
    document.getElementById("settings-box").appendChild(beginButton);

    return;
  },

  /**
   * Begin Task takes the values from the input fields in the pop up and
   *  sets up the task to those specifications.
   **/
  _beginTask: function() {

    var newNBins = parseInt(document.getElementById("nBins-selector").value);
    var allBins = document.getElementById("bin-options-selector").value;

    console.log(allBins);
    console.log(newNBins);

    if (newNBins && allBins) {
      alert('beginning task! ' + newNBins);

      //set up the task
      this._nBins = newNBins;
      this._mustUseAllBins = (allBins == "yes");
      this._valuesSet = true;

      var appElement = document.getElementById("app");
      var box  = document.getElementById("settings-box");
      var curt = document.getElementById("curtain");
      appElement.removeChild(box);
      appElement.removeChild(curt);
    }

    else {
      alert('an option remains unselected!');
    }
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
