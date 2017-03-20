import React, { Component } from 'react';
import './uswds-1.0.0/css/uswds.min.css';

// TODO: Add teammate component click handler
class Teammates extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var self = this;
    console.log("filter length", self.props.activeFilters.length);
    var selectedTeammates = self.props.teammates.filter(function(teammate){
      var matchingFilters = self.props.activeFilters.filter(filter => teammate.skills.indexOf(filter) >= 0);
      /* return true or false based on if the teammate's skills match the applied filters
       * OR check to see if there are any filters applied at all (and return all teammates if no filters) */
      return matchingFilters.length === self.props.activeFilters.length || self.props.activeFilters.length === 0 ;
    });
    var teammates = selectedTeammates.map(person=> <Teammate person={person} />);
    return (
      <section className="teammates usa-grid">
      { teammates }
      </section>
    )
  }
}

function Teammate(props) {
  console.log("Teammate props: ", props);
  return (
    <div className="usa-width-one-third">
      <h3>{ props.person.github }</h3>
    </div>
  )
}

export default Teammates;
