import React, { Component } from 'react';
import './uswds-1.0.0/css/uswds.min.css';

function Teammates(props) {
  console.log("props.teammates: ", props.teammates);
  //var teammates = [];
  var teammates = Object.keys(props.teammates).map(function (key) {
    var person = props.teammates[key];
    return ( <Teammate person={person} /> );
  });
  return (
    <section className="teammates usa-grid">
    { teammates }
    </section>
  )
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
