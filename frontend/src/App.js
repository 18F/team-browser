import React, { Component } from 'react';
import { Person } from './Person.js';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

/* This file renders all available filters and team members on load.
 * It should show and hide team members as filters are selected.
 */

// TODO: Add checkbox container renderer
// TODO: Add checkbox renderer and click handler
// TODO: Add teammate component and click handler

function Teammates(props) {
  console.log("props.teammates: ", props);
  var teammates = [];
  /*var teammates = Object.keys(props.teammates).map(function (key) {
    var person = props.teammates[key];
    return ( <Teammate person={person} /> );
  });*/
  return (
    <section className="teammates">
    { teammates }
    </section>
  )
}


/*function Teammate(props) {
  console.log("Teammate props: ", props);
  return (
    <h3>{ props.person.github }</h3>
  )
}*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teammates: {}
    }

    var self = this;
    // this should definitely not be hardcoded
    axios.get('http://127.0.0.1:5000/')
       .then(function(response){
          console.log("response = ", response);
          self.setState({"teammates": response.data.teammates});
          console.log("original state: ", self.state);
       });
  }
  render() {
    var self = this;
    //console.log("state", self.state.teammates.people);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button type="button" onClick={self.gotClick}>Go</button>
        </p>
        <section className="filters">
        </section>
        <Teammates teammates={self.state.teammates} />
      </div>
    );
  }
}

export default App;
