import React from 'react';
import ReactDOM from 'react-dom';

var NavBar = require('./navbar.jsx');
var SortingTask = require('./sortingtask.jsx');
var SortingTaskStore = require('./stores/sortingTaskStore.js');
var StudyInterfaceStore = require('./stores/studyInterfaceStore.js');

/**
 * Outermost "container component" for the Macaron Mix User Study interface
 *
 * Author: Ben Clark - July, 2016
 **/


var StudyInterface = React.createClass({

  getInitialState: function() {
    return({nBins : 4,
            nIcons: 21,
            needAllBins: true
          });
  },


  _beginTask:function() {
    var newNBins = parseInt(document.getElementById("nBins-selector").value);
    var allBins = document.getElementById("bin-options-selector").value;

    if (newNBins && allBins) {
      //set up the task
      SortingTaskStore.actions.clearData();
      StudyInterfaceStore.actions.setNBins(newNBins);
      StudyInterfaceStore.actions.setMustUseAllBins(allBins == "yes");
      StudyInterfaceStore.actions.setIsReady(true);
      document.getElementById("settings-box").style.display = "none";
      document.getElementById("curtain").style.display = "none";
      SortingTaskStore.actions.setNBins(newNBins);
      SortingTaskStore.actions.setNIcons(this.state.nIcons);
      SortingTaskStore.actions.setNeedAll(allBins == "yes");

      this.setState({nBins: newNBins, needAllBins: allBins});
    }

    else {
      alert('an option remains unselected!');
    }

  },





  render: function() {

    var curtainStyle = {
      position:  'absolute',
      width:     '100%',
      height:    '100%',
      top:       '0',
      left:      '0',
      background:'rgba(0,0,0,0.7)',
      zIndex:    '999'
    };

    var settingsBoxStyle = {
      position:  'absolute',
      width:     '400px',
      height:    '200px',
      top:       '200px',
      left:      '300px',
      padding:   '15px',
      background:'#FFFFFF',
      borderRadius:'10px',
      boxShadow: '2px 2px 10px #000000',
      zIndex:    '1000'
    };

    return(
      <div id="app">
        <div id="curtain" style={curtainStyle}></div>
        <div id="settings-box" style={settingsBoxStyle}>
          <p>Welcome to the Macaron Mix User Study. Your study facilitator will now set up your sorting task.</p>
          <p id="bin-number-selector-text">How many bins should be in this task?
            <select id="nBins-selector" name="number-of-bins">
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="7">7</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </p>
          <p id="all-bins-text">Do all the bins need to be used?
            <select id="bin-options-selector" name="bin-options-selector">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </p>
          <button type="button" onClick={this._beginTask}>Start</button>
        </div>
        <NavBar />
        <SortingTask taskID={1}
                     isActive={true}
                     nBins={this.state.nBins}
                     nIcons={this.state.nIcons}/>
      </div>
    );
  },

});

module.exports = StudyInterface;
