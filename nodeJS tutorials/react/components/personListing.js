import React from 'react';

import Person from './person.js';

/*
 * define component as a class, props are given as constructor parameter
 */
export default class PersonListing extends React.Component {
  constructors(props) {
    super.props;
  }

  render() {
    return (
    <div>
      <Person { ...this.props.persons[0] } />
      <Person { ...this.props.persons[1] } />
        { this.props.children }
    </div>);
  }

}
