import React, { Component } from 'react';
import { Person } from './Person.js';
import Teammates from './Teammates.js';
import Filters from './Filters.js';
import './uswds-1.0.0/css/uswds.min.css';
import './App.css';
import axios from 'axios';

/* This file renders all available filters and team members on load.
 * It should show and hide team members as filters are selected.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = {
      teammates: [
        {
            "name": "EricSchles",
            "github":"EricSchles",
            "office":"new york",
            "skills":["python", "data analysis"],
            "interests":["everything"]
        },
        {
            'name': "hbillings",
            "github": "hbillings",
            "office": "denver",
            "skills": ["javascript", "css", "python"],
            "interests": ["cats"]
        }
      ],

      //TODO: Get this from API when ready
      filterGroups: [
        {"title": "Skills",
        "items": ["javascript", "css", "python"]
        },
        {"title": "Interests",
        "items": ["data visualization", "data analysis", "react"]
        },
        {"title": "Unit",
         "items": ["Experience Design", "Engineering", "Acquisition", "Strategy"]
        }
      ],
      activeFilters: []
    }

    var self = this;
    // this should definitely not be hardcoded
    axios.get('http://127.0.0.1:5000/')
       .then(function(response){
          self.setState({"teammates": response.data.teammates});
       });
  }

  onFilterChange(value) {
    if (this.state.activeFilters.indexOf(value) >= 0) {
      var currentFilters = this.state.activeFilters.slice();
      var index = currentFilters.indexOf(value);
      currentFilters.splice(index, 1);
      this.setState({activeFilters: currentFilters});
      console.log(value, " removed");
    } else {
      var currentFilters = [].concat(this.state.activeFilters, value);
      this.setState({activeFilters: currentFilters});
      console.log(value, " added");
    }
  }
  render() {
    var self = this;
    console.log("Parent activeFilters: ", this.state.activeFilters);
    return (
      <div className="App usa-grid">
        <header className="usa-header usa-header-basic" role="banner">
          <div className="usa-nav-container">
            <h1>18F Skills Browser</h1>
          </div>
        </header>
        <Filters filters={self.state.filterGroups} activeFilters={self.state.activeFilters} onChange={self.onFilterChange}/>
        <Teammates teammates={self.state.teammates} activeFilters={self.state.activeFilters} />
      </div>
    );
  }
}

export default App;
