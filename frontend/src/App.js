import React, { Component } from 'react';
import { Person } from './Person.js';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
/* App should represent all available filters and team members on load.
 * It should show and hide team members as filters are selected.
 */
constructor(props) {
    super(props);
    this.state = {person: { github: "stranger" }};
    this.gotClick = this.gotClick.bind(this);
  }
  gotClick() {
    var self = this;
    axios.get('http://127.0.0.1:5000/personal_detail/EricSchles')
         .then(function(response){
            console.log("response = ", response);
            self.setState({"person": response.data.person});
         });
  }
  render() {
    var self = this;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, { self.state.person.github }</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button type="button" onClick={self.gotClick}>Go</button>
        </p>
      </div>
    );
  }
}

export default App;
