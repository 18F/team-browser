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
  console.log("props.people: ", props.people);
  var teammates = Object.keys(props.people).map(function (key) {
    var person = props.people[key];
    return ( <Teammate person={person} /> );
  });
  return (
    <section className="teammates">
    { teammates }
    </section>
  )
}


function Teammate(props) {
  console.log("Teammate props: ", props);
  return (
    <h3>{ props.person.github }</h3>
  )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teammates: {
        person: { github: "stranger" }
      }
    };
    var self = this;
    /* placeholder call: do a get request for all of the data */
    axios.get('http://127.0.0.1:5000/personal_detail/EricSchles')
       .then(function(response){
          //console.log("response = ", response);
          //will be response.data.teammates; just use this for now
          self.setState({"teammates": response.data.person});
       });
    // old example stuff
    this.gotClick = this.gotClick.bind(this);
  }
  //old example stuff
  gotClick() {
    var self = this;
    axios.get('http://127.0.0.1:5000/personal_detail/EricSchles')
         .then(function(response){
            self.setState({"person": response.data.person});
         });
  }
  render() {
    var self = this;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, { self.state.teammates.github}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button type="button" onClick={self.gotClick}>Go</button>
        </p>
        <section className="filters">
        </section>
        <Teammates people={self.state.teammates} />
      </div>
    );
  }
}

export default App;
