import React, { Component } from 'react';
import './uswds-1.0.0/css/uswds.min.css';

class FilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    console.log("filteritem props: ", this.props);
  }
  onChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    var self=this;
    var isChecked = self.props.checkedItems.indexOf(self.props.item) >= 0;
    return (
      <p onChange={this.onChange}>
        <input type="checkbox" id={self.props.item} value={self.props.item} defaultChecked={self.isChecked}/>
        <label for={self.props.item}>{self.props.item}</label>
      </p>
    )
  }
}

FilterItem.propTypes = {
  item: React.PropTypes.string.isRequired,
  checkedItems: React.PropTypes.array
}

FilterItem.defaultProps = {
  checkedItems: []
}

function FilterGroup(props) {
  //console.log("FilterGroup props: ", props);
  var items = [];
  props.items.forEach((item) =>
        items.push(<FilterItem item={item} checkedItems={props.checkedItems} onChange={props.onChange}/>)
  );
  return(
    <div className="filters--group usa-width-one-fourth">
      <h4>{props.title}</h4>
      {items}
    </div>
  );
}

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var self=this;
    var filterGroups = [];
    this.props.filters.forEach((filter) =>
      filterGroups.push(<FilterGroup title={filter.title} items={filter.items} checkedItems={self.props.activeFilters} onChange={self.props.onChange}/>)
    );
    return(
      <section className="filters usa-grid">
        <div class="row">
        {filterGroups}
        </div>
      </section>
    )
  }
}

export default Filters;
