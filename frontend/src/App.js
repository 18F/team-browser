import React, { Component } from 'react';
import { Person } from './Person.js';
import Teammates from './Teammates.js';
import './uswds-1.0.0/css/uswds.min.css';
import './App.css';
import axios from 'axios';

/* This file renders all available filters and team members on load.
 * It should show and hide team members as filters are selected.
 */

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
          self.setState({"teammates": response.data.teammates});
       });
  }
  render() {
    var self = this;
    return (
      <div className="App usa-grid">
        <header className="usa-header usa-header-basic" role="banner">
          <div className="usa-nav-container">
            <h1>18F Skills Browser</h1>
          </div>
        </header>
        <section className="filters usa-grid">
        </section>
        <Teammates teammates={self.state.teammates} />
      </div>
    );
  }
}

export default App;
